import type { ParseResult } from "./parse";
import { FILE_LABELS, dayToISO, dayToMonth, monthsBetween, monthLabel } from "./parse";
import { findOutliers, isDues, type Ledger } from "./classify";
import { KNOWN_REASONS, RULES } from "./rules";
import { sum } from "./stats";

// Section 9: checks that run before any report is shown. A failing blocking
// check stops the report; warnings are shown and the report continues.

export type CheckStatus = "pass" | "fail" | "warn";

export interface CheckResult {
  id: string;
  label: string;
  blocking: boolean;
  status: CheckStatus;
  detail: string;
  items?: string[];
}

export interface UnrecognizedItem {
  reason: string;
  type: string;
  count: number;
  amount: number;
}

const money = (n: number) =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Check 1 from the parse step alone (used when the files can't be read). */
export function fileCheck(parsed: ParseResult): CheckResult {
  return {
    id: "files",
    label: "All four files present and readable",
    blocking: true,
    status: parsed.errors.length ? "fail" : "pass",
    detail: parsed.errors.length
      ? parsed.errors.join(" ")
      : `Found ${Object.values(FILE_LABELS).join(", ")}.`,
    items: parsed.errors,
  };
}

export function unrecognizedItems(ledger: Ledger): UnrecognizedItem[] {
  const m = new Map<string, UnrecognizedItem>();
  for (const b of ledger.data.billed) {
    if (KNOWN_REASONS.has(b.reason)) continue;
    const k = `${b.reason}|${b.type}`;
    const e = m.get(k) ?? { reason: b.reason || "(blank)", type: b.type, count: 0, amount: 0 };
    e.count++;
    e.amount += b.amount;
    m.set(k, e);
  }
  return [...m.values()].sort((a, b) => b.count - a.count);
}

export function runChecks(ledger: Ledger, parsed: ParseResult): CheckResult[] {
  const out: CheckResult[] = [fileCheck(parsed)];
  const { summary, earnings } = ledger.data;

  // 2. Payout and collections tie to PadSplit's own monthly rollup.
  const misses: string[] = [];
  const done = earnings.filter((e) => !e.inFlight);
  for (const e of done) {
    const rows = summary.filter((s) => s.earningsMonth === e.month);
    const adj = sum(rows.map((s) => s.adjustments));
    const unallocated = e.totalAdjustments - adj;
    const payout = sum(rows.map((s) => s.totalPayout)) + unallocated;
    const gross = sum(rows.map((s) => s.gross));
    if (Math.abs(payout - e.totalPayout) > RULES.tieTolerance)
      misses.push(`${monthLabel(e.month)} payout: houses ${money(payout)} vs PadSplit ${money(e.totalPayout)}`);
    if (Math.abs(gross - e.totalCollections) > RULES.tieTolerance)
      misses.push(`${monthLabel(e.month)} collections: houses ${money(gross)} vs PadSplit ${money(e.totalCollections)}`);
  }
  out.push({
    id: "ties",
    label: "Payout and collections tie to PadSplit's monthly totals",
    blocking: true,
    status: misses.length ? "fail" : "pass",
    detail: misses.length
      ? `${misses.length} month totals don't match earnings_table.csv within $${RULES.tieTolerance}. The files may be from different exports.`
      : `Every completed month (${done.length}) matches within $${RULES.tieTolerance}.`,
    items: misses,
  });

  // 3. Residents we couldn't classify.
  const unclassified = ledger.residents.filter((r) => r.group === "unclassified");
  const share = ledger.residents.length ? unclassified.length / ledger.residents.length : 0;
  out.push({
    id: "unclassified",
    label: `No more than ${RULES.maxUnclassifiedShare * 100}% of residents unclassified`,
    blocking: true,
    status: share > RULES.maxUnclassifiedShare ? "fail" : unclassified.length ? "warn" : "pass",
    detail: `${unclassified.length} of ${ledger.residents.length} residents (${(share * 100).toFixed(1)}%) don't fit a rule.`,
    items: unclassified.map((r) => `${r.name} (member ${r.memberId || "?"}): ${r.unclassifiedReason}`),
  });

  // 4. Unrecognized line items.
  const unknown = unrecognizedItems(ledger);
  out.push({
    id: "unrecognized",
    label: "Every line item is one we know how to read",
    blocking: false,
    status: unknown.length ? "warn" : "pass",
    detail: unknown.length
      ? `${unknown.length} unrecognized line items. They count toward balances but aren't sorted into a credit or fee bucket.`
      : "All Transaction Reason values are recognized.",
    items: unknown.map((u) => `${u.reason} (${u.type}): ${u.count} rows, ${money(u.amount)}`),
  });

  // 5. Transfers.
  const byMember = new Map<string, Set<string>>();
  for (const r of ledger.residents) {
    if (!r.memberId) continue;
    const s = byMember.get(r.memberId) ?? new Set<string>();
    s.add(r.houseId);
    byMember.set(r.memberId, s);
  }
  const transfers = [...byMember].filter(([, s]) => s.size >= 2);
  out.push({
    id: "transfers",
    label: "Members billed at two or more houses (transfers)",
    blocking: false,
    status: transfers.length ? "warn" : "pass",
    detail: transfers.length
      ? `${transfers.length} members appear at more than one house. Each house counts them as a separate resident.`
      : "No transfers between houses.",
    items: transfers.map(
      ([m, s]) => `Member ${m}: ${[...s].map((id) => ledger.houseById.get(id)?.name ?? id).join(", ")}`,
    ),
  });

  // 6. Unusual bills.
  const odd: string[] = [];
  for (const r of ledger.residents) {
    const dues = r.bills.filter(isDues);
    for (const b of r.bills) {
      if (Math.abs(b.amount) > RULES.bigBill)
        odd.push(`${r.name}: ${b.reason} ${money(b.amount)} on ${dayToISO(b.day)}`);
    }
    for (const b of dues.slice(1)) {
      if (-b.amount < RULES.smallDuesBill)
        odd.push(`${r.name}: weekly dues of ${money(-b.amount)} on ${dayToISO(b.day)}`);
    }
  }
  out.push({
    id: "odd_bills",
    label: `No single bill over $${RULES.bigBill.toLocaleString()} or dues bill under $${RULES.smallDuesBill}`,
    blocking: false,
    status: odd.length ? "warn" : "pass",
    detail: odd.length ? `${odd.length} bills look unusual. Worth a glance.` : "No unusual bills.",
    items: odd,
  });

  // 7. Small samples.
  const smallHouses: string[] = [];
  for (const h of ledger.houses) {
    const outs = ledger.residents.filter((r) => r.houseId === h.id && r.group === "movedOut").length;
    if (outs < RULES.smallSampleMoveOuts) smallHouses.push(`${h.name}: ${outs} move-outs`);
  }
  out.push({
    id: "small_samples",
    label: "Enough move-outs for per-house rates",
    blocking: false,
    status: smallHouses.length ? "warn" : "pass",
    detail: smallHouses.length
      ? `Rates for these houses use fewer than ${RULES.smallSampleMoveOuts} move-outs and are labeled "small sample".`
      : "Every house has enough move-outs.",
    items: smallHouses,
  });

  // 8. Outliers.
  const outliers = findOutliers(ledger.residents);
  const outlierRows = ledger.residents.filter((r) => outliers.keys.has(r.key));
  out.push({
    id: "outliers",
    label: "Balance outliers",
    blocking: false,
    status: outliers.applied ? (outlierRows.length ? "warn" : "pass") : "warn",
    detail: !outliers.applied
      ? `Only ${outliers.sample} residents left owing; the outlier rule needs at least ${RULES.outlierMinSample}, so none were removed.`
      : outlierRows.length
        ? `${outlierRows.length} balance${outlierRows.length > 1 ? "s" : ""} above the fence of ${money(outliers.fence!)} ${outlierRows.length > 1 ? "are" : "is"} left out of averages, medians, rates and correlations.`
        : `No balance above the fence of ${money(outliers.fence!)}.`,
    items: outlierRows.map((r) => `${r.name}: ${money(r.balance)}`),
  });

  // 9. Coverage.
  const startIso = dayToISO(ledger.exportStart);
  const covered = monthsBetween(dayToMonth(ledger.exportStart), dayToMonth(ledger.exportEnd)) + 1;
  const coverage: string[] = [];
  if (!startIso.endsWith("-01")) coverage.push(`The export starts on ${startIso}, not the first of a month.`);
  if (covered < RULES.minMonthsCovered) coverage.push(`It covers ${covered} months; ${RULES.minMonthsCovered}+ give steadier numbers.`);
  if (ledger.unmatchedProperties.length)
    coverage.push(`Property IDs in billed.csv with no house in summary.csv: ${ledger.unmatchedProperties.join(", ")}.`);
  const bad = Object.entries(parsed.badDates).filter(([, n]) => n);
  if (bad.length) coverage.push(`Rows with unreadable dates: ${bad.map(([k, n]) => `${k} ${n}`).join(", ")}.`);
  out.push({
    id: "coverage",
    label: "Export covers full months",
    blocking: false,
    status: coverage.length ? "warn" : "pass",
    detail: coverage.length
      ? coverage[0]
      : `${startIso} to ${dayToISO(ledger.exportEnd)}, ${covered} months.`,
    items: coverage,
  });

  return out;
}

export const blockingFailures = (checks: CheckResult[]) =>
  checks.filter((c) => c.blocking && c.status === "fail");
