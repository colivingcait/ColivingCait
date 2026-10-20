import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/helpers";
import { supabase } from "@/lib/supabase";
import { benchmarkGroups } from "@/lib/rent-ledger/benchmarks";
import { loadSnapshots, num, str } from "@/lib/rent-ledger/server";

// GET /api/rent-ledger/benchmarks?city=&state=&zip=&priceBand=&rooms=
// Aggregates only (median and quartiles per metric), never rows. A group
// shows only with 5+ distinct users and 5+ houses. Signed-in users who
// have opted in only.
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { count } = await supabase
    .from("rl_house_snapshots")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);
  if (!count) return NextResponse.json({ error: "Add your houses to the benchmark first." }, { status: 403 });

  const p = req.nextUrl.searchParams;
  try {
    const rows = await loadSnapshots();
    const groups = benchmarkGroups(rows, {
      city: str(p.get("city"), 80),
      state: str(p.get("state"), 40),
      zip: str(p.get("zip"), 10),
      priceBand: str(p.get("priceBand"), 20),
      rooms: num(p.get("rooms")),
    });
    return NextResponse.json({ groups });
  } catch (err) {
    console.error("[rent-ledger] benchmarks failed", err);
    return NextResponse.json({ error: "Benchmarks are unavailable right now." }, { status: 500 });
  }
}
