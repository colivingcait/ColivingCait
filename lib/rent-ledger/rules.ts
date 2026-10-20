// Every threshold the rent-ledger tool uses lives here. Changing any value
// (or the meaning of a rule in classify.ts / metrics.ts) bumps RULES_VERSION
// and adds a dated line to RULES_CHANGELOG, which the Data check tab shows.
// Saved benchmark snapshots carry the version, and benchmarks only compare
// snapshots with the same major (first segment).

export const RULES_VERSION = "2026.10.1";

export const RULES_CHANGELOG: Array<{ date: string; version: string; note: string }> = [
  { date: "2026-10-20", version: "2026.10.1", note: "First release of the rules in the build spec." },
];

export function rulesMajor(version: string): string {
  return version.split(".")[0];
}

export const RULES = {
  /** Money compares: more than this means "has a balance". */
  moneyTolerance: 0.5,
  /** Never moved in: |charges - concessions| below this. */
  neverMovedInChargeTolerance: 1,
  /** A house-month needs more summary gross than this. */
  houseMonthMinGross: 300,
  /** First bill within this many days of export start = already living there. */
  alreadyLivingDays: 7,

  stayShortDays: 30,
  stayLongDays: 182,

  /** Credits (5.4). */
  duplicateMoveInDays: 3,
  transferWaiverDays: 3,
  moveOutWaiverDays: 7,

  /** Price bands, lower bounds in $ / week. Labels are built from these. */
  priceBandEdges: [175, 200, 225],
  highDuesThreshold: 275,

  /** Outliers (5.7): Tukey far-out fence. */
  outlierFenceK: 3,
  outlierMinSample: 8,

  /** Late-fee signals (5.8). */
  lateRunGapDays: 8,
  earlyLateDays: 28,
  paidLateDays: 3,
  finalSilenceDays: 14,

  /** Recovery (6.2): paid more than this many days after the last bill. */
  recoveryDays: 10,

  /** Small samples (6.5). */
  smallSampleMoveOuts: 10,
  smallSampleHouseMonths: 3,

  /** Watch list (6.6). */
  watchNoPaymentDays: 14,
  watchMinBalance: 100,

  /** Stay rewards (6.7). */
  stayRewardCompareDays: 150,

  /** Occupancy and stabilization (6.8). */
  rampSecondMonthOccupancy: 0.7,
  stableOccupancy: 0.85,
  stableCollectionRate: 0.9,
  stableConsecutiveMonths: 2,

  /** Destabilization (6.9). */
  eventMoveOuts: 3,
  eventWindowDays: 30,
  eventGrossDrop: 0.3,
  eventTrailingMonths: 3,
  eventRecoverWithin: 0.1,

  /** Checks (9). */
  tieTolerance: 1,
  maxUnclassifiedShare: 0.02,
  bigBill: 1000,
  smallDuesBill: 50,
  minMonthsCovered: 3,

  /** Benchmarks (11). */
  benchmarkMinUsers: 5,
  benchmarkMinHouses: 5,
} as const;

export function priceBand(weekly: number | null | undefined): string | null {
  if (weekly == null || !Number.isFinite(weekly) || weekly <= 0) return null;
  const edges = RULES.priceBandEdges;
  if (weekly < edges[0]) return `Under $${edges[0]}`;
  for (let i = 1; i < edges.length; i++) {
    if (weekly < edges[i]) return `$${edges[i - 1]}–${edges[i] - 1}`;
  }
  return `$${edges[edges.length - 1]}+`;
}

export function priceBandLabels(): string[] {
  const edges = RULES.priceBandEdges;
  const out = [`Under $${edges[0]}`];
  for (let i = 1; i < edges.length; i++) out.push(`$${edges[i - 1]}–${edges[i] - 1}`);
  out.push(`$${edges[edges.length - 1]}+`);
  return out;
}

/** Transaction reasons we know how to read. Anything else is flagged. */
export const KNOWN_REASONS = new Set([
  "membership_dues",
  "overdue_balance",
  "promo_room_discount",
  "promo_room_discount_adjustment",
  "waiving_membership_dues",
  "stay_reward",
  "stay_reward_adjustment",
  "good_move_out_discount",
  "adjustment",
  "waive",
  "other",
  "dues_assistance",
  "commitment_break_penalty_v2_host",
  "host_transfer_cancellation",
  "host_move_in_cancellation",
  "unregistered_guest",
  "noise",
  "property_damage",
  "space_heater",
]);

export const GLOSSARY: Array<{ item: string; type: string; meaning: string }> = [
  { item: "membership_dues", type: "fee", meaning: "Weekly rent. First bill is often prorated." },
  { item: "overdue_balance", type: "fine", meaning: "$25 weekly late fee." },
  { item: "promo_room_discount", type: "concession", meaning: "Room promo, about 10% of that week's dues." },
  { item: "promo_room_discount_adjustment", type: "fee", meaning: "Reverses a promo (net promo = discount minus adjustment)." },
  { item: "waiving_membership_dues", type: "concession", meaning: "Waived dues. What it means depends on when it happens (booking refund, duplicate move-in charge, transfer, move-out, or mid-stay)." },
  { item: "stay_reward", type: "concession", meaning: "About one week's dues given to residents who stay about 6 months and pay on time." },
  { item: "stay_reward_adjustment", type: "fee", meaning: "Reverses part of a stay reward." },
  { item: "good_move_out_discount", type: "concession", meaning: "Credit at a clean move-out." },
  { item: "adjustment", type: "concession or fee", meaning: "Manual adjustment; reason unknown." },
  { item: "waive", type: "concession", meaning: "Waived fee (often an administrative or flexible-stay fee)." },
  { item: "commitment_break_penalty_v2_host", type: "fine", meaning: "Charged at early move-out. Describes the exit; it does not predict it." },
  { item: "host_transfer_cancellation, host_move_in_cancellation", type: "fine", meaning: "Room transfer or move-in cancelled." },
  { item: "unregistered_guest, noise, property_damage, space_heater", type: "fine", meaning: "House-rule fines." },
  { item: "Booking request", type: "", meaning: "A booking request charges the first week's dues up front. A full refund means the person never moved in; a partial refund means they moved in." },
];
