import type { BilledRow, CollectedRow, LedgerData } from "./parse";
import { dayToMonth } from "./parse";
import { RULES } from "./rules";
import { groupBy, median, quantile, sum } from "./stats";

// Section 5 of the build spec: who each resident is, what they owe, how long
// they stayed, how every credit reads, and the late-fee signals. Pure
// functions only: no DOM, no network.

export type ResidentGroup = "never" | "movedOut" | "living" | "unclassified";

export const GROUP_LABELS: Record<ResidentGroup, string> = {
  never: "Never moved in",
  movedOut: "Moved in and left",
  living: "Living there now",
  unclassified: "Unclassified",
};

export interface BillPayments {
  /** Net paid on the bill, reversals included. */
  paid: number;
  payments: Array<{ day: number; gross: number }>;
}

export interface House {
  id: string;
  name: string;
  address: string;
  state: string;
  /** Billed Property IDs that map to this house (normally just the PSID). */
  propertyIds: string[];
}

export interface Resident {
  key: string;
  propertyId: string;
  houseId: string;
  memberId: string;
  name: string;
  roomIds: string[];
  bills: BilledRow[];
  payments: CollectedRow[];
  firstDay: number;
  lastDay: number;
  firstMonth: string;
  lastMonth: string;
  billedCharges: number;
  concessions: number;
  netCollected: number;
  group: ResidentGroup;
  unclassifiedReason?: string;
  balance: number;
  /** First bill within 7 days of export start: was already living there. */
  alreadyLiving: boolean;
  /** A booking request seen from the start (first bill 7+ days after export start). */
  isRequest: boolean;
  stayDays: number | null;
  weeklyPrice: number | null;
  /** Member billed at 2+ properties. */
  multiProperty: boolean;
}

export interface Ledger {
  data: LedgerData;
  residents: Resident[];
  houses: House[];
  houseById: Map<string, House>;
  propertyToHouse: Map<string, string>;
  paidByBill: Map<string, BillPayments>;
  exportStart: number;
  exportEnd: number;
  latestMonth: string;
  inFlightMonth: string | null;
  /** Billed Property IDs with no matching summary house. */
  unmatchedProperties: string[];
}

const isCharge = (b: BilledRow) => b.type === "fee" || b.type === "fine";
const isConcession = (b: BilledRow) => b.type === "concession";
export const isDues = (b: BilledRow) => b.reason === "membership_dues" && b.amount < 0;

/** "1234 Raven Springs Trl, Atlanta, GA" -> "Raven Springs Trl". */
export function houseName(address: string): string {
  const street = address.split(",")[0].trim();
  return street.replace(/^\d+[A-Za-z]?\s+/, "") || street || "House";
}

function buildHouses(data: LedgerData) {
  const houses = new Map<string, House>();
  for (const s of data.summary) {
    const id = s.psid || s.address;
    if (!houses.has(id)) {
      houses.set(id, {
        id,
        name: houseName(s.address),
        address: s.address,
        state: s.state,
        propertyIds: [],
      });
    }
  }
  const propertyToHouse = new Map<string, string>();
  const unmatched: string[] = [];
  const streets = new Map<string, string>();
  for (const b of [...data.billed, ...data.collected]) {
    if (b.propertyId && b.street1 && !streets.has(b.propertyId)) streets.set(b.propertyId, b.street1);
  }
  const propertyIds = new Set(
    [...data.billed, ...data.collected].map((r) => r.propertyId).filter(Boolean),
  );
  for (const pid of propertyIds) {
    let houseId: string | undefined = houses.has(pid) ? pid : undefined;
    if (!houseId) {
      const street = (streets.get(pid) ?? "").toLowerCase();
      if (street) {
        houseId = [...houses.values()].find((h) =>
          h.address.toLowerCase().startsWith(street),
        )?.id;
      }
    }
    if (!houseId) {
      unmatched.push(pid);
      houseId = pid;
      houses.set(pid, {
        id: pid,
        name: houseName(streets.get(pid) ?? `Property ${pid}`),
        address: streets.get(pid) ?? "",
        state: "",
        propertyIds: [],
      });
    }
    propertyToHouse.set(pid, houseId);
    houses.get(houseId)!.propertyIds.push(pid);
  }
  return { houses, propertyToHouse, unmatched };
}

export function buildPaidByBill(collected: CollectedRow[]): Map<string, BillPayments> {
  const m = new Map<string, BillPayments>();
  for (const c of collected) {
    if (c.category !== "collected" || !c.billId) continue;
    const e = m.get(c.billId) ?? { paid: 0, payments: [] };
    e.paid += c.gross;
    e.payments.push({ day: c.day, gross: c.gross });
    m.set(c.billId, e);
  }
  for (const e of m.values()) e.payments.sort((a, b) => a.day - b.day);
  return m;
}

/** Σ over the resident's bills of (-Amount - paid on that bill). */
function residentBalance(bills: BilledRow[], paidByBill: Map<string, BillPayments>): number {
  let bal = 0;
  const seen = new Set<string>();
  for (const b of bills) {
    bal += -b.amount;
    if (b.billId && !seen.has(b.billId)) {
      seen.add(b.billId);
      bal -= paidByBill.get(b.billId)?.paid ?? 0;
    }
  }
  return bal;
}

export function weeklyPrice(bills: BilledRow[], movedIn: boolean): number | null {
  const dues = bills.filter(isDues).map((b) => -b.amount);
  if (!dues.length) return null;
  if (!movedIn) return Math.max(...dues);
  // The first bill is often prorated, so drop it once there are enough bills.
  return median(dues.length >= 3 ? dues.slice(1) : dues);
}

export function classifyLedger(data: LedgerData): Ledger {
  const { houses, propertyToHouse, unmatched } = buildHouses(data);
  const paidByBill = buildPaidByBill(data.collected);

  const validDays = data.billed.map((b) => b.day).filter(Number.isFinite);
  const exportStart = Math.min(...validDays);
  const exportEnd = Math.max(...validDays);
  const latestMonth = dayToMonth(exportEnd);
  const inFlightMonth = data.earnings.find((e) => e.inFlight)?.month ?? null;

  const key = (p: string, m: string) => `${p}|${m}`;
  const billsBy = groupBy(data.billed, (b) => key(b.propertyId, b.memberId));
  const paysBy = groupBy(
    data.collected.filter((c) => c.category === "collected" && c.propertyId),
    (c) => key(c.propertyId, c.memberId),
  );

  const memberProps = new Map<string, Set<string>>();
  for (const b of data.billed) {
    if (!b.memberId || !b.propertyId) continue;
    const s = memberProps.get(b.memberId) ?? new Set<string>();
    s.add(b.propertyId);
    memberProps.set(b.memberId, s);
  }

  const residents: Resident[] = [];
  for (const k of new Set([...billsBy.keys(), ...paysBy.keys()])) {
    const bills = [...(billsBy.get(k) ?? [])].sort((a, b) => a.day - b.day);
    const payments = [...(paysBy.get(k) ?? [])].sort((a, b) => a.day - b.day);
    const [propertyId, memberId] = k.split("|");
    const first = bills[0];
    const r: Resident = {
      key: k,
      propertyId,
      houseId: propertyToHouse.get(propertyId) ?? propertyId,
      memberId,
      name: first
        ? `${first.firstName} ${first.lastName}`.trim() || `Member ${memberId}`
        : `Member ${memberId}`,
      roomIds: [...new Set(bills.map((b) => b.roomId).filter(Boolean))],
      bills,
      payments,
      firstDay: bills.length ? bills[0].day : NaN,
      lastDay: bills.length ? bills[bills.length - 1].day : NaN,
      firstMonth: "",
      lastMonth: "",
      billedCharges: -sum(bills.filter(isCharge).map((b) => b.amount)),
      concessions: sum(bills.filter(isConcession).map((b) => b.amount)),
      netCollected: sum(payments.map((p) => p.gross)),
      group: "unclassified",
      balance: residentBalance(bills, paidByBill),
      alreadyLiving: false,
      isRequest: false,
      stayDays: null,
      weeklyPrice: null,
      multiProperty: (memberProps.get(memberId)?.size ?? 0) >= 2,
    };

    // Anything that doesn't fit the rules stays unclassified; never guess.
    if (!memberId) r.unclassifiedReason = "Rows with no Member ID";
    else if (!propertyId) r.unclassifiedReason = "Rows with no Property ID";
    else if (!bills.length) r.unclassifiedReason = "Payments but no bills in the export";
    else if (bills.some((b) => !Number.isFinite(b.day))) r.unclassifiedReason = "A bill with no readable date";
    else if (!bills.some(isDues) && r.netCollected > RULES.moneyTolerance)
      r.unclassifiedReason = "Payments but no weekly dues bills";

    if (!r.unclassifiedReason) {
      r.firstMonth = dayToMonth(r.firstDay);
      r.lastMonth = dayToMonth(r.lastDay);
      r.alreadyLiving = r.firstDay - exportStart < RULES.alreadyLivingDays;
      r.isRequest = !r.alreadyLiving;
      const never =
        Math.abs(r.billedCharges - r.concessions) < RULES.neverMovedInChargeTolerance &&
        r.netCollected < RULES.moneyTolerance;
      if (never) r.group = "never";
      else r.group = r.lastMonth < latestMonth ? "movedOut" : "living";
      if (r.group !== "never") r.stayDays = r.lastDay - r.firstDay;
      r.weeklyPrice = weeklyPrice(bills, r.group !== "never");
    }
    residents.push(r);
  }

  return {
    data,
    residents,
    houses: [...houses.values()],
    houseById: houses,
    propertyToHouse,
    paidByBill,
    exportStart,
    exportEnd,
    latestMonth,
    inFlightMonth,
    unmatchedProperties: unmatched,
  };
}

export const movedIn = (r: Resident) => r.group === "movedOut" || r.group === "living";

export function stayBand(days: number): "short" | "medium" | "long" {
  if (days < RULES.stayShortDays) return "short";
  if (days > RULES.stayLongDays) return "long";
  return "medium";
}

/** Left owing: moved out with a balance over the tolerance. */
export const leftOwing = (r: Resident) =>
  r.group === "movedOut" && r.balance > RULES.moneyTolerance;

/** What the resident owed as of a day: bills dated up to it minus payments made up to it. */
export function balanceAt(r: Resident, day: number, paidByBill: Map<string, BillPayments>): number {
  let bal = 0;
  const seen = new Set<string>();
  for (const b of r.bills) {
    if (b.day > day) continue;
    bal += -b.amount;
    if (b.billId && !seen.has(b.billId)) {
      seen.add(b.billId);
      for (const p of paidByBill.get(b.billId)?.payments ?? []) if (p.day <= day) bal -= p.gross;
    }
  }
  return bal;
}

// ---------------------------------------------------------------- 5.4 credits

export type CreditBucket =
  | "booking_refund"
  | "duplicate_move_in"
  | "transfer"
  | "move_out"
  | "mid_stay"
  | "promo"
  | "stay_reward"
  | "good_move_out"
  | "adjustment"
  | "other";

export const CREDIT_LABELS: Record<CreditBucket, string> = {
  booking_refund: "Booking refunds (not lost money)",
  duplicate_move_in: "Duplicate move-in charges (not lost money)",
  transfer: "Transfer waivers",
  move_out: "Dues waived at move-out",
  mid_stay: "Dues waived mid-stay (unexplained)",
  promo: "Room promos (net)",
  stay_reward: "Stay rewards (net)",
  good_move_out: "Good move-out discounts",
  adjustment: "Adjustments",
  other: "Other waivers",
};

export const NOT_LOST: CreditBucket[] = ["booking_refund", "duplicate_move_in"];
export const WAIVED_DUES_BUCKETS: CreditBucket[] = [
  "booking_refund",
  "duplicate_move_in",
  "transfer",
  "move_out",
  "mid_stay",
];

export interface CreditLine {
  resident: Resident;
  row: BilledRow;
  bucket: CreditBucket;
  /** Money given up: concessions positive, *_adjustment fees that claw it back negative. */
  amount: number;
}

export function classifyCredits(ledger: Ledger): CreditLine[] {
  const out: CreditLine[] = [];
  const cancelDays = new Map<string, number[]>();
  for (const b of ledger.data.billed) {
    if (b.reason === "host_transfer_cancellation" || b.reason === "host_move_in_cancellation") {
      const list = cancelDays.get(b.memberId) ?? [];
      list.push(b.day);
      cancelDays.set(b.memberId, list);
    }
  }

  for (const r of ledger.residents) {
    for (const row of r.bills) {
      if (row.type === "concession") {
        let bucket: CreditBucket;
        if (r.group === "never") bucket = "booking_refund";
        else if (row.reason === "waiving_membership_dues") {
          const nearCancel = (cancelDays.get(r.memberId) ?? []).some(
            (d) => Math.abs(d - row.day) <= RULES.transferWaiverDays,
          );
          if (row.day - r.firstDay <= RULES.duplicateMoveInDays) bucket = "duplicate_move_in";
          else if (nearCancel || r.multiProperty) bucket = "transfer";
          else if (
            r.group === "movedOut" &&
            r.lastDay - row.day <= RULES.moveOutWaiverDays &&
            r.lastDay >= row.day
          )
            bucket = "move_out";
          else bucket = "mid_stay";
        } else if (row.reason === "promo_room_discount") bucket = "promo";
        else if (row.reason === "stay_reward") bucket = "stay_reward";
        else if (row.reason === "good_move_out_discount") bucket = "good_move_out";
        else if (row.reason === "adjustment") bucket = "adjustment";
        else bucket = "other";
        out.push({ resident: r, row, bucket, amount: row.amount });
      } else if (r.group !== "never") {
        // Fees that reverse a credit reduce the net credit.
        if (row.reason === "promo_room_discount_adjustment")
          out.push({ resident: r, row, bucket: "promo", amount: row.amount });
        else if (row.reason === "stay_reward_adjustment")
          out.push({ resident: r, row, bucket: "stay_reward", amount: row.amount });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------- 5.7 outliers

export interface OutlierResult {
  applied: boolean;
  fence: number | null;
  q1: number | null;
  q3: number | null;
  keys: Set<string>;
  sample: number;
}

/** Tukey far-out fence on balances of residents who left owing. */
export function findOutliers(residents: Resident[]): OutlierResult {
  const owing = residents.filter(leftOwing);
  const balances = owing.map((r) => r.balance);
  if (balances.length < RULES.outlierMinSample) {
    return { applied: false, fence: null, q1: null, q3: null, keys: new Set(), sample: balances.length };
  }
  const q1 = quantile(balances, 0.25)!;
  const q3 = quantile(balances, 0.75)!;
  const fence = q3 + RULES.outlierFenceK * (q3 - q1);
  return {
    applied: true,
    fence,
    q1,
    q3,
    keys: new Set(owing.filter((r) => r.balance > fence).map((r) => r.key)),
    sample: balances.length,
  };
}

// ---------------------------------------------------------------- 5.8 signals

export interface LateRun {
  start: number;
  end: number;
  length: number;
  days: number[];
}

export interface ResidentSignals {
  lateFeeDays: number[];
  runs: LateRun[];
  longestRun: number;
  lateFirst4Weeks: number;
  duesBills: number;
  paidDuesBills: number;
  partialPayments: number;
  paidLate: number;
  lastPaymentDay: number | null;
  /** Days from last payment to last bill (whole stay if they never paid). */
  finalSilence: number;
  longStayer: boolean;
}

export function lateRuns(days: number[]): LateRun[] {
  const runs: LateRun[] = [];
  for (const d of [...days].sort((a, b) => a - b)) {
    const cur = runs[runs.length - 1];
    if (cur && d - cur.end <= RULES.lateRunGapDays) {
      cur.end = d;
      cur.length++;
      cur.days.push(d);
    } else runs.push({ start: d, end: d, length: 1, days: [d] });
  }
  return runs;
}

export function residentSignals(r: Resident, paidByBill: Map<string, BillPayments>): ResidentSignals {
  const lateFeeDays = r.bills.filter((b) => b.reason === "overdue_balance").map((b) => b.day);
  const runs = lateRuns(lateFeeDays);
  let partial = 0;
  let paidLate = 0;
  let paidBills = 0;
  const dues = r.bills.filter(isDues);
  for (const b of dues) {
    const amt = -b.amount;
    const bp = paidByBill.get(b.billId);
    const paid = bp?.paid ?? 0;
    if (paid > RULES.moneyTolerance && paid < amt - RULES.moneyTolerance) partial++;
    if (paid > RULES.moneyTolerance) {
      paidBills++;
      const last = Math.max(...bp!.payments.filter((p) => p.gross > 0).map((p) => p.day));
      if (last - b.day > RULES.paidLateDays) paidLate++;
    }
  }
  const positive = r.payments.filter((p) => p.gross > 0);
  const lastPaymentDay = positive.length ? Math.max(...positive.map((p) => p.day)) : null;
  return {
    lateFeeDays,
    runs,
    longestRun: Math.max(0, ...runs.map((x) => x.length)),
    lateFirst4Weeks: lateFeeDays.filter((d) => d - r.firstDay <= RULES.earlyLateDays).length,
    duesBills: dues.length,
    paidDuesBills: paidBills,
    partialPayments: partial,
    paidLate,
    lastPaymentDay,
    finalSilence: r.lastDay - (lastPaymentDay ?? r.firstDay),
    longStayer: (r.stayDays ?? 0) > RULES.stayLongDays,
  };
}
