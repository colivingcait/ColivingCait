import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata = {
  title: "Community — Coliving Cait",
  description:
    "She Leads Coliving, the Women's Coliving Summit, and the Atlanta Monthly Meetup. Three ways into the community of women building wealth through coliving.",
};

// External URLs — kept as constants at the top of the file so they swap
// in one place when the real links are confirmed.
const SHE_LEADS_FB_URL = "https://facebook.com/groups/sheleadscoliving";
const WCS_EVENTBRITE_URL =
  "https://www.eventbrite.com/e/womens-coliving-summit-2026";
const MEETUP_EVENTBRITE_URL =
  "https://www.eventbrite.com/e/atlanta-coliving-meetup";

// Community — 7 sections per spec. Three community surfaces (She Leads,
// monthly meetup, WCS) plus a newsletter capture and triple CTA close.
export default function CommunityPage() {
  return (
    <>
      <Hero />
      <SheLeads />
      <AtlantaMeetup />
      <QuoteBanner />
      <WomensColivingSummit />
      <Newsletter />
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
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">Community</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              You don&apos;t have to figure this out{" "}
              <em className="text-gold-light">alone.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-xl">
              Three ways in: a private community of 500+ women building
              coliving portfolios, an in-person monthly meetup in Atlanta,
              and the only live event of its kind built for and by
              women.
            </p>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.35}>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <HeroStat value="500+" label="Members" />
              <HeroStat value="2" label="Summits hosted" />
              <HeroStat value="Free" label="To join" />
            </div>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href={SHE_LEADS_FB_URL}
                variant="primary"
                size="lg"
                magnetic
              >
                Join She Leads →
              </Button>
              <Button href={WCS_EVENTBRITE_URL} variant="outline" size="lg">
                Reserve WCS Seat →
              </Button>
            </div>
          </Reveal>
        </div>

        {/* WCS group photo placeholder */}
        <Reveal direction="left" delay={0.3} duration={1}>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/30 bg-charcoal/85 flex items-center justify-center">
            <span className="font-heading italic text-cream/40 text-2xl">
              WCS group photo
            </span>
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-eyebrow text-gold">
              ✦ Photo placeholder
            </span>
            {/* Gold corner brackets — editorial photo treatment */}
            <CornerBrackets />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-3xl md:text-4xl text-gold-light leading-heading">
        {value}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-eyebrow text-cream/60">
        {label}
      </p>
    </div>
  );
}

// Decorative L-shaped gold accents at the four corners of an image frame
function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden
        className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold"
      />
      <span
        aria-hidden
        className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold"
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold"
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 2. SHE LEADS COLIVING                                              */
/* ---------------------------------------------------------------- */
function SheLeads() {
  const memberTypes: { symbol: string; title: string; body: string }[] = [
    {
      symbol: "✦",
      title: "Coliving curious",
      body: "Just learning the model — no portfolio, no pressure. Asking the questions and listening.",
    },
    {
      symbol: "◈",
      title: "First-deal investors",
      body: "Saving the down payment, watching the market, getting ready to make the first move.",
    },
    {
      symbol: "♀",
      title: "Active operators",
      body: "Running one to ten coliving homes. Trading playbooks, lessons, and what&apos;s working right now.",
    },
    {
      symbol: "$",
      title: "Passive investors",
      body: "Partnering on deals rather than operating. Looking for vetted operators and structured opportunities.",
    },
    {
      symbol: "⊕",
      title: "Realtors &amp; service pros",
      body: "Agents, lenders, attorneys, designers, contractors — the women supporting the operators.",
    },
  ];

  return (
    <Section tone="blush">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">She Leads Coliving</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              A community built by women, <em>for women.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-warmgray leading-body">
              A private Facebook group I co-founded for women in coliving
              — at every stage, in every market. Real questions. Real
              answers. No pitches, no gatekeeping.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8">
              <Button
                href={SHE_LEADS_FB_URL}
                variant="primary"
                size="lg"
                magnetic
              >
                Join She Leads Coliving →
              </Button>
              <p className="mt-3 text-xs text-warmgray/70 italic">
                ✦ Free · Private · Approval required
              </p>
            </div>
          </Reveal>
        </div>

        {/* 5 member types */}
        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 md:border-l md:border-brand md:pl-12"
          stagger={0.07}
        >
          {memberTypes.map((m) => (
            <StaggerItem key={m.title}>
              <div className="border-t border-brand pt-4">
                <p className="text-xl text-gold mb-2">{m.symbol}</p>
                <p className="font-heading text-lg leading-heading">
                  <span dangerouslySetInnerHTML={{ __html: m.title }} />
                </p>
                <p
                  className="mt-2 text-sm text-warmgray leading-body"
                  dangerouslySetInnerHTML={{ __html: m.body }}
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. ATLANTA MONTHLY MEETUP                                          */
/* ---------------------------------------------------------------- */
function AtlantaMeetup() {
  const details: { label: string; value: string }[] = [
    { label: "When", value: "Last Wednesday, every month" },
    { label: "Where", value: "Atlanta, GA" },
    { label: "Cost", value: "Free to attend" },
    { label: "RSVP", value: "Required, on Eventbrite" },
  ];

  return (
    <Section tone="cream">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">Atlanta Monthly Meetup</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              Real conversations. Real connections.{" "}
              <em>Every month.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-warmgray leading-body">
              An open, in-person gathering for anyone curious about
              coliving in the Atlanta market — operators, investors,
              service pros, and folks just exploring the model. Bring
              your questions. Bring a friend.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8">
              <Button
                href={MEETUP_EVENTBRITE_URL}
                variant="primary"
                size="lg"
                magnetic
              >
                RSVP on Eventbrite →
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Editorial details panel */}
        <Reveal direction="left" delay={0.2}>
          <div className="border border-brand bg-blush p-8 md:p-10 relative">
            <CornerBrackets />
            <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-6">
              Meetup details
            </p>
            <dl className="space-y-5">
              {details.map((d) => (
                <div key={d.label} className="border-t border-brand pt-3">
                  <dt className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
                    {d.label}
                  </dt>
                  <dd className="mt-1 font-heading text-xl leading-heading text-charcoal">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. QUOTE BANNER                                                    */
/* ---------------------------------------------------------------- */
function QuoteBanner() {
  return (
    <Section tone="gold" fullBleed className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span aria-hidden className="text-white/80 text-2xl block mb-6">
            ✦
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-heading italic text-3xl md:text-5xl leading-heading text-white">
            &ldquo;Every coliving home any of us opens is one more option
            for someone in our community who needs a safe, stable, clean,
            high quality and affordable place to land.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-8 text-xs uppercase tracking-button text-white/80">
            ✦ Caitlyn Verdugo · Coliving Cait
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 5. WOMEN'S COLIVING SUMMIT                                         */
/* ---------------------------------------------------------------- */
function WomensColivingSummit() {
  const details: { label: string; value: string }[] = [
    { label: "Dates", value: "October 16–17, 2026" },
    { label: "Where", value: "Atlanta, GA" },
    { label: "Format", value: "Two-day live event" },
    { label: "Capacity", value: "~150 attendees" },
  ];

  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        {/* Editorial details panel */}
        <Reveal direction="right" delay={0.2}>
          <div className="border border-gold/40 bg-charcoal/90 p-8 md:p-10 relative md:order-1 order-2">
            <CornerBrackets />
            <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-6">
              Summit details
            </p>
            <dl className="space-y-5">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="border-t border-cream/15 pt-3"
                >
                  <dt className="text-[10px] uppercase tracking-eyebrow text-cream/60">
                    {d.label}
                  </dt>
                  <dd className="mt-1 font-heading text-xl leading-heading text-cream">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="md:order-2 order-1">
          <Reveal>
            <Eyebrow className="mb-4">Women&apos;s Coliving Summit</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              The coliving event built{" "}
              <em className="text-gold-light">for and by women.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body">
              The first and only live event of its kind. Two days of
              underwriting deep-dives, operator panels, deal reviews,
              and the kind of conversations that only happen in a room
              full of women who get it.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8">
              <Button
                href={WCS_EVENTBRITE_URL}
                variant="primary"
                size="lg"
                magnetic
              >
                Reserve Your Seat →
              </Button>
              <p className="mt-3 text-xs text-cream/50 italic">
                ✦ Limited capacity — early reservations recommended
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. NEWSLETTER                                                      */
/* ---------------------------------------------------------------- */
function Newsletter() {
  return (
    <Section tone="blush">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">The newsletter</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              The coliving intel you won&apos;t find{" "}
              <em>anywhere else.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-warmgray leading-body">
              One email a week. Real numbers from real properties,
              honest takes on the market, lessons from my portfolio,
              and the things I&apos;m only telling subscribers.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2 text-sm text-warmgray">
              <li>
                <span className="text-gold mr-2">✦</span>Market reads,
                deals, and what&apos;s actually working
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Subscriber-only
                resources before they go public
              </li>
              <li>
                <span className="text-gold mr-2">✦</span>Always honest, never
                pitchy
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <LeadMagnetForm
            eyebrow="Subscribe"
            heading={
              <>
                Send me the <em>weekly note.</em>
              </>
            }
            body="One email a week. Unsubscribe with one click."
            cta="Subscribe"
            tag="community-member"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 7. FINAL CTA — TRIPLE                                              */
/* ---------------------------------------------------------------- */
function FinalCTA() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-6">There&apos;s room here</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={2} size="xl" className="text-cream">
            There&apos;s a seat at this table{" "}
            <em className="text-gold-light">for you.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-cream/70 leading-body max-w-xl mx-auto">
            Pick the doorway that fits where you are right now — they
            all lead to the same room.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button
              href={SHE_LEADS_FB_URL}
              variant="primary"
              size="lg"
              magnetic
            >
              Join She Leads
            </Button>
            <Button
              href={WCS_EVENTBRITE_URL}
              variant="outline"
              size="lg"
            >
              Reserve WCS Seat
            </Button>
            <Button
              href={MEETUP_EVENTBRITE_URL}
              variant="outline"
              size="lg"
            >
              RSVP Next Meetup
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
