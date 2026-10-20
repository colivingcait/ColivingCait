import { createHash } from "node:crypto";
import { supabase } from "@/lib/supabase";
import { latestPerHouse, type SnapshotRow } from "./benchmarks";
import { RULES, RULES_VERSION } from "./rules";
import { median } from "./stats";

// Server-only helpers for the rent-ledger API routes. Never import from a
// client component: this pulls in the service-role Supabase client.

/** SHA-256 of the PSID with a server-side salt, so houses dedupe without storing the PSID. */
export function houseHash(psid: string): string {
  const salt = process.env.RENT_LEDGER_HASH_SALT;
  if (!salt) throw new Error("RENT_LEDGER_HASH_SALT is not set");
  return createHash("sha256").update(`${psid.trim()}|${salt}`).digest("hex");
}

export async function loadSnapshots(): Promise<SnapshotRow[]> {
  const { data, error } = await supabase.from("rl_house_snapshots").select("*");
  if (error) throw error;
  return latestPerHouse((data ?? []) as SnapshotRow[], RULES_VERSION);
}

/** Metro medians used for lead tags, only when the metro meets the benchmark minimum. */
export async function metroMedians(metro?: string | null) {
  if (!metro) return null;
  try {
    const rows = (await loadSnapshots()).filter(
      (r) => (r.metro ?? "").trim().toLowerCase() === metro.trim().toLowerCase(),
    );
    const users = new Set(rows.map((r) => r.user_id)).size;
    if (users < RULES.benchmarkMinUsers || rows.length < RULES.benchmarkMinHouses) return null;
    const col = (k: string) => rows.map((r) => Number(r[k])).filter(Number.isFinite);
    const turnover = rows
      .map((r) => Number(r.move_outs) / Number(r.months_covered))
      .filter(Number.isFinite);
    return {
      breakagePerHouseMonth: median(col("breakage_per_house_month")),
      turnover: median(turnover),
    };
  } catch (err) {
    console.error("[rent-ledger] metro medians unavailable", err);
    return null;
  }
}

/** Has this user contributed any houses to the benchmarks? */
export async function hasContributed(userId: string): Promise<boolean> {
  const { count } = await supabase
    .from("rl_house_snapshots")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  return (count ?? 0) > 0;
}

/**
 * Caitlyn's admin access. RENT_LEDGER_ADMIN_EMAILS is a comma-separated list;
 * without it, the site's own addresses are admins.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.RENT_LEDGER_ADMIN_EMAILS ?? "colivingcait@gmail.com,cv.sellshomes@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.trim().toLowerCase());
}

export const str = (v: unknown, max = 120) =>
  typeof v === "string" ? v.trim().slice(0, max) : undefined;

export const num = (v: unknown) => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
};

export const bool = (v: unknown) => (typeof v === "boolean" ? v : undefined);
