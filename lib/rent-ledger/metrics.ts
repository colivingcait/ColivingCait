import type { SummaryRow } from "./parse";
import { addMonths, dayToMonth, monthsBetween, monthLabel } from "./parse";
import {
  CREDIT_LABELS,
  NOT_LOST,
  WAIVED_DUES_BUCKETS,
  balanceAt,
  classifyCredits,
  findOutliers,
  leftOwing,
  movedIn,
  residentSignals,
  stayBand,
  type CreditBucket,
  type House,
  type Ledger,
  type OutlierResult,
  type Resident,
  type ResidentGroup,
  type ResidentSignals,
} from "./classify";
import { RULES, priceBand, priceBandLabels } from "./rules";
import { groupBy, max, mean, median, min, pearson, ratio, sum } from "./stats";

// Sections 6 and 7 of the build spec. Everything here is a pure function of
// the classified ledger plus the report options.
//
// Outliers (5.7) come out of every dollar figure built from balances
// (breakage, balance averages and medians, breakage rates, correlations).
// Counts and left-owing shares keep every resident: the golden numbers
// (31 of 78 left owing, 39.7%; 2+ late fees in a row n = 31) are counted
// with the outlier in.

export interface ReportOptions {
  /** Inclusive earnings-month range, "YYYY-MM". Null = all months. */
  range?: { start: string; end: string } | null;
  includeOutliers?: boolean;
  /** Rooms per house entered by the user. */
  rooms?: Record<string, number>;
}

/** A rate that always carries its numerator and denominator for hover text. */
export interface Rate {
  value: number | null;
  n: number;
  d: number;
  small: boolean;
}

export function rate(n: number, d: number, small = false): Rate {
  return { value: ratio(n, d), n, d, small };
}

export interface MoneyRate {
  value: number | null;
  num: number;
  den: number;
  small: boolean;
}

export interface Range3 {
  min: number | null;
  median: number | null;
  max: number | null;
}

export interface ScopeMetrics {
  houseMonths: number;
  fullHouseMonths: number;
  collected: number;
  netBilled: number;
  breakage: number;
  breakageAll: number;
  breakageWithoutOutliers: number;
  outliersInScope: number;
  collectionRate: MoneyRate;
  breakageRate: MoneyRate;
  breakagePerHouseMonth: MoneyRate;
  breakagePerMoveOut: MoneyRate;
  moveOuts: number;
  leftOwing: Rate;
  balance: { avg: number | null; median: number | null; min: number | null; max: number | null };
  balanceWithOutliers: { avg: number | null; median: number | null };
  recovery: { residents: Rate; recovered: number; owedAtExit: number };
  breakageByMonth: Range3;
  stays: {
    count: number;
    avg: number | null;
    median: number | null;
    min: number | null;
    max: number | null;
    short: Rate;
    medium: Rate;
    long: Rate;
    alreadyLiving: number;
  };
  requests: number;
  accepted: Rate;
  turnover: MoneyRate;
  fees: { booking: number; service: number; transaction: number; total: number; pctOfGross: number | null };
  byBillType: Array<{ type: string; amount: number }>;
  padsplitCredits: number;
  hostEarnings: number;
}

export interface MonthRow {
  month: string;
  gross: number;
  netBilled: number;
  /** PadSplit-style: gross collected / net billed. Can exceed 100%. */
  padsplitRate: number | null;
  hostEarnings: number;
  moveIns: number;
  moveOuts: number;
  requests: number;
  accepted: number;
  breakage: number;
  inFlight: boolean;
  houseMonth: boolean;
}

export interface SignalRow {
  id: string;
  label: string;
  expectedNotASign?: boolean;
  headline?: boolean;
  exitSign?: boolean;
  withSignal: Rate;
  withoutSignal: Rate;
  base: Rate;
  avgBalanceOwing: number | null;
}

export interface WatchRow {
  key: string;
  name: string;
  house: string;
  balance: number;
  currentRun: number;
  daysSincePayment: number | null;
}

export interface OccupancyMonth {
  month: string;
  monthNumber: number;
  occupied: number;
  rooms: number;
  occupancy: number | null;
  gross: number;
  hostEarnings: number;
  collectionRate: number | null;
  ramp: boolean;
  inFlight: boolean;
}

export interface HouseOccupancy {
  houseId: string;
  rooms: number;
  roomsObserved: number;
  months: OccupancyMonth[];
  startedBeforeExport: boolean;
  monthsToStabilize: number | null;
  stabilizedMonth: string | null;
  trueRoomRate: number | null;
  occupancyAvg: number | null;
}

export interface DestabilizationEvent {
  houseId: string;
  start: string;
  startDay: number | null;
  end: string;
  moveOuts: number;
  triggers: string[];
  lowestGross: number | null;
  lowestMonth: string | null;
  baseline: number | null;
  belowNormal: number | null;
  monthsToRecover: number | null;
}

export interface Report {
  options: Required<Pick<ReportOptions, "includeOutliers">> & ReportOptions;
  months: string[];
  allMonths: string[];
  houses: House[];
  groups: Record<ResidentGroup, number>;
  outliers: OutlierResult & { list: Array<{ key: string; name: string; house: string; balance: number }> };
  portfolio: ScopeMetrics;
  perHouse: Record<string, ScopeMetrics>;
  monthly: MonthRow[];
  monthlyByHouse: Record<string, MonthRow[]>;
  unallocatedCredits: Array<{ month: string; amount: number }>;
  credits: {
    totals: Array<{ bucket: CreditBucket; label: string; amount: number; notLost: boolean }>;
    byHouse: Record<string, Partial<Record<CreditBucket, number>>>;
    waivedDues: number;
    waivedDuesByBucket: Array<{ bucket: CreditBucket; label: string; amount: number }>;
    givenUp: number;
    midStayRows: Array<{ key: string; name: string; house: string; day: number; amount: number }>;
  };
  stayRewards: {
    residents: number;
    rewards: number;
    gross: number;
    net: number;
    byHouse: Record<string, number>;
    dayRange: { min: number | null; max: number | null };
    longStayCompare: { withReward: Rate; withoutReward: Rate };
  };
  signals: SignalRow[];
  runway: {
    firstLateToMoveOut: number | null;
    finalRunToMoveOut: number | null;
    balanceAtSecondLate: number | null;
    daysAfterSecondLate: number | null;
    sample: number;
  };
  watchList: WatchRow[];
  currentOwed: { last7: number; thisMonth: number; older: number; total: number; residents: number };
  largestBalances: Array<{ key: string; name: string; house: string; balance: number; outlier: boolean }>;
  pricing: {
    bands: Array<{
      band: string;
      requests: number;
      accepted: Rate;
      moveOuts: number;
      leftOwing: Rate;
      breakage: number;
      breakagePerMoveOut: number | null;
    }>;
    correlation: number | null;
    correlationWithoutOutliers: number | null;
    correlationSample: number;
    medianPrice: number | null;
  };
  requestsByMonth: Array<{ month: string; requests: number; accepted: number; moveIns: number; moveOuts: number }>;
  occupancy: HouseOccupancy[];
  events: DestabilizationEvent[];
  findings: string[];
  signalsByResident: Map<string, ResidentSignals>;
}

// ---------------------------------------------------------------- helpers

function monthSpan(start: string, end: string): string[] {
  const out: string[] = [];
  for (let m = start; m <= end; m = addMonths(m, 1)) out.push(m);
  return out;
}

const isMembershipDuesType = (t: string) => t.trim().toLowerCase() === "membership dues";

function billedByHouseMonth(ledger: Ledger) {
  const m = new Map<string, number>();
  for (const b of ledger.data.billed) {
    if (!Number.isFinite(b.day)) continue;
    const h = ledger.propertyToHouse.get(b.propertyId) ?? b.propertyId;
    const k = `${h}|${dayToMonth(b.day)}`;
    m.set(k, (m.get(k) ?? 0) - b.amount);
  }
  return m;
}

/** Unpaid amount left on each bill of a resident, keyed by bill month. */
function unpaidByMonth(r: Resident, ledger: Ledger): Map<string, number> {
  const out = new Map<string, number>();
  const seen = new Set<string>();
  for (const b of r.bills) {
    let unpaid = -b.amount;
    if (b.billId && !seen.has(b.billId)) {
      seen.add(b.billId);
      unpaid -= ledger.paidByBill.get(b.billId)?.paid ?? 0;
    }
    const m = dayToMonth(b.day);
    out.set(m, (out.get(m) ?? 0) + unpaid);
  }
  return out;
}

function latePayments(r: Resident): number {
  const cutoff = r.lastDay + RULES.recoveryDays;
  return sum(r.payments.filter((p) => p.day > cutoff).map((p) => p.gross));
}

// ---------------------------------------------------------------- scope

function scopeMetrics(
  ledger: Ledger,
  residents: Resident[],
  summary: SummaryRow[],
  months: Set<string>,
  excluded: Set<string>,
  outlierKeys: Set<string>,
  houseIds: Set<string>,
): ScopeMetrics {
  const inRange = (m: string) => months.has(m);
  const sumRows = summary.filter((s) => inRange(s.earningsMonth));

  // House-months: (house, month) with gross over $300.
  const grossByHM = new Map<string, number>();
  for (const s of sumRows) {
    const k = `${s.psid || s.address}|${s.earningsMonth}`;
    grossByHM.set(k, (grossByHM.get(k) ?? 0) + s.gross);
  }
  const hmKeys = [...grossByHM].filter(([, g]) => g > RULES.houseMonthMinGross).map(([k]) => k);
  const houseMonths = hmKeys.length;
  const fullHouseMonths = hmKeys.filter((k) => k.split("|")[1] !== ledger.inFlightMonth).length;

  const collected = sum(sumRows.map((s) => s.gross));
  const netBilled = -sum(
    ledger.data.billed
      .filter(
        (b) =>
          Number.isFinite(b.day) &&
          inRange(dayToMonth(b.day)) &&
          houseIds.has(ledger.propertyToHouse.get(b.propertyId) ?? b.propertyId),
      )
      .map((b) => b.amount),
  );

  const movedOut = residents.filter((r) => r.group === "movedOut" && inRange(r.lastMonth));
  const owing = movedOut.filter(leftOwing);
  const owingKept = owing.filter((r) => !excluded.has(r.key));
  const breakageAll = sum(owing.map((r) => r.balance));
  const breakageWithout = sum(owing.filter((r) => !outlierKeys.has(r.key)).map((r) => r.balance));
  const breakage = sum(owingKept.map((r) => r.balance));
  const small = movedOut.length < RULES.smallSampleMoveOuts;
  const smallHM = houseMonths < RULES.smallSampleHouseMonths;
  const balances = owingKept.map((r) => r.balance);

  // Recovery: everyone who owed at exit, outliers included.
  let exitOwing = 0;
  let recoveredResidents = 0;
  let recovered = 0;
  let owedAtExit = 0;
  for (const r of movedOut) {
    const late = latePayments(r);
    const atExit = r.balance + late;
    if (atExit > RULES.moneyTolerance) {
      exitOwing++;
      owedAtExit += atExit;
      if (late > RULES.moneyTolerance) {
        recoveredResidents++;
        recovered += late;
      }
    }
  }

  // Breakage by month: unpaid on bills dated that month, per house-month.
  const brkByHM = new Map<string, number>(hmKeys.map((k) => [k, 0]));
  for (const r of owingKept) {
    for (const [m, v] of unpaidByMonth(r, ledger)) {
      const k = `${r.houseId}|${m}`;
      if (brkByHM.has(k)) brkByHM.set(k, brkByHM.get(k)! + v);
    }
  }
  const brkVals = [...brkByHM.values()];

  const stayed = movedOut.filter((r) => !r.alreadyLiving && r.stayDays != null);
  const stayDays = stayed.map((r) => r.stayDays!);
  const bands = { short: 0, medium: 0, long: 0 };
  for (const d of stayDays) bands[stayBand(d)]++;

  const requests = residents.filter((r) => r.isRequest && inRange(r.firstMonth));
  const accepted = requests.filter(movedIn);

  const booking = sum(sumRows.map((s) => s.bookingFees));
  const service = sum(sumRows.map((s) => s.serviceFees));
  const transaction = sum(sumRows.map((s) => s.transactionFee));

  const typeTotals = new Map<string, number>();
  let padsplitCredits = 0;
  for (const c of ledger.data.collected) {
    if (!inRange(c.earningsMonth)) continue;
    if (c.category === "adjustment") {
      if (!c.propertyId || houseIds.has(ledger.propertyToHouse.get(c.propertyId) ?? c.propertyId))
        padsplitCredits += c.gross;
      continue;
    }
    if (!houseIds.has(ledger.propertyToHouse.get(c.propertyId) ?? c.propertyId)) continue;
    const t = c.billType || "Other";
    typeTotals.set(t, (typeTotals.get(t) ?? 0) + c.gross);
  }
  // Unallocated credits only belong to the whole portfolio.
  if (houseIds.size !== ledger.houses.length) {
    padsplitCredits = sum(
      ledger.data.collected
        .filter((c) => c.category === "adjustment" && inRange(c.earningsMonth) && c.propertyId)
        .filter((c) => houseIds.has(ledger.propertyToHouse.get(c.propertyId) ?? c.propertyId))
        .map((c) => c.gross),
    );
  }

  const outliersInScope = owing.filter((r) => outlierKeys.has(r.key)).length;
  const withOutBalances = owing.map((r) => r.balance);

  return {
    houseMonths,
    fullHouseMonths,
    collected,
    netBilled,
    breakage,
    breakageAll,
    breakageWithoutOutliers: breakageWithout,
    outliersInScope,
    collectionRate: { value: ratio(collected, collected + breakage), num: collected, den: collected + breakage, small: false },
    breakageRate: { value: ratio(breakage, collected + breakage), num: breakage, den: collected + breakage, small: false },
    breakagePerHouseMonth: { value: ratio(breakage, houseMonths), num: breakage, den: houseMonths, small: smallHM },
    breakagePerMoveOut: { value: ratio(breakage, movedOut.length - (owing.length - owingKept.length)), num: breakage, den: movedOut.length - (owing.length - owingKept.length), small },
    moveOuts: movedOut.length,
    leftOwing: rate(owing.length, movedOut.length, small),
    balance: { avg: mean(balances), median: median(balances), min: min(balances), max: max(balances) },
    balanceWithOutliers: { avg: mean(withOutBalances), median: median(withOutBalances) },
    recovery: { residents: rate(recoveredResidents, exitOwing, exitOwing < RULES.smallSampleMoveOuts), recovered, owedAtExit },
    breakageByMonth: { min: min(brkVals), median: median(brkVals), max: max(brkVals) },
    stays: {
      count: stayDays.length,
      avg: mean(stayDays),
      median: median(stayDays),
      min: min(stayDays),
      max: max(stayDays),
      short: rate(bands.short, stayDays.length, stayDays.length < RULES.smallSampleMoveOuts),
      medium: rate(bands.medium, stayDays.length, stayDays.length < RULES.smallSampleMoveOuts),
      long: rate(bands.long, stayDays.length, stayDays.length < RULES.smallSampleMoveOuts),
      alreadyLiving: movedOut.length - stayed.length,
    },
    requests: requests.length,
    accepted: rate(accepted.length, requests.length, requests.length < RULES.smallSampleMoveOuts),
    turnover: { value: ratio(movedOut.length, houseMonths), num: movedOut.length, den: houseMonths, small: smallHM },
    fees: {
      booking,
      service,
      transaction,
      total: booking + service + transaction,
      pctOfGross: ratio(booking + service + transaction, collected),
    },
    byBillType: [...typeTotals].map(([type, amount]) => ({ type, amount })).sort((a, b) => b.amount - a.amount),
    padsplitCredits,
    hostEarnings: sum(sumRows.map((s) => s.hostEarnings)),
  };
}

function monthlyRows(
  ledger: Ledger,
  residents: Resident[],
  summary: SummaryRow[],
  months: string[],
  houseIds: Set<string>,
  excluded: Set<string>,
  billedHM: Map<string, number>,
): MonthRow[] {
  return months.map((month) => {
    const rows = summary.filter((s) => s.earningsMonth === month);
    const gross = sum(rows.map((s) => s.gross));
    const netBilled = sum([...houseIds].map((h) => billedHM.get(`${h}|${month}`) ?? 0));
    const reqs = residents.filter((r) => r.isRequest && r.firstMonth === month);
    let breakage = 0;
    for (const r of residents) {
      if (!leftOwing(r) || excluded.has(r.key)) continue;
      breakage += unpaidByMonth(r, ledger).get(month) ?? 0;
    }
    const perHouseGross = groupBy(rows, (s) => s.psid || s.address);
    return {
      month,
      gross,
      netBilled,
      padsplitRate: ratio(gross, netBilled),
      hostEarnings: sum(rows.map((s) => s.hostEarnings)),
      moveIns: residents.filter((r) => movedIn(r) && !r.alreadyLiving && r.firstMonth === month).length,
      moveOuts: residents.filter((r) => r.group === "movedOut" && r.lastMonth === month).length,
      requests: reqs.length,
      accepted: reqs.filter(movedIn).length,
      breakage,
      inFlight: month === ledger.inFlightMonth,
      houseMonth: [...perHouseGross.values()].some((g) => sum(g.map((s) => s.gross)) > RULES.houseMonthMinGross),
    };
  });
}

// ---------------------------------------------------------------- 6.8

function occupancyFor(
  ledger: Ledger,
  house: House,
  monthly: MonthRow[],
  firstPortfolioMonth: string,
  roomsOverride?: number,
): HouseOccupancy {
  const rooms = new Map<string, Set<string>>();
  const pids = new Set(house.propertyIds.length ? house.propertyIds : [house.id]);
  for (const c of ledger.data.collected) {
    if (!pids.has(c.propertyId) || c.category !== "collected") continue;
    if (!isMembershipDuesType(c.billType) || c.gross <= 0 || !c.roomId) continue;
    const s = rooms.get(c.earningsMonth) ?? new Set<string>();
    s.add(c.roomId);
    rooms.set(c.earningsMonth, s);
  }
  const roomsObserved = Math.max(0, ...[...rooms.values()].map((s) => s.size));
  const roomCount = roomsOverride && roomsOverride > 0 ? roomsOverride : roomsObserved;
  const active = monthly.filter((m) => m.houseMonth || m.gross > RULES.houseMonthMinGross);
  const firstActive = active[0]?.month ?? null;

  const months: OccupancyMonth[] = [];
  if (firstActive) {
    for (const m of monthly.filter((x) => x.month >= firstActive)) {
      const occupied = rooms.get(m.month)?.size ?? 0;
      const monthNumber = monthsBetween(firstActive, m.month) + 1;
      const occupancy = roomCount ? occupied / roomCount : null;
      const ramp =
        monthNumber === 1 ||
        (monthNumber === 2 && occupancy != null && occupancy < RULES.rampSecondMonthOccupancy);
      months.push({
        month: m.month,
        monthNumber,
        occupied,
        rooms: roomCount,
        occupancy,
        gross: m.gross,
        hostEarnings: m.hostEarnings,
        collectionRate: m.padsplitRate,
        ramp,
        inFlight: m.inFlight,
      });
    }
  }

  let stabilizedMonth: string | null = null;
  let monthsToStabilize: number | null = null;
  const done = months.filter((m) => !m.inFlight);
  const stable = (m: OccupancyMonth) =>
    (m.occupancy ?? 0) >= RULES.stableOccupancy && (m.collectionRate ?? 0) >= RULES.stableCollectionRate;
  for (let i = 0; i + RULES.stableConsecutiveMonths - 1 < done.length; i++) {
    if (done.slice(i, i + RULES.stableConsecutiveMonths).every(stable)) {
      stabilizedMonth = done[i].month;
      monthsToStabilize = done[i].monthNumber;
      break;
    }
  }

  const rateMonths = done.filter((m) => !m.ramp && m.occupied > 0);
  return {
    houseId: house.id,
    rooms: roomCount,
    roomsObserved,
    months,
    startedBeforeExport: firstActive === firstPortfolioMonth,
    monthsToStabilize,
    stabilizedMonth,
    trueRoomRate: median(rateMonths.map((m) => m.hostEarnings / m.occupied)),
    occupancyAvg: mean(done.filter((m) => !m.ramp && m.occupancy != null).map((m) => m.occupancy!)),
  };
}

// ---------------------------------------------------------------- 6.9

function eventsFor(
  ledger: Ledger,
  house: House,
  residents: Resident[],
  monthly: MonthRow[],
): DestabilizationEvent[] {
  const series = monthly.filter((m) => !m.inFlight);
  const idx = new Map(series.map((m, i) => [m.month, i]));
  type Trig = { start: string; end: string; startDay: number | null; label: string };
  const trigs: Trig[] = [];

  const outs = residents
    .filter((r) => r.houseId === house.id && r.group === "movedOut")
    .map((r) => r.lastDay)
    .sort((a, b) => a - b);
  for (let i = 0; i < outs.length; i++) {
    let j = i;
    while (j + 1 < outs.length && outs[j + 1] - outs[i] < RULES.eventWindowDays) j++;
    const count = j - i + 1;
    if (count >= RULES.eventMoveOuts) {
      const start = dayToMonth(outs[i]);
      if (start === ledger.inFlightMonth) continue;
      trigs.push({ start, end: dayToMonth(outs[j]), startDay: outs[i], label: `${count} move-outs within ${RULES.eventWindowDays} days` });
      i = j;
    }
  }

  const trailing = (i: number) => {
    const prior = series.slice(Math.max(0, i - RULES.eventTrailingMonths), i).map((m) => m.gross);
    return prior.length === RULES.eventTrailingMonths ? median(prior) : null;
  };
  series.forEach((m, i) => {
    const t = trailing(i);
    if (t != null && t > 0 && m.gross <= t * (1 - RULES.eventGrossDrop)) {
      trigs.push({ start: m.month, end: m.month, startDay: null, label: `${monthLabel(m.month)} gross ${Math.round((1 - m.gross / t) * 100)}% below the trailing ${RULES.eventTrailingMonths}-month median` });
    }
  });
  if (!trigs.length) return [];

  trigs.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
  type Ev = { start: string; end: string; startDay: number | null; triggers: string[] };
  const merge = (list: Ev[]) => {
    const out: Ev[] = [];
    for (const t of list) {
      const cur = out[out.length - 1];
      if (cur && t.start <= addMonths(cur.end, 1)) {
        if (t.end > cur.end) cur.end = t.end;
        cur.triggers.push(...t.triggers);
        // Keep the earliest move-out day that falls in the event's first month.
        if (t.start === cur.start && t.startDay != null && (cur.startDay == null || t.startDay < cur.startDay))
          cur.startDay = t.startDay;
      } else out.push({ ...t, triggers: [...t.triggers] });
    }
    return out;
  };
  let evs = merge(trigs.map((t) => ({ start: t.start, end: t.end, startDay: t.startDay, triggers: [t.label] })));

  // Baseline: the trailing median going into the event. The event runs
  // until gross is back within 10% of it.
  const baselineFor = (start: string) => {
    const i = idx.get(start);
    if (i == null) return null;
    const prior = series.slice(Math.max(0, i - RULES.eventTrailingMonths), i).map((m) => m.gross);
    return prior.length ? median(prior) : null;
  };
  const recoveryOf = (ev: Ev, baseline: number | null) => {
    if (baseline == null) return null;
    const i0 = idx.get(ev.start) ?? 0;
    for (let i = i0 + 1; i < series.length; i++) {
      if (series[i].month <= ev.end) continue;
      if (series[i].gross >= baseline * (1 - RULES.eventRecoverWithin)) return series[i].month;
    }
    return null;
  };
  for (const ev of evs) {
    const b = baselineFor(ev.start);
    if (b == null) continue;
    const rec = recoveryOf(ev, b);
    const last = rec ? addMonths(rec, -1) : series[series.length - 1]?.month;
    if (last && last > ev.end) ev.end = last;
  }
  evs = merge(evs);

  return evs.map((ev) => {
    const evMonths = series.filter((m) => m.month >= ev.start && m.month <= ev.end);
    const baseline = baselineFor(ev.start);
    const rec = recoveryOf(ev, baseline);
    const lowest = evMonths.reduce<MonthRow | null>((lo, m) => (!lo || m.gross < lo.gross ? m : lo), null);
    return {
      houseId: house.id,
      start: ev.start,
      startDay: ev.startDay,
      end: ev.end,
      moveOuts: outs.filter((d) => dayToMonth(d) >= ev.start && dayToMonth(d) <= ev.end).length,
      triggers: [...new Set(ev.triggers)],
      lowestGross: lowest?.gross ?? null,
      lowestMonth: lowest?.month ?? null,
      baseline,
      belowNormal: baseline == null ? null : sum(evMonths.map((m) => Math.max(0, baseline - m.gross))),
      monthsToRecover: rec ? monthsBetween(ev.start, rec) : null,
    };
  });
}

// ---------------------------------------------------------------- report

export function computeReport(ledger: Ledger, opts: ReportOptions = {}): Report {
  const includeOutliers = !!opts.includeOutliers;
  const summary = ledger.data.summary;
  const allMonths = summary.length
    ? monthSpan(
        summary.reduce((a, s) => (s.earningsMonth < a ? s.earningsMonth : a), summary[0].earningsMonth),
        summary.reduce((a, s) => (s.earningsMonth > a ? s.earningsMonth : a), summary[0].earningsMonth),
      )
    : [];
  const months = opts.range
    ? allMonths.filter((m) => m >= opts.range!.start && m <= opts.range!.end)
    : allMonths;
  const monthSet = new Set(months);

  const residents = ledger.residents;
  const outliers = findOutliers(residents);
  const excluded = includeOutliers ? new Set<string>() : outliers.keys;
  const houseName = (id: string) => ledger.houseById.get(id)?.name ?? id;

  const groups: Record<ResidentGroup, number> = { never: 0, movedOut: 0, living: 0, unclassified: 0 };
  for (const r of residents) groups[r.group]++;

  const allIds = new Set(ledger.houses.map((h) => h.id));
  const billedHM = billedByHouseMonth(ledger);
  const portfolio = scopeMetrics(ledger, residents, summary, monthSet, excluded, outliers.keys, allIds);
  const perHouse: Record<string, ScopeMetrics> = {};
  const monthlyByHouse: Record<string, MonthRow[]> = {};
  const fullMonthlyByHouse: Record<string, MonthRow[]> = {};
  for (const h of ledger.houses) {
    const hr = residents.filter((r) => r.houseId === h.id);
    const hs = summary.filter((s) => (s.psid || s.address) === h.id);
    const ids = new Set([h.id]);
    perHouse[h.id] = scopeMetrics(ledger, hr, hs, monthSet, excluded, outliers.keys, ids);
    fullMonthlyByHouse[h.id] = monthlyRows(ledger, hr, hs, allMonths, ids, excluded, billedHM);
    monthlyByHouse[h.id] = fullMonthlyByHouse[h.id].filter((m) => monthSet.has(m.month));
  }
  const monthly = monthlyRows(ledger, residents, summary, months, allIds, excluded, billedHM);

  const unallocatedCredits = ledger.data.earnings
    .filter((e) => monthSet.has(e.month))
    .map((e) => ({
      month: e.month,
      amount:
        e.totalAdjustments -
        sum(summary.filter((s) => s.earningsMonth === e.month).map((s) => s.adjustments)),
    }));

  // Credits (5.4), by bill month.
  const creditLines = classifyCredits(ledger).filter(
    (c) => Number.isFinite(c.row.day) && monthSet.has(dayToMonth(c.row.day)),
  );
  const creditTotals = new Map<CreditBucket, number>();
  const creditByHouse: Record<string, Partial<Record<CreditBucket, number>>> = {};
  for (const c of creditLines) {
    creditTotals.set(c.bucket, (creditTotals.get(c.bucket) ?? 0) + c.amount);
    const hb = (creditByHouse[c.resident.houseId] ??= {});
    hb[c.bucket] = (hb[c.bucket] ?? 0) + c.amount;
  }
  // Waived dues across every bucket, booking refunds included.
  const waivedDues = sum(
    creditLines.filter((c) => c.row.reason === "waiving_membership_dues").map((c) => c.amount),
  );

  // Stay rewards (6.7).
  const rewardLines = creditLines.filter((c) => c.bucket === "stay_reward");
  const rewardRows = rewardLines.filter((c) => c.row.reason === "stay_reward");
  const rewardDays = rewardRows.map((c) => c.row.day - c.resident.firstDay);
  const rewardByHouse: Record<string, number> = {};
  for (const c of rewardLines) rewardByHouse[c.resident.houseId] = (rewardByHouse[c.resident.houseId] ?? 0) + c.amount;
  const rewarded = new Set(
    classifyCredits(ledger).filter((c) => c.row.reason === "stay_reward").map((c) => c.resident.key),
  );
  const longStays = residents.filter(
    (r) => r.group === "movedOut" && (r.stayDays ?? 0) >= RULES.stayRewardCompareDays && monthSet.has(r.lastMonth),
  );
  const lsWith = longStays.filter((r) => rewarded.has(r.key));
  const lsWithout = longStays.filter((r) => !rewarded.has(r.key));

  // Signals (6.6) on residents who moved out in range.
  const signalsByResident = new Map<string, ResidentSignals>();
  for (const r of residents) {
    if (r.group === "movedOut" || r.group === "living") signalsByResident.set(r.key, residentSignals(r, ledger.paidByBill));
  }
  const outsInRange = residents.filter((r) => r.group === "movedOut" && monthSet.has(r.lastMonth));
  const baseOwing = outsInRange.filter(leftOwing).length;
  const signalDefs: Array<Omit<SignalRow, "withSignal" | "withoutSignal" | "base" | "avgBalanceOwing"> & { test: (s: ResidentSignals, r: Resident) => boolean }> = [
    { id: "final_silence", label: "No payment in the final 2+ weeks", exitSign: true, test: (s) => s.finalSilence >= RULES.finalSilenceDays },
    { id: "run3", label: "3+ late fees in a row", test: (s) => s.longestRun >= 3 },
    { id: "run2", label: "2+ late fees in a row", headline: true, test: (s) => s.longestRun >= 2 },
    { id: "early2", label: "2+ late fees in the first 4 weeks", test: (s) => s.lateFirst4Weeks >= 2 },
    { id: "early1", label: "Any late fee in the first 4 weeks", test: (s) => s.lateFirst4Weeks >= 1 },
    { id: "half_weeks", label: "Late fee in half the weeks or more", test: (s) => s.duesBills > 0 && s.lateFeeDays.length / s.duesBills >= 0.5 },
    { id: "long_stayer", label: "Long-stayer (6+ months)", test: (s) => s.longStayer },
    { id: "high_dues", label: `Weekly dues $${RULES.highDuesThreshold}+`, test: (_s, r) => (r.weeklyPrice ?? 0) >= RULES.highDuesThreshold },
    { id: "partial", label: "Any partial payment", expectedNotASign: true, test: (s) => s.partialPayments > 0 },
    { id: "paid_late", label: "Paid half or more of dues late", expectedNotASign: true, test: (s) => s.paidDuesBills > 0 && s.paidLate / s.paidDuesBills >= 0.5 },
  ];
  const smallN = (n: number) => n < RULES.smallSampleMoveOuts;
  const signals: SignalRow[] = signalDefs.map(({ test, ...def }) => {
    const yes = outsInRange.filter((r) => test(signalsByResident.get(r.key)!, r));
    const no = outsInRange.filter((r) => !test(signalsByResident.get(r.key)!, r));
    const yesOwing = yes.filter(leftOwing);
    return {
      ...def,
      withSignal: rate(yesOwing.length, yes.length, smallN(yes.length)),
      withoutSignal: rate(no.filter(leftOwing).length, no.length, smallN(no.length)),
      base: rate(baseOwing, outsInRange.length, smallN(outsInRange.length)),
      avgBalanceOwing: mean(yesOwing.filter((r) => !excluded.has(r.key)).map((r) => r.balance)),
    };
  });

  // Runway (residents who left owing).
  const owingInRange = outsInRange.filter(leftOwing);
  const firstLate: number[] = [];
  const finalRun: number[] = [];
  const balSecond: number[] = [];
  const daysSecond: number[] = [];
  for (const r of owingInRange) {
    const s = signalsByResident.get(r.key)!;
    if (!s.lateFeeDays.length) continue;
    firstLate.push(r.lastDay - Math.min(...s.lateFeeDays));
    finalRun.push(r.lastDay - s.runs[s.runs.length - 1].start);
    const run2 = s.runs.find((x) => x.length >= 2);
    if (run2) {
      const day = run2.days[1];
      if (!excluded.has(r.key)) balSecond.push(balanceAt(r, day, ledger.paidByBill));
      daysSecond.push(r.lastDay - day);
    }
  }

  // Watch list and money still owed by current residents.
  const living = residents.filter((r) => r.group === "living");
  const watchList: WatchRow[] = [];
  const currentOwed = { last7: 0, thisMonth: 0, older: 0, total: 0, residents: 0 };
  for (const r of living) {
    const s = signalsByResident.get(r.key)!;
    const lastRun = s.runs[s.runs.length - 1];
    const currentRun = lastRun && ledger.exportEnd - lastRun.end <= RULES.lateRunGapDays ? lastRun.length : 0;
    const daysSincePayment = s.lastPaymentDay == null ? null : ledger.exportEnd - s.lastPaymentDay;
    const silent = (daysSincePayment ?? ledger.exportEnd - r.firstDay) >= RULES.watchNoPaymentDays;
    if (r.balance > RULES.watchMinBalance && (currentRun >= 2 || silent)) {
      watchList.push({ key: r.key, name: r.name, house: houseName(r.houseId), balance: r.balance, currentRun, daysSincePayment });
    }
    if (r.balance > RULES.moneyTolerance) {
      currentOwed.residents++;
      currentOwed.total += r.balance;
      // Payments clear the oldest bills first, so what's owed sits on the newest charges.
      let left = r.balance;
      for (const b of [...r.bills].filter((b) => b.amount < 0).sort((a, b) => b.day - a.day)) {
        if (left <= 0) break;
        const part = Math.min(left, -b.amount);
        left -= part;
        if (ledger.exportEnd - b.day < 7) currentOwed.last7 += part;
        else if (dayToMonth(b.day) === ledger.latestMonth) currentOwed.thisMonth += part;
        else currentOwed.older += part;
      }
      currentOwed.older += Math.max(0, left);
    }
  }
  watchList.sort((a, b) => b.balance - a.balance);

  // Pricing (6.5).
  const bandRows = priceBandLabels().map((band) => {
    const inBand = (r: Resident) => priceBand(r.weeklyPrice) === band;
    const reqs = residents.filter((r) => r.isRequest && inBand(r) && monthSet.has(r.firstMonth));
    const outs = outsInRange.filter(inBand);
    const owe = outs.filter(leftOwing);
    const brk = sum(owe.filter((r) => !excluded.has(r.key)).map((r) => r.balance));
    const keptOuts = outs.length - owe.filter((r) => excluded.has(r.key)).length;
    return {
      band,
      requests: reqs.length,
      accepted: rate(reqs.filter(movedIn).length, reqs.length, smallN(reqs.length)),
      moveOuts: outs.length,
      leftOwing: rate(owe.length, outs.length, smallN(outs.length)),
      breakage: brk,
      breakagePerMoveOut: ratio(brk, keptOuts),
    };
  });
  const priced = outsInRange.filter((r) => r.weeklyPrice != null);
  const bal0 = (r: Resident) => Math.max(0, r.balance);
  const pricedKept = priced.filter((r) => !outliers.keys.has(r.key));

  const largestBalances = outsInRange
    .filter(leftOwing)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10)
    .map((r) => ({ key: r.key, name: r.name, house: houseName(r.houseId), balance: r.balance, outlier: outliers.keys.has(r.key) }));

  const requestsByMonth = monthly.map((m) => ({
    month: m.month,
    requests: m.requests,
    accepted: m.accepted,
    moveIns: m.moveIns,
    moveOuts: m.moveOuts,
  }));

  const firstMonth = allMonths[0] ?? "";
  const occupancy = ledger.houses.map((h) =>
    occupancyFor(ledger, h, fullMonthlyByHouse[h.id] ?? [], firstMonth, opts.rooms?.[h.id]),
  );
  const events = ledger.houses.flatMap((h) => eventsFor(ledger, h, residents, fullMonthlyByHouse[h.id] ?? []));

  const report: Report = {
    options: { ...opts, includeOutliers },
    months,
    allMonths,
    houses: ledger.houses,
    groups,
    outliers: {
      ...outliers,
      list: residents
        .filter((r) => outliers.keys.has(r.key))
        .map((r) => ({ key: r.key, name: r.name, house: houseName(r.houseId), balance: r.balance })),
    },
    portfolio,
    perHouse,
    monthly,
    monthlyByHouse,
    unallocatedCredits,
    credits: {
      totals: (Object.keys(CREDIT_LABELS) as CreditBucket[]).map((bucket) => ({
        bucket,
        label: CREDIT_LABELS[bucket],
        amount: creditTotals.get(bucket) ?? 0,
        notLost: NOT_LOST.includes(bucket),
      })),
      byHouse: creditByHouse,
      waivedDues,
      waivedDuesByBucket: WAIVED_DUES_BUCKETS.map((bucket) => ({
        bucket,
        label: CREDIT_LABELS[bucket],
        amount: sum(
          creditLines
            .filter((c) => c.bucket === bucket && c.row.reason === "waiving_membership_dues")
            .map((c) => c.amount),
        ),
      })),
      givenUp: sum(creditLines.filter((c) => !NOT_LOST.includes(c.bucket)).map((c) => c.amount)),
      midStayRows: creditLines
        .filter((c) => c.bucket === "mid_stay")
        .map((c) => ({ key: c.resident.key, name: c.resident.name, house: houseName(c.resident.houseId), day: c.row.day, amount: c.amount })),
    },
    stayRewards: {
      residents: new Set(rewardRows.map((c) => c.resident.key)).size,
      rewards: rewardRows.length,
      gross: sum(rewardRows.map((c) => c.amount)),
      net: sum(rewardLines.map((c) => c.amount)),
      byHouse: rewardByHouse,
      dayRange: { min: min(rewardDays), max: max(rewardDays) },
      longStayCompare: {
        withReward: rate(lsWith.filter(leftOwing).length, lsWith.length, true),
        withoutReward: rate(lsWithout.filter(leftOwing).length, lsWithout.length, true),
      },
    },
    signals,
    runway: {
      firstLateToMoveOut: median(firstLate),
      finalRunToMoveOut: median(finalRun),
      balanceAtSecondLate: median(balSecond),
      daysAfterSecondLate: median(daysSecond),
      sample: owingInRange.length,
    },
    watchList,
    currentOwed,
    largestBalances,
    pricing: {
      bands: bandRows,
      correlation: pearson(priced.map((r) => r.weeklyPrice!), priced.map(bal0)),
      correlationWithoutOutliers: pearson(pricedKept.map((r) => r.weeklyPrice!), pricedKept.map(bal0)),
      correlationSample: priced.length,
      medianPrice: median(residents.filter((r) => movedIn(r) && r.weeklyPrice != null).map((r) => r.weeklyPrice!)),
    },
    requestsByMonth,
    occupancy,
    events,
    findings: [],
    signalsByResident,
  };
  report.findings = buildFindings(report, ledger);
  return report;
}

// ---------------------------------------------------------------- findings

export const fmtMoney = (n: number | null | undefined, digits = 0) =>
  n == null || !Number.isFinite(n)
    ? "–"
    : `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

export const fmtPct = (n: number | null | undefined, digits = 1) =>
  n == null || !Number.isFinite(n) ? "–" : `${(n * 100).toFixed(digits)}%`;

function buildFindings(report: Report, ledger: Ledger): string[] {
  const out: string[] = [];
  const p = report.portfolio;
  if (p.moveOuts) {
    out.push(
      `${p.leftOwing.n} of ${p.moveOuts} residents who moved out left owing money (${fmtPct(p.leftOwing.value, 0)}). ` +
        `Together they left ${fmtMoney(p.breakage)} unpaid, about ${fmtMoney(p.breakagePerHouseMonth.value)} per house per month.`,
    );
  }
  const head = report.signals.find((s) => s.headline);
  if (head && head.withSignal.d >= 3 && head.withSignal.value != null && head.withoutSignal.value != null) {
    out.push(
      `Residents who got 2 or more late fees in a row left owing ${fmtPct(head.withSignal.value, 0)} of the time ` +
        `(${head.withSignal.n} of ${head.withSignal.d}), compared with ${fmtPct(head.withoutSignal.value, 0)} for everyone else.`,
    );
  }
  const worst = Object.entries(report.perHouse)
    .filter(([, m]) => m.houseMonths >= RULES.smallSampleHouseMonths && m.breakagePerHouseMonth.value != null)
    .sort((a, b) => b[1].breakagePerHouseMonth.value! - a[1].breakagePerHouseMonth.value!)[0];
  if (worst && Object.keys(report.perHouse).length > 1) {
    out.push(
      `${ledger.houseById.get(worst[0])?.name ?? worst[0]} has the most breakage: ${fmtMoney(worst[1].breakagePerHouseMonth.value)} per house-month over ${worst[1].houseMonths} months.`,
    );
  }
  if (out.length < 3 && p.requests) {
    out.push(`${p.accepted.n} of ${p.requests} booking requests turned into move-ins (${fmtPct(p.accepted.value, 0)}).`);
  }
  return out.slice(0, 3);
}
