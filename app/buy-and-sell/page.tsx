import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import BuyerInquiryForm from "@/components/BuyerInquiryForm";
import { zillowTestimonials } from "@/lib/testimonials";

export const metadata = {
  title: "Buy & Sell — Coliving Cait · KW Realtor, Atlanta Metro",
  description:
    "Investment properties, coliving conversions, and house hacking across the Atlanta metro. A Realtor who thinks like an investor — because she is one.",
};

const DISCOVERY_CALL_URL = "https://calendly.com/colivingcait/discovery";

// Buy & Sell — 9 sections per spec. Caitlyn's Realtor offering covering
// buyer/investor representation, sellers, and house hackers — each as
// its own clearly-segmented panel. Two course upsells (RE 101, HH 101)
// and the Atlanta Investment Property Guide lead magnet bridge to the
// course/funnel system.
export default function BuyAndSellPage() {
  return (
    <>
      <Hero />
      <BuyersPanel />
      <SellersPanel />
      <HouseHackersPanel />
      <WhyWorkWithMe />
      <LeadMagnet />
      <RealEstate101Upsell />
      <HouseHacking101Upsell />
      <Testimonials />
      <ServiceAreas />
      <FinalCTA />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO                                                            */
/* ---------------------------------------------------------------- */
function Hero() {
  const stats: { label: string; value: string }[] = [
    { label: "Transactions", value: "50+ deals" },
    { label: "Zillow rating", value: "5.0 ★" },
    { label: "DeKalb County", value: "Top 10%" },
    { label: "Specialty", value: "Coliving + House Hack" },
  ];

  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">
              Real estate · Atlanta metro · Keller Williams
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              A realtor who thinks like{" "}
              <em className="text-gold-light">an investor.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-xl">
              Investment properties, coliving conversions, and house
              hacking — across the Atlanta metro. I run the same numbers
              for your deal that I run for my own. If a property
              doesn&apos;t pencil, I&apos;ll be the first one to tell you.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="grid grid-cols-2 gap-8 md:pl-12 md:border-l md:border-cream/15">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
                  {s.label}
                </p>
                <p className="font-heading text-2xl md:text-3xl text-cream leading-heading">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2A. BUYERS & INVESTORS PANEL                                       */
/* ---------------------------------------------------------------- */
function BuyersPanel() {
  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">For buyers &amp; investors</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              Most investors find deals. I help you find{" "}
              <em>the right ones.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-warmgray leading-body">
              Anyone with an MLS login can pull comps. The hard part is
              knowing which properties will actually perform — once
              tenants move in, the renovation gets done, and the loan is
              in your name.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <ul className="mt-6 space-y-3 text-warmgray">
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>
                  Investor-grade underwriting before you make an offer
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Floorplan analysis for coliving and house-hack potential</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Renovation cost estimates from someone who&apos;s done dozens</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Honest answer if the deal doesn&apos;t pencil</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <BuyerInquiryForm />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2B. SELLERS PANEL                                                  */
/* ---------------------------------------------------------------- */
function SellersPanel() {
  const options: { symbol: string; title: string; body: string }[] = [
    {
      symbol: "$",
      title: "Sell",
      body: "Traditional listing strategy with investor-savvy pricing and negotiation. Top of the comp range — without sitting on the market.",
    },
    {
      symbol: "⌂",
      title: "Lease for arbitrage",
      body: "Keep the property and lease it to me at above-market rent. I run it as coliving. You collect a higher monthly check, hands-off.",
    },
    {
      symbol: "◈",
      title: "Property management referral",
      body: "Not ready to sell, not interested in arbitrage? I&apos;ll connect you with a vetted property manager I personally trust.",
    },
  ];

  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">For sellers</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Most realtors want to list your property. I want to help you{" "}
            <em>figure out if you should.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-warmgray">
            Selling isn&apos;t always the right move. Three options worth
            considering before you sign a listing agreement.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.1}
      >
        {options.map((o, i) => (
          <StaggerItem key={o.title}>
            <div className="h-full flex flex-col border border-brand bg-cream p-8 md:p-10">
              <p className="text-3xl text-gold mb-5">{o.symbol}</p>
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                Option 0{i + 1}
              </p>
              <Heading level={3} size="sm">
                {o.title}
              </Heading>
              <p
                className="mt-3 text-warmgray text-sm leading-body flex-1"
                dangerouslySetInnerHTML={{ __html: o.body }}
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.3}>
        <div className="mt-12 text-center">
          <Button
            href={DISCOVERY_CALL_URL}
            variant="primary"
            size="lg"
            magnetic
          >
            Schedule a Call →
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2C. HOUSE HACKERS PANEL                                            */
/* ---------------------------------------------------------------- */
function HouseHackersPanel() {
  const types: { symbol: string; title: string; body: string }[] = [
    {
      symbol: "⌂",
      title: "Traditional",
      body: "Buy a single-family home and rent out the spare bedrooms. Lowest barrier to entry, simplest financing, fastest move-in.",
    },
    {
      symbol: "◈",
      title: "ADU / basement",
      body: "Buy a property with a finished basement, ADU, or in-law suite. You live in one unit, rent the other for higher privacy on both sides.",
    },
    {
      symbol: "✦",
      title: "Small multifamily",
      body: "Buy a 2- to 4-unit property with an FHA owner-occupied loan. Live in one, rent the rest. The most powerful first-time house hack.",
    },
  ];

  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">For house hackers</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Live for free while your tenants{" "}
            <em>pay your mortgage.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-warmgray">
            House hacking is the single best way to get started in real
            estate. Owner-occupied financing, low down payment, and an
            asset that pays for itself from day one.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.1}
      >
        {types.map((t, i) => (
          <StaggerItem key={t.title}>
            <div className="h-full flex flex-col border border-brand bg-blush p-8 md:p-10">
              <p className="text-3xl text-gold mb-5">{t.symbol}</p>
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                Type 0{i + 1}
              </p>
              <Heading level={3} size="sm">
                {t.title}
              </Heading>
              <p className="mt-3 text-warmgray text-sm leading-body flex-1">
                {t.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.3}>
        <div className="mt-12 text-center">
          <Button
            href={DISCOVERY_CALL_URL}
            variant="primary"
            size="lg"
            magnetic
          >
            Schedule a Call →
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. WHY WORK WITH ME — 5 differentiators                            */
/* ---------------------------------------------------------------- */
function WhyWorkWithMe() {
  const items: { num: string; title: string; body: string }[] = [
    {
      num: "01",
      title: "Investor mindset",
      body: "I run my own portfolio. Every property I show is pressure-tested against the same criteria I use for my own deals.",
    },
    {
      num: "02",
      title: "Renovation knowledge",
      body: "I&apos;ve done dozens of conversions. I can walk a property and spot the $15K problem most agents miss.",
    },
    {
      num: "03",
      title: "Coliving expertise",
      body: "I&apos;m an active coliving operator with 50+ rooms. No agent in the metro understands this model better.",
    },
    {
      num: "04",
      title: "Negotiation-first",
      body: "I&apos;d rather walk away from a bad deal than push you into one. The real ROI lives in the negotiation.",
    },
    {
      num: "05",
      title: "House hacking expertise",
      body: "I&apos;ve helped dozens of clients buy their first house hack — and I converted my own basement. I get it from both sides.",
    },
  ];

  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Why work with me</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md" className="text-cream">
            Five reasons clients <em className="text-gold-light">stay with me.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        stagger={0.08}
      >
        {items.map((it) => (
          <StaggerItem key={it.num}>
            <div className="border-t border-cream/15 pt-6">
              <p className="font-heading text-2xl text-gold leading-none">
                {it.num}
              </p>
              <p className="mt-3 font-heading text-xl text-cream leading-heading">
                {it.title}
              </p>
              <p
                className="mt-2 text-cream/70 text-sm leading-body"
                dangerouslySetInnerHTML={{ __html: it.body }}
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. LEAD MAGNET — Atlanta Investment Property Guide                 */
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
              The Atlanta Investment Property <em>Guide.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-warmgray leading-body">
              Where the deals actually are right now in the Atlanta
              metro. Submarket-by-submarket breakdown of what&apos;s
              working, where price still matters, and the neighborhoods
              quietly producing the strongest returns.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>Submarket
                breakdown by strategy fit
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Median price /
                rent / appreciation
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Where to look —
                and where to skip
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <LeadMagnetForm
            eyebrow="The Atlanta Investment Property Guide"
            heading={
              <>
                Send me the <em>guide.</em>
              </>
            }
            body="One PDF. No spam. Unsubscribe with one click."
            cta="Send The Guide"
            tag="atlanta-guide-downloaded"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. REAL ESTATE INVESTING 101 UPSELL                                */
/* ---------------------------------------------------------------- */
function RealEstate101Upsell() {
  return (
    <Section tone="cream">
      <CourseUpsellRow
        eyebrow="Mini course · $27"
        title="Real Estate Investing 101"
        emphasis="the full strategy walk-through."
        body="Six self-paced lessons covering every major residential investing strategy — house hacking, traditional rentals, coliving, BRRRR, fix &amp; flip, lease arbitrage, and passive investing. Honest assessment of each. The course that helps you choose your first move."
        bullets={[
          "6 lessons, all 8 strategies covered",
          "Decision framework: which strategy fits you",
          "Worksheets &amp; quizzes per lesson",
          "Lifetime access &amp; future updates",
        ]}
        ctaLabel="Enroll in RE Investing 101"
        ctaHref="/courses/real-estate-101"
        tone="light"
      />
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. HOUSE HACKING 101 UPSELL                                        */
/* ---------------------------------------------------------------- */
function HouseHacking101Upsell() {
  return (
    <Section tone="blush">
      <CourseUpsellRow
        eyebrow="Mini course · $27"
        title="House Hacking 101"
        emphasis="the cheat code for first-time investors."
        body="Six self-paced lessons covering every major house-hacking strategy — spare bedroom, basement / ADU, coliving house hack, and small multifamily. Underwriting, financing, screening, and your first 12 months as an owner-occupant."
        bullets={[
          "All 4 house-hack types broken down",
          "Real example: $20K cash → $159K wealth in 5 years",
          "Tenant management when you live there",
          "Lifetime access &amp; future updates",
        ]}
        ctaLabel="Enroll in House Hacking 101"
        ctaHref="/courses/house-hacking-101"
        tone="light"
      />
    </Section>
  );
}

type CourseUpsellRowProps = {
  eyebrow: string;
  title: string;
  emphasis: string;
  body: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
};

function CourseUpsellRow({
  eyebrow,
  title,
  emphasis,
  body,
  bullets,
  ctaLabel,
  ctaHref,
  tone = "light",
}: CourseUpsellRowProps) {
  const onLight = tone === "light";

  return (
    <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div>
        <Reveal>
          <p
            className={`text-[10px] uppercase tracking-eyebrow text-gold mb-4`}
          >
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="lg">
            {title} —{" "}
            <em
              className={onLight ? undefined : "text-gold-light"}
              dangerouslySetInnerHTML={{ __html: emphasis }}
            />
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p
            className={`mt-6 leading-body ${
              onLight ? "text-warmgray" : "text-cream/70"
            }`}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </Reveal>
        <Reveal delay={0.4}>
          <ul
            className={`mt-6 space-y-2 text-sm ${
              onLight ? "text-warmgray" : "text-cream/70"
            }`}
          >
            {bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2"
                dangerouslySetInnerHTML={{
                  __html: `<span class="text-gold">✦</span><span>${b}</span>`,
                }}
              />
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div
          className={`border p-8 md:p-10 ${
            onLight
              ? "border-brand bg-gradient-to-b from-gold/[0.06] to-cream"
              : "border-gold/40 bg-gradient-to-b from-gold/[0.08] to-transparent"
          }`}
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
            Mini Course
          </p>
          <p
            className={`font-heading text-3xl md:text-4xl leading-heading ${
              onLight ? "text-charcoal" : "text-cream"
            }`}
          >
            {title}
          </p>
          <div className="mt-6 flex items-baseline gap-3">
            <p
              className={`font-heading text-5xl md:text-6xl leading-none ${
                onLight ? "text-charcoal" : "text-gold-light"
              }`}
            >
              $27
            </p>
            <p
              className={`text-xs uppercase tracking-button ${
                onLight ? "text-warmgray" : "text-cream/60"
              }`}
            >
              One-time · Lifetime access
            </p>
          </div>
          <div className="mt-8">
            <Button
              href={ctaHref}
              variant="primary"
              size="lg"
              magnetic
              className="w-full"
            >
              {ctaLabel}
            </Button>
          </div>
          <p
            className={`mt-4 text-[11px] text-center ${
              onLight ? "text-warmgray/70" : "text-cream/50"
            }`}
          >
            ✦ Course unlocks immediately after checkout
          </p>
        </div>
      </Reveal>
    </div>
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
            Trusted by buyers, sellers, and{" "}
            <em className="text-gold-light">first-time house hackers.</em>
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

      <Reveal delay={0.2}>
        <div className="mt-12 text-center">
          <a
            href="https://www.zillow.com/profile/colivingcait"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-button text-gold link-underline inline-block"
          >
            Read all reviews on Zillow →
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 8. SERVICE AREAS                                                   */
/* ---------------------------------------------------------------- */
function ServiceAreas() {
  const areas: string[] = [
    "Decatur",
    "Atlanta",
    "Avondale Estates",
    "East Atlanta",
    "Edgewood",
    "Kirkwood",
    "Snellville",
    "Stone Mountain",
    "Pine Lake",
    "Tucker",
    "Clarkston",
    "Lithonia",
    "Lawrenceville",
    "Smyrna",
  ];

  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">Service areas</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              The Atlanta metro — <em>and the markets I know best.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-warmgray leading-body">
              I work across the entire Atlanta metro with a particular
              focus on the eastern submarkets where coliving conversions
              and house hacks pencil best.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 md:border-l md:border-brand md:pl-12"
          stagger={0.04}
        >
          {areas.map((area) => (
            <StaggerItem key={area}>
              <div className="border-t border-brand pt-3">
                <p className="font-heading text-xl md:text-2xl leading-heading">
                  {area}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal delay={0.3}>
        <p className="mt-10 text-xs text-warmgray/70 italic">
          ✦ Outside the Atlanta metro? I have a vetted referral network
          across the country — ask on the call.
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 9. FINAL CTA                                                       */
/* ---------------------------------------------------------------- */
function FinalCTA() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-6">Ready</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} size="xl" className="text-cream">
            Your next property is out there.{" "}
            <em className="text-gold-light">Let&apos;s go find it.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-cream/70 leading-body max-w-xl mx-auto">
            Whether you&apos;re buying, selling, or house hacking — start
            with a 30-minute call. We&apos;ll figure out what fits, what
            doesn&apos;t, and what to do next.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <Button
              href={DISCOVERY_CALL_URL}
              variant="primary"
              size="lg"
              magnetic
            >
              Schedule a Call →
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
