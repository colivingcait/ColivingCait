import type { Ledger } from "./classify";
import type { CheckResult } from "./checks";
import { unrecognizedItems } from "./checks";
import type { Report } from "./metrics";
import { dayToISO, monthStartDay } from "./parse";
import { RULES_VERSION, priceBand } from "./rules";
import { median } from "./stats";

// Section 10: the anonymous per-house summary that is the only house-level
// data ever sent to the server, and only after the benchmark opt-in. The
// PSID goes up so the server can hash it with its salt; the server stores
// the hash, never the PSID.

export interface HouseSummary {
  psid: string;
  city: string;
  state: string;
  zip: string | null;
  rooms: number | null;
  price_band: string | null;
  months_covered: number;
  period_start: string | null;
  period_end: string | null;
  collected_per_house_month: number | null;
  collection_rate: number | null;
  breakage_rate: number | null;
  breakage_per_house_month: number | null;
  move_outs: number;
  left_owing_rate: number | null;
  median_balance: number | null;
  avg_stay_days: number | null;
  short_pct: number | null;
  long_pct: number | null;
  requests: number;
  acceptance_rate: number | null;
  months_to_stabilize: number | null;
  events_per_year: number | null;
  occupancy_avg: number | null;
  true_room_rate: number | null;
  rules_version: string;
}

/** Keys the save route accepts. Anything else in a summary is dropped. */
export const SUMMARY_FIELDS: Array<keyof HouseSummary> = [
  "psid", "city", "state", "zip", "rooms", "price_band", "months_covered",
  "period_start", "period_end", "collected_per_house_month", "collection_rate",
  "breakage_rate", "breakage_per_house_month", "move_outs", "left_owing_rate",
  "median_balance", "avg_stay_days", "short_pct", "long_pct", "requests",
  "acceptance_rate", "months_to_stabilize", "events_per_year", "occupancy_avg",
  "true_room_rate", "rules_version",
];

const round = (n: number | null | undefined, d = 4) =>
  n == null || !Number.isFinite(n) ? null : Math.round(n * 10 ** d) / 10 ** d;

/**
 * Builds the summaries from an all-months report with outliers excluded.
 * `location` comes from the user's form; zip may differ per house.
 */
export function buildHouseSummaries(
  ledger: Ledger,
  report: Report,
  location: { city: string; state: string; zips?: Record<string, string> },
): HouseSummary[] {
  return ledger.houses
    .filter((h) => report.perHouse[h.id]?.houseMonths > 0)
    .map((h) => {
      const m = report.perHouse[h.id];
      const occ = report.occupancy.find((o) => o.houseId === h.id);
      const months = report.monthlyByHouse[h.id]?.filter((x) => x.houseMonth) ?? [];
      const prices = ledger.residents
        .filter((r) => r.houseId === h.id && (r.group === "movedOut" || r.group === "living") && r.weeklyPrice != null)
        .map((r) => r.weeklyPrice!);
      const events = report.events.filter((e) => e.houseId === h.id).length;
      const first = months[0]?.month ?? null;
      const last = months[months.length - 1]?.month ?? null;
      const lastDay = last ? monthStartDay(last) : null;
      return {
        psid: h.id,
        city: location.city,
        state: location.state,
        zip: location.zips?.[h.id] || null,
        rooms: occ?.rooms || null,
        price_band: priceBand(median(prices)),
        months_covered: m.houseMonths,
        period_start: first ? `${first}-01` : null,
        period_end: lastDay != null ? dayToISO(lastDay) : null,
        collected_per_house_month: round(m.houseMonths ? m.collected / m.houseMonths : null, 2),
        collection_rate: round(m.collectionRate.value),
        breakage_rate: round(m.breakageRate.value),
        breakage_per_house_month: round(m.breakagePerHouseMonth.value, 2),
        move_outs: m.moveOuts,
        left_owing_rate: round(m.leftOwing.value),
        median_balance: round(m.balance.median, 2),
        avg_stay_days: round(m.stays.avg, 1),
        short_pct: round(m.stays.short.value),
        long_pct: round(m.stays.long.value),
        requests: m.requests,
        acceptance_rate: round(m.accepted.value),
        // A house already running when the export starts has no ramp to measure.
        months_to_stabilize: occ && !occ.startedBeforeExport ? occ.monthsToStabilize : null,
        events_per_year: round(m.houseMonths ? events / (m.houseMonths / 12) : null, 2),
        occupancy_avg: round(occ?.occupancyAvg ?? null),
        true_room_rate: round(occ?.trueRoomRate ?? null, 2),
        rules_version: RULES_VERSION,
      };
    });
}

/** "Something looks off": counts and check results only. Never rows or names. */
export interface FeedbackPayload {
  counts: Record<string, number>;
  checks: Array<{ id: string; status: string }>;
  unrecognized: Array<{ reason: string; type: string; count: number; amount: number }>;
  range: { start: string; end: string };
  houses: number;
  rulesVersion: string;
}

export function buildFeedback(ledger: Ledger, report: Report, checks: CheckResult[]): FeedbackPayload {
  return {
    counts: { ...report.groups },
    checks: checks.map((c) => ({ id: c.id, status: c.status })),
    unrecognized: unrecognizedItems(ledger).map((u) => ({
      reason: u.reason,
      type: u.type,
      count: u.count,
      amount: Math.round(u.amount * 100) / 100,
    })),
    range: { start: dayToISO(ledger.exportStart), end: dayToISO(ledger.exportEnd) },
    houses: ledger.houses.length,
    rulesVersion: RULES_VERSION,
  };
}
