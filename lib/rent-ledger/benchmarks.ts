import { RULES, rulesMajor } from "./rules";
import { mean, quantile } from "./stats";

// Benchmark aggregation (build spec section 11). Pure: the API route loads
// snapshot rows with the service-role key and hands them here; only the
// aggregates this returns ever leave the server. A group only shows numbers
// once it has 5+ operators and 5+ houses, so no one host can be picked out.

export interface SnapshotRow {
  user_id: string;
  house_hash: string;
  city: string | null;
  state: string | null;
  zip: string | null;
  metro: string | null;
  rooms: number | null;
  price_band: string | null;
  rules_version: string;
  created_at: string;
  [metric: string]: unknown;
}

export type MetricKind = "money" | "pct" | "days" | "count" | "months";

/** `better`: which direction is good for the host. */
export const BENCH_METRICS: Array<{ key: string; label: string; kind: MetricKind; better: "higher" | "lower" }> = [
  { key: "collected_per_house_month", label: "Collected per house-month", kind: "money", better: "higher" },
  { key: "true_room_rate", label: "True room rate (host earnings per room-month)", kind: "money", better: "higher" },
  { key: "collection_rate", label: "Collection rate", kind: "pct", better: "higher" },
  { key: "breakage_rate", label: "Breakage rate", kind: "pct", better: "lower" },
  { key: "breakage_per_house_month", label: "Breakage per house-month", kind: "money", better: "lower" },
  { key: "left_owing_rate", label: "Move-outs who left owing", kind: "pct", better: "lower" },
  { key: "median_balance", label: "Median balance left", kind: "money", better: "lower" },
  { key: "occupancy_avg", label: "Average occupancy", kind: "pct", better: "higher" },
  { key: "avg_stay_days", label: "Average stay", kind: "days", better: "higher" },
  { key: "short_pct", label: "Short stays (under 30 days)", kind: "pct", better: "lower" },
  { key: "long_pct", label: "Long stays (6+ months)", kind: "pct", better: "higher" },
  { key: "acceptance_rate", label: "Booking requests accepted", kind: "pct", better: "higher" },
  { key: "months_to_stabilize", label: "Months to stabilize", kind: "months", better: "lower" },
  { key: "events_per_year", label: "Destabilization events per year", kind: "count", better: "lower" },
];

export interface MetricStats {
  mean: number | null;
  median: number | null;
  q1: number | null;
  q3: number | null;
  n: number;
}

export interface BenchmarkGroup {
  label: string;
  users: number;
  houses: number;
  enough: boolean;
  metrics: Record<string, MetricStats>;
}

export interface MetroCount {
  metro: string;
  users: number;
  houses: number;
  enough: boolean;
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

const enoughFor = (users: number, houses: number) =>
  users >= RULES.benchmarkMinUsers && houses >= RULES.benchmarkMinHouses;

export function aggregateGroup(label: string, rows: SnapshotRow[]): BenchmarkGroup {
  const users = new Set(rows.map((r) => r.user_id)).size;
  const houses = rows.length;
  const enough = enoughFor(users, houses);
  const metrics: Record<string, MetricStats> = {};
  if (enough) {
    for (const m of BENCH_METRICS) {
      const vals = rows.map((r) => r[m.key]).filter((v) => v != null).map(Number).filter(Number.isFinite);
      metrics[m.key] = {
        mean: mean(vals),
        median: quantile(vals, 0.5),
        q1: quantile(vals, 0.25),
        q3: quantile(vals, 0.75),
        n: vals.length,
      };
    }
  }
  return { label, users, houses, enough, metrics };
}

const same = (a: string | null | undefined, b: string) => (a ?? "").trim().toLowerCase() === b.trim().toLowerCase();

/** A metro's group, or every house when `metro` is null. */
export function benchmarkGroup(rows: SnapshotRow[], metro: string | null): BenchmarkGroup {
  if (!metro) return aggregateGroup("All metros", rows);
  return aggregateGroup(metro, rows.filter((r) => same(r.metro, metro)));
}

/** Which metros have houses, and which have enough to show. */
export function metroCounts(rows: SnapshotRow[]): MetroCount[] {
  const by = new Map<string, SnapshotRow[]>();
  for (const r of rows) {
    if (!r.metro) continue;
    const list = by.get(r.metro) ?? [];
    list.push(r);
    by.set(r.metro, list);
  }
  return [...by]
    .map(([metro, list]) => {
      const users = new Set(list.map((r) => r.user_id)).size;
      return { metro, users, houses: list.length, enough: enoughFor(users, list.length) };
    })
    .sort((a, b) => b.houses - a.houses || a.metro.localeCompare(b.metro));
}

export type Verdict = "better" | "average" | "worse";

/**
 * Better / average / worse against a group: inside the middle half (25th to
 * 75th percentile) is average; past it on the good side is better.
 */
export function verdict(
  value: number | null | undefined,
  stats: MetricStats | undefined,
  better: "higher" | "lower",
): Verdict | null {
  if (value == null || !Number.isFinite(value) || !stats || stats.q1 == null || stats.q3 == null) return null;
  if (value >= stats.q1 && value <= stats.q3) return "average";
  const high = value > stats.q3;
  return high === (better === "higher") ? "better" : "worse";
}
