import { describe, expect, it } from "vitest";
import { analyze } from "@/lib/rent-ledger";
import { classifyCredits, findOutliers, residentSignals, type Resident } from "@/lib/rent-ledger/classify";
import { computeReport } from "@/lib/rent-ledger/metrics";
import { parseDay, parseMoney, dayToISO, sortFiles } from "@/lib/rent-ledger/parse";
import { buildExport, steadyResident, type B, type C } from "./helpers";

function scenario() {
  const billed: B[] = [];
  const collected: C[] = [];
  const add = (x: { billed: B[]; collected: C[] }) => {
    billed.push(...x.billed);
    collected.push(...x.collected);
  };

  // Anchor: living there from the export start through May.
  add(steadyResident("A", "2025-01-01", 20));

  // Declined booking: charged, refunded in full, payment reversed.
  billed.push({ id: "D-0", day: "2025-02-10", mid: "D", amount: -200, type: "fee", reason: "membership_dues" });
  collected.push({ day: "2025-02-10", bill: "D-0", mid: "D", gross: 200 });
  billed.push({ id: "D-r", day: "2025-02-12", mid: "D", amount: 200, type: "concession", reason: "waiving_membership_dues" });
  collected.push({ day: "2025-02-12", bill: "D-0", mid: "D", gross: -200 });

  // Duplicate move-in charge, waived the next day.
  add(steadyResident("U", "2025-03-03", 6));
  billed.push({ id: "U-dup", day: "2025-03-03", mid: "U", amount: -200, type: "fee", reason: "membership_dues" });
  billed.push({ id: "U-w", day: "2025-03-04", mid: "U", amount: 200, type: "concession", reason: "waiving_membership_dues" });

  // Transfer: three weeks at 1001, then four at 2002 with a waived week.
  add(steadyResident("T", "2025-02-03", 3));
  add(steadyResident("T", "2025-02-24", 4, 200, "2002"));
  billed.push({ id: "T-w", day: "2025-03-10", mid: "T", amount: 200, type: "concession", reason: "waiving_membership_dues", pid: "2002" });

  // Stay reward with a partial claw-back.
  add(steadyResident("R", "2025-01-06", 19));
  billed.push({ id: "R-sr", day: "2025-04-07", mid: "R", amount: 200, type: "concession", reason: "stay_reward" });
  billed.push({ id: "R-sra", day: "2025-04-14", mid: "R", amount: -50, type: "fee", reason: "stay_reward_adjustment" });
  collected.push({ day: "2025-04-14", bill: "R-sra", mid: "R", gross: 50 });

  // Leaves owing after a three-week late-fee run.
  add(steadyResident("L", "2025-02-03", 4));
  for (const [i, day] of ["2025-03-03", "2025-03-10", "2025-03-17"].entries())
    billed.push({ id: `L-u${i}`, day, mid: "L", amount: -200, type: "fee", reason: "membership_dues" });
  for (const [i, day] of ["2025-03-10", "2025-03-17", "2025-03-24"].entries())
    billed.push({ id: `L-f${i}`, day, mid: "L", amount: -25, type: "fine", reason: "overdue_balance" });

  // Reversal on collected: paid, reversed, paid again.
  billed.push({ id: "V-x", day: "2025-04-07", mid: "V", amount: -200, type: "fee", reason: "membership_dues" });
  add(steadyResident("V", "2025-04-14", 5));
  collected.push({ day: "2025-04-07", bill: "V-x", mid: "V", gross: 200 });
  collected.push({ day: "2025-04-09", bill: "V-x", mid: "V", gross: -200 });
  collected.push({ day: "2025-04-11", bill: "V-x", mid: "V", gross: 200 });

  return analyze(buildExport(billed, collected));
}

const find = (a: ReturnType<typeof scenario>, key: string) =>
  a.ledger!.residents.find((r) => r.key === key)!;

describe("parsing", () => {
  it("reads common date formats", () => {
    expect(dayToISO(parseDay("2025-03-04 10:15:00"))).toBe("2025-03-04");
    expect(dayToISO(parseDay("2025-03-04T23:59:59Z"))).toBe("2025-03-04");
    expect(dayToISO(parseDay("3/4/2025"))).toBe("2025-03-04");
    expect(dayToISO(parseDay("3/4/25 8:00 AM"))).toBe("2025-03-04");
    expect(dayToISO(parseDay("Mar 4, 2025"))).toBe("2025-03-04");
    expect(dayToISO(parseDay("March 2025"))).toBe("2025-03-01");
    expect(dayToISO(parseDay("2025-03"))).toBe("2025-03-01");
    expect(parseDay("")).toBeNaN();
  });

  it("reads money", () => {
    expect(parseMoney("$1,234.50")).toBe(1234.5);
    expect(parseMoney("(25.00)")).toBe(-25);
    expect(parseMoney("-$200")).toBe(-200);
    expect(parseMoney("")).toBe(0);
  });

  it("trims headers and sorts files by their columns", () => {
    const raw = buildExport(steadyResident("A", "2025-01-01", 3).billed, steadyResident("A", "2025-01-01", 3).collected);
    const sorted = sortFiles([
      { name: "x/billed.csv", text: raw.billed! },
      { name: "a.csv", text: raw.collected! },
      { name: "b.csv", text: raw.summary! },
      { name: "c.csv", text: raw.earnings! },
    ]);
    expect(Object.keys(sorted).sort()).toEqual(["billed", "collected", "earnings", "summary"]);
    expect(analyze(sorted).blocked).toBe(false);
  });

  it("stops when a file is missing", () => {
    const raw = buildExport(steadyResident("A", "2025-01-01", 3).billed, steadyResident("A", "2025-01-01", 3).collected);
    const a = analyze({ ...raw, earnings: undefined });
    expect(a.blocked).toBe(true);
    expect(a.checks[0].detail).toMatch(/earnings_table\.csv is missing/);
  });
});

describe("classification rules", () => {
  const a = scenario();
  const credits = classifyCredits(a.ledger!);
  const bucketOf = (billId: string) => credits.find((c) => c.row.billId === billId)?.bucket;

  it("passes the blocking checks", () => {
    expect(a.checks.filter((c) => c.blocking).map((c) => c.status)).toEqual(["pass", "pass", "pass"]);
  });

  it("reads a declined booking as never moved in", () => {
    const d = find(a, "1001|D");
    expect(d.group).toBe("never");
    expect(d.isRequest).toBe(true);
    expect(d.netCollected).toBe(0);
    expect(bucketOf("D-r")).toBe("booking_refund");
  });

  it("reads a waiver within 3 days of the first bill as a duplicate move-in charge", () => {
    expect(find(a, "1001|U").group).toBe("movedOut");
    expect(bucketOf("U-w")).toBe("duplicate_move_in");
    expect(find(a, "1001|U").balance).toBeCloseTo(0);
  });

  it("splits a transfer into two residents and reads its waiver as a transfer", () => {
    expect(find(a, "1001|T").multiProperty).toBe(true);
    expect(find(a, "2002|T").multiProperty).toBe(true);
    expect(bucketOf("T-w")).toBe("transfer");
    expect(a.checks.find((c) => c.id === "transfers")!.status).toBe("warn");
  });

  it("nets a stay reward against its adjustment", () => {
    const r = computeReport(a.ledger!);
    expect(r.stayRewards.residents).toBe(1);
    expect(r.stayRewards.gross).toBe(200);
    expect(r.stayRewards.net).toBe(150);
  });

  it("flags a resident who leaves owing after a 3-week late-fee run", () => {
    const l = find(a, "1001|L");
    expect(l.group).toBe("movedOut");
    expect(l.balance).toBeCloseTo(675);
    const s = residentSignals(l, a.ledger!.paidByBill);
    expect(s.longestRun).toBe(3);
    expect(s.finalSilence).toBe(28);
    const r = computeReport(a.ledger!);
    expect(r.portfolio.leftOwing.n).toBe(1);
    expect(r.portfolio.breakage).toBeCloseTo(675);
    const run2 = r.signals.find((x) => x.id === "run2")!;
    expect(run2.withSignal.n).toBe(1);
    expect(run2.withSignal.d).toBe(1);
  });

  it("nets a reversal on collected", () => {
    expect(a.ledger!.paidByBill.get("V-x")!.paid).toBe(200);
    expect(find(a, "1001|V").balance).toBeCloseTo(0);
  });

  it("counts residents already there at the export start out of requests", () => {
    expect(find(a, "1001|A").alreadyLiving).toBe(true);
    expect(find(a, "1001|A").isRequest).toBe(false);
    expect(find(a, "1001|A").group).toBe("living");
  });
});

describe("checks", () => {
  it("fails when payouts don't tie to earnings_table", () => {
    const x = steadyResident("A", "2025-01-01", 12);
    const a = analyze(buildExport(x.billed, x.collected, { tamperPayout: 40 }));
    expect(a.blocked).toBe(true);
    expect(a.checks.find((c) => c.id === "ties")!.status).toBe("fail");
  });
});

describe("outliers", () => {
  const owing = (key: string, balance: number) =>
    ({ key, group: "movedOut", balance }) as unknown as Resident;

  it("needs at least 8 residents who left owing", () => {
    const o = findOutliers([100, 200, 300, 5000].map((b, i) => owing(`r${i}`, b)));
    expect(o.applied).toBe(false);
    expect(o.keys.size).toBe(0);
  });

  it("uses the Tukey far-out fence", () => {
    const balances = [100, 150, 200, 250, 300, 350, 400, 450, 9000];
    const o = findOutliers(balances.map((b, i) => owing(`r${i}`, b)));
    // Q1 200, Q3 400, fence 400 + 3 * 200 = 1000.
    expect(o.fence).toBe(1000);
    expect([...o.keys]).toEqual(["r8"]);
  });
});
