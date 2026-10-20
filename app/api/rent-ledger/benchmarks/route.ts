import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { benchmarkGroup, metroCounts } from "@/lib/rent-ledger/benchmarks";
import { hasContributed, loadSnapshots, str } from "@/lib/rent-ledger/server";

// GET /api/rent-ledger/benchmarks?metro=Atlanta   one metro
// GET /api/rent-ledger/benchmarks?scope=all       every metro together
// GET /api/rent-ledger/benchmarks?list=metros     metros with house counts
//
// Aggregates only (average, median and quartiles per metric), never rows or
// addresses. A group shows numbers only with 5+ operators and 5+ houses.
// Signed-in hosts whose houses are in the benchmark only.
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!(await hasContributed(user.id))) {
    return NextResponse.json({ error: "Your houses are still being added. Refresh in a moment." }, { status: 403 });
  }

  const p = req.nextUrl.searchParams;
  try {
    const rows = await loadSnapshots();
    if (p.get("list") === "metros") return NextResponse.json({ metros: metroCounts(rows) });
    const metro = p.get("scope") === "all" ? null : str(p.get("metro"), 60) ?? null;
    return NextResponse.json({ group: benchmarkGroup(rows, metro) });
  } catch (err) {
    console.error("[rent-ledger] benchmarks failed", err);
    return NextResponse.json({ error: "Benchmarks are unavailable right now." }, { status: 500 });
  }
}
