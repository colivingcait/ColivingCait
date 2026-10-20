import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { num, str } from "@/lib/rent-ledger/server";

// "Something looks off" on the classification review. Accepts counts,
// check results, unrecognized line items, the export date range and the
// house count, rebuilt field by field so nothing else (no file, no
// resident row) can ride along.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const counts: Record<string, number> = {};
  for (const k of ["never", "movedOut", "living", "unclassified"]) {
    counts[k] = num((body.counts as Record<string, unknown> | undefined)?.[k]) ?? 0;
  }
  const checks = (Array.isArray(body.checks) ? body.checks : []).slice(0, 20).map((c: Record<string, unknown>) => ({
    id: str(c?.id, 40),
    status: str(c?.status, 10),
  }));
  const unrecognized = (Array.isArray(body.unrecognized) ? body.unrecognized : [])
    .slice(0, 50)
    .map((u: Record<string, unknown>) => ({
      reason: str(u?.reason, 80),
      type: str(u?.type, 20),
      count: num(u?.count) ?? 0,
      amount: num(u?.amount) ?? 0,
    }));
  const range = (body.range ?? {}) as Record<string, unknown>;
  const payload = {
    counts,
    checks,
    unrecognized,
    range: { start: str(range.start, 10), end: str(range.end, 10) },
    houses: num(body.houses) ?? 0,
    rulesVersion: str(body.rulesVersion, 20),
  };

  const { error } = await supabase.from("rl_feedback").insert({ payload });
  if (error) console.error("[rent-ledger] feedback save failed", error, payload);
  return NextResponse.json({ ok: true });
}
