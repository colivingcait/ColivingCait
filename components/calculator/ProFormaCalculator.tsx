"use client";

import { useEffect, useMemo, useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { cn } from "@/lib/cn";
import {
  type DollarOrPct,
  type MonthlyOrAnnual,
  type ProFormaInputs,
  type ProFormaResults,
  DEFAULT_PROFORMA,
  SUGGESTION_RATES,
  calculateProForma,
  suggestExpenses,
} from "@/lib/proforma-calculator";
import {
  fmtMoney,
  fmtMoneySigned,
  fmtPercent,
} from "@/lib/coliving-calculator";
import { CK_TAGS } from "@/lib/convertkit";
import {
  getVisitorEmail,
  getVisitorFirstName,
  rememberVisitor,
} from "@/lib/visitor";

// Fully-editable Pro Forma calculator. Inputs live on the left, the pro
// forma statement updates live on a sticky panel to the right — every
// number is a starting point the operator can override.
export default function ProFormaCalculator() {
  const [inputs, setInputs] = useState<ProFormaInputs>(DEFAULT_PROFORMA);
  const [propertyLabel, setPropertyLabel] = useState("");
  // The intake modal collects the core deal facts up front, then the full
  // editor takes over. Shown once on first load.
  const [showIntake, setShowIntake] = useState(true);

  // PDF download is gated behind a name + email capture.
  const [showPdfGate, setShowPdfGate] = useState(false);
  const [leadName, setLeadName] = useState("");

  const results = useMemo(() => calculateProForma(inputs), [inputs]);

  const rateSuffix = inputs.rentFrequency === "weekly" ? "/wk" : "/mo";

  const set = <K extends keyof ProFormaInputs>(
    key: K,
    value: ProFormaInputs[K],
  ) => setInputs((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setInputs(DEFAULT_PROFORMA);
    setPropertyLabel("");
  };

  // Capture the lead, then trigger the browser's print/Save-as-PDF dialog.
  const handlePdfSubmit = async (name: string, email: string) => {
    setLeadName(name);
    rememberVisitor(email, name);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: name,
          tag_name: CK_TAGS.PRO_FORMA_PDF_DOWNLOADED,
        }),
      });
    } catch {
      // Don't block the download on a network hiccup.
    }
    setShowPdfGate(false);
    if (typeof window !== "undefined") {
      // Let the modal unmount before the print dialog paints.
      setTimeout(() => window.print(), 50);
    }
  };

  // Fill the expense fields with estimates derived from the property. The
  // operator opts in by clicking, and every value stays editable after.
  const applySuggestedExpenses = () =>
    setInputs((prev) => ({ ...prev, ...suggestExpenses(prev) }));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
      {showIntake && (
        <IntakeModal
          inputs={inputs}
          set={set}
          results={results}
          rateSuffix={rateSuffix}
          onSuggest={applySuggestedExpenses}
          onClose={() => setShowIntake(false)}
        />
      )}
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(340px,400px)] lg:gap-12">
        {/* ---------------- Inputs ---------------- */}
        <div className="space-y-12">
          {/* Optional label — shows up as the heading on the PDF report */}
          <label className="block">
            <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
              Property label (optional)
            </span>
            <input
              type="text"
              value={propertyLabel}
              onChange={(e) => setPropertyLabel(e.target.value)}
              placeholder="123 Main St — 8-room coliving"
              className="mt-2 w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/50 focus:outline-none focus:border-gold transition-colors"
            />
          </label>

          {/* Property & financing */}
          <Group eyebrow="Property & financing" title="The purchase">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Purchase price"
                prefix="$"
                step={1000}
                value={inputs.purchasePrice}
                onChange={(v) => set("purchasePrice", v)}
              />
              <Field
                label="Rehab / renovation budget"
                prefix="$"
                step={1000}
                value={inputs.rehabBudget}
                onChange={(v) => set("rehabBudget", v)}
              />
              <Field
                label="Down payment"
                suffix="%"
                step={0.5}
                max={100}
                value={inputs.downPaymentPct}
                onChange={(v) => set("downPaymentPct", v)}
                hint={`= ${fmtMoney(results.downPayment)} down`}
              />
              <Field
                label="Closing costs"
                suffix="%"
                step={0.25}
                value={inputs.closingCostPct}
                onChange={(v) => set("closingCostPct", v)}
                hint={`= ${fmtMoney(results.closingCosts)}`}
              />
              <Field
                label="Interest rate"
                suffix="%"
                step={0.125}
                max={25}
                value={inputs.interestRate}
                onChange={(v) => set("interestRate", v)}
              />
              <Field
                label="Loan term"
                suffix="yrs"
                step={1}
                max={40}
                value={inputs.loanTermYears}
                onChange={(v) => set("loanTermYears", v)}
              />
            </div>
          </Group>

          {/* Income — built from the room mix */}
          <Group eyebrow="Income" title="What it rents for">
            <div className="-mt-2 mb-6 flex flex-wrap items-start justify-between gap-4">
              <p className="text-sm text-warmgray leading-body max-w-sm">
                Set the rate and number of rooms for each bathroom type. We&apos;ll
                total the gross rent for you.
              </p>
              <label className="shrink-0">
                <span className="block text-[10px] uppercase tracking-eyebrow text-charcoal/70 mb-1.5">
                  Rates are
                </span>
                <Segmented
                  value={inputs.rentFrequency}
                  onChange={(m) =>
                    set("rentFrequency", m as "weekly" | "monthly")
                  }
                  options={[
                    { value: "monthly", label: "Per month" },
                    { value: "weekly", label: "Per week" },
                  ]}
                />
              </label>
            </div>

            {/* Private-bath rooms */}
            <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
              Private-bath rooms
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Rate per room"
                prefix="$"
                suffix={rateSuffix}
                step={25}
                value={inputs.privateRoomRate}
                onChange={(v) => set("privateRoomRate", v)}
              />
              <Field
                label="Number of rooms"
                step={1}
                value={inputs.privateRoomCount}
                onChange={(v) => set("privateRoomCount", v)}
                hint={`= ${fmtMoney(results.privateRent)}/mo`}
              />
            </div>

            {/* Shared-bath rooms */}
            <p className="mt-8 text-[10px] uppercase tracking-eyebrow text-gold mb-3">
              Shared-bath rooms
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Rate per room"
                prefix="$"
                suffix={rateSuffix}
                step={25}
                value={inputs.sharedRoomRate}
                onChange={(v) => set("sharedRoomRate", v)}
              />
              <Field
                label="Number of rooms"
                step={1}
                value={inputs.sharedRoomCount}
                onChange={(v) => set("sharedRoomCount", v)}
                hint={`= ${fmtMoney(results.sharedRent)}/mo`}
              />
            </div>

            {/* Computed gross rent */}
            <div className="mt-7 flex items-baseline justify-between border border-brand bg-blush/40 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-eyebrow text-charcoal/60">
                  Gross rent ({results.totalRooms}{" "}
                  {results.totalRooms === 1 ? "room" : "rooms"})
                </p>
                {results.grossRent > 0 && (
                  <p className="mt-1 text-xs text-warmgray/70">
                    {fmtPercent(results.grossYield)} gross yield on price
                  </p>
                )}
              </div>
              <p className="font-heading text-3xl text-charcoal leading-heading tabular-nums">
                {fmtMoney(results.grossRent)}
                <span className="text-sm text-warmgray/70 font-sans"> / mo</span>
              </p>
            </div>

            {/* Vacancy + platform fee */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field
                label="Vacancy"
                suffix="%"
                step={1}
                max={100}
                value={inputs.vacancyPct}
                onChange={(v) => set("vacancyPct", v)}
                hint={`= −${fmtMoney(results.vacancy)}/mo`}
              />
              <Field
                label="Platform / PM fee"
                suffix="%"
                step={1}
                max={100}
                value={inputs.managementPct}
                onChange={(v) => set("managementPct", v)}
                hint={`= −${fmtMoney(results.managementFee)}/mo`}
              />
            </div>
          </Group>

          {/* Operating expenses */}
          <Group eyebrow="Operating expenses" title="What it costs to run">
            <div className="mb-6 border border-gold/40 bg-gold/[0.06] px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-warmgray leading-body max-w-md">
                  Not sure where to start? We&apos;ll suggest expenses from your
                  room count and price — then tweak anything.
                </p>
                <button
                  type="button"
                  onClick={applySuggestedExpenses}
                  className="shrink-0 text-xs uppercase tracking-button text-gold-dark hover:text-charcoal transition-colors border border-gold/60 px-3 py-1.5"
                >
                  ✦ Suggest expenses
                </button>
              </div>
              <p className="mt-2 text-[11px] text-warmgray/70 leading-body">
                Rules of thumb: utilities ${SUGGESTION_RATES.electricPerRoom}/room
                electric + ${SUGGESTION_RATES.waterMonthly} water + $
                {SUGGESTION_RATES.gasMonthly} gas + $
                {SUGGESTION_RATES.internetMonthly} internet · services $
                {SUGGESTION_RATES.cleaningMonthly +
                  SUGGESTION_RATES.lawnMonthly +
                  SUGGESTION_RATES.pestMonthly}
                /mo (cleaning ${SUGGESTION_RATES.cleaningMonthly}, lawn $
                {SUGGESTION_RATES.lawnMonthly}, pest ${SUGGESTION_RATES.pestMonthly})
                · {SUGGESTION_RATES.maintenancePctOfGross}% maintenance ·{" "}
                {SUGGESTION_RATES.capexPctOfGross}% CapEx ·{" "}
                {SUGGESTION_RATES.taxInsuranceAnnualPctOfPrice}%/yr taxes &amp;
                insurance.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <MonthlyAnnualField
                label="Taxes & insurance"
                field={inputs.taxesInsurance}
                onChange={(v) => set("taxesInsurance", v)}
                resolvedMonthly={results.taxesInsurance}
              />
              <Field
                label="Utilities (all-in)"
                prefix="$"
                step={10}
                value={inputs.utilities}
                onChange={(v) => set("utilities", v)}
                hint="Electric, water, gas, internet"
              />
              <Field
                label="Cleaning, lawn & pest"
                prefix="$"
                step={10}
                value={inputs.cleaningLawn}
                onChange={(v) => set("cleaningLawn", v)}
                hint="Cleaning, lawn care & pest control"
              />
              <Field
                label="Other (monthly)"
                prefix="$"
                step={10}
                value={inputs.otherExpense}
                onChange={(v) => set("otherExpense", v)}
                hint="Software or misc — anything else"
              />
              <DollarPctField
                label="Maintenance"
                field={inputs.maintenance}
                onChange={(v) => set("maintenance", v)}
                resolvedMonthly={results.maintenance}
              />
              <DollarPctField
                label="CapEx reserve"
                field={inputs.capexReserve}
                onChange={(v) => set("capexReserve", v)}
                resolvedMonthly={results.capexReserve}
              />
            </div>
          </Group>

          {/* Debt service */}
          <Group eyebrow="Debt service" title="The mortgage">
            <DebtServiceField
              inputs={inputs}
              results={results}
              onOverride={(v) => set("debtServiceOverride", v)}
            />
          </Group>

          <div className="flex flex-wrap items-center gap-5">
            <Button onClick={() => setShowPdfGate(true)} variant="primary" size="md">
              ↓ Download PDF
            </Button>
            <button
              type="button"
              onClick={() => setShowIntake(true)}
              className="text-xs uppercase tracking-button text-warmgray hover:text-gold transition-colors"
            >
              ✎ Edit basics
            </button>
            <button
              type="button"
              onClick={reset}
              className="text-xs uppercase tracking-button text-warmgray hover:text-gold transition-colors"
            >
              ↺ Clear all
            </button>
          </div>
        </div>

        {/* ---------------- Pro forma panel ---------------- */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ProFormaPanel r={results} />
          <p className="mt-3 text-center text-xs text-warmgray/60">
            <span className="text-gold">Download PDF</span> to save a copy of
            your pro forma.
          </p>
        </div>
      </div>

      {showPdfGate && (
        <PdfGateModal
          onSubmit={handlePdfSubmit}
          onClose={() => setShowPdfGate(false)}
        />
      )}

      {/* Print-only report — hidden on screen, the sole content when printing */}
      <PrintableReport
        inputs={inputs}
        r={results}
        label={propertyLabel}
        preparedFor={leadName}
      />
    </div>
  );
}

/* ================================================================ */
/* Input group wrapper                                               */
/* ================================================================ */
function Group({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Eyebrow className="mb-2">{eyebrow}</Eyebrow>
      <Heading size="sm">{title}</Heading>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* ================================================================ */
/* Number field (mirrors CalcInput's blank-on-zero pattern)          */
/* ================================================================ */
function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
  max,
  hint,
  className,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
        {label}
      </span>
      <div className="relative mt-2">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={value === 0 ? "" : value}
          placeholder="0"
          onChange={(e) => {
            const v = e.target.value === "" ? 0 : Number(e.target.value);
            onChange(Number.isFinite(v) ? v : 0);
          }}
          step={step}
          min={min}
          max={max}
          className={cn(
            "w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/50 focus:outline-none focus:border-gold transition-colors tabular-nums",
            prefix && "pl-8",
            suffix && "pr-12",
          )}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-warmgray/70">{hint}</p>}
    </label>
  );
}

/* ================================================================ */
/* Segmented unit toggle                                             */
/* ================================================================ */
function Segmented({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex border border-brand">
      {options.map((o, idx) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "px-3 py-1 text-[10px] font-medium uppercase tracking-button transition-colors",
            idx > 0 && "border-l border-brand",
            value === o.value
              ? "bg-charcoal text-cream"
              : "bg-white text-charcoal hover:bg-blush",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---- Dollar-or-percent field (Maintenance, CapEx) ---- */
function DollarPctField({
  label,
  field,
  onChange,
  resolvedMonthly,
}: {
  label: string;
  field: DollarOrPct;
  onChange: (v: DollarOrPct) => void;
  resolvedMonthly: number;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
          {label}
        </span>
        <Segmented
          value={field.mode}
          onChange={(m) =>
            onChange({ ...field, mode: m as DollarOrPct["mode"] })
          }
          options={[
            { value: "dollar", label: "$" },
            { value: "percent", label: "%" },
          ]}
        />
      </span>
      <div className="relative mt-2">
        {field.mode === "dollar" && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
            $
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={field.value === 0 ? "" : field.value}
          placeholder="0"
          onChange={(e) => {
            const v = e.target.value === "" ? 0 : Number(e.target.value);
            onChange({ ...field, value: Number.isFinite(v) ? v : 0 });
          }}
          step={field.mode === "percent" ? 0.5 : 10}
          min={0}
          className={cn(
            "w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/50 focus:outline-none focus:border-gold transition-colors tabular-nums",
            field.mode === "dollar" ? "pl-8" : "pr-8",
          )}
        />
        {field.mode === "percent" && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
            %
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-warmgray/70">
        {field.mode === "percent"
          ? `${fmtPercent(field.value)} of gross = ${fmtMoney(resolvedMonthly)}/mo`
          : `${fmtMoney(resolvedMonthly)}/mo`}
      </p>
    </label>
  );
}

/* ---- Monthly-or-annual field (Taxes & insurance) ---- */
function MonthlyAnnualField({
  label,
  field,
  onChange,
  resolvedMonthly,
}: {
  label: string;
  field: MonthlyOrAnnual;
  onChange: (v: MonthlyOrAnnual) => void;
  resolvedMonthly: number;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
          {label}
        </span>
        <Segmented
          value={field.mode}
          onChange={(m) =>
            onChange({ ...field, mode: m as MonthlyOrAnnual["mode"] })
          }
          options={[
            { value: "monthly", label: "/mo" },
            { value: "annual", label: "/yr" },
          ]}
        />
      </span>
      <div className="relative mt-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray/70 text-sm pointer-events-none">
          $
        </span>
        <input
          type="number"
          inputMode="decimal"
          value={field.value === 0 ? "" : field.value}
          placeholder="0"
          onChange={(e) => {
            const v = e.target.value === "" ? 0 : Number(e.target.value);
            onChange({ ...field, value: Number.isFinite(v) ? v : 0 });
          }}
          step={field.mode === "annual" ? 100 : 10}
          min={0}
          className="w-full border border-brand bg-white px-4 py-3 pl-8 text-sm font-sans text-charcoal placeholder:text-warmgray/50 focus:outline-none focus:border-gold transition-colors tabular-nums"
        />
      </div>
      <p className="mt-1.5 text-xs text-warmgray/70">
        {field.mode === "annual"
          ? `${fmtMoney(field.value)}/yr = ${fmtMoney(resolvedMonthly)}/mo`
          : `${fmtMoney(resolvedMonthly)}/mo`}
      </p>
    </label>
  );
}

/* ---- Debt service (auto from terms, with manual override) ---- */
function DebtServiceField({
  inputs,
  results,
  onOverride,
}: {
  inputs: ProFormaInputs;
  results: ProFormaResults;
  onOverride: (v: number | null) => void;
}) {
  const isOverride = inputs.debtServiceOverride !== null;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          value={isOverride ? "manual" : "auto"}
          onChange={(m) =>
            onOverride(m === "manual" ? results.debtService : null)
          }
          options={[
            { value: "auto", label: "Auto (P&I)" },
            { value: "manual", label: "Enter manually" },
          ]}
        />
        <span className="text-xs text-warmgray/70">
          {fmtMoney(results.loanAmount)} loan @ {fmtPercent(inputs.interestRate)} ·{" "}
          {inputs.loanTermYears} yr
        </span>
      </div>

      <div className="mt-4 max-w-xs">
        {isOverride ? (
          <Field
            label="Monthly debt service (P&I)"
            prefix="$"
            step={25}
            value={inputs.debtServiceOverride ?? 0}
            onChange={(v) => onOverride(v)}
          />
        ) : (
          <div className="border border-brand bg-blush/40 px-4 py-3">
            <p className="text-[10px] uppercase tracking-eyebrow text-charcoal/60">
              Calculated principal &amp; interest
            </p>
            <p className="mt-1 font-heading text-2xl text-charcoal leading-heading tabular-nums">
              {fmtMoney(results.debtService)}
              <span className="text-sm text-warmgray/70 font-sans"> / mo</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Pro Forma panel — the live statement                              */
/* ================================================================ */
function ProFormaPanel({ r }: { r: ProFormaResults }) {
  const cf = r.netCashFlow;
  return (
    <div className="bg-charcoal text-cream p-7 md:p-8 shadow-card">
      <p className="font-heading text-4xl leading-heading">Pro Forma</p>

      <div className="mt-6 space-y-0.5">
        <Line label="Gross rent" value={fmtMoney(r.grossRent)} />
        <Line
          label="Less vacancy"
          value={`(${fmtMoney(r.vacancy)})`}
          indent
          muted
        />
        <Line
          label="Less platform fee"
          value={`(${fmtMoney(r.managementFee)})`}
          indent
          muted
        />
        <Divider />
        <Line
          label="Effective income"
          value={fmtMoney(r.effectiveIncome)}
          bold
        />
        <Line
          label="Taxes & insurance"
          value={`(${fmtMoney(r.taxesInsurance)})`}
          indent
          muted
        />
        <Line
          label="Utilities (all-in)"
          value={`(${fmtMoney(r.utilities)})`}
          indent
          muted
        />
        <Line
          label="Cleaning, lawn & pest"
          value={`(${fmtMoney(r.cleaningLawn)})`}
          indent
          muted
        />
        <Line
          label="Maintenance"
          value={`(${fmtMoney(r.maintenance)})`}
          indent
          muted
        />
        <Line
          label="CapEx reserve"
          value={`(${fmtMoney(r.capexReserve)})`}
          indent
          muted
        />
        {r.otherExpense > 0 && (
          <Line
            label="Other"
            value={`(${fmtMoney(r.otherExpense)})`}
            indent
            muted
          />
        )}
        <Divider />
        <Line
          label="Net operating income"
          value={fmtMoney(r.noi)}
          bold
        />
        <Line
          label="Debt service (P&I)"
          value={`(${fmtMoney(r.debtService)})`}
          indent
          muted
        />
        <Divider />
        <Line
          label="Net cash flow / month"
          value={fmtMoneySigned(cf)}
          big
          positive={cf >= 0}
        />
      </div>

      {/* KPI strip */}
      <div className="mt-7 grid grid-cols-3 gap-3 border-t border-gold/20 pt-6 text-center">
        <Kpi label="Cap rate" value={fmtPercent(r.capRate)} />
        <Kpi
          label="Cash-on-cash"
          value={fmtPercent(r.cashOnCash)}
          accent={cf >= 0}
        />
        <Kpi label="Cash flow / mo" value={fmtMoneySigned(cf)} />
      </div>

      {/* Secondary metrics */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-cream/60">
        <SubMetric label="All-in cash invested" value={fmtMoney(r.totalCashInvested)} />
        <SubMetric label="Annual cash flow" value={fmtMoneySigned(r.annualNetCashFlow)} />
        <SubMetric label="DSCR" value={r.dscr.toFixed(2)} />
        <SubMetric label="Breakeven occupancy" value={fmtPercent(r.breakevenOccupancy)} />
      </div>
    </div>
  );
}

function Line({
  label,
  value,
  indent,
  muted,
  bold,
  big,
  positive,
}: {
  label: string;
  value: string;
  indent?: boolean;
  muted?: boolean;
  bold?: boolean;
  big?: boolean;
  positive?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 py-1.5",
        indent && "pl-4",
      )}
    >
      <span
        className={cn(
          big ? "font-heading text-lg" : "text-sm",
          bold && "font-semibold",
          muted && "text-cream/70",
          !muted && !big && "text-cream",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "tabular-nums font-sans",
          big
            ? cn(
                "font-heading text-2xl",
                positive ? "text-gold-light" : "text-red-300",
              )
            : bold
              ? "font-semibold text-cream"
              : "text-cream/70",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-cream/15" />;
}

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className={cn(
          "font-heading text-2xl leading-heading tabular-nums",
          accent ? "text-gold-light" : "text-cream",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[9px] uppercase tracking-eyebrow text-cream/50">
        {label}
      </p>
    </div>
  );
}

function SubMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-cream/10 pb-1">
      <span>{label}</span>
      <span className="tabular-nums text-cream/80">{value}</span>
    </div>
  );
}

/* ================================================================ */
/* Printable report — hidden on screen, the only content when the    */
/* browser print dialog runs. Plain black-on-white so it reads as a  */
/* clean one-page document and doesn't burn ink on dark panels.      */
/* ================================================================ */
function PrintableReport({
  inputs,
  r,
  label,
  preparedFor,
}: {
  inputs: ProFormaInputs;
  r: ProFormaResults;
  label: string;
  preparedFor: string;
}) {
  // Set the date client-side only, to avoid an SSR/CSR hydration mismatch.
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  const cf = r.netCashFlow;

  return (
    <div className="print-report hidden text-[#1C1917]">
      {/* Header */}
      <div className="flex items-end justify-between border-b-2 border-[#1C1917] pb-3">
        <div>
          <p className="text-3xl font-heading leading-none">Pro Forma</p>
          {label && <p className="mt-1 text-sm">{label}</p>}
        </div>
        <div className="text-right text-xs">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#8B6535]">
            Coliving Cait
          </p>
          {preparedFor && <p className="mt-0.5">Prepared for {preparedFor}</p>}
          {date && <p className="mt-0.5">{date}</p>}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-10">
        {/* Assumptions */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6535]">
            Assumptions
          </p>
          <div className="mt-2">
            <PRow label="Purchase price" value={fmtMoney(inputs.purchasePrice)} />
            <PRow
              label={`Down payment (${fmtPercent(inputs.downPaymentPct)})`}
              value={fmtMoney(r.downPayment)}
            />
            <PRow
              label={`Closing costs (${fmtPercent(inputs.closingCostPct)})`}
              value={fmtMoney(r.closingCosts)}
            />
            <PRow label="Rehab / renovation" value={fmtMoney(inputs.rehabBudget)} />
            <PRow label="Loan amount" value={fmtMoney(r.loanAmount)} />
            <PRow
              label="Interest rate"
              value={fmtPercent(inputs.interestRate)}
            />
            <PRow label="Loan term" value={`${inputs.loanTermYears} yrs`} />
            <PRow
              label={`Private rooms (${inputs.privateRoomCount} × ${fmtMoney(inputs.privateRoomRate)})`}
              value={fmtMoney(r.privateRent)}
            />
            <PRow
              label={`Shared rooms (${inputs.sharedRoomCount} × ${fmtMoney(inputs.sharedRoomRate)})`}
              value={fmtMoney(r.sharedRent)}
            />
            <PRow
              label="Vacancy"
              value={fmtPercent(inputs.vacancyPct)}
            />
            <PRow
              label="Platform / PM fee"
              value={fmtPercent(inputs.managementPct)}
            />
            <PRow
              label="All-in cash invested"
              value={fmtMoney(r.totalCashInvested)}
              bold
            />
          </div>
        </div>

        {/* Statement */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6535]">
            Monthly statement
          </p>
          <div className="mt-2">
            <PRow label="Gross rent" value={fmtMoney(r.grossRent)} />
            <PRow label="Less vacancy" value={`(${fmtMoney(r.vacancy)})`} indent />
            <PRow
              label="Less platform fee"
              value={`(${fmtMoney(r.managementFee)})`}
              indent
            />
            <PRow
              label="Effective income"
              value={fmtMoney(r.effectiveIncome)}
              bold
              rule
            />
            <PRow
              label="Taxes & insurance"
              value={`(${fmtMoney(r.taxesInsurance)})`}
              indent
            />
            <PRow
              label="Utilities (all-in)"
              value={`(${fmtMoney(r.utilities)})`}
              indent
            />
            <PRow
              label="Cleaning, lawn & pest"
              value={`(${fmtMoney(r.cleaningLawn)})`}
              indent
            />
            <PRow
              label="Maintenance"
              value={`(${fmtMoney(r.maintenance)})`}
              indent
            />
            <PRow
              label="CapEx reserve"
              value={`(${fmtMoney(r.capexReserve)})`}
              indent
            />
            {r.otherExpense > 0 && (
              <PRow
                label="Other"
                value={`(${fmtMoney(r.otherExpense)})`}
                indent
              />
            )}
            <PRow
              label="Net operating income"
              value={fmtMoney(r.noi)}
              bold
              rule
            />
            <PRow
              label="Debt service (P&I)"
              value={`(${fmtMoney(r.debtService)})`}
              indent
            />
            <PRow
              label="Net cash flow / month"
              value={fmtMoneySigned(cf)}
              bold
              rule
            />
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="mt-8 grid grid-cols-3 gap-6 border-t-2 border-[#1C1917] pt-5 text-center">
        <PKpi label="Cap rate" value={fmtPercent(r.capRate)} />
        <PKpi label="Cash-on-cash" value={fmtPercent(r.cashOnCash)} />
        <PKpi label="Cash flow / mo" value={fmtMoneySigned(cf)} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-6 text-center text-xs">
        <PRow label="DSCR" value={r.dscr.toFixed(2)} />
        <PRow label="Annual cash flow" value={fmtMoneySigned(r.annualNetCashFlow)} />
        <PRow
          label="Breakeven occupancy"
          value={fmtPercent(r.breakevenOccupancy)}
        />
      </div>

      <p className="mt-8 border-t border-[#1C1917]/20 pt-3 text-[10px] text-[#6B6560]">
        Generated with the Coliving Cait Pro Forma calculator · colivingcait.com
        · Estimates only — not financial advice.
      </p>
    </div>
  );
}

function PRow({
  label,
  value,
  indent,
  bold,
  rule,
}: {
  label: string;
  value: string;
  indent?: boolean;
  bold?: boolean;
  rule?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 py-1 text-sm",
        indent && "pl-3",
        rule && "border-t border-[#1C1917]/30 mt-1 pt-1.5",
        bold && "font-semibold",
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function PKpi({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-heading text-2xl leading-none">{value}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#6B6560]">
        {label}
      </p>
    </div>
  );
}

/* ================================================================ */
/* Modal shell — backdrop, centered card, ESC + scroll lock          */
/* ================================================================ */
function ModalShell({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-charcoal/60 [backdrop-filter:blur(4px)]"
        onClick={onClose}
      />
      <div className="relative my-auto w-full max-w-lg border border-brand bg-cream p-6 shadow-card md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-warmgray/70 hover:text-charcoal transition-colors text-lg leading-none"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Intake modal — collects the core deal facts up front              */
/* ================================================================ */
function IntakeModal({
  inputs,
  set,
  results,
  rateSuffix,
  onSuggest,
  onClose,
}: {
  inputs: ProFormaInputs;
  set: <K extends keyof ProFormaInputs>(k: K, v: ProFormaInputs[K]) => void;
  results: ProFormaResults;
  rateSuffix: string;
  onSuggest: () => void;
  onClose: () => void;
}) {
  const [expenseMode, setExpenseMode] = useState<"suggest" | "manual">(
    "suggest",
  );

  const finish = () => {
    if (expenseMode === "suggest") onSuggest();
    onClose();
  };

  return (
    <ModalShell onClose={onClose}>
      <Eyebrow className="mb-2">Let&apos;s set up your deal</Eyebrow>
      <Heading size="sm">Start with the basics</Heading>
      <p className="mt-3 text-sm text-warmgray leading-body">
        A few numbers to get going — you can fine-tune everything afterward.
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Purchase price"
            prefix="$"
            step={1000}
            value={inputs.purchasePrice}
            onChange={(v) => set("purchasePrice", v)}
          />
          <Field
            label="Reno / conversion cost"
            prefix="$"
            step={1000}
            value={inputs.rehabBudget}
            onChange={(v) => set("rehabBudget", v)}
          />
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-eyebrow text-charcoal/70 mb-1.5">
            Room rates are
          </span>
          <Segmented
            value={inputs.rentFrequency}
            onChange={(m) => set("rentFrequency", m as "weekly" | "monthly")}
            options={[
              { value: "monthly", label: "Per month" },
              { value: "weekly", label: "Per week" },
            ]}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Private-bath rate"
            prefix="$"
            suffix={rateSuffix}
            step={25}
            value={inputs.privateRoomRate}
            onChange={(v) => set("privateRoomRate", v)}
          />
          <Field
            label="# private rooms"
            step={1}
            value={inputs.privateRoomCount}
            onChange={(v) => set("privateRoomCount", v)}
          />
          <Field
            label="Shared-bath rate"
            prefix="$"
            suffix={rateSuffix}
            step={25}
            value={inputs.sharedRoomRate}
            onChange={(v) => set("sharedRoomRate", v)}
          />
          <Field
            label="# shared rooms"
            step={1}
            value={inputs.sharedRoomCount}
            onChange={(v) => set("sharedRoomCount", v)}
          />
        </div>

        <div className="flex items-baseline justify-between border border-brand bg-blush/40 px-4 py-3">
          <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/60">
            Gross rent ({results.totalRooms}{" "}
            {results.totalRooms === 1 ? "room" : "rooms"})
          </span>
          <span className="font-heading text-2xl text-charcoal tabular-nums">
            {fmtMoney(results.grossRent)}
            <span className="text-xs text-warmgray/70 font-sans"> / mo</span>
          </span>
        </div>

        {/* Expense approach */}
        <div>
          <span className="block text-[10px] uppercase tracking-eyebrow text-charcoal/70 mb-1.5">
            Operating expenses
          </span>
          <Segmented
            value={expenseMode}
            onChange={(m) => setExpenseMode(m as "suggest" | "manual")}
            options={[
              { value: "suggest", label: "Suggest for me" },
              { value: "manual", label: "Enter manually" },
            ]}
          />
          <p className="mt-2 text-xs text-warmgray/70 leading-body">
            {expenseMode === "suggest"
              ? "We'll estimate utilities, services, taxes, maintenance & CapEx from your rooms and price — all still editable."
              : "Start the expense lines blank and fill them in yourself."}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <Button onClick={finish} variant="primary" size="md" className="w-full">
          See my pro forma →
        </Button>
      </div>
    </ModalShell>
  );
}

/* ================================================================ */
/* PDF gate — name + email required before download                  */
/* ================================================================ */
function PdfGateModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (name: string, email: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Prefill from any prior visitor identity.
  useEffect(() => {
    setName(getVisitorFirstName() ?? "");
    setEmail(getVisitorEmail() ?? "");
  }, []);

  const valid =
    name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    await onSubmit(name.trim(), email.trim());
  };

  return (
    <ModalShell onClose={onClose}>
      <Eyebrow className="mb-2">Your pro forma is ready</Eyebrow>
      <Heading size="sm">
        Where should we <em>send it?</em>
      </Heading>
      <p className="mt-3 text-sm text-warmgray leading-body">
        Add your name and email to download the PDF. We&apos;ll keep you posted
        with coliving deal tips — unsubscribe anytime.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
            Name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/50 focus:outline-none focus:border-gold transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-eyebrow text-charcoal/70">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full border border-brand bg-white px-4 py-3 text-sm font-sans text-charcoal placeholder:text-warmgray/50 focus:outline-none focus:border-gold transition-colors"
          />
        </label>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!valid || submitting}
          className="w-full"
        >
          {submitting ? "Preparing…" : "↓ Download PDF"}
        </Button>
        <p className="text-center text-xs text-warmgray/60">
          ✦ No spam. Your numbers stay on your device.
        </p>
      </form>
    </ModalShell>
  );
}
