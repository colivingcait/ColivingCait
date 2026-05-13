"use client";

import { type Results, fmtMoney, fmtMoneySigned, fmtPercent } from "@/lib/coliving-calculator";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { cn } from "@/lib/cn";

const DISCOVERY_CALL_URL = "https://calendly.com/colivingcait/coliving-consultation";

type ResultsDashboardProps = {
  results: Results;
  onReset: () => void;
};

// Six-section results dashboard. Each section is a self-contained card
// for clean scanning + future PDF export.
export default function ResultsDashboard({
  results,
  onReset,
}: ResultsDashboardProps) {
  return (
    <div>
      {/* Headline */}
      <div className="text-center max-w-2xl mx-auto">
        <Eyebrow className="mb-4">Your results</Eyebrow>
        <Heading size="lg">
          Here&apos;s what the numbers <em>say.</em>
        </Heading>
      </div>

      <div className="mt-12 space-y-6">
        <SectionA r={results} />
        <SectionB r={results} />
        <SectionC r={results} />
        <SectionD r={results} />
        <SectionE r={results} />
        <SectionF r={results} />
      </div>

      {/* CTAs */}
      <div className="mt-12 border-t border-brand pt-12">
        <div className="text-center max-w-xl mx-auto">
          <Heading size="md">
            Ready to <em>talk through this property?</em>
          </Heading>
          <p className="mt-4 text-warmgray">
            Book a discovery call and we&apos;ll walk through your numbers
            together — and what to do next.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button
            href={DISCOVERY_CALL_URL}
            variant="primary"
            size="lg"
            magnetic
          >
            Book a Discovery Call →
          </Button>
          <Button onClick={onReset} variant="outline" size="lg">
            Run Another Property
          </Button>
        </div>
        <p className="mt-6 text-center text-xs text-warmgray/60 italic">
          ✦ Full PDF report download coming soon
        </p>
      </div>
    </div>
  );
}

/* ---------------- card layout primitive ---------------- */
function ResultCard({
  label,
  title,
  children,
  tone = "cream",
}: {
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  tone?: "cream" | "charcoal" | "gold";
}) {
  const tones: Record<string, string> = {
    cream: "bg-cream border-brand text-charcoal",
    charcoal: "bg-charcoal border-gold/30 text-cream",
    gold: "bg-gold/10 border-gold text-charcoal",
  };
  return (
    <section className={cn("border p-8 md:p-10", tones[tone])}>
      <p
        className={cn(
          "text-[10px] uppercase tracking-eyebrow text-gold mb-3",
        )}
      >
        {label}
      </p>
      <h3 className="font-heading text-2xl md:text-3xl leading-heading">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function StatRow({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | React.ReactNode;
  tone?: "default" | "negative" | "positive" | "emphasis";
}) {
  const valueClass =
    tone === "negative"
      ? "text-red-500"
      : tone === "positive"
      ? "text-gold-dark"
      : tone === "emphasis"
      ? "text-charcoal font-heading text-xl"
      : "text-charcoal";
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-brand/50 last:border-b-0">
      <span className="text-sm text-warmgray">{label}</span>
      <span className={cn("font-mono tabular-nums", valueClass)}>{value}</span>
    </div>
  );
}

/* ---------------- A — Conversion Summary ---------------- */
function SectionA({ r }: { r: Results }) {
  const confColor =
    r.confidence === "high"
      ? "text-gold"
      : r.confidence === "medium"
      ? "text-warmgray"
      : "text-red-500";
  const confSymbol =
    r.confidence === "high" ? "✦" : r.confidence === "medium" ? "◈" : "⚠";
  const confLabel =
    r.confidence === "high"
      ? "High confidence"
      : r.confidence === "medium"
      ? "Medium confidence"
      : "Low confidence";

  return (
    <ResultCard
      label="A · Conversion summary"
      title={
        <>
          {r.conversion.totalRooms} rooms ·{" "}
          <em>{fmtMoney(r.conversion.privateBathRooms * 1000 + r.conversion.sharedBathRooms * 750)}/mo gross</em>
        </>
      }
    >
      <div className="space-y-1">
        <StatRow
          label="Existing bedrooms"
          value={r.conversion.bedrooms}
        />
        <StatRow
          label="Additional rooms found"
          value={`+${r.conversion.additionalRooms}`}
        />
        <StatRow
          label="Total coliving rooms"
          value={r.conversion.totalRooms}
          tone="emphasis"
        />
        <StatRow
          label={`Private bathroom rooms × $1,000`}
          value={fmtMoney(r.conversion.privateBathRooms * 1000)}
        />
        <StatRow
          label={`Shared bathroom rooms × $750`}
          value={fmtMoney(r.conversion.sharedBathRooms * 750)}
        />
      </div>

      {/* Confidence */}
      <div className="mt-6 pt-6 border-t border-brand">
        <p className={cn("text-sm font-medium", confColor)}>
          {confSymbol} {confLabel}
        </p>
        <p className="mt-2 text-sm text-warmgray leading-body">
          {r.confidenceReason}
        </p>
      </div>
    </ResultCard>
  );
}

/* ---------------- B — Total Cash Invested ---------------- */
function SectionB({ r }: { r: Results }) {
  return (
    <ResultCard
      label="B · Total cash invested"
      title={<>{fmtMoney(r.cashInvested.total)} all-in</>}
    >
      <div className="space-y-1">
        <StatRow
          label="Down payment"
          value={fmtMoney(r.cashInvested.downPayment)}
        />
        <StatRow
          label="Closing costs"
          value={fmtMoney(r.cashInvested.closingCosts)}
        />
        <StatRow
          label="Renovation budget"
          value={fmtMoney(r.cashInvested.renovation)}
        />
        <StatRow
          label="Furnishing"
          value={fmtMoney(r.cashInvested.furnishing)}
        />
        <StatRow
          label="Total cash invested"
          value={fmtMoney(r.cashInvested.total)}
          tone="emphasis"
        />
        <StatRow
          label="Loan amount"
          value={fmtMoney(r.cashInvested.loanAmount)}
        />
      </div>
    </ResultCard>
  );
}

/* ---------------- C — Monthly Cashflow ---------------- */
function SectionC({ r }: { r: Results }) {
  const cf = r.monthly.netCashflow;
  return (
    <ResultCard
      label="C · Monthly cashflow at 85% occupancy"
      title={
        <>
          {fmtMoneySigned(cf)} per month{" "}
          <em>{cf >= 0 ? "after expenses" : "shortfall"}</em>
        </>
      }
    >
      <div className="space-y-1">
        <StatRow
          label="Gross revenue (100% occupancy)"
          value={fmtMoney(r.monthly.grossRevenue)}
        />
        <StatRow
          label="× 85% occupancy = effective gross"
          value={fmtMoney(r.monthly.effectiveGross)}
          tone="emphasis"
        />
        <StatRow
          label="Mortgage (P&I)"
          value={`−${fmtMoney(r.monthly.mortgage)}`}
        />
        <StatRow
          label="Property taxes (1.2% / yr)"
          value={`−${fmtMoney(r.monthly.taxes)}`}
        />
        <StatRow
          label="Insurance"
          value={`−${fmtMoney(r.monthly.insurance)}`}
        />
        <StatRow
          label={`Utilities + internet`}
          value={`−${fmtMoney(r.monthly.utilities)}`}
        />
        <StatRow
          label="Platform fee (8% gross)"
          value={`−${fmtMoney(r.monthly.platformFee)}`}
        />
        <StatRow
          label="Maintenance reserve (10%)"
          value={`−${fmtMoney(r.monthly.maintenance)}`}
        />
        <StatRow
          label="Turnover allowance"
          value={`−${fmtMoney(r.monthly.turnover)}`}
        />
        <StatRow
          label="Net monthly cashflow"
          value={fmtMoneySigned(cf)}
          tone={cf >= 0 ? "positive" : "negative"}
        />
      </div>
    </ResultCard>
  );
}

/* ---------------- D — Annual Cashflow & CoC ---------------- */
function SectionD({ r }: { r: Results }) {
  const ann = r.annual.netCashflow;
  const coc = r.annual.cashOnCash;
  return (
    <ResultCard
      label="D · Annual cashflow & cash-on-cash return"
      title={
        <>
          {fmtPercent(coc)} cash-on-cash <em>return</em>
        </>
      }
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <BigStat
          label="Annual cashflow"
          value={fmtMoneySigned(ann)}
          tone={ann >= 0 ? "positive" : "negative"}
        />
        <BigStat
          label="Total cash invested"
          value={fmtMoney(r.cashInvested.total)}
        />
        <BigStat
          label="Cash-on-cash"
          value={fmtPercent(coc)}
          tone={coc >= 8 ? "positive" : coc <= -5 ? "negative" : "default"}
        />
      </div>
    </ResultCard>
  );
}

function BigStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "negative";
}) {
  const color =
    tone === "positive"
      ? "text-gold-dark"
      : tone === "negative"
      ? "text-red-500"
      : "text-charcoal";
  return (
    <div>
      <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70 mb-2">
        {label}
      </p>
      <p className={cn("font-heading text-3xl md:text-4xl leading-heading", color)}>
        {value}
      </p>
    </div>
  );
}

/* ---------------- E — 5-Year Projection ---------------- */
function SectionE({ r }: { r: Results }) {
  return (
    <ResultCard
      label="E · 5-year wealth projection"
      title={
        <>
          {fmtMoney(r.fiveYear.totalWealth)} total <em>wealth created</em>
        </>
      }
    >
      <div className="space-y-1">
        <StatRow
          label="Total cashflow (5 yr)"
          value={fmtMoneySigned(r.fiveYear.totalCashflow)}
        />
        <StatRow
          label="Principal paydown (5 yr)"
          value={fmtMoney(r.fiveYear.principalPaydown)}
        />
        <StatRow
          label="Appreciation (3% / yr)"
          value={fmtMoney(r.fiveYear.appreciation)}
        />
        <StatRow
          label="Total wealth created"
          value={fmtMoney(r.fiveYear.totalWealth)}
          tone="emphasis"
        />
        <StatRow
          label="Annualized total return"
          value={fmtPercent(r.fiveYear.annualizedReturn)}
          tone={r.fiveYear.annualizedReturn >= 8 ? "positive" : "default"}
        />
      </div>
    </ResultCard>
  );
}

/* ---------------- F — Verdict ---------------- */
function SectionF({ r }: { r: Results }) {
  const verdictMap = {
    strong: {
      label: "Strong deal",
      tone: "gold" as const,
      symbol: "✦",
      headline: "This deal pencils.",
      body:
        "Positive cashflow, healthy cash-on-cash return, and meaningful 5-year wealth creation. Worth seriously pursuing — let's talk through the next steps.",
    },
    marginal: {
      label: "Marginal — let's find more rooms",
      tone: "cream" as const,
      symbol: "◈",
      headline: "Borderline — but probably workable.",
      body:
        "The numbers are close to break-even. Often there's another room hiding somewhere — a basement, a sunroom, a private bathroom add. Worth a 30-minute call to look at it together.",
    },
    weak: {
      label: "Weak — this deal needs more work",
      tone: "cream" as const,
      symbol: "⚠",
      headline: "This deal needs more work.",
      body:
        "The math doesn't pencil yet. That's not a reason to walk away — but it's a reason to look harder at the purchase price, the renovation scope, or the financing. Let's figure out what would change the answer.",
    },
  };
  const v = verdictMap[r.verdict];

  return (
    <ResultCard
      label={`F · Verdict — ${v.label}`}
      title={
        <>
          {v.symbol} {v.headline}
        </>
      }
      tone={v.tone}
    >
      <p className="text-warmgray leading-body text-[1.0625rem]">{v.body}</p>
    </ResultCard>
  );
}
