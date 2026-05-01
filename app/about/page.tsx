import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import PhotoFrame from "@/components/PhotoFrame";
import { zillowTestimonials } from "@/lib/testimonials";

export const metadata = {
  title: "About Caitlyn Verdugo — Coliving Cait",
  description:
    "Atlanta-based coliving investor, Realtor, and women's coliving coach. Co-founder of She Leads Coliving and the Women's Coliving Summit. 50+ rooms. Dozens of deals.",
};

// About page — 7 sections per spec. Brand voice: warm, confident, direct,
// mission-driven. Pullquote breaks the long story into a moment of emphasis.
export default function AboutPage() {
  return (
    <>
      <Hero />
      <MyStory />
      <TheMission />
      <SheLeadsAndWCS />
      <MediaAppearances />
      <Testimonials />
      <TripleCTA />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO — split charcoal + photo                                  */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative bg-charcoal text-cream grain overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Left — copy */}
        <div className="flex items-center px-6 py-16 md:px-12 md:py-20 lg:px-20">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow className="mb-6">About Caitlyn</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading level={1} size="xl" className="text-cream">
                Built to build. <em>Born to sell.</em> Here to help.
              </Heading>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.3}>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cream/15 pt-6">
                {[
                  ["$2.5M", "AUM"],
                  ["50+", "Deals"],
                  ["100+", "Residents"],
                  ["KW", "Realtor"],
                ].map(([num, label]) => (
                  <li key={label}>
                    <p className="font-heading italic text-2xl md:text-3xl text-gold-light leading-heading">
                      {num}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-eyebrow text-cream/60">
                      {label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Right — staircase photo */}
        <div className="relative bg-blush min-h-[60vh] md:min-h-full">
          <Reveal direction="left" delay={0.2} duration={1} className="h-full">
            <PhotoFrame
              src="/images/caitlyn-staircase.jpg"
              alt="Caitlyn Verdugo on a staircase — Coliving Cait"
              aspect="h-full"
              placeholderLabel="staircase photo"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. MY STORY — locked life-story copy + pullquote                  */
/* ---------------------------------------------------------------- */
function MyStory() {
  // Story body split into paragraphs. The pullquote is rendered as a
  // breakout BETWEEN paragraph 5 (mission realization) and paragraph 6
  // (credentials) — gives the reader a beat of emphasis before the close.
  const before = [
    `I grew up in Southern California, watching my parents build businesses. Both entrepreneurs — they showed me early what it looked like to bet on yourself, create something from nothing, and never wait for someone else to open the door. That idea has really shaped who I am today.`,
    `At 17 I started my first business — not from a business plan, but from a moment that mattered. A family friend's two-year-old had a near-drowning experience. As a lifelong competitive swimmer who had been teaching swim lessons for the city of Huntington Beach, I stepped in and taught her how to swim in my parents' backyard pool. One lesson quickly grew into a full-fledged business. By the time I was 21, Jump Start Swimming had over 20 instructors, three pools, and hundreds of families every year across Orange County, California. While studying business and child development at Cal State Fullerton I was simultaneously managing staff, running operations, responding to midnight emails, and learning what it actually means to build something real from the ground up.`,
    `After graduating I decided I wanted to live my life and travel a little more — so I booked one-way tickets to places I'd never been. I spent a year living in Hawaii, backpacking South America, then Asheville North Carolina, then St. Pete Florida, where I fell in love with marathon swimming and real estate in 2019/2020 — right as the pandemic was just getting started. Perfect timing.`,
    `I moved to Atlanta to be closer to family and pretty quickly felt the pull toward investing. I started attending real estate investing meetups. In 2022 I converted my basement into a studio apartment, rented it out, and felt the click of something falling into place. A few months later, I unknowingly walked into a PadSplit meetup — and that was it. I knew coliving was the strategy I'd been looking for.`,
    `Coliving is one of the most powerful tools we have right now — working to accomplish the joint mission of solving the affordable housing crisis and helping everyday women build real wealth through real estate. And what I love most about it is that it's the ultimate creative solution. We don't have enough housing for the people who need it — but rather than just throwing our hands up and saying "we need to build more," which takes decades, we can reconfigure the housing we already have to better serve the people who need it right now.`,
  ];

  const after = [
    `I've now built a growing portfolio of coliving homes across the Atlanta metro, co-founded She Leads Coliving and the Women's Coliving Summit, and built a coaching program to help women do exactly what I did — but faster, smarter, and with someone in their corner.`,
    `Because real estate is the entrepreneur's dream. You can make it as big as you want. There's no ceiling, no set path. And I'm proof of that.`,
  ];

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow className="mb-6 text-center">My Story</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="lg" className="text-center">
            How I got <em>here.</em>
          </Heading>
        </Reveal>

        <div className="mt-14 space-y-7 text-warmgray leading-body text-[1.0625rem]">
          {before.map((para, i) => (
            <Reveal key={i} delay={i === 0 ? 0.15 : 0}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        {/* Pullquote — editorial breakout */}
        <Reveal>
          <figure className="my-16 md:my-20 relative">
            <span
              aria-hidden
              className="absolute -top-2 left-1/2 -translate-x-1/2 text-gold text-xl"
            >
              ✦
            </span>
            <blockquote className="font-heading italic text-3xl md:text-5xl leading-heading text-center text-gold">
              &ldquo;Real estate is the entrepreneur&apos;s dream. You can
              make it as big as you want. There&apos;s no ceiling.&rdquo;
            </blockquote>
            <span
              aria-hidden
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-gold text-xl"
            >
              ✦
            </span>
          </figure>
        </Reveal>

        <div className="space-y-7 text-warmgray leading-body text-[1.0625rem]">
          {after.map((para, i) => (
            <Reveal key={i}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. THE MISSION — 5 role cards on charcoal                         */
/* ---------------------------------------------------------------- */
function TheMission() {
  const roles: { symbol: string; label: string; sub: string }[] = [
    { symbol: "$", label: "Investor", sub: "50+ coliving rooms" },
    { symbol: "♀", label: "Coach", sub: "1:1 + advisory" },
    {
      symbol: "◈",
      label: "She Leads Co-Founder",
      sub: "500+ women in coliving",
    },
    {
      symbol: "★",
      label: "WCS Co-Founder",
      sub: "Women's Coliving Summit",
    },
    { symbol: "⌂", label: "KW Realtor", sub: "Atlanta metro" },
  ];

  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-end">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">The mission</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              Coliving as a vehicle for{" "}
              <em>wealth and community.</em>
            </Heading>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="text-cream/70 leading-body">
            Coliving is the rare model that wins on every side of the
            equation. Investors get cashflow that traditional rentals
            can&apos;t touch. Residents get clean, furnished, all-inclusive
            housing they can actually qualify for. And communities get more
            of the housing they desperately need — without waiting decades
            for new construction. It&apos;s the most powerful real estate
            strategy I&apos;ve found, and I built my career around helping
            women use it.
          </p>
        </Reveal>
      </div>

      {/* 5 role cards */}
      <Stagger
        className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-5"
        stagger={0.08}
      >
        {roles.map((r) => (
          <StaggerItem key={r.label}>
            <Card
              tone="transparent"
              interactive
              className="h-full border-gold/30 hover:border-gold"
            >
              <p className="text-2xl text-gold mb-4">{r.symbol}</p>
              <p className="font-heading text-xl text-cream leading-heading">
                {r.label}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-eyebrow text-cream/50">
                {r.sub}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. SHE LEADS + WCS STRIP                                          */
/* ---------------------------------------------------------------- */
function SheLeadsAndWCS() {
  return (
    <Section tone="blush">
      <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
        {/* WCS group photo */}
        <Reveal>
          <PhotoFrame
            src="/images/wcs-group.jpg"
            alt="Women's Coliving Summit group photo"
            aspect="aspect-[4/5] md:aspect-auto md:h-full"
            placeholderLabel="WCS group photo"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full"
          />
        </Reveal>

        {/* Two stacked panels — She Leads (top), WCS (bottom) */}
        <div className="grid gap-6 md:grid-rows-2">
          <Reveal delay={0.1}>
            <Card interactive className="h-full flex flex-col bg-cream">
              <Eyebrow className="mb-3">She Leads Coliving</Eyebrow>
              <Heading level={3} size="sm">
                A community built by women, <em>for women.</em>
              </Heading>
              <p className="mt-4 text-warmgray text-sm leading-body flex-1">
                The private community I co-founded for women investing in
                coliving. Connect, learn, and grow alongside women who are
                building the same thing you are. Free to join.
              </p>
              <div className="mt-6">
                <Button
                  href="https://facebook.com/groups/sheleadscoliving"
                  variant="outline"
                  size="md"
                >
                  Join She Leads →
                </Button>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card interactive className="h-full flex flex-col bg-cream">
              <Eyebrow className="mb-3">Women&apos;s Coliving Summit</Eyebrow>
              <Heading level={3} size="sm">
                The coliving event built <em>for and by women.</em>
              </Heading>
              <p className="mt-4 text-warmgray text-sm leading-body flex-1">
                October 16–17, 2026 · Atlanta. The first and only live event
                of its kind — co-founded with the operators, investors, and
                educators shaping coliving today. ~150 attendees.
              </p>
              <div className="mt-6">
                <Button
                  href="https://www.eventbrite.com/e/womens-coliving-summit"
                  variant="primary"
                  size="md"
                >
                  Reserve Your Seat →
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. MEDIA & APPEARANCES                                            */
/* ---------------------------------------------------------------- */
function MediaAppearances() {
  // Placeholder grid — content will be added once Caitlyn provides links.
  // Each card is structured so swapping a placeholder for real content is a
  // one-line change.
  const items: {
    type: "Podcast" | "Speaking" | "YouTube";
    title: string;
  }[] = [
    { type: "Podcast", title: "Featured episode coming soon" },
    { type: "Speaking", title: "Stage appearance coming soon" },
    { type: "YouTube", title: "Video feature coming soon" },
    { type: "Podcast", title: "Featured episode coming soon" },
    { type: "Speaking", title: "Stage appearance coming soon" },
    { type: "YouTube", title: "Video feature coming soon" },
  ];

  return (
    <Section tone="cream">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Media &amp; Appearances</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Where I&apos;ve <em>shown up.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {items.map((item, i) => (
          <StaggerItem key={i}>
            <Card interactive className="h-full flex flex-col">
              <Eyebrow className="mb-3">{item.type}</Eyebrow>
              <p className="font-heading text-2xl leading-heading flex-1">
                {item.title}
              </p>
              <p className="mt-6 text-xs uppercase tracking-button text-warmgray/60">
                ✦ Coming soon
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. TESTIMONIALS — same 4 Zillow reviews as homepage                */
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
            What clients <em>actually say.</em>
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
/* 7. TRIPLE CTA                                                     */
/* ---------------------------------------------------------------- */
function TripleCTA() {
  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Work with me</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Pick the door <em>that fits.</em>
          </Heading>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button href="/get-coaching" variant="primary" size="lg" magnetic>
            Get Coaching
          </Button>
          <Button href="/partner-with-me" variant="secondary" size="lg">
            Partner With Me
          </Button>
          <Button href="/community" variant="outline" size="lg">
            Join the Community
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
