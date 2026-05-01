import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { zillowTestimonials } from "@/lib/testimonials";

export const metadata = {
  title: "Partner With Me — Coliving Cait",
  description:
    "Passive partnership opportunities in Atlanta coliving. Three models — private money lending, equity partnerships, and arbitrage. Direct with me. No fund, no syndication.",
};

// Both CTAs route to the discovery call. Constant kept local so it can be
// swapped to Caitlyn's real Calendly link in one place.
const DISCOVERY_CALL_URL = "https://calendly.com/colivingcait/discovery";

// Partner With Me — 8 sections per spec. Targets passive investors.
// Legal posture: no specific return percentages stated publicly,
// accredited-investor language in fine print.
export default function PartnerWithMePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PartnershipModels />
      <Portfolio />
      <TrustProtections />
      <MarketReportLeadMagnet />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO                                                            */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">Passive partnerships</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              Your money working while you{" "}
              <em className="text-gold-light">live your life.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-xl">
              Partner with me directly in Atlanta-metro coliving properties.
              No fund, no syndication, no minimum commitment beyond a
              single deal. I find, fund, fix, and operate. You earn from a
              real, cashflowing asset.
            </p>
          </Reveal>
        </div>

        {/* Three metrics — vertical on desktop, horizontal on mobile */}
        <Reveal delay={0.35}>
          <div className="md:pl-12 md:border-l md:border-cream/15 grid grid-cols-3 md:grid-cols-1 gap-8">
            <Metric
              label="Minimum entry"
              value="$30K"
              sub="No upper cap"
            />
            <Metric
              label="Target structure"
              value="Quarterly returns"
              sub="Promissory or equity"
            />
            <Metric
              label="Track record"
              value="Consistent"
              sub="Payment history"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Metric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
        {label}
      </p>
      <p className="font-heading text-2xl md:text-4xl text-cream leading-heading">
        {value}
      </p>
      <p className="mt-2 text-xs text-cream/60">{sub}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 2. HOW IT WORKS — 3 steps                                          */
/* ---------------------------------------------------------------- */
function HowItWorks() {
  const steps: { num: string; title: string; body: string }[] = [
    {
      num: "01",
      title: "We meet &amp; align",
      body: "A 30-minute call to understand your goals, your timeline, your capital situation, and how active you want to be. If we&apos;re a fit, we keep going. If we&apos;re not, I&apos;ll point you to someone who is.",
    },
    {
      num: "02",
      title: "We structure the deal",
      body: "Together we choose the partnership model that fits — private money lending, equity partnership, or arbitrage. Attorney-drafted documents. Clear terms. Nothing hidden.",
    },
    {
      num: "03",
      title: "You earn, I operate",
      body: "I run the property end-to-end — acquisitions, conversion, screening, leasing, maintenance. You receive quarterly distributions, quarterly reporting, and complete visibility into your investment.",
    },
  ];

  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">How it works</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            From first call to first <em>distribution.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger className="mt-14 space-y-12 md:space-y-20" stagger={0.15}>
        {steps.map((s, i) => (
          <StaggerItem key={s.num}>
            <div
              className={`grid gap-6 md:grid-cols-[auto_1fr] md:items-start max-w-3xl ${
                i % 2 === 1 ? "md:ml-auto" : ""
              }`}
            >
              <p className="font-heading text-7xl md:text-9xl text-gold/40 leading-none">
                {s.num}
              </p>
              <div className="md:pt-4">
                <Heading
                  level={3}
                  size="sm"
                  className=""
                >
                  <span dangerouslySetInnerHTML={{ __html: s.title }} />
                </Heading>
                <p
                  className="mt-3 text-warmgray leading-body"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. THREE PARTNERSHIP MODELS                                        */
/* ---------------------------------------------------------------- */
function PartnershipModels() {
  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Three ways to partner</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Three models. <em>One operator.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-warmgray">
            Choose the structure that fits how you want your money to
            work — and how involved you want to be.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.1}
      >
        <StaggerItem>
          <ModelCard
            label="Model 01"
            title="Private Money Lender"
            tagline="Debt-style. Predictable income."
            body="You lend capital secured by a promissory note and a lien on the property. I make scheduled payments per the note. Lower risk, predictable income, defined exit."
            bullets={[
              "Secured by promissory note",
              "Lien recorded against property",
              "Scheduled monthly or quarterly payments",
              "Defined term and exit",
            ]}
            best="Best for: investors who want fixed-income style returns from real estate without dealing with operations."
          />
        </StaggerItem>

        <StaggerItem>
          <ModelCard
            label="Model 02 · Most flexible"
            title="Private Money Partner"
            tagline="Equity-style. Shared upside."
            body="You bring the capital. I bring the operations. We share the profits per the operating agreement — including ongoing cashflow, refinance proceeds, and any sale upside."
            bullets={[
              "Equity partnership structured by attorney",
              "Quarterly distributions from operating cashflow",
              "Share of refinance and sale proceeds",
              "Quarterly reporting and full transparency",
            ]}
            best="Best for: investors who want real-estate equity exposure with someone else doing the work."
            featured
          />
        </StaggerItem>

        <StaggerItem>
          <ModelCard
            label="Model 03"
            title="Coliving Arbitrage"
            tagline="Lease your property to me."
            body="You own the property. I lease it from you above market rate and operate it as coliving. You collect predictable rent every month — guaranteed by lease — without managing tenants or maintenance."
            bullets={[
              "Master lease at above-market rent",
              "Multi-year term",
              "I cover all turnover and maintenance",
              "You stay completely hands-off",
            ]}
            best="Best for: existing property owners who want above-market rent and zero operations."
          />
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

type ModelCardProps = {
  label: string;
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  best: string;
  featured?: boolean;
};

function ModelCard({
  label,
  title,
  tagline,
  body,
  bullets,
  best,
  featured = false,
}: ModelCardProps) {
  return (
    <div
      className={`relative h-full flex flex-col border p-8 md:p-10 transition-colors ${
        featured
          ? "border-gold bg-gradient-to-b from-gold/[0.08] to-cream"
          : "border-brand bg-cream"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-8 bg-charcoal text-cream text-[10px] uppercase tracking-eyebrow px-3 py-1">
          Most Popular
        </span>
      )}

      <Eyebrow className="mb-3">{label}</Eyebrow>
      <Heading level={3} size="sm">
        {title}
      </Heading>
      <p className="mt-2 text-xs uppercase tracking-button text-warmgray">
        {tagline}
      </p>

      <p className="mt-6 text-warmgray text-sm leading-body">{body}</p>

      <ul className="mt-6 space-y-2 text-sm text-warmgray flex-1">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-gold">✦</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 pt-6 border-t border-brand text-xs text-warmgray italic leading-body">
        {best}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 4. PORTFOLIO — before & after                                      */
/* ---------------------------------------------------------------- */
function Portfolio() {
  // Sample property economics. Real photo paths and numbers will replace
  // these placeholders once portfolio assets are finalized.
  const properties: Property[] = [
    {
      neighborhood: "Decatur · Avondale corridor",
      conversion: "4 BR → 7 rooms",
      reno: "$45K",
      timeline: "6 weeks",
      gross: "$5,400 / mo",
      net: "$1,150 / mo",
      occupancy: "94%",
    },
    {
      neighborhood: "East Atlanta · Edgewood",
      conversion: "3 BR + basement → 6 rooms",
      reno: "$68K",
      timeline: "8 weeks",
      gross: "$4,950 / mo",
      net: "$1,020 / mo",
      occupancy: "91%",
    },
    {
      neighborhood: "Stone Mountain · Pine Lake",
      conversion: "5 BR → 8 rooms (3 ensuite)",
      reno: "$82K",
      timeline: "10 weeks",
      gross: "$6,800 / mo",
      net: "$1,480 / mo",
      occupancy: "96%",
    },
  ];

  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Portfolio</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Real properties. <em>Real numbers.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-warmgray">
            A look at what a converted property actually produces — what
            we paid, what we put in, and what it earns each month.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        stagger={0.1}
      >
        {properties.map((p, i) => (
          <StaggerItem key={i}>
            <PropertyCard property={p} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.3}>
        <p className="mt-10 text-center text-xs text-warmgray/70 italic">
          ✦ Full portfolio review available on a discovery call. Property
          addresses kept confidential by policy.
        </p>
      </Reveal>
    </Section>
  );
}

type Property = {
  neighborhood: string;
  conversion: string;
  reno: string;
  timeline: string;
  gross: string;
  net: string;
  occupancy: string;
};

function PropertyCard({ property: p }: { property: Property }) {
  return (
    <div className="h-full flex flex-col border border-brand bg-cream">
      {/* Before / after photo placeholder split */}
      <div className="grid grid-cols-2 aspect-[2/1] border-b border-brand">
        <div className="relative bg-charcoal/85 flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-eyebrow text-gold">
            Before
          </span>
        </div>
        <div className="relative bg-blush flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-eyebrow text-gold-dark">
            After
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold">
          {p.neighborhood}
        </p>
        <p className="mt-2 font-heading text-2xl leading-heading">
          {p.conversion}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm flex-1">
          <PortfolioStat label="Renovation" value={p.reno} />
          <PortfolioStat label="Timeline" value={p.timeline} />
          <PortfolioStat label="Gross / mo" value={p.gross} />
          <PortfolioStat label="Net / mo" value={p.net} />
          <PortfolioStat label="Occupancy" value={p.occupancy} />
        </dl>
      </div>
    </div>
  );
}

function PortfolioStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
        {label}
      </dt>
      <dd className="mt-1 font-heading text-lg text-charcoal">{value}</dd>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 5. TRUST & PROTECTIONS                                             */
/* ---------------------------------------------------------------- */
function TrustProtections() {
  const items: { symbol: string; title: string; body: string }[] = [
    {
      symbol: "§",
      title: "Promissory note",
      body: "For lending partnerships, your investment is documented in an attorney-drafted promissory note with clear terms, interest, and repayment schedule.",
    },
    {
      symbol: "⊞",
      title: "Operating agreement",
      body: "For equity partnerships, a formal operating agreement defines distributions, decisions, exits, and reporting obligations between us.",
    },
    {
      symbol: "↻",
      title: "Quarterly reporting",
      body: "Every quarter you receive a complete financial report — revenue, expenses, occupancy, distributions, and any material updates on the property.",
    },
    {
      symbol: "✓",
      title: "Payment history",
      body: "Consistent on-time payments to every partner across every deal. Track record available on request and reviewed during the discovery call.",
    },
  ];

  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Trust &amp; protections</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md" className="text-cream">
            Structured properly. <em className="text-gold-light">Documented fully.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-cream/70">
            Every partnership is structured by an attorney, documented in
            writing, and reported transparently from start to exit.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch"
        stagger={0.08}
      >
        {items.map((it) => (
          <StaggerItem key={it.title}>
            <div className="h-full flex flex-col border border-gold/30 bg-charcoal p-8 md:p-10 transition-colors hover:border-gold">
              <p className="text-3xl text-gold mb-5">{it.symbol}</p>
              <Heading level={3} size="sm" className="text-cream">
                {it.title}
              </Heading>
              <p className="mt-3 text-cream/70 text-sm leading-body flex-1">
                {it.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. LEAD MAGNET — Atlanta Coliving Market Report (placeholder)      */
/* ---------------------------------------------------------------- */
function MarketReportLeadMagnet() {
  return (
    <Section tone="blush">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">Coming soon</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              The Atlanta Coliving <em>Market Report.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-warmgray leading-body">
              A market-by-market view of where coliving is working in
              Atlanta — neighborhoods, room rates, occupancy, and the
              kind of properties producing the strongest returns. Built
              from my own portfolio data and ground-truth conversations
              with operators across the metro.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-6 text-xs uppercase tracking-button text-warmgray/70">
              ✦ Releasing soon — partners get it first
            </p>
          </Reveal>
        </div>

        {/* Placeholder card with a "report cover" feel */}
        <Reveal direction="left" delay={0.2}>
          <div className="aspect-[3/4] border border-brand bg-cream p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-eyebrow text-gold">
                Market Report · 2026
              </p>
              <p className="mt-6 font-heading text-3xl md:text-4xl leading-heading">
                Atlanta Coliving Market Report
              </p>
            </div>
            <div className="relative">
              <p className="text-xs uppercase tracking-button text-warmgray">
                ✦ Coming soon
              </p>
              <p className="mt-2 text-sm text-warmgray italic">
                Coliving Cait
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. TESTIMONIALS                                                    */
/* ---------------------------------------------------------------- */
function Testimonials() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">5.0 ★ Zillow Rating</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md" className="text-cream">
            Trusted by the people who&apos;ve <em className="text-gold-light">worked with me.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 items-stretch"
        stagger={0.1}
      >
        {zillowTestimonials.map((t, i) => (
          <StaggerItem key={i}>
            <TestimonialCard {...t} tone="charcoal" />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 8. FINAL CTA                                                       */
/* ---------------------------------------------------------------- */
function FinalCTA() {
  return (
    <Section tone="cream">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-6">Let&apos;s talk</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} size="xl">
            Let&apos;s put your money to work{" "}
            <em>together.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-warmgray leading-body max-w-xl mx-auto">
            Every partnership starts with the same 30-minute call —
            understanding your goals, walking through the models, and
            answering anything you want to ask.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button
              href={DISCOVERY_CALL_URL}
              variant="primary"
              size="lg"
              magnetic
            >
              Schedule a Call →
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              I Have Questions First →
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.55}>
          <p className="mt-12 text-[11px] text-warmgray/60 italic max-w-2xl mx-auto leading-relaxed">
            ✦ Partnership opportunities are limited and discussed only on
            individual calls. All offerings are restricted to accredited
            investors. Past performance is not indicative of future results.
            This page does not constitute an offer to sell or a solicitation
            to buy any security.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
