import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { supabase } from "@/lib/supabase";
import { sendLead, type CrmLead } from "@/lib/crm/adapter";
import { leadTags } from "@/lib/crm/tags";
import { SUMMARY_FIELDS } from "@/lib/rent-ledger/summary";
import { normalizeMetro } from "@/lib/rent-ledger/metros";
import { bool, hasContributed, houseHash, metroMedians, num, str } from "@/lib/rent-ledger/server";

// Rent ledger saves. Receives lead answers and the per-house summaries
// (build spec section 10). Unlocking the report adds the host's houses to
// the benchmarks; there is no opt-out. Other hosts only ever see aggregates;
// the house address is kept for Caitlyn's admin view. Never receives the
// export, resident names, member IDs or any per-resident row.
//
//   POST { action: "unlock", lead, stats }      email unlock form (before sign-in)
//   POST { action: "profile", lead, stats }     after the magic link: saves rl_users
//   POST { action: "interests", interests, stats }
//   POST { action: "benchmark", houses, stats } saves a snapshot of each house
//   GET                                         the signed-in user's profile + contribution state

const OPERATOR_TYPES = new Set(["owner", "arbitrage", "both", "pm"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Stats = { houses: number; breakageRate: number; breakagePerHouseMonth: number; collectionRate: number; turnover?: number };

function readStats(v: unknown): Stats {
  const s = (v ?? {}) as Record<string, unknown>;
  return {
    houses: num(s.houses) ?? 0,
    breakageRate: num(s.breakageRate) ?? 0,
    breakagePerHouseMonth: num(s.breakagePerHouseMonth) ?? 0,
    collectionRate: num(s.collectionRate) ?? 0,
    turnover: num(s.turnover),
  };
}

function readLead(v: unknown) {
  const l = (v ?? {}) as Record<string, unknown>;
  const operatorType = str(l.operatorType, 20);
  return {
    firstName: str(l.firstName, 80),
    lastName: str(l.lastName, 80),
    email: str(l.email, 200)?.toLowerCase(),
    city: str(l.city, 80),
    state: str(l.state, 40),
    metro: normalizeMetro(str(l.metro, 60)) ?? undefined,
    operatorType: operatorType && OPERATOR_TYPES.has(operatorType) ? operatorType : undefined,
    houseCount: num(l.houseCount),
    consentReport: bool(l.consentReport) === true,
    consentContact: bool(l.consentContact) === true,
  };
}

type Profile = {
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  city?: string | null;
  state?: string | null;
  metro?: string | null;
  operator_type?: string | null;
  house_count?: number | null;
  consent_contact?: boolean | null;
  interest_selling?: boolean | null;
  interest_buying?: boolean | null;
  interest_partnering?: boolean | null;
  interest_help?: boolean | null;
};

async function fireLead(p: Profile, stats: Stats) {
  const interests = {
    selling: p.interest_selling ?? undefined,
    buying: p.interest_buying ?? undefined,
    partnering: p.interest_partnering ?? undefined,
    help: p.interest_help ?? undefined,
  };
  const city = await metroMedians(p.metro);
  const lead: CrmLead = {
    email: p.email,
    firstName: p.first_name ?? undefined,
    lastName: p.last_name ?? undefined,
    city: p.city ?? undefined,
    state: p.state ?? undefined,
    operatorType: p.operator_type ?? undefined,
    houseCount: p.house_count ?? stats.houses,
    consentContact: !!p.consent_contact,
    interests,
    tags: leadTags({
      city: p.city ?? undefined,
      metro: p.metro ?? undefined,
      operatorType: p.operator_type ?? undefined,
      houseCount: p.house_count ?? stats.houses,
      consentContact: !!p.consent_contact,
      interests,
      breakagePerHouseMonth: stats.breakagePerHouseMonth,
      turnover: stats.turnover,
      cityMedian: city,
    }),
    stats: {
      houses: stats.houses,
      breakageRate: stats.breakageRate,
      breakagePerHouseMonth: stats.breakagePerHouseMonth,
      collectionRate: stats.collectionRate,
      vsCityMedian:
        city?.breakagePerHouseMonth != null
          ? stats.breakagePerHouseMonth - city.breakagePerHouseMonth
          : undefined,
    },
    source: "rent-ledger",
  };
  return sendLead(lead);
}

async function loadProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase.from("rl_users").select("*").eq("id", userId).maybeSingle();
  return (data as Profile | null) ?? null;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ signedIn: false });
  const profile = await loadProfile(user.id);
  return NextResponse.json({
    signedIn: true,
    email: user.email,
    profile,
    contributed: await hasContributed(user.id),
  });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const action = str(body.action, 20);
  const stats = readStats(body.stats);

  if (action === "unlock") {
    const lead = readLead(body.lead);
    if (!lead.email || !EMAIL.test(lead.email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }
    if (!lead.consentReport) {
      return NextResponse.json({ error: "Please agree to get your report by email." }, { status: 400 });
    }
    // CRM failures never block the report.
    await fireLead(
      {
        email: lead.email,
        first_name: lead.firstName,
        last_name: lead.lastName,
        city: lead.city,
        state: lead.state,
        metro: lead.metro,
        operator_type: lead.operatorType,
        house_count: lead.houseCount,
        consent_contact: lead.consentContact,
      },
      stats,
    );
    return NextResponse.json({ ok: true });
  }

  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  if (action === "profile") {
    const lead = readLead(body.lead);
    const row = {
      id: user.id,
      email: user.email,
      first_name: lead.firstName ?? null,
      last_name: lead.lastName ?? null,
      city: lead.city ?? null,
      state: lead.state ?? null,
      metro: lead.metro ?? null,
      operator_type: lead.operatorType ?? null,
      house_count: lead.houseCount ?? null,
      consent_report: true,
      consent_contact: lead.consentContact,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("rl_users").upsert(row, { onConflict: "id" });
    if (error) {
      console.error("[rent-ledger] profile save failed", error);
      return NextResponse.json({ error: "Could not save your details." }, { status: 500 });
    }
    // Only re-send to the CRM when the address differs from the unlock form.
    if (lead.email && lead.email !== user.email.toLowerCase()) await fireLead(row, stats);
    return NextResponse.json({ ok: true });
  }

  if (action === "interests") {
    const i = (body.interests ?? {}) as Record<string, unknown>;
    const updates: Record<string, boolean | string> = { updated_at: new Date().toISOString() };
    for (const [k, col] of [
      ["selling", "interest_selling"],
      ["buying", "interest_buying"],
      ["partnering", "interest_partnering"],
      ["help", "interest_help"],
    ] as const) {
      const v = bool(i[k]);
      if (v != null) updates[col] = v;
    }
    const existing = await loadProfile(user.id);
    const { error } = existing
      ? await supabase.from("rl_users").update(updates).eq("id", user.id)
      : await supabase.from("rl_users").insert({ id: user.id, email: user.email, ...updates });
    if (error) {
      console.error("[rent-ledger] interests save failed", error);
      return NextResponse.json({ error: "Could not save your answer." }, { status: 500 });
    }
    const profile = await loadProfile(user.id);
    if (profile) await fireLead(profile, stats);
    return NextResponse.json({ ok: true });
  }

  if (action === "benchmark") {
    const houses = Array.isArray(body.houses) ? body.houses.slice(0, 200) : [];
    if (!houses.length) return NextResponse.json({ error: "No houses to save." }, { status: 400 });
    if (!process.env.RENT_LEDGER_HASH_SALT) {
      console.error("[rent-ledger] RENT_LEDGER_HASH_SALT is not set");
      return NextResponse.json({ error: "Benchmarks aren't set up yet." }, { status: 500 });
    }
    if (!(await loadProfile(user.id))) {
      await supabase.from("rl_users").insert({ id: user.id, email: user.email });
    }
    let rows;
    try {
      rows = houses.map((h: Record<string, unknown>) => {
        const psid = str(h.psid, 64);
        if (!psid) throw new Error("A house is missing its PSID.");
        const row: Record<string, unknown> = {
          user_id: user.id,
          house_hash: houseHash(psid),
          // Admin view only; never returned by the benchmarks route.
          house_address: str(h.address, 200) ?? null,
        };
        // Whitelisted summary fields only; the PSID itself is never stored.
        for (const k of SUMMARY_FIELDS) {
          if (k === "psid") continue;
          if (k === "metro") {
            row.metro = normalizeMetro(str(h.metro, 60));
            continue;
          }
          const v = h[k];
          row[k] = typeof v === "number" ? (Number.isFinite(v) ? v : null) : typeof v === "string" ? v.slice(0, 40) : null;
        }
        if (!row.rules_version) throw new Error("A house is missing its rules version.");
        return row;
      });
    } catch (err) {
      return NextResponse.json({ error: err instanceof Error ? err.message : "Bad houses" }, { status: 400 });
    }
    const { error } = await supabase.from("rl_house_snapshots").insert(rows);
    if (error) {
      console.error("[rent-ledger] snapshot save failed", error);
      return NextResponse.json({ error: "Could not save your houses." }, { status: 500 });
    }
    const profile = await loadProfile(user.id);
    if (profile) await fireLead(profile, stats);
    return NextResponse.json({ ok: true, saved: rows.length });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
