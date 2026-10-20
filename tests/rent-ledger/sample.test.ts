import { describe, expect, it } from "vitest";
import { analyze } from "@/lib/rent-ledger";
import { computeReport } from "@/lib/rent-ledger/metrics";
import { readZip } from "@/lib/rent-ledger/parse";
import { buildHouseSummaries } from "@/lib/rent-ledger/summary";
import { buildSampleZip } from "@/scripts/make-sample-export";

// The fake sample export behind "Try with sample data" must always produce
// a report: every blocking check passes and the numbers are sane.
describe("sample export", async () => {
  const raw = await readZip(await buildSampleZip());
  const a = analyze(raw);
  const report = computeReport(a.ledger!);

  it("passes every blocking check", () => {
    expect(a.blocked).toBe(false);
    expect(a.checks.filter((c) => c.blocking).every((c) => c.status === "pass")).toBe(true);
  });

  it("is deterministic", async () => {
    const again = computeReport(analyze(await readZip(await buildSampleZip())).ledger!);
    expect(again.portfolio.collected).toBe(report.portfolio.collected);
    expect(again.portfolio.breakage).toBe(report.portfolio.breakage);
  });

  it("has every resident group, an outlier and a ramp-up house", () => {
    expect(report.groups.never).toBeGreaterThan(0);
    expect(report.groups.movedOut).toBeGreaterThan(0);
    expect(report.groups.living).toBeGreaterThan(0);
    expect(report.groups.unclassified).toBe(0);
    expect(report.outliers.list).toHaveLength(1);
    expect(report.occupancy.some((o) => !o.startedBeforeExport && o.monthsToStabilize != null)).toBe(true);
  });

  it("keeps outliers out of breakage unless asked", () => {
    const withOutliers = computeReport(a.ledger!, { includeOutliers: true });
    expect(withOutliers.portfolio.breakage).toBeGreaterThan(report.portfolio.breakage);
    expect(report.portfolio.breakageAll).toBeCloseTo(withOutliers.portfolio.breakage);
  });

  it("builds anonymous house summaries with no names or IDs beyond the PSID", () => {
    const s = buildHouseSummaries(a.ledger!, report, { city: "Decatur", state: "GA" });
    expect(s).toHaveLength(4);
    const text = JSON.stringify(s);
    for (const r of a.ledger!.residents.slice(0, 20)) expect(text).not.toContain(r.name);
    expect(text).not.toMatch(/Magnolia|Willow|Pecan|Juniper/);
  });
});
