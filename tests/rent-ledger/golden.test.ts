import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { analyze } from "@/lib/rent-ledger";
import { classifyCredits } from "@/lib/rent-ledger/classify";
import { computeReport, type Report } from "@/lib/rent-ledger/metrics";
import { dayToISO, readZip } from "@/lib/rent-ledger/parse";

// Golden numbers from Caitlyn's real export (build spec, section 15). The
// fixture holds resident names, so it is gitignored and these tests skip
// when it isn't on disk. Tolerances: counts exact, money ±$2, rates ±0.2
// points.
const FIXTURE = join(process.cwd(), "tests/fixtures/lustra-2025-01-01_2026-10-20.zip");
const has = existsSync(FIXTURE);

const money = (actual: number | null | undefined, expected: number, tol = 2) =>
  expect(Math.abs((actual ?? NaN) - expected)).toBeLessThanOrEqual(tol);
const pct = (actual: number | null | undefined, expected: number) =>
  expect(Math.abs((actual ?? NaN) * 100 - expected)).toBeLessThanOrEqual(0.2);

describe.skipIf(!has)("golden: real export, Jan 2025 – Oct 2026", async () => {
  const a = analyze(has ? await readZip(readFileSync(FIXTURE)) : {});
  const ledger = a.ledger!;
  const all = has ? computeReport(ledger) : ({} as Report);
  const withOutliers = has ? computeReport(ledger, { includeOutliers: true }) : ({} as Report);
  const last12 = has ? computeReport(ledger, { range: { start: "2025-11", end: "2026-10" } }) : ({} as Report);
  const houseId = (name: string) => ledger.houses.find((h) => h.name.includes(name))!.id;

  it("ties payout and collections to earnings_table for every completed month", () => {
    expect(a.checks.find((c) => c.id === "ties")!.status).toBe("pass");
    expect(a.blocked).toBe(false);
  });

  it("finds the unallocated credits", () => {
    const got = Object.fromEntries(all.unallocatedCredits.filter((u) => Math.abs(u.amount) > 0.5).map((u) => [u.month, u.amount]));
    expect(Object.keys(got).sort()).toEqual(["2026-01", "2026-02", "2026-03", "2026-07", "2026-08", "2026-10"]);
    for (const m of ["2026-01", "2026-02", "2026-03", "2026-07"]) money(got[m], 250);
    for (const m of ["2026-08", "2026-10"]) money(got[m], 500);
  });

  it("classifies residents", () => {
    expect(all.groups.never).toBe(105);
    expect(all.portfolio.requests).toBe(205);
    expect(all.portfolio.accepted.n).toBe(100);
    pct(all.portfolio.accepted.value, 48.8);
    expect(all.portfolio.moveOuts).toBe(78);
    expect(all.portfolio.leftOwing.n).toBe(31);
    pct(all.portfolio.leftOwing.value, 39.7);
  });

  it("counts requests by house", () => {
    const expected: Array<[string, number, number]> = [
      ["Raven Springs", 85, 40], ["Candace", 48, 25], ["Glen Mora", 25, 9],
      ["Meadowchase", 22, 10], ["Chestnut Hill", 13, 9], ["Leland", 12, 7],
    ];
    for (const [name, req, acc] of expected) {
      const m = all.perHouse[houseId(name)];
      expect([name, m.requests, m.accepted.n]).toEqual([name, req, acc]);
    }
  });

  it("measures breakage and the outlier", () => {
    money(all.portfolio.breakageAll, 24557.74);
    expect(all.outliers.list).toHaveLength(1);
    money(all.outliers.list[0].balance, 7325.57);
    money(all.outliers.fence, 3065, 50);
    money(all.portfolio.breakage, 17232);
    money(all.portfolio.balance.avg, 574);
    money(all.portfolio.balance.median, 507);
    money(withOutliers.portfolio.balance.avg, 792);
    money(withOutliers.portfolio.balance.median, 536);
  });

  it("measures recovery after move-out", () => {
    expect(all.portfolio.recovery.residents.n).toBe(4);
    expect(all.portfolio.recovery.residents.d).toBe(35);
    money(all.portfolio.recovery.recovered, 1545);
    money(all.portfolio.recovery.owedAtExit, 26102);
  });

  it("totals collections and house-months", () => {
    money(all.portfolio.collected, 387092);
    expect(all.portfolio.houseMonths).toBe(78);
    expect(all.portfolio.fullHouseMonths).toBe(73);
  });

  it("reads the warning signs", () => {
    const sig = (id: string) => all.signals.find((s) => s.id === id)!;
    expect(sig("run2").withSignal.d).toBe(31);
    pct(sig("run2").withSignal.value, 71.0);
    pct(sig("run2").withoutSignal.value, 19.1);
    pct(sig("run2").base.value, 39.7);
    expect(sig("final_silence").withSignal.d).toBe(8);
    pct(sig("final_silence").withSignal.value, 87.5);
    expect(sig("partial").withSignal.d).toBe(60);
    pct(sig("partial").withSignal.value, 40.0);
    pct(sig("partial").withoutSignal.value, 38.9);
  });

  it("measures the runway", () => {
    expect(all.runway.firstLateToMoveOut).toBe(22);
    money(all.runway.balanceAtSecondLate, 115);
    expect(all.runway.daysAfterSecondLate).toBe(25.5);
  });

  it("correlates price with balance", () => {
    expect(Math.abs(withOutliers.pricing.correlation! - 0.09)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(all.pricing.correlationWithoutOutliers! - -0.02)).toBeLessThanOrEqual(0.01);
  });

  it("sorts waived dues, Nov 2025 – Oct 2026", () => {
    const by = Object.fromEntries(last12.credits.waivedDuesByBucket.map((b) => [b.bucket, b.amount]));
    money(last12.credits.waivedDues, 21699);
    money(by.booking_refund, 15760);
    money(by.move_out, 2183);
    money(by.duplicate_move_in + by.transfer + by.mid_stay, 3756);
  });

  it("counts stay rewards", () => {
    expect(all.stayRewards.residents).toBe(9);
    money(all.stayRewards.gross, 1492.57);
    money(all.stayRewards.net, 1440.86);
    expect([all.stayRewards.dayRange.min, all.stayRewards.dayRange.max]).toEqual([170, 203]);
    expect(last12.stayRewards.rewards).toBe(8);
    money(last12.stayRewards.gross, 1309);
    money(last12.stayRewards.net, 1257);
    money(last12.stayRewards.byHouse[houseId("Candace")], 889);
    money(last12.stayRewards.byHouse[houseId("Raven Springs")], 194);
    money(last12.stayRewards.byHouse[houseId("Meadowchase")], 174);
  });

  it("tracks Leland's ramp-up", () => {
    const occ = all.occupancy.find((o) => o.houseId === houseId("Leland"))!;
    const m = (month: string) => occ.months.find((x) => x.month === month)!;
    expect([m("2026-07").occupied, m("2026-07").rooms]).toEqual([3, 6]);
    expect([m("2026-08").occupied, m("2026-09").occupied]).toEqual([6, 6]);
    expect(occ.monthsToStabilize).toBe(2);
  });

  it("finds the destabilization events", () => {
    const candace = all.events.find((e) => e.houseId === houseId("Candace") && e.start === "2026-05")!;
    expect(candace).toBeDefined();
    expect(dayToISO(candace.startDay!)).toBe("2026-05-03");
    expect(candace.triggers.some((t) => t.startsWith("5 move-outs"))).toBe(true);
    const june = all.monthlyByHouse[houseId("Candace")].find((m) => m.month === "2026-06")!;
    money(june.gross, 2820);

    const raven = all.events.find((e) => e.houseId === houseId("Raven Springs") && e.start === "2025-08")!;
    expect(raven?.end).toBe("2025-12");
    for (const month of ["2025-09", "2025-10"]) {
      const r = all.monthlyByHouse[houseId("Raven Springs")].find((m) => m.month === month)!.padsplitRate!;
      expect(r).toBeGreaterThanOrEqual(0.525);
      expect(r).toBeLessThanOrEqual(0.565);
    }
  });

  it("has no credit lines it can't place", () => {
    expect(classifyCredits(ledger).every((c) => c.bucket)).toBe(true);
  });
});
