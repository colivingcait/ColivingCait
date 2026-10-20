import { RULES, rulesMajor } from "./rules";
import { quantile } from "./stats";

// Benchmark aggregation (build spec section 11). Pure: the API route loads
// snapshot rows with the service-role key and hands them here; only the
// aggregates this returns ever leave the server.

export interface SnapshotRow {
  user_id: string;
  house_hash: string;
  city: string | null;
  state: string | null;
  zip: string | null;
  rooms: number | null;
  price_band: string | null;
  rules_version: string;
  created_at: string;
  [metric: string]: unknown;
}

export const BENCH_METRICS: Array<{ key: string; label: string; kind: "money" | "pct" | "days" | "count" | "months" }> = [
  { key: "collected_per_house_month", label: "Collected per house-month", kind: "money" },
  { key: "collection_rate", label: "Collection rate", kind: "pct" },
  { key: "breakage_rate", label: "Breakage rate", kind: "pct" },
  { key: "breakage_per_house_month", label: "Breakage per house-month", kind: "money" },
  { key: "left_owing_rate", label: "Move-outs who left owing", kind: "pct" },
  { key: "median_balance", label: "Median balance left", kind: "money" },
  { key: "avg_stay_days", label: "Average stay", kind: "days" },
  { key: "short_pct", label: "Short stays (under 30 days)", kind: "pct" },
  { key: "long_pct", label: "Long stays (6+ months)", kind: "pct" },
  { key: "acceptance_rate", label: "Booking requests accepted", kind: "pct" },
  { key: "occupancy_avg", label: "Average occupancy", kind: "pct" },
  { key: "true_room_rate", label: "True room rate (host earnings per room-month)", kind: "money" },
  { key: "months_to_stabilize", label: "Months to stabilize", kind: "months" },
  { key: "events_per_year", label: "Destabilization events per year", kind: "count" },
];

export interface MetricStats {
  median: number | null;
  q1: number | null;
  q3: number | null;
  n: number;
}

export interface BenchmarkGroup {
  id: "city" | "zip" | "price_band" | "rooms";
  label: string;
  users: number;
  houses: number;
  enough: boolean;
  metrics: Record<string, MetricStats>;
}

/** One active summary per house: the newest snapshot, same rules major only. */
export function latestPerHouse(rows: SnapshotRow[], rulesVersion: string): SnapshotRow[] {
  const major = rulesMajor(rulesVersion);
  const best = new Map<string, SnapshotRow>();
  for (const r of rows) {
    if (rulesMajor(r.rules_version) !== major) continue;
    const cur = best.get(r.house_hash);
    if (!cur || r.created_at > cur.created_at) best.set(r.house_hash, r);
  }
  return [...best.values()];
}

const norm = (s: string | null | undefined) => (s ?? "").trim().toLowerCase();

export function aggregateGroup(
  id: BenchmarkGroup["id"],
  label: string,
  rows: SnapshotRow[],
): BenchmarkGroup {
  const users = new Set(rows.map((r) => r.user_id)).size;
  const houses = rows.length;
  const enough = users >= RULES.benchmarkMinUsers && houses >= RULES.benchmarkMinHouses;
  const metrics: Record<string, MetricStats> = {};
  if (enough) {
    for (const m of BENCH_METRICS) {
      const vals = rows.map((r) => Number(r[m.key])).filter(Number.isFinite);
      metrics[m.key] = {
        median: quantile(vals, 0.5),
        q1: quantile(vals, 0.25),
        q3: quantile(vals, 0.75),
        n: vals.length,
      };
    }
  }
  return { id, label, users, houses, enough, metrics };
}

export function benchmarkGroups(
  rows: SnapshotRow[],
  q: { city?: string; state?: string; zip?: string; priceBand?: string; rooms?: number },
): BenchmarkGroup[] {
  const out: BenchmarkGroup[] = [];
  if (q.city) {
    out.push(
      aggregateGroup(
        "city",
        `${q.city}${q.state ? `, ${q.state}` : ""}`,
        rows.filter((r) => norm(r.city) === norm(q.city) && (!q.state || norm(r.state) === norm(q.state))),
      ),
    );
  }
  if (q.zip) out.push(aggregateGroup("zip", `Zip ${q.zip}`, rows.filter((r) => norm(r.zip) === norm(q.zip))));
  if (q.priceBand)
    out.push(aggregateGroup("price_band", `${q.priceBand} a week`, rows.filter((r) => r.price_band === q.priceBand)));
  if (q.rooms)
    out.push(aggregateGroup("rooms", `${q.rooms}-room houses`, rows.filter((r) => Number(r.rooms) === q.rooms)));
  return out;
}
