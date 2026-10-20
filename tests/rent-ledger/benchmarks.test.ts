import { describe, expect, it } from "vitest";
import { benchmarkGroup, metroCounts, verdict, type SnapshotRow } from "@/lib/rent-ledger/benchmarks";
import { normalizeMetro } from "@/lib/rent-ledger/metros";

const row = (user: string, house: string, metro: string, collection_rate: number): SnapshotRow => ({
  user_id: user,
  house_hash: house,
  city: null,
  state: null,
  zip: null,
  metro,
  rooms: 6,
  price_band: null,
  rules_version: "2026.10.1",
  created_at: "2026-10-20",
  collection_rate,
});

describe("benchmarks", () => {
  const atl = [1, 2, 3, 4, 5].map((i) => row(`u${i}`, `a${i}`, "Atlanta", 0.9 + i / 100));
  const dal = [1, 2, 3].map((i) => row(`d${i}`, `d${i}`, "Dallas–Fort Worth", 0.8));

  it("shows a metro only with 5+ operators and 5+ houses", () => {
    expect(benchmarkGroup([...atl, ...dal], "Atlanta").enough).toBe(true);
    const d = benchmarkGroup([...atl, ...dal], "Dallas–Fort Worth");
    expect(d.enough).toBe(false);
    expect(d.metrics).toEqual({});
    expect(d.houses).toBe(3);
  });

  it("combines every metro for All metros", () => {
    const all = benchmarkGroup([...atl, ...dal], null);
    expect(all.houses).toBe(8);
    expect(all.metrics.collection_rate.n).toBe(8);
  });

  it("counts houses per metro", () => {
    expect(metroCounts([...atl, ...dal]).map((m) => [m.metro, m.houses, m.enough])).toEqual([
      ["Atlanta", 5, true],
      ["Dallas–Fort Worth", 3, false],
    ]);
  });

  it("calls better, average or worse against the middle half", () => {
    const stats = { mean: 0.5, median: 0.5, q1: 0.4, q3: 0.6, n: 10 };
    expect(verdict(0.7, stats, "higher")).toBe("better");
    expect(verdict(0.5, stats, "higher")).toBe("average");
    expect(verdict(0.3, stats, "higher")).toBe("worse");
    expect(verdict(0.7, stats, "lower")).toBe("worse");
    expect(verdict(null, stats, "lower")).toBeNull();
  });

  it("normalizes PadSplit market names to metros", () => {
    expect(normalizeMetro("Atlanta")).toBe("Atlanta");
    expect(normalizeMetro("atlanta, ga")).toBe("Atlanta");
    expect(normalizeMetro("Dallas")).toBe("Dallas–Fort Worth");
    expect(normalizeMetro("Fort Worth")).toBe("Dallas–Fort Worth");
    expect(normalizeMetro("houston")).toBe("Houston");
    expect(normalizeMetro("")).toBeNull();
  });
});
