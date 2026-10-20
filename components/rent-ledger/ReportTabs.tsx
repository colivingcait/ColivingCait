"use client";

import type { Analysis } from "@/lib/rent-ledger";
import { CREDIT_LABELS, GROUP_LABELS, type CreditBucket, type ResidentGroup } from "@/lib/rent-ledger/classify";
import { unrecognizedItems } from "@/lib/rent-ledger/checks";
import { fmtMoney, fmtPct, type MonthRow, type Report } from "@/lib/rent-ledger/metrics";
import { dayToISO, monthLabel } from "@/lib/rent-ledger/parse";
import { GLOSSARY, RULES, RULES_CHANGELOG, RULES_VERSION } from "@/lib/rent-ledger/rules";
import ChecksList from "./ChecksList";
import { GroupedColumns, HBars, RangeBars, SERIES, TrendLine } from "./charts";
import { ChartCard, DataTable, Notice, Panel, RateText, SmallSample, Stat, inputClass } from "./ui";

export interface TabProps {
  report: Report;
  analysis: Analysis;
  showNames: boolean;
  name: (key: string, name: string) => string;
  houseName: (id: string) => string;
  rooms: Record<string, number>;
  onRooms: (houseId: string, rooms: number) => void;
}

const days = (n: number | null | undefined) => (n == null ? "–" : `${Math.round(n)} days`);
const pct0 = (n: number | null | undefined) => fmtPct(n, 0);

function breakageLine(report: Report) {
  const p = report.portfolio;
  if (!p.outliersInScope) return fmtMoney(p.breakageAll);
  return `${fmtMoney(p.breakageAll)} (${fmtMoney(p.breakageWithoutOutliers)} without ${p.outliersInScope} outlier${p.outliersInScope > 1 ? "s" : ""})`;
}

// ---------------------------------------------------------------- 1 Summary

export function SummaryTab({ report }: TabProps) {
  const p = report.portfolio;
  const houses = report.houses.filter((h) => report.perHouse[h.id]?.houseMonths > 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Houses" value={houses.length} />
        <Stat label="Months" value={report.months.length} sub={`${p.houseMonths} house-months (${p.fullHouseMonths} full)`} />
        <Stat label="Collected" value={fmtMoney(p.collected)} sub="Gross, from PadSplit's summary" />
        <Stat label="Collection rate" value={<RateLike v={p.collectionRate.value} title={`${fmtMoney(p.collected)} of ${fmtMoney(p.collectionRate.den)}`} />} sub="Collected ÷ (collected + breakage)" />
        <Stat label="Breakage" value={fmtMoney(p.breakage)} sub={breakageLine(report)} />
        <Stat label="Breakage rate" value={<RateLike v={p.breakageRate.value} title={`${fmtMoney(p.breakage)} of ${fmtMoney(p.breakageRate.den)}`} />} />
        <Stat label="Breakage per house-month" value={fmtMoney(p.breakagePerHouseMonth.value)} sub={`${p.houseMonths} house-months`} />
        <Stat label="Outliers removed" value={report.options.includeOutliers ? "0 (included)" : report.outliers.list.length} sub={report.outliers.applied ? `Fence ${fmtMoney(report.outliers.fence)}` : `Needs ${RULES.outlierMinSample}+ residents who left owing`} />
      </div>
      {report.findings.length > 0 && (
        <Panel title="What stands out">
          <ol className="space-y-3 list-decimal pl-5 text-charcoal leading-relaxed">
            {report.findings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
        </Panel>
      )}
      <Panel title="By house">
        <DataTable
          rows={houses}
          columns={[
            { key: "h", label: "House", render: (h) => h.name },
            { key: "hm", label: "House-months", align: "right", render: (h) => report.perHouse[h.id].houseMonths },
            { key: "c", label: "Collected", align: "right", render: (h) => fmtMoney(report.perHouse[h.id].collected) },
            { key: "b", label: "Breakage", align: "right", render: (h) => fmtMoney(report.perHouse[h.id].breakage) },
            {
              key: "bhm",
              label: "Per house-month",
              align: "right",
              render: (h) => (
                <>
                  {fmtMoney(report.perHouse[h.id].breakagePerHouseMonth.value)}
                  {report.perHouse[h.id].breakagePerHouseMonth.small && <SmallSample />}
                </>
              ),
            },
            { key: "lo", label: "Left owing", align: "right", render: (h) => <RateText rate={report.perHouse[h.id].leftOwing} unit="move-outs" digits={0} /> },
          ]}
        />
      </Panel>
      <p className="text-xs text-warmgray">
        House names come from the street address.{" "}
        {houses.length < report.houses.length &&
          `${report.houses.length - houses.length} house(s) had no month over $${RULES.houseMonthMinGross} in this period and are hidden.`}
      </p>
    </div>
  );
}

function RateLike({ v, title }: { v: number | null; title: string }) {
  return (
    <span title={title} className="cursor-help underline decoration-dotted decoration-warmgray-light underline-offset-4">
      {fmtPct(v)}
    </span>
  );
}

// ---------------------------------------------------------------- 2 Requests

export function RequestsTab({ report }: TabProps) {
  const p = report.portfolio;
  const months = report.requestsByMonth;
  return (
    <div className="space-y-6">
      <Notice>
        A booking request charges the first week up front. A full refund means the person never moved in. The export
        doesn&apos;t say whether you declined or they cancelled, so “not accepted” covers both. Residents already
        living there when the export starts aren&apos;t counted as requests.
      </Notice>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="Booking requests" value={p.requests} />
        <Stat label="Moved in" value={p.accepted.n} />
        <Stat label="Acceptance" value={<RateText rate={p.accepted} unit="requests" />} />
      </div>
      <ChartCard
        title={`${p.accepted.n} of ${p.requests} booking requests turned into move-ins.`}
        chart={
          <GroupedColumns
            categories={months.map((m) => monthLabel(m.month))}
            series={[
              { label: "Requests", values: months.map((m) => m.requests) },
              { label: "Move-ins", values: months.map((m) => m.moveIns) },
            ]}
            format={(v) => String(Math.round(v))}
          />
        }
        table={
          <DataTable
            rows={months}
            columns={[
              { key: "m", label: "Month", render: (m) => monthLabel(m.month) },
              { key: "r", label: "Requests", align: "right", render: (m) => m.requests },
              { key: "a", label: "Accepted", align: "right", render: (m) => m.accepted },
              { key: "i", label: "Move-ins", align: "right", render: (m) => m.moveIns },
            ]}
          />
        }
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="By house">
          <DataTable
            rows={report.houses.filter((h) => report.perHouse[h.id].requests > 0)}
            columns={[
              { key: "h", label: "House", render: (h) => h.name },
              { key: "r", label: "Requests", align: "right", render: (h) => report.perHouse[h.id].requests },
              { key: "a", label: "Moved in", align: "right", render: (h) => report.perHouse[h.id].accepted.n },
              { key: "p", label: "Accepted", align: "right", render: (h) => <RateText rate={report.perHouse[h.id].accepted} unit="requests" digits={0} /> },
            ]}
          />
        </Panel>
        <Panel title="By weekly price">
          <DataTable
            rows={report.pricing.bands}
            columns={[
              { key: "b", label: "Weekly dues", render: (b) => b.band },
              { key: "r", label: "Requests", align: "right", render: (b) => b.requests },
              { key: "a", label: "Accepted", align: "right", render: (b) => <RateText rate={b.accepted} unit="requests" digits={0} /> },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- 3 Stays

export function StaysTab({ report }: TabProps) {
  const p = report.portfolio;
  const months = report.requestsByMonth;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Move-outs" value={p.moveOuts} />
        <Stat label="Average stay" value={days(p.stays.avg)} sub={`Median ${days(p.stays.median)}`} />
        <Stat label="Short stays" value={<RateText rate={p.stays.short} unit="stays" digits={0} />} sub={`Under ${RULES.stayShortDays} days`} />
        <Stat label="Long stays" value={<RateText rate={p.stays.long} unit="stays" digits={0} />} sub="Over 6 months" />
      </div>
      {p.stays.alreadyLiving > 0 && (
        <p className="text-sm text-warmgray">
          {p.stays.alreadyLiving} residents who moved out were already living there when the export starts. Their stays
          are “at least” the length we can see, so they&apos;re left out of these averages (but not out of breakage).
        </p>
      )}
      <Panel title="Stays by house (residents who moved out)">
        <DataTable
          rows={report.houses.filter((h) => report.perHouse[h.id].moveOuts > 0)}
          columns={[
            { key: "h", label: "House", render: (h) => h.name },
            { key: "n", label: "Stays", align: "right", render: (h) => report.perHouse[h.id].stays.count },
            { key: "a", label: "Average", align: "right", render: (h) => days(report.perHouse[h.id].stays.avg) },
            { key: "m", label: "Median", align: "right", render: (h) => days(report.perHouse[h.id].stays.median) },
            { key: "mn", label: "Min", align: "right", render: (h) => days(report.perHouse[h.id].stays.min) },
            { key: "mx", label: "Max", align: "right", render: (h) => days(report.perHouse[h.id].stays.max) },
            { key: "s", label: "Short", align: "right", render: (h) => <RateText rate={report.perHouse[h.id].stays.short} unit="stays" digits={0} /> },
            { key: "md", label: "Medium", align: "right", render: (h) => <RateText rate={report.perHouse[h.id].stays.medium} unit="stays" digits={0} /> },
            { key: "l", label: "Long", align: "right", render: (h) => <RateText rate={report.perHouse[h.id].stays.long} unit="stays" digits={0} /> },
          ]}
        />
      </Panel>
      <ChartCard
        title={`${months.reduce((a, m) => a + m.moveIns, 0)} move-ins and ${months.reduce((a, m) => a + m.moveOuts, 0)} move-outs across the portfolio.`}
        note={`Turnover: ${p.turnover.value == null ? "–" : p.turnover.value.toFixed(2)} move-outs per house per month.`}
        chart={
          <GroupedColumns
            categories={months.map((m) => monthLabel(m.month))}
            series={[
              { label: "Move-ins", values: months.map((m) => m.moveIns) },
              { label: "Move-outs", values: months.map((m) => m.moveOuts) },
            ]}
            format={(v) => String(Math.round(v))}
          />
        }
        table={
          <DataTable
            rows={months}
            columns={[
              { key: "m", label: "Month", render: (m) => monthLabel(m.month) },
              { key: "i", label: "Move-ins", align: "right", render: (m) => m.moveIns },
              { key: "o", label: "Move-outs", align: "right", render: (m) => m.moveOuts },
            ]}
          />
        }
      />
    </div>
  );
}

// ---------------------------------------------------------------- 4 Collections

export function CollectionsTab({ report }: TabProps) {
  const p = report.portfolio;
  const monthly = report.monthly;
  const fees = p.fees;
  return (
    <div className="space-y-6">
      <ChartCard
        title={`${fmtMoney(p.collected)} collected over ${report.months.length} months.`}
        note="Hollow point: the month PadSplit is still collecting."
        chart={<TrendLine points={monthly.map((m) => ({ month: m.month, value: m.gross, dashed: m.inFlight }))} format={(v) => fmtMoney(v)} />}
        table={<MonthTable rows={monthly} />}
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="What was collected">
          <DataTable
            rows={[...p.byBillType, { type: "PadSplit credits (not from residents)", amount: p.padsplitCredits }]}
            columns={[
              { key: "t", label: "Type", render: (r) => r.type },
              { key: "a", label: "Amount", align: "right", render: (r) => fmtMoney(r.amount) },
              { key: "p", label: "Share", align: "right", render: (r) => pct0(p.collected ? r.amount / p.collected : null) },
            ]}
          />
        </Panel>
        <Panel title="PadSplit fees">
          <DataTable
            rows={[
              { k: "Booking fees", v: fees.booking },
              { k: "Service fees", v: fees.service },
              { k: "Transaction fees", v: fees.transaction },
              { k: "Total", v: fees.total },
            ]}
            columns={[
              { key: "k", label: "Fee", render: (r) => r.k },
              { key: "v", label: "Amount", align: "right", render: (r) => fmtMoney(r.v) },
              { key: "p", label: "% of gross", align: "right", render: (r) => fmtPct(p.collected ? r.v / p.collected : null) },
            ]}
          />
        </Panel>
      </div>
      <Panel title="By house">
        <DataTable
          rows={report.houses.filter((h) => report.perHouse[h.id].houseMonths > 0)}
          columns={[
            { key: "h", label: "House", render: (h) => h.name },
            { key: "c", label: "Collected", align: "right", render: (h) => fmtMoney(report.perHouse[h.id].collected) },
            { key: "b", label: "Net billed", align: "right", render: (h) => fmtMoney(report.perHouse[h.id].netBilled) },
            { key: "e", label: "Host earnings", align: "right", render: (h) => fmtMoney(report.perHouse[h.id].hostEarnings) },
            { key: "r", label: "Collection rate", align: "right", render: (h) => fmtPct(report.perHouse[h.id].collectionRate.value) },
          ]}
        />
      </Panel>
      {report.unallocatedCredits.some((u) => Math.abs(u.amount) > RULES.moneyTolerance) && (
        <Panel title="PadSplit credits not tied to a house">
          <DataTable
            rows={report.unallocatedCredits.filter((u) => Math.abs(u.amount) > RULES.moneyTolerance)}
            columns={[
              { key: "m", label: "Month", render: (u) => monthLabel(u.month) },
              { key: "a", label: "Amount", align: "right", render: (u) => fmtMoney(u.amount, 2) },
            ]}
          />
        </Panel>
      )}
    </div>
  );
}

function MonthTable({ rows }: { rows: MonthRow[] }) {
  return (
    <DataTable
      rows={rows}
      columns={[
        { key: "m", label: "Month", render: (m) => `${monthLabel(m.month)}${m.inFlight ? " (collecting)" : ""}` },
        { key: "g", label: "Collected", align: "right", render: (m) => fmtMoney(m.gross) },
        { key: "b", label: "Net billed", align: "right", render: (m) => fmtMoney(m.netBilled) },
        { key: "r", label: "PadSplit rate", align: "right", render: (m) => fmtPct(m.padsplitRate, 0) },
        { key: "h", label: "Host earnings", align: "right", render: (m) => fmtMoney(m.hostEarnings) },
      ]}
    />
  );
}

// ---------------------------------------------------------------- 5 Breakage

export function BreakageTab({ report, name }: TabProps) {
  const p = report.portfolio;
  const houses = report.houses.filter((h) => report.perHouse[h.id].houseMonths > 0);
  const co = report.currentOwed;
  return (
    <div className="space-y-6">
      <Notice>
        Breakage is money residents left without paying when they moved out: what they were billed, minus credits,
        minus what they paid.
      </Notice>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Breakage" value={fmtMoney(p.breakage)} sub={breakageLine(report)} />
        <Stat label="Left owing" value={<RateText rate={p.leftOwing} unit="move-outs" />} sub={`${p.leftOwing.n} of ${p.moveOuts} move-outs`} />
        <Stat label="Average balance left" value={fmtMoney(p.balance.avg)} sub={`Median ${fmtMoney(p.balance.median)} · range ${fmtMoney(p.balance.min)}–${fmtMoney(p.balance.max)}`} />
        <Stat label="Per move-out" value={fmtMoney(p.breakagePerMoveOut.value)} sub={`Per house-month ${fmtMoney(p.breakagePerHouseMonth.value)}`} />
      </div>
      {report.outliers.list.length > 0 && !report.options.includeOutliers && (
        <p className="text-sm text-warmgray">
          With outliers in: average {fmtMoney(p.balanceWithOutliers.avg)}, median {fmtMoney(p.balanceWithOutliers.median)}.
        </p>
      )}
      <ChartCard
        title={`A typical house-month loses ${fmtMoney(p.breakageByMonth.median)} to breakage; the worst lost ${fmtMoney(p.breakageByMonth.max)}.`}
        note="Each bar runs from a house's lowest month to its highest; the dot is its median month. Breakage is placed in the month of the unpaid bill."
        chart={
          <RangeBars
            rows={[
              { label: "All houses", ...p.breakageByMonth },
              ...houses.map((h) => ({ label: h.name, ...report.perHouse[h.id].breakageByMonth })),
            ]}
            format={(v) => fmtMoney(v)}
          />
        }
        table={
          <DataTable
            rows={[{ label: "All houses", m: p }, ...houses.map((h) => ({ label: h.name, m: report.perHouse[h.id] }))]}
            columns={[
              { key: "h", label: "House", render: (r) => r.label },
              { key: "mn", label: "Min", align: "right", render: (r) => fmtMoney(r.m.breakageByMonth.min) },
              { key: "md", label: "Median", align: "right", render: (r) => fmtMoney(r.m.breakageByMonth.median) },
              { key: "mx", label: "Max", align: "right", render: (r) => fmtMoney(r.m.breakageByMonth.max) },
              { key: "t", label: "Total", align: "right", render: (r) => fmtMoney(r.m.breakage) },
            ]}
          />
        }
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Paid after moving out">
          <p className="text-charcoal">
            <RateText rate={p.recovery.residents} unit="residents who owed at move-out" /> of residents who owed at
            move-out paid something more than {RULES.recoveryDays} days later: {fmtMoney(p.recovery.recovered)} of{" "}
            {fmtMoney(p.recovery.owedAtExit)} owed at exit.
          </p>
        </Panel>
        <Panel title="Still owed by current residents">
          <DataTable
            rows={[
              { k: "Billed in the last 7 days (probably not late yet)", v: co.last7 },
              { k: "Billed earlier this month", v: co.thisMonth },
              { k: "Older", v: co.older },
              { k: `Total, ${co.residents} residents`, v: co.total },
            ]}
            columns={[
              { key: "k", label: "Bill age", render: (r) => r.k },
              { key: "v", label: "Owed", align: "right", render: (r) => fmtMoney(r.v) },
            ]}
          />
        </Panel>
      </div>
      <Panel title="Largest balances left">
        <DataTable
          rows={report.largestBalances}
          columns={[
            { key: "n", label: "Resident", render: (r) => name(r.key, r.name) },
            { key: "h", label: "House", render: (r) => r.house },
            { key: "b", label: "Balance", align: "right", render: (r) => fmtMoney(r.balance, 2) },
            { key: "o", label: "", render: (r) => (r.outlier ? <span className="text-xs text-gold-dark">outlier</span> : null) },
          ]}
        />
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- 6 Credits

export function CreditsTab({ report, name }: TabProps) {
  const c = report.credits;
  const buckets = c.totals.filter((t) => Math.abs(t.amount) > RULES.moneyTolerance);
  const houses = report.houses.filter((h) => c.byHouse[h.id]);
  const shown = (Object.keys(CREDIT_LABELS) as CreditBucket[]).filter((b) => houses.some((h) => Math.abs(c.byHouse[h.id][b] ?? 0) > RULES.moneyTolerance));
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="Money given up on real residents" value={fmtMoney(c.givenUp)} sub="Every credit except booking refunds and duplicate charges" />
        <Stat label="Waived dues" value={fmtMoney(c.waivedDues)} sub="All waivers of weekly dues, refunds included" />
        <Stat label="Booking refunds" value={fmtMoney(c.totals.find((t) => t.bucket === "booking_refund")?.amount)} sub="Not lost money" />
      </div>
      <ChartCard
        title={`${fmtMoney(c.givenUp)} in credits went to residents who moved in.`}
        note="Booking refunds and duplicate move-in charges cancel charges that were never really owed, so they aren't lost money."
        chart={
          <HBars
            rows={buckets.map((t) => ({
              label: t.label.replace(" (not lost money)", ""),
              value: t.amount,
              muted: t.notLost,
              tooltip: `${t.label}: ${fmtMoney(t.amount, 2)}`,
            }))}
            format={(v) => fmtMoney(v)}
          />
        }
        table={
          <DataTable
            rows={c.totals}
            columns={[
              { key: "l", label: "Credit", render: (t) => t.label },
              { key: "a", label: "Amount", align: "right", render: (t) => fmtMoney(t.amount, 2) },
            ]}
          />
        }
      />
      <Panel title="Waived dues, sorted by when they happened">
        <DataTable
          rows={c.waivedDuesByBucket}
          columns={[
            { key: "l", label: "Kind", render: (t) => t.label },
            { key: "a", label: "Amount", align: "right", render: (t) => fmtMoney(t.amount, 2) },
          ]}
        />
        <p className="mt-3 text-xs text-warmgray">
          We sort waivers by timing only: at a booking refund, within {RULES.duplicateMoveInDays} days of the first bill,
          near a transfer, in the last {RULES.moveOutWaiverDays} days before move-out, or mid-stay. The export doesn&apos;t
          say why a waiver was given.
        </p>
      </Panel>
      <Panel title="By house">
        <DataTable
          rows={houses}
          columns={[
            { key: "h", label: "House", render: (h) => h.name },
            ...shown.map((b) => ({
              key: b,
              label: CREDIT_LABELS[b].replace(" (not lost money)", "*"),
              align: "right" as const,
              render: (h: (typeof houses)[number]) => fmtMoney(c.byHouse[h.id][b] ?? 0),
            })),
          ]}
        />
        <p className="mt-2 text-xs text-warmgray">* Not lost money.</p>
      </Panel>
      <Panel title="Stay rewards">
        <p className="text-charcoal leading-relaxed">
          {report.stayRewards.residents} residents got {report.stayRewards.rewards} stay rewards:{" "}
          {fmtMoney(report.stayRewards.gross, 2)} gross, {fmtMoney(report.stayRewards.net, 2)} after adjustments
          {report.stayRewards.dayRange.min != null && `, given on day ${report.stayRewards.dayRange.min}–${report.stayRewards.dayRange.max} of the stay`}.
        </p>
        <p className="mt-2 text-sm text-warmgray">
          Of residents who stayed {RULES.stayRewardCompareDays}+ days and moved out,{" "}
          <RateText rate={report.stayRewards.longStayCompare.withReward} unit="with a reward" digits={0} /> with a reward left
          owing vs <RateText rate={report.stayRewards.longStayCompare.withoutReward} unit="without one" digits={0} /> without.
          Everyone who gets a reward has already stayed about 6 months, so this can&apos;t show rewards make people stay longer.
        </p>
      </Panel>
      {c.midStayRows.length > 0 && (
        <Panel title="Dues waived mid-stay (unexplained)">
          <DataTable
            rows={c.midStayRows}
            columns={[
              { key: "n", label: "Resident", render: (r) => name(r.key, r.name) },
              { key: "h", label: "House", render: (r) => r.house },
              { key: "d", label: "Date", render: (r) => dayToISO(r.day) },
              { key: "a", label: "Amount", align: "right", render: (r) => fmtMoney(r.amount, 2) },
            ]}
          />
        </Panel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- 7 Warning signs

export function SignalsTab({ report, name }: TabProps) {
  const head = report.signals.find((s) => s.headline);
  const base = report.signals[0]?.base;
  const rw = report.runway;
  return (
    <div className="space-y-6">
      <ChartCard
        title={
          head && head.withSignal.value != null
            ? `${fmtPct(head.withSignal.value, 0)} of residents with 2+ late fees in a row left owing, vs ${fmtPct(head.withoutSignal.value, 0)} without.`
            : "Share of move-outs who left owing, by warning sign."
        }
        note={`Bar: share who left owing with the sign. Black tick: share without it. Dashed line: everyone (${base ? `${base.n} of ${base.d}` : ""}). Pale bars were expected not to be signs.`}
        chart={
          <HBars
            rows={report.signals.map((s) => ({
              label: s.label,
              value: s.withSignal.value,
              tick: s.withoutSignal.value,
              muted: s.expectedNotASign,
              tooltip: `${s.label}: ${s.withSignal.n} of ${s.withSignal.d} left owing with it; ${s.withoutSignal.n} of ${s.withoutSignal.d} without${s.withSignal.small ? " (small sample)" : ""}`,
            }))}
            format={(v) => fmtPct(v, 0)}
            max={1}
            reference={base?.value ?? null}
            referenceLabel="Everyone"
          />
        }
        table={
          <DataTable
            rows={report.signals}
            columns={[
              { key: "l", label: "Sign", render: (s) => s.label + (s.exitSign ? " (exit sign)" : "") },
              { key: "n", label: "Residents", align: "right", render: (s) => s.withSignal.d },
              { key: "w", label: "Left owing with", align: "right", render: (s) => <RateText rate={s.withSignal} unit="residents with it" /> },
              { key: "o", label: "Without", align: "right", render: (s) => <RateText rate={s.withoutSignal} unit="residents without it" /> },
              { key: "b", label: "Everyone", align: "right", render: (s) => <RateText rate={s.base} unit="move-outs" /> },
              { key: "a", label: "Avg balance left", align: "right", render: (s) => fmtMoney(s.avgBalanceOwing) },
            ]}
          />
        }
      />
      <p className="text-sm text-warmgray">
        “No payment in the final 2+ weeks” describes the exit itself, so it shows up too late to act on. Late-fee runs
        are the earlier warning.
      </p>
      <Panel title="Runway: how much time you get">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="First late fee → move-out" value={days(rw.firstLateToMoveOut)} sub="Median" />
          <Stat label="Final run starts → move-out" value={days(rw.finalRunToMoveOut)} sub="Median" />
          <Stat label="Balance at 2nd late fee in a row" value={fmtMoney(rw.balanceAtSecondLate)} sub="Median" />
          <Stat label="Then move-out after" value={rw.daysAfterSecondLate == null ? "–" : `${rw.daysAfterSecondLate} days`} sub="Median" />
        </div>
        <p className="mt-3 text-xs text-warmgray">From the {rw.sample} residents who left owing.</p>
      </Panel>
      <Panel title="Watch list: current residents">
        <DataTable
          rows={report.watchList}
          empty="No current resident has 2+ late fees in a row or 14+ days without a payment with a balance over $100."
          columns={[
            { key: "n", label: "Resident", render: (r) => name(r.key, r.name) },
            { key: "h", label: "House", render: (r) => r.house },
            { key: "r", label: "Late fees in a row", align: "right", render: (r) => r.currentRun || "–" },
            { key: "d", label: "Days since payment", align: "right", render: (r) => r.daysSincePayment ?? "never paid" },
            { key: "b", label: "Balance", align: "right", render: (r) => fmtMoney(r.balance, 2) },
          ]}
        />
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- 8 Ramp-up

export function RampTab({ report, houseName, rooms, onRooms }: TabProps) {
  const occ = report.occupancy.filter((o) => o.months.length);
  const first6 = [1, 2, 3, 4, 5, 6];
  const events = report.events;
  return (
    <div className="space-y-6">
      <Panel title="Rooms per house">
        <p className="text-sm text-warmgray mb-3">
          We start with the most rooms we saw paying in any month. Correct it if a room sat empty the whole time.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {occ.map((o) => (
            <label key={o.houseId} className="text-sm text-charcoal">
              <span className="block text-xs text-warmgray mb-1">{houseName(o.houseId)}</span>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={rooms[o.houseId] ?? o.rooms}
                onChange={(e) => onRooms(o.houseId, Number(e.target.value))}
              />
            </label>
          ))}
        </div>
      </Panel>
      <ChartCard
        title="Occupancy in each house's first six months."
        note="Month 1 is a house's first month over $300 collected. Houses already running when the export starts begin at the export's first month, so their early months aren't a true ramp-up."
        chart={
          <GroupedColumns
            categories={first6.map((n) => `Month ${n}`)}
            series={occ.map((o, i) => ({
              label: houseName(o.houseId) + (o.startedBeforeExport ? " (already running)" : ""),
              color: SERIES[i % SERIES.length],
              values: first6.map((n) => o.months.find((m) => m.monthNumber === n)?.occupancy ?? null),
            }))}
            format={(v) => fmtPct(v, 0)}
          />
        }
        table={
          <DataTable
            rows={occ}
            columns={[
              { key: "h", label: "House", render: (o) => houseName(o.houseId) },
              ...first6.map((n) => ({
                key: `m${n}`,
                label: `M${n}`,
                align: "right" as const,
                render: (o: (typeof occ)[number]) => {
                  const m = o.months.find((x) => x.monthNumber === n);
                  return m ? `${m.occupied}/${m.rooms}` : "–";
                },
              })),
            ]}
          />
        }
      />
      <Panel title="Stabilization">
        <DataTable
          rows={occ}
          columns={[
            { key: "h", label: "House", render: (o) => houseName(o.houseId) },
            {
              key: "s",
              label: "Months to stabilize",
              align: "right",
              render: (o) =>
                o.monthsToStabilize == null
                  ? "not yet"
                  : `${o.monthsToStabilize}${o.startedBeforeExport ? " (already running)" : ""}`,
            },
            { key: "o", label: "Avg occupancy", align: "right", render: (o) => fmtPct(o.occupancyAvg, 0) },
            { key: "t", label: "True room rate", align: "right", render: (o) => fmtMoney(o.trueRoomRate) },
          ]}
        />
        <p className="mt-3 text-xs text-warmgray">
          Stabilized: the first of {RULES.stableConsecutiveMonths} months in a row at {RULES.stableOccupancy * 100}%+ occupancy
          and a {RULES.stableCollectionRate * 100}%+ collection rate. True room rate: median host earnings per occupied room
          per month, leaving out ramp-up months and the month still collecting.
        </p>
      </Panel>
      {occ.map((o) => {
        const evs = events.filter((e) => e.houseId === o.houseId);
        return (
          <ChartCard
            key={o.houseId}
            title={
              evs.length
                ? `${houseName(o.houseId)}: ${evs.length} destabilization event${evs.length > 1 ? "s" : ""}, shaded.`
                : `${houseName(o.houseId)}: no destabilization events.`
            }
            chart={
              <TrendLine
                points={o.months.map((m) => ({ month: m.month, value: m.gross, dashed: m.inFlight }))}
                shaded={evs.map((e) => ({ start: e.start, end: e.end, label: e.triggers.join("; ") }))}
                format={(v) => fmtMoney(v)}
                height={150}
              />
            }
            table={
              <DataTable
                rows={o.months}
                columns={[
                  { key: "m", label: "Month", render: (m) => `${monthLabel(m.month)}${m.ramp ? " (ramp)" : ""}` },
                  { key: "g", label: "Collected", align: "right", render: (m) => fmtMoney(m.gross) },
                  { key: "o", label: "Occupied", align: "right", render: (m) => `${m.occupied}/${m.rooms}` },
                  { key: "r", label: "Collection rate", align: "right", render: (m) => fmtPct(m.collectionRate, 0) },
                ]}
              />
            }
          />
        );
      })}
      <Panel title="Destabilization events">
        <DataTable
          rows={events}
          empty="No events: no 3+ move-outs within 30 days and no month 30%+ below its trailing 3-month median."
          columns={[
            { key: "h", label: "House", render: (e) => houseName(e.houseId) },
            { key: "s", label: "Start", render: (e) => (e.startDay != null ? dayToISO(e.startDay) : monthLabel(e.start)) },
            { key: "e", label: "End", render: (e) => monthLabel(e.end) },
            { key: "o", label: "Move-outs", align: "right", render: (e) => e.moveOuts },
            { key: "l", label: "Lowest month", align: "right", render: (e) => (e.lowestMonth ? `${fmtMoney(e.lowestGross)} (${monthLabel(e.lowestMonth)})` : "–") },
            { key: "b", label: "Below normal", align: "right", render: (e) => fmtMoney(e.belowNormal) },
            { key: "r", label: "Months to recover", align: "right", render: (e) => e.monthsToRecover ?? "not yet" },
          ]}
        />
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- 9 Pricing

export function PricingTab({ report }: TabProps) {
  const pr = report.pricing;
  const corr = (v: number | null) => (v == null ? "–" : v.toFixed(2));
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="Median weekly dues" value={fmtMoney(pr.medianPrice)} sub="Residents who moved in" />
        <Stat label="Price vs balance left" value={corr(report.options.includeOutliers ? pr.correlation : pr.correlationWithoutOutliers)} sub={`Correlation, ${pr.correlationSample} move-outs`} />
        <Stat label="With outliers in" value={corr(pr.correlation)} sub="Near 0 means price doesn't predict balance" />
      </div>
      <Panel title="By weekly price">
        <DataTable
          rows={pr.bands}
          columns={[
            { key: "b", label: "Weekly dues", render: (b) => b.band },
            { key: "r", label: "Requests", align: "right", render: (b) => b.requests },
            { key: "a", label: "Accepted", align: "right", render: (b) => <RateText rate={b.accepted} unit="requests" digits={0} /> },
            { key: "o", label: "Move-outs", align: "right", render: (b) => b.moveOuts },
            { key: "l", label: "Left owing", align: "right", render: (b) => <RateText rate={b.leftOwing} unit="move-outs" digits={0} /> },
            { key: "k", label: "Breakage", align: "right", render: (b) => fmtMoney(b.breakage) },
            { key: "p", label: "Per move-out", align: "right", render: (b) => fmtMoney(b.breakagePerMoveOut) },
          ]}
        />
        <p className="mt-3 text-xs text-warmgray">
          Weekly price is the median of a resident&apos;s weekly dues, leaving out a prorated first bill. For a request that
          never moved in, it&apos;s the dues they were charged.
        </p>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- 10 Data check

export function DataCheckTab({ report, analysis, showNames }: TabProps) {
  const unknown = unrecognizedItems(analysis.ledger!);
  return (
    <div className="space-y-6">
      <ChecksList checks={analysis.checks} showNames={showNames} />
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Resident groups">
          <DataTable
            rows={(Object.keys(report.groups) as ResidentGroup[]).map((g) => ({ g, n: report.groups[g] }))}
            columns={[
              { key: "g", label: "Group", render: (r) => GROUP_LABELS[r.g] },
              { key: "n", label: "Residents", align: "right", render: (r) => r.n },
            ]}
          />
        </Panel>
        <Panel title="Unrecognized line items">
          <DataTable
            rows={unknown}
            empty="None. Every line item matched the glossary."
            columns={[
              { key: "r", label: "Item", render: (u) => u.reason },
              { key: "t", label: "Type", render: (u) => u.type },
              { key: "c", label: "Rows", align: "right", render: (u) => u.count },
              { key: "a", label: "Amount", align: "right", render: (u) => fmtMoney(u.amount, 2) },
            ]}
          />
        </Panel>
      </div>
      <Panel title="Glossary">
        <DataTable
          rows={GLOSSARY}
          columns={[
            { key: "i", label: "Item", render: (g) => <code className="text-xs">{g.item}</code> },
            { key: "t", label: "Type", render: (g) => g.type },
            { key: "m", label: "What it means", render: (g) => g.meaning },
          ]}
        />
      </Panel>
      <Panel title={`Rules version ${RULES_VERSION}`}>
        <ul className="text-sm text-warmgray space-y-1">
          {RULES_CHANGELOG.map((c) => (
            <li key={c.version}>
              {c.date} · {c.version}: {c.note}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
