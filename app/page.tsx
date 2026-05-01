import Image from "next/image";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";
import Parallax from "@/components/Parallax";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import TestimonialCard from "@/components/TestimonialCard";
import { zillowTestimonials } from "@/lib/testimonials";

export const metadata = {
  title: "Coliving Cait — Building wealth through intentional coliving",
  description:
    "Caitlyn Verdugo is an Atlanta-based coliving investor, Realtor, and women's coliving coach. 50+ rooms, 100+ residents housed, helping women build real wealth through real estate.",
};

// Homepage — Page 1 of the build. Section order matches the playbook spec
// exactly. Primary CTA throughout: Book a Discovery Call. Secondary CTA:
// Coliving Starter Guide PDF.
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowICanHelp />
      <WhatIsColivingTeaser />
      <WhyColiving />
      <QuoteBanner />
      <SocialProof />
      <LeadMagnet />
      <CommunityCallout />
      <FinalCTA />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO                                                           */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <Section
      tone="cream"
      className="relative overflow-hidden bg-gradient-to-b from-gold/[0.07] via-cream to-cream"
    >
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Reveal direction="up" delay={0.1}>
            <Eyebrow className="mb-6">Coliving Cait · Atlanta</Eyebrow>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <Heading level={1} size="xl">
              Building wealth through <em>intentional coliving.</em>
            </Heading>
          </Reveal>
          <Reveal direction="up" delay={0.4}>
            <p className="mt-6 max-w-lg text-warmgray leading-body">
              I&apos;m Caitlyn Verdugo — an Atlanta-based coliving investor,
              Realtor, and women&apos;s coliving coach. I operate 50+ coliving
              rooms across the metro and help women build real wealth through
              real estate.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.55}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" size="lg" magnetic>
                Book a Discovery Call
              </Button>
              <Button href="/what-is-coliving" variant="outline" size="lg">
                Learn About Coliving
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Headshot — yellow blazer photo. Next/Image lazy-loads the optimized
            version at the right size for every breakpoint. */}
        <Reveal direction="left" delay={0.3} duration={1}>
          <Parallax distance={50}>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-brand bg-blush">
              <Image
                src="/images/caitlyn-yellow-blazer.jpg"
                alt="Caitlyn Verdugo, Coliving Cait — Atlanta-based coliving investor and Realtor"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              {/* Soft gold wash overlay — keeps the photo feeling brand-cohesive */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. STATS BAR                                                      */
/* ---------------------------------------------------------------- */
function StatsBar() {
  return (
    <section className="relative bg-charcoal text-cream py-10 grain overflow-hidden">
      <Marquee speed={40}>
        <StatPill>
          $<CountUp to={2.5} decimals={1} duration={2} />M Assets Under Management
        </StatPill>
        <Sparkle />
        <StatPill>
          <CountUp to={50} suffix="+" /> Coliving Rooms
        </StatPill>
        <Sparkle />
        <StatPill>
          <CountUp to={100} suffix="+" /> Residents Housed
        </StatPill>
        <Sparkle />
        <StatPill>5.0 Zillow Rating</StatPill>
        <Sparkle />
        <StatPill>Atlanta Metro · Keller Williams</StatPill>
        <Sparkle />
      </Marquee>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. HOW I CAN HELP — 3 SERVICE CARDS                               */
/* ---------------------------------------------------------------- */
function HowICanHelp() {
  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">How I can help</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Three ways to <em>work together.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-4 text-warmgray">
            Whether you&apos;re buying your first investment property, building
            a coliving portfolio from scratch, or putting capital to work
            passively — there&apos;s a path here for you.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
        <StaggerItem>
          <ServiceCard
            symbol="◈"
            title="Buy & Sell"
            body="A realtor who thinks like an investor. Investment properties, coliving conversions, house hacking, and traditional sales across the Atlanta metro."
            href="/buy-and-sell"
          />
        </StaggerItem>
        <StaggerItem>
          <ServiceCard
            symbol="♀"
            title="Get Coaching"
            body="Your roadmap to coliving — tailored to where you are and where you want to go. 1:1 coaching for women building their first portfolios, or advisory for women already operating."
            href="/get-coaching"
          />
        </StaggerItem>
        <StaggerItem>
          <ServiceCard
            symbol="$"
            title="Partner With Me"
            body="Your money working while you live your life. Passive coliving partnerships in the Atlanta metro — directly with me, no fund or syndication."
            href="/partner-with-me"
          />
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. WHAT IS COLIVING — EDUCATION TEASER                            */
/* ---------------------------------------------------------------- */
function WhatIsColivingTeaser() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">What is coliving?</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              Same property. <em>Different strategy.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/70 leading-body">
              Coliving is a rent-by-the-room model that turns a single-family
              home into 6+ private bedrooms with shared common spaces. The
              math works because you&apos;re no longer dependent on one
              tenant covering one rent — you&apos;ve got six to eight income
              streams stabilizing the property.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8">
              <Button href="/what-is-coliving" variant="outline" size="lg">
                Learn How Coliving Works →
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The math — side by side */}
        <Reveal direction="left" delay={0.2}>
          <div className="grid gap-4">
            <MathPanel
              label="Traditional Rental"
              value="$2,000"
              sub="Gross monthly · Often negative cashflow after expenses"
            />
            <MathPanel
              label="Coliving · 6 Rooms"
              value="$5,000+"
              sub="Gross monthly · ~$1,000+ cashflow at 85% occupancy"
              featured
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. WHY COLIVING — 3 ANGLES                                        */
/* ---------------------------------------------------------------- */
function WhyColiving() {
  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Why coliving</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            One housing model. <em>Three winners.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <AngleCard
            symbol="$"
            label="For Investors"
            title="The math finally works."
            body="Six to eight income streams instead of one. Higher gross revenue, real cashflow, and better risk diversification than a traditional rental."
          />
        </StaggerItem>
        <StaggerItem>
          <AngleCard
            symbol="⌂"
            label="For Residents"
            title="A place to land."
            body="Furnished private rooms, flexible lease terms, all-inclusive pricing, and built-in community — at a price working professionals can actually afford."
            tone="blush"
          />
        </StaggerItem>
        <StaggerItem>
          <AngleCard
            symbol="✦"
            label="For Communities"
            title="Affordable housing — solved one home at a time."
            body="Every coliving home is one more option for the nurses, teachers, and tradespeople who keep our neighborhoods running."
          />
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. QUOTE BANNER                                                   */
/* ---------------------------------------------------------------- */
function QuoteBanner() {
  return (
    <Section tone="gold" fullBleed className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-heading text-3xl md:text-5xl italic leading-heading text-white">
            &ldquo;Coliving isn&apos;t just a housing strategy — it&apos;s how
            women are building generational wealth right now.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-xs uppercase tracking-button text-white/80">
            ✦ Caitlyn Verdugo · Coliving Cait
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. SOCIAL PROOF — TESTIMONIALS                                    */
/* ---------------------------------------------------------------- */
function SocialProof() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">5.0 ★ Zillow Rating</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md" className="text-cream">
            What clients <em>actually say.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch"
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
/* 8. LEAD MAGNET — COLIVING STARTER GUIDE                           */
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
              Not ready to book a call? <em>Start here.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-warmgray leading-body">
              The Coliving Starter Guide walks you through the model, the
              math, and the first three decisions every new operator has to
              make. Twenty minutes of reading, weeks of clarity.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>How coliving differs
                from a traditional rental
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>The 3 non-negotiables
                of a great coliving property
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>A worked example so
                the numbers feel real
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <LeadMagnetForm
            eyebrow="The Coliving Starter Guide"
            heading={
              <>
                Send me the <em>free guide.</em>
              </>
            }
            body="One PDF. No spam. Unsubscribe with one click."
            cta="Send The Guide"
            tag="coliving-starter-guide-downloaded"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 9. COMMUNITY CALLOUT                                              */
/* ---------------------------------------------------------------- */
function CommunityCallout() {
  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Community</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            You don&apos;t have to figure this out <em>alone.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.12}
      >
        <StaggerItem>
          <CommunityCard
            symbol="♀"
            label="Free to join"
            title="She Leads Coliving"
            body="A community built by women, for women. 500+ members swapping deals, lessons, and wins inside a private Facebook group."
            ctaLabel="Join the group"
            ctaHref="https://facebook.com/groups/sheleadscoliving"
          />
        </StaggerItem>
        <StaggerItem>
          <CommunityCard
            symbol="★"
            label="October 16–17, 2026"
            title="Women's Coliving Summit"
            body="The first and only live event of its kind — built for and by women in coliving. Two days. ~150 attendees. Atlanta, GA."
            ctaLabel="Reserve your seat"
            ctaHref="https://www.eventbrite.com/e/womens-coliving-summit"
          />
        </StaggerItem>
        <StaggerItem>
          <CommunityCard
            symbol="◉"
            label="Last Wednesday monthly"
            title="Atlanta Monthly Meetup"
            body="Real conversations. Real connections. In-person every month in Atlanta — free to attend, RSVP required."
            ctaLabel="RSVP on Eventbrite"
            ctaHref="https://www.eventbrite.com/e/atlanta-coliving-meetup"
          />
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 10. FINAL CTA                                                     */
/* ---------------------------------------------------------------- */
function FinalCTA() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-6">Let&apos;s talk</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} size="xl" className="text-cream">
            There&apos;s a seat at this table <em>for you.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-cream/70 leading-body max-w-xl mx-auto">
            Whether you&apos;re investor-curious or already running rooms,
            the next step is the same: a 30-minute discovery call. We&apos;ll
            figure out together whether — and how — coliving fits.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <Button href="/contact" variant="primary" size="lg" magnetic>
              Book a Discovery Call
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================================================================ */
/* HELPERS                                                           */
/* ================================================================ */

function StatPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-heading text-2xl md:text-3xl text-gold-light italic">
      {children}
    </span>
  );
}

function Sparkle() {
  return <span className="text-gold text-xl">✦</span>;
}

function MathPanel({
  label,
  value,
  sub,
  featured = false,
}: {
  label: string;
  value: string;
  sub: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`border p-6 md:p-8 ${
        featured ? "border-gold bg-gold/5" : "border-brand"
      }`}
    >
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        {label}
      </p>
      <p className="font-heading text-4xl md:text-6xl text-cream leading-heading">
        {value}
      </p>
      <p className="mt-3 text-cream/70 text-sm leading-body">{sub}</p>
    </div>
  );
}

function ServiceCard({
  symbol,
  title,
  body,
  href,
}: {
  symbol: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Card interactive className="h-full flex flex-col">
      <p className="text-3xl text-gold mb-5">{symbol}</p>
      <Heading level={3} size="sm">
        {title}
      </Heading>
      <p className="mt-3 text-warmgray text-sm leading-body flex-1">{body}</p>
      <a
        href={href}
        className="mt-6 inline-block text-xs uppercase tracking-button text-gold link-underline"
      >
        Explore →
      </a>
    </Card>
  );
}

function AngleCard({
  symbol,
  label,
  title,
  body,
  tone = "cream",
}: {
  symbol: string;
  label: string;
  title: string;
  body: string;
  tone?: "cream" | "blush";
}) {
  return (
    <div
      className={`border border-brand p-8 md:p-10 h-full flex flex-col ${
        tone === "blush" ? "bg-blush" : "bg-cream"
      }`}
    >
      <p className="text-3xl text-gold mb-4">{symbol}</p>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        {label}
      </p>
      <Heading level={3} size="sm">
        {title}
      </Heading>
      <p className="mt-3 text-warmgray text-sm leading-body flex-1">{body}</p>
    </div>
  );
}

function CommunityCard({
  symbol,
  label,
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  symbol: string;
  label: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <Card interactive className="h-full flex flex-col">
      <p className="text-3xl text-gold mb-4">{symbol}</p>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        {label}
      </p>
      <Heading level={3} size="sm">
        {title}
      </Heading>
      <p className="mt-3 text-warmgray text-sm leading-body flex-1">{body}</p>
      <div className="mt-6">
        <Button href={ctaHref} variant="outline" size="md">
          {ctaLabel}
        </Button>
      </div>
    </Card>
  );
}
