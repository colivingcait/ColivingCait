import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "What is coliving? — Coliving Cait",
  description:
    "Coliving is rent-by-the-room housing that solves the affordable housing crisis and creates an investment opportunity that traditional rentals can't match. Here's how it works.",
};

// What Is Coliving — 11 sections per spec. Educates dual audiences:
// the resident perspective (sections 2–4, 7) and the investor perspective
// (sections 5, 6, 8, 10). Sections 9 and 11 close the loop with a free
// download and a mission-driven quote.
export default function WhatIsColivingPage() {
  return (
    <>
      <Hero />
      <TheProblem />
      <TraditionalOptions />
      <TheSolution />
      <TheMath />
      <CalculatorCTA />
      <ForCommunities />
      <TwoPaths />
      <LeadMagnet />
      <Coliving101Upsell />
      <ClosingQuote />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO                                                            */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">What is coliving?</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              The housing solution our communities need — and the{" "}
              <em className="text-gold-light">
                investment opportunity you&apos;ve been looking for.
              </em>
            </Heading>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="md:pl-12 md:border-l md:border-cream/15">
            <p className="text-cream/75 leading-body text-[1.0625rem]">
              Coliving is rent-by-the-room housing — a single home with six or
              more private bedrooms and shared common spaces. For residents,
              it&apos;s furnished, flexible, and finally affordable. For
              investors, it&apos;s the rare strategy where the math actually
              works in 2026 — six to eight income streams instead of one,
              real cashflow on day one, and a model that genuinely serves
              the community.
            </p>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem]">
              The strategy isn&apos;t new. The timing has just never been
              better.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. THE PROBLEM                                                     */
/* ---------------------------------------------------------------- */
function TheProblem() {
  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">The problem</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              The people keeping our world running are being{" "}
              <em>priced out of it.</em>
            </Heading>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.2}>
            <p className="text-warmgray leading-body text-[1.0625rem]">
              Nurses working twelve-hour shifts. Teachers shaping the next
              generation. Mechanics keeping our cars on the road. Bus
              drivers, line cooks, retail workers, hairstylists — the
              people who make a community function are being squeezed out
              of the very communities they serve.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-warmgray leading-body text-[1.0625rem]">
              Rents have outpaced wages for over a decade. The math
              stopped working for working people years ago — and the
              market hasn&apos;t caught up.
            </p>
          </Reveal>

          {/* Pullquote */}
          <Reveal delay={0.4}>
            <blockquote className="mt-10 border-l-2 border-gold pl-6 font-heading italic text-2xl md:text-3xl leading-heading text-charcoal">
              &ldquo;Coliving investors are the rare housing operators rolling
              up their sleeves and reconfiguring what we already have to
              serve who needs it now.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. TRADITIONAL OPTIONS                                             */
/* ---------------------------------------------------------------- */
function TraditionalOptions() {
  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">What residents face today</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Two options, neither of them <em>great.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <Card interactive className="h-full flex flex-col bg-cream">
            <Eyebrow className="mb-3">Option 1</Eyebrow>
            <Heading level={3} size="sm">
              Rent alone.
            </Heading>
            <p className="mt-4 text-warmgray text-sm leading-body">
              The traditional path — and increasingly out of reach.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>3x monthly rent
                income requirement
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Credit check + rental
                history
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>12-month minimum lease
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Security deposit + first
                / last month
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Furnish it yourself
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Utilities not included
              </li>
            </ul>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card interactive className="h-full flex flex-col bg-cream">
            <Eyebrow className="mb-3">Option 2</Eyebrow>
            <Heading level={3} size="sm">
              Cosign.
            </Heading>
            <p className="mt-4 text-warmgray text-sm leading-body">
              Borrow someone else&apos;s credit and income — and their risk.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>Family or friend
                signed on the lease
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Shared liability if
                anything goes wrong
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Awkward power
                dynamics from day one
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Same income / credit
                requirements still apply
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Same monthly cost
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Same long-term lock-in
              </li>
            </ul>
          </Card>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. THE SOLUTION — 6-card grid                                      */
/* ---------------------------------------------------------------- */
function TheSolution() {
  const benefits: { symbol: string; title: string; body: string }[] = [
    {
      symbol: "⌂",
      title: "Furnished room",
      body: "Bed, dresser, desk, lamp — already set up. Move in with a suitcase.",
    },
    {
      symbol: "↻",
      title: "Flexible terms",
      body: "Month-to-month or weekly. Life shifts — your housing should keep up.",
    },
    {
      symbol: "$",
      title: "Affordable",
      body: "Under-market room rates, all-inclusive. One payment covers everything.",
    },
    {
      symbol: "✦",
      title: "High quality",
      body: "Professionally managed, high-speed internet, clean common spaces.",
    },
    {
      symbol: "♀",
      title: "Community",
      body: "Built-in neighbors. Optional connection — never forced.",
    },
    {
      symbol: "✓",
      title: "Individual accountability",
      body: "Your room, your lease, your responsibility. No shared liability.",
    },
  ];

  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">The solution</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            What coliving gives residents{" "}
            <em>that nothing else can.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        stagger={0.06}
      >
        {benefits.map((b) => (
          <StaggerItem key={b.title}>
            <div className="border border-brand bg-cream p-6 md:p-8 h-full flex flex-col">
              <p className="text-2xl text-gold mb-4">{b.symbol}</p>
              <p className="font-heading text-xl leading-heading">{b.title}</p>
              <p className="mt-3 text-warmgray text-sm leading-body flex-1">
                {b.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. THE MATH — investor angle                                       */
/* ---------------------------------------------------------------- */
function TheMath() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">The math</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="lg" className="text-cream">
            The math that makes coliving{" "}
            <em className="text-gold-light">impossible to ignore.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-cream/70 leading-body">
            Same property. Same neighborhood. Same purchase price. Two
            completely different financial outcomes.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 items-stretch">
        <Reveal delay={0.1}>
          <MathPanel
            label="Traditional Rental"
            grossLabel="Gross monthly rent"
            grossValue="$1,800 – $2,200"
            rows={[
              { label: "Mortgage (P&I)", value: "−$1,400" },
              { label: "Taxes + insurance", value: "−$400" },
              { label: "Maintenance reserve", value: "−$200" },
              { label: "Management", value: "−$180" },
            ]}
            net="Often negative cashflow"
            netTone="negative"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <MathPanel
            label="Coliving Conversion"
            grossLabel="Gross monthly rent"
            grossValue="$5,000+"
            rows={[
              { label: "Mortgage (P&I)", value: "−$1,400" },
              { label: "Utilities + internet", value: "−$900" },
              { label: "Platform fee (8%)", value: "−$400" },
              { label: "Maintenance + turnover", value: "−$700" },
              { label: "Management", value: "−$300" },
            ]}
            net="$1,000+ monthly cashflow"
            netTone="positive"
            featured
          />
        </Reveal>
      </div>

      <Reveal delay={0.3}>
        <p className="mt-12 text-center text-xs uppercase tracking-button text-cream/60">
          ✦ Calculations assume 85% occupancy
        </p>
      </Reveal>
    </Section>
  );
}

type MathPanelProps = {
  label: string;
  grossLabel: string;
  grossValue: string;
  rows: { label: string; value: string }[];
  net: string;
  netTone: "positive" | "negative";
  featured?: boolean;
};

function MathPanel({
  label,
  grossLabel,
  grossValue,
  rows,
  net,
  netTone,
  featured = false,
}: MathPanelProps) {
  return (
    <div
      className={`h-full border p-8 md:p-10 ${
        featured ? "border-gold bg-gold/5" : "border-cream/20"
      }`}
    >
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-6">
        {label}
      </p>

      {/* Gross headline number */}
      <p className="text-[10px] uppercase tracking-eyebrow text-cream/50 mb-2">
        {grossLabel}
      </p>
      <p className="font-heading text-4xl md:text-6xl text-cream leading-heading">
        {grossValue}
      </p>

      {/* Expense rows */}
      <ul className="mt-8 space-y-3 border-t border-cream/15 pt-6">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-baseline justify-between gap-4 text-sm"
          >
            <span className="text-cream/70">{r.label}</span>
            <span className="font-mono text-cream/90 tabular-nums">
              {r.value}
            </span>
          </li>
        ))}
      </ul>

      {/* Net cashflow */}
      <div className="mt-8 border-t border-cream/15 pt-6">
        <p className="text-[10px] uppercase tracking-eyebrow text-cream/50 mb-2">
          Net cashflow
        </p>
        <p
          className={`font-heading text-2xl md:text-3xl leading-heading ${
            netTone === "positive" ? "text-gold-light" : "text-red-400"
          }`}
        >
          {net}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 6. CALCULATOR CTA                                                  */
/* ---------------------------------------------------------------- */
function CalculatorCTA() {
  return (
    <Section tone="gold" fullBleed className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <Reveal direction="right" className="md:flex-1">
            <p className="text-[10px] uppercase tracking-eyebrow text-white/80 mb-3">
              The coliving calculator
            </p>
            <Heading size="md" className="text-white">
              Want to see what <em className="text-white">YOUR</em> property
              could earn?
            </Heading>
          </Reveal>
          <Reveal direction="left">
            <Button
              href="/calculator/coliving"
              variant="secondary"
              size="lg"
              magnetic
            >
              Run the Numbers →
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. FOR COMMUNITIES                                                 */
/* ---------------------------------------------------------------- */
function ForCommunities() {
  const impacts: string[] = [
    "Activates housing supply without waiting on new construction",
    "Provides genuinely affordable housing to working professionals",
    "Reduces displacement and homelessness pressure in neighborhoods",
    "Strengthens community ties — one home, one block at a time",
  ];

  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">For communities</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              Coliving investors are doing something{" "}
              <em>politicians aren&apos;t.</em>
            </Heading>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.2}>
            <p className="text-warmgray leading-body text-[1.0625rem]">
              While housing policy debates drag on for a decade, coliving
              investors are activating supply right now. Not waiting for
              new construction. Not waiting for permits. Reconfiguring the
              housing that already exists to serve the people who need it
              most.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-6 space-y-4">
              {impacts.map((line) => (
                <li
                  key={line}
                  className="flex gap-4 text-warmgray leading-body"
                >
                  <span className="text-gold mt-1">✦</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 8. TWO PATHS                                                       */
/* ---------------------------------------------------------------- */
function TwoPaths() {
  return (
    <Section tone="gold">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <p className="text-[10px] uppercase tracking-eyebrow text-white/80 mb-4">
            Two paths in
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md" className="text-white">
            However you want to be in the deal — there&apos;s a path{" "}
            <em className="text-white">for you.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <PathCard
            label="Path 01 · Active"
            symbol="◈"
            title="Active investor"
            body="Build your own coliving portfolio. You own the property, you operate it, you keep all the upside. I coach you through every step — acquisition, conversion, launch, and operations."
            ctaLabel="Get Coaching →"
            ctaHref="/get-coaching"
          />
        </StaggerItem>
        <StaggerItem>
          <PathCard
            label="Path 02 · Passive"
            symbol="$"
            title="Passive investor"
            body="Put capital to work in vetted coliving deals — directly with me, no fund or syndication. I find, fund, fix, and operate. You earn quarterly returns from a real, cashflowing asset."
            ctaLabel="Partner With Me →"
            ctaHref="/partner-with-me"
          />
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

function PathCard({
  label,
  symbol,
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  label: string;
  symbol: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="h-full flex flex-col border border-charcoal/20 bg-charcoal text-cream p-8 md:p-10">
      <p className="text-3xl text-gold mb-6">{symbol}</p>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        {label}
      </p>
      <Heading level={3} size="sm" className="text-cream">
        {title}
      </Heading>
      <p className="mt-4 text-cream/70 text-sm leading-body flex-1">{body}</p>
      <div className="mt-8">
        <Button href={ctaHref} variant="outline" size="md">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 9. LEAD MAGNET — Coliving Conversion Checklist                     */
/* ---------------------------------------------------------------- */
function LeadMagnet() {
  return (
    <Section tone="blush">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">Free download</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              The Coliving Conversion <em>Checklist.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-warmgray leading-body">
              Every property you tour from now on, scored against the same
              criteria I use for my own portfolio. The non-negotiables.
              The hidden costs. The questions to ask before you ever make
              an offer.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>The 3 non-negotiables
                of a great coliving property
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>The hidden $15K problem
                no inspection catches
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Where to find extra
                rooms hiding in plain sight
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <LeadMagnetForm
            eyebrow="The Coliving Conversion Checklist"
            heading={
              <>
                Send me the <em>checklist.</em>
              </>
            }
            body="One PDF. No spam. Unsubscribe with one click."
            cta="Send The Checklist"
            tag="coliving-checklist-downloaded"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 10. COLIVING 101 UPSELL                                            */
/* ---------------------------------------------------------------- */
function Coliving101Upsell() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">Go deeper</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              Coliving 101 — the full <em className="text-gold-light">model walk-through.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/70 leading-body">
              Six lessons covering the model, the math, finding the
              property, setting up, operations, and choosing your path.
              Worksheets and quizzes per lesson. Lifetime access. Built
              for the woman seriously considering coliving as her next
              move.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2 text-sm text-cream/70">
              <li>
                <span className="text-gold mr-2">✦</span>6 self-paced lessons
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Downloadable worksheet
                per lesson
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Knowledge-check quizzes
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Lifetime access &amp;
                future updates
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="border border-gold/40 bg-gradient-to-b from-gold/[0.08] to-transparent p-8 md:p-10">
            <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
              Mini Course
            </p>
            <p className="font-heading text-3xl md:text-4xl text-cream leading-heading">
              Coliving 101
            </p>
            <div className="mt-6 flex items-baseline gap-3">
              <p className="font-heading text-5xl md:text-6xl text-gold-light leading-none">
                $27
              </p>
              <p className="text-xs uppercase tracking-button text-cream/60">
                One-time · Lifetime access
              </p>
            </div>
            <div className="mt-8">
              <Button
                href="/courses/coliving-101"
                variant="primary"
                size="lg"
                magnetic
                className="w-full"
              >
                Enroll in Coliving 101
              </Button>
            </div>
            <p className="mt-4 text-[11px] text-cream/50 text-center">
              ✦ Course unlocks immediately after checkout
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 11. CLOSING QUOTE                                                  */
/* ---------------------------------------------------------------- */
function ClosingQuote() {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span aria-hidden className="text-gold text-2xl block mb-8">
            ✦
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-heading italic text-3xl md:text-5xl leading-heading text-charcoal">
            &ldquo;Every coliving home any of us opens is one more option for
            someone in our community who needs a safe, stable, clean, high
            quality and affordable place to land.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 text-xs uppercase tracking-button text-warmgray">
            ✦ Caitlyn Verdugo · Coliving Cait
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
