import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import PageVisitTracker from "@/components/PageVisitTracker";
import { CK_TAGS } from "@/lib/convertkit";
import { zillowTestimonials } from "@/lib/testimonials";

export const metadata = {
  title: "Coaching & Advisory — Coliving Cait",
  description:
    "1:1 coaching for women building their first coliving portfolios, plus monthly advisory for women already operating. Two offers, one outcome: deals that pencil and operations that work.",
};

// Both offers route to the same discovery call. Swap this URL once Caitlyn
// confirms her Calendly link.
const DISCOVERY_CALL_URL = "https://calendly.com/colivingcait/discovery";

// Get Coaching — 11 sections per spec. Two offers (Coaching Program $3K
// 8 weeks, Advisory Retainer $1,500/mo). Both CTAs route to the same
// discovery call. Pricing appears in sections 2 and 11; the hero is
// price-free per spec.
export default function GetCoachingPage() {
  return (
    <>
      <PageVisitTracker tag={CK_TAGS.COACHING_PAGE_VISITED} />
      <Hero />
      <ChooseYourPath />
      <WhoIsThisFor />
      <TheApproach />
      <Curriculum />
      <Fascinations />
      <LeadMagnet />
      <WhatsIncluded />
      <Credentials />
      <Testimonials />
      <PricingBlock />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO                                                            */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">Coaching &amp; Advisory</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              Your roadmap to coliving — tailored to{" "}
              <em className="text-gold-light">you.</em>
            </Heading>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="md:pl-12 md:border-l md:border-cream/15">
            <p className="text-cream/75 leading-body text-[1.0625rem]">
              There&apos;s no one-size-fits-all path into coliving. Some
              women are buying their first investment property. Others are
              transitioning a portfolio. Some are scaling. Whatever stage
              you&apos;re at, we&apos;ll build the plan that fits you — not
              someone else&apos;s playbook.
            </p>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem]">
              Two ways to work together. Both start the same way: a
              30-minute discovery call.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. CHOOSE YOUR PATH — two offer cards                              */
/* ---------------------------------------------------------------- */
function ChooseYourPath() {
  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Choose your path</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Two offers. <em>One outcome.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-warmgray">
            Whether you&apos;re building from scratch or already operating —
            here&apos;s how we work together.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <OfferCard
            label="Offer 01"
            title="The Coaching Program"
            price="$3,000"
            cadence="8 weeks · 1:1"
            description="For women getting started or transitioning into coliving. Personalized roadmap, weekly calls, and the templates I use in my own portfolio."
            features={[
              "Personalized 8-week roadmap",
              "Weekly 1:1 coaching calls",
              "Done-for-you templates &amp; spreadsheets",
              "Live deal reviews on your real properties",
              "Direct messaging access between calls",
            ]}
            ctaHref={DISCOVERY_CALL_URL}
            featured
          />
        </StaggerItem>

        <StaggerItem>
          <OfferCard
            label="Offer 02"
            title="The Advisory Retainer"
            price="$1,500"
            cadence="Per month · Month-to-month"
            description="For women already operating who need ongoing tactical support. Bring me the messy stuff and we'll work through it together."
            features={[
              "Ongoing tactical support",
              "Deal reviews on every offer",
              "Operations troubleshooting",
              "Direct messaging access",
              "Built-in accountability",
            ]}
            ctaHref={DISCOVERY_CALL_URL}
          />
        </StaggerItem>
      </Stagger>

      <Reveal delay={0.3}>
        <p className="mt-10 text-center text-xs uppercase tracking-button text-warmgray/70">
          ✦ Both start with the same 30-minute discovery call
        </p>
      </Reveal>
    </Section>
  );
}

type OfferCardProps = {
  label: string;
  title: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  ctaHref: string;
  featured?: boolean;
};

function OfferCard({
  label,
  title,
  price,
  cadence,
  description,
  features,
  ctaHref,
  featured = false,
}: OfferCardProps) {
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

      <div className="mt-6 flex items-baseline gap-3">
        <p className="font-heading text-5xl md:text-6xl text-charcoal leading-none">
          {price}
        </p>
        <p className="text-xs uppercase tracking-button text-warmgray">
          {cadence}
        </p>
      </div>

      <p
        className="mt-6 text-warmgray text-sm leading-body"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <ul className="mt-6 space-y-3 text-sm text-warmgray flex-1">
        {features.map((f) => (
          <li
            key={f}
            className="flex gap-3"
            dangerouslySetInnerHTML={{
              __html: `<span class="text-gold mt-1">✦</span><span>${f}</span>`,
            }}
          />
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={ctaHref}
          variant={featured ? "primary" : "secondary"}
          size="lg"
          magnetic
          className="w-full"
        >
          Book a Discovery Call →
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 3. WHO IS THIS FOR — 3 client tracks                               */
/* ---------------------------------------------------------------- */
function WhoIsThisFor() {
  const tracks: { num: string; title: string; body: string }[] = [
    {
      num: "01",
      title: "Taking the first leap",
      body: "You&apos;re newer to real estate or coliving — building credit, saving the down payment, learning the model. We&apos;ll get you ready, find the first deal, and walk into it together.",
    },
    {
      num: "02",
      title: "Transitioning into coliving",
      body: "You&apos;re already an investor — rentals, STRs, flips — and the math on your traditional rentals isn&apos;t working anymore. We&apos;ll convert what makes sense and source what doesn&apos;t.",
    },
    {
      num: "03",
      title: "Ready to scale",
      body: "You&apos;ve got one or two coliving homes operating and you&apos;re ready to grow. We&apos;ll systematize the operation, build a real deal pipeline, and add doors without losing sleep.",
    },
  ];

  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Who this is for</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Three places to <em>start.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger className="mt-14 space-y-10 md:space-y-16" stagger={0.15}>
        {tracks.map((t, i) => (
          <StaggerItem key={t.num}>
            {/* Alternating left/right alignment for editorial rhythm */}
            <div
              className={`grid gap-6 md:grid-cols-[auto_1fr] md:items-start ${
                i % 2 === 1 ? "md:ml-auto md:max-w-3xl" : "md:max-w-3xl"
              }`}
            >
              <p className="font-heading text-7xl md:text-9xl text-gold/40 leading-none">
                {t.num}
              </p>
              <div className="md:pt-4">
                <Heading level={3} size="sm">
                  {t.title}
                </Heading>
                <p
                  className="mt-3 text-warmgray leading-body"
                  dangerouslySetInnerHTML={{ __html: t.body }}
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
/* 4. THE APPROACH — 8 pillars                                        */
/* ---------------------------------------------------------------- */
function TheApproach() {
  const pillars: { num: string; title: string; sub: string }[] = [
    {
      num: "01",
      title: "The coliving model",
      sub: "Why it works, who lives there, regulatory landscape",
    },
    {
      num: "02",
      title: "Market & deal criteria",
      sub: "Where to buy, what to buy, what to avoid",
    },
    {
      num: "03",
      title: "Underwriting & analysis",
      sub: "Running the numbers before you offer",
    },
    {
      num: "04",
      title: "Financing",
      sub: "Investor loans, DSCR, creative options",
    },
    {
      num: "05",
      title: "Conversion & renovation",
      sub: "From floorplan to ready-to-list",
    },
    {
      num: "06",
      title: "Installation & launch",
      sub: "Furnishing, tech, photos, listings",
    },
    {
      num: "07",
      title: "Operations & culture",
      sub: "Screening, leases, community",
    },
    {
      num: "08",
      title: "Scaling",
      sub: "Systems, pipeline, more doors",
    },
  ];

  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">The approach</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              Eight pillars. <em>One portfolio.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-warmgray leading-body">
              Every coaching client moves through the same eight pillars —
              but the pacing, depth, and order is built around where you
              are when we start.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:border-l md:border-brand md:pl-12"
          stagger={0.06}
        >
          {pillars.map((p) => (
            <StaggerItem key={p.num}>
              <div className="border-t border-brand pt-4">
                <p className="font-heading text-2xl text-gold leading-none">
                  {p.num}
                </p>
                <p className="mt-3 font-heading text-xl leading-heading">
                  {p.title}
                </p>
                <p className="mt-2 text-sm text-warmgray leading-body">
                  {p.sub}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. CURRICULUM GRID — 4 columns                                     */
/* ---------------------------------------------------------------- */
function Curriculum() {
  const columns: {
    label: string;
    title: string;
    topics: string[];
  }[] = [
    {
      label: "01",
      title: "Underwriting",
      topics: [
        "Revenue projection by room",
        "Expense modeling",
        "Occupancy assumptions",
        "DSCR + cash-on-cash",
        "Sensitivity analysis",
      ],
    },
    {
      label: "02",
      title: "Acquisitions",
      topics: [
        "Market evaluation",
        "Floorplan analysis",
        "HOA red flags",
        "Negotiation strategy",
        "Inspection checklist",
      ],
    },
    {
      label: "03",
      title: "Conversion",
      topics: [
        "Single vs two-phase reno",
        "Bathroom additions",
        "Closet considerations",
        "Furnishing standards",
        "Tech stack setup",
      ],
    },
    {
      label: "04",
      title: "Operations",
      topics: [
        "Screening framework",
        "Lease structure",
        "Move-in process",
        "Conflict resolution",
        "Pricing strategy",
      ],
    },
  ];

  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">What we&apos;ll work through</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            The curriculum, <em>at a glance.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
        stagger={0.08}
      >
        {columns.map((c) => (
          <StaggerItem key={c.title}>
            <div className="h-full bg-cream border border-brand p-6 md:p-8 flex flex-col">
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                {c.label}
              </p>
              <Heading level={3} size="sm">
                {c.title}
              </Heading>
              <ul className="mt-5 space-y-2 text-sm text-warmgray flex-1">
                {c.topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span className="text-gold">✦</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. FASCINATIONS                                                    */
/* ---------------------------------------------------------------- */
function Fascinations() {
  const items: string[] = [
    "a single closet decision can make or cost you $40,000+?",
    "parking can get your house shut down?",
    "doing a single-phase renovation can affect your refinancing options by $25k+?",
    "the #1 maintenance issue that sends residents packing?",
    "one screening mistake can cost you thousands?",
    "there's a $15,000 problem hiding in almost every coliving conversion?",
    "three costs first-time operators always forget to model?",
  ];

  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">What you&apos;ll learn</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="lg" className="text-cream">
            Did you <em className="text-gold-light">know…</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-x-12 gap-y-6 md:grid-cols-2 max-w-5xl mx-auto"
        stagger={0.06}
      >
        {items.map((q, i) => (
          <StaggerItem key={i}>
            <div className="flex gap-4 border-t border-cream/15 pt-4">
              <span className="text-gold text-xl mt-0.5">✦</span>
              <p className="text-cream/85 leading-body text-[1.0625rem]">
                {q}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.3}>
        <p className="mt-12 text-center text-cream/60 italic font-heading text-xl md:text-2xl">
          We answer all of these — and a few hundred more — together.
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. LEAD MAGNET — 5 Coliving Mistakes                               */
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
              5 Coliving Mistakes That Cost Investors{" "}
              <em>Thousands.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-warmgray leading-body">
              Five mistakes I see first-time operators make again and
              again — and exactly how to avoid each one. Twenty minutes
              of reading. Tens of thousands of dollars saved.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>The mistake that
                kills cashflow before launch
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>The screening miss
                that costs the most
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>The renovation
                sequence almost everyone gets wrong
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <LeadMagnetForm
            eyebrow="The 5 Mistakes Guide"
            heading={
              <>
                Send me the <em>guide.</em>
              </>
            }
            body="One PDF. No spam. Unsubscribe with one click."
            cta="Send The Guide"
            tag="coliving-mistakes-downloaded"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 8. WHAT'S INCLUDED — 3 cards                                       */
/* ---------------------------------------------------------------- */
function WhatsIncluded() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">What&apos;s included</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md" className="text-cream">
            Three things you get <em className="text-gold-light">every week.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <IncludedCard
            symbol="◉"
            title="1:1 calls"
            body="Weekly 60-minute coaching sessions. Recorded so you can revisit anything. Agendas built around what's most urgent for you."
          />
        </StaggerItem>
        <StaggerItem>
          <IncludedCard
            symbol="⊞"
            title="Done-for-you resources"
            body="The exact spreadsheets, lease templates, screening scripts, listing copy, and renovation checklists I use in my own portfolio. Yours to keep."
          />
        </StaggerItem>
        <StaggerItem>
          <IncludedCard
            symbol="◈"
            title="Live deal reviews"
            body="Bring me an underwriting model, a property tour, or a problem that's stuck. We work through it on the call — together."
          />
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

function IncludedCard({
  symbol,
  title,
  body,
}: {
  symbol: string;
  title: string;
  body: string;
}) {
  return (
    <div className="h-full flex flex-col border border-gold/30 bg-charcoal p-8 md:p-10 transition-colors hover:border-gold">
      <p className="text-3xl text-gold mb-5">{symbol}</p>
      <Heading level={3} size="sm" className="text-cream">
        {title}
      </Heading>
      <p className="mt-4 text-cream/70 text-sm leading-body flex-1">
        {body}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 9. CREDENTIALS STRIP                                               */
/* ---------------------------------------------------------------- */
function Credentials() {
  const credentials: string[] = [
    "50+ coliving rooms operating across the Atlanta metro",
    "Dozens of coliving transactions completed",
    "Co-founder, She Leads Coliving (500+ women)",
    "Co-founder, Women's Coliving Summit",
  ];

  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <blockquote className="font-heading italic text-2xl md:text-4xl leading-heading">
            &ldquo;I won&apos;t teach you anything I haven&apos;t lived. Every
            framework in this program is something I&apos;m using right now,
            in a portfolio that&apos;s still <em>growing.</em>&rdquo;
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-button text-warmgray">
            ✦ Caitlyn Verdugo · Coliving Cait
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="space-y-4 md:border-l md:border-brand md:pl-12">
            {credentials.map((c) => (
              <li
                key={c}
                className="flex gap-4 text-warmgray leading-body"
              >
                <span className="text-gold mt-1">✦</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 10. TESTIMONIALS                                                   */
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
            What clients <em className="text-gold-light">actually say.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-cream/60 text-sm">
            ✦ Coaching-specific testimonials coming soon
          </p>
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
/* 11. PRICING BLOCK — bottom CTA                                     */
/* ---------------------------------------------------------------- */
function PricingBlock() {
  return (
    <Section tone="gold">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <p className="text-[10px] uppercase tracking-eyebrow text-white/80 mb-4">
            Investment
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="lg" className="text-white">
            One decision. Two paths.{" "}
            <em className="text-white">Both lead to results.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <BottomPricingCard
            label="The Coaching Program"
            price="$3,000"
            cadence="8 weeks · 1:1"
            description="For women getting started or transitioning into coliving. Structured 8-week roadmap, weekly calls, every template in my portfolio."
            features={[
              "8 weekly 1:1 sessions",
              "Personalized roadmap & deal criteria",
              "Done-for-you templates",
              "Live deal reviews",
              "Direct messaging access",
            ]}
            ctaHref={DISCOVERY_CALL_URL}
            featured
          />
        </StaggerItem>
        <StaggerItem>
          <BottomPricingCard
            label="The Advisory Retainer"
            price="$1,500"
            cadence="Per month · Month-to-month"
            description="For women already operating who need ongoing tactical support. Cancel anytime."
            features={[
              "Ongoing tactical support",
              "Deal reviews on every offer",
              "Operations troubleshooting",
              "Direct messaging access",
              "Built-in accountability",
            ]}
            ctaHref={DISCOVERY_CALL_URL}
          />
        </StaggerItem>
      </Stagger>

      <Reveal delay={0.3}>
        <p className="mt-10 text-center text-xs uppercase tracking-button text-white/80">
          ✦ Both start with the same 30-minute discovery call
        </p>
      </Reveal>
    </Section>
  );
}

type BottomPricingCardProps = {
  label: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  ctaHref: string;
  featured?: boolean;
};

function BottomPricingCard({
  label,
  price,
  cadence,
  description,
  features,
  ctaHref,
  featured = false,
}: BottomPricingCardProps) {
  return (
    <div
      className={`h-full flex flex-col border p-8 md:p-10 ${
        featured ? "bg-charcoal border-charcoal text-cream" : "bg-cream border-charcoal/20 text-charcoal"
      }`}
    >
      <p
        className={`text-[10px] uppercase tracking-eyebrow mb-3 ${
          featured ? "text-gold-light" : "text-gold"
        }`}
      >
        {label}
      </p>

      <div className="flex items-baseline gap-3">
        <p
          className={`font-heading text-5xl md:text-6xl leading-none ${
            featured ? "text-cream" : "text-charcoal"
          }`}
        >
          {price}
        </p>
        <p
          className={`text-xs uppercase tracking-button ${
            featured ? "text-cream/70" : "text-warmgray"
          }`}
        >
          {cadence}
        </p>
      </div>

      <p
        className={`mt-6 text-sm leading-body ${
          featured ? "text-cream/80" : "text-warmgray"
        }`}
      >
        {description}
      </p>

      <ul
        className={`mt-6 space-y-3 text-sm flex-1 ${
          featured ? "text-cream/80" : "text-warmgray"
        }`}
      >
        {features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="text-gold">✦</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={ctaHref}
          variant={featured ? "primary" : "secondary"}
          size="lg"
          magnetic
          className="w-full"
        >
          Book a Discovery Call →
        </Button>
      </div>
    </div>
  );
}
