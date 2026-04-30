import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";
import Parallax from "@/components/Parallax";
import PinnedReveal from "@/components/PinnedReveal";

// Foundation preview — exercises every brand component AND every motion
// primitive so the look + feel can be reviewed before the real homepage
// content goes in.
export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      {/* Soft top-down gold wash adds depth without darkening the page */}
      <Section
        tone="cream"
        className="relative overflow-hidden bg-gradient-to-b from-gold/[0.07] via-cream to-cream"
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Reveal direction="up" delay={0.1}>
              <Eyebrow className="mb-6">Foundation preview</Eyebrow>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <Heading level={1} size="xl">
                Building wealth through <em>intentional coliving.</em>
              </Heading>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <p className="mt-6 max-w-lg text-warmgray leading-body">
                Caitlyn Verdugo is an Atlanta-based coliving investor, Realtor,
                and women&apos;s coliving coach helping women build real
                wealth through real estate.
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

          {/* Parallax photo placeholder */}
          <Reveal direction="left" delay={0.3} duration={1}>
            <Parallax distance={50}>
              <div className="aspect-[4/5] w-full bg-blush border border-brand flex items-center justify-center text-warmgray relative">
                <span className="font-heading italic text-2xl">
                  yellow blazer headshot
                </span>
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-eyebrow text-gold">
                  ✦ Parallax demo
                </span>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Section>

      {/* ---------- STATS MARQUEE ---------- */}
      <section className="relative bg-charcoal text-cream py-10 grain overflow-hidden">
        <Marquee speed={35}>
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
          <StatPill>Atlanta Metro</StatPill>
          <Sparkle />
        </Marquee>
      </section>

      {/* ---------- THREE SERVICES — STAGGERED CARDS ---------- */}
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
              Each card lifts on hover with a gold border glow and a top accent
              line that scales across.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          <StaggerItem>
            <Card interactive className="h-full">
              <p className="text-3xl text-gold mb-5">◈</p>
              <Heading level={3} size="sm">
                Buy &amp; Sell
              </Heading>
              <p className="mt-3 text-warmgray text-sm leading-body">
                A realtor who thinks like an investor — investment properties,
                coliving conversions, and house hacking.
              </p>
              <p className="mt-6 text-xs uppercase tracking-button text-gold link-underline inline-block">
                Explore →
              </p>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card interactive className="h-full">
              <p className="text-3xl text-gold mb-5">♀</p>
              <Heading level={3} size="sm">
                Get Coaching
              </Heading>
              <p className="mt-3 text-warmgray text-sm leading-body">
                Your roadmap to coliving — tailored to where you are and where
                you want to go.
              </p>
              <p className="mt-6 text-xs uppercase tracking-button text-gold link-underline inline-block">
                Explore →
              </p>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card interactive className="h-full">
              <p className="text-3xl text-gold mb-5">$</p>
              <Heading level={3} size="sm">
                Partner With Me
              </Heading>
              <p className="mt-3 text-warmgray text-sm leading-body">
                Your money working while you live your life. Passive coliving
                partnerships in the Atlanta metro.
              </p>
              <p className="mt-6 text-xs uppercase tracking-button text-gold link-underline inline-block">
                Explore →
              </p>
            </Card>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* ---------- PINNED SCROLL REVEAL ---------- */}
      <section className="bg-charcoal text-cream relative grain overflow-hidden">
        <PinnedReveal
          headline={
            <div>
              <Eyebrow className="mb-6">The math</Eyebrow>
              <Heading size="lg">
                Same property. <em>Different strategy.</em>
              </Heading>
              <p className="mt-6 text-cream/70 leading-body max-w-md">
                Scroll. Each panel on the right reveals as you go — pinned
                section, slide-up content, editorial pacing.
              </p>
            </div>
          }
        >
          <RevealPanel
            label="Traditional rental"
            value="$2,000"
            sub="Gross monthly · Negative cashflow after expenses"
          />
          <RevealPanel
            label="Coliving · 6 rooms"
            value="$5,000+"
            sub="Gross monthly · ~$1,000+ cashflow"
            featured
          />
          <RevealPanel
            label="Coliving · 8 rooms"
            value="$7,000+"
            sub="Gross monthly · Strong cash-on-cash return"
            featured
          />
        </PinnedReveal>
      </section>

      {/* ---------- GOLD QUOTE BANNER ---------- */}
      <Section tone="gold" fullBleed className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="font-heading text-3xl md:text-5xl italic leading-heading text-white">
              &ldquo;Coliving isn&apos;t just a housing strategy — it&apos;s
              how women are building generational wealth right now.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-xs uppercase tracking-button text-white/80">
              ✦ Caitlyn Verdugo · Coliving Cait
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- BRAND PATTERN STRIP ---------- */}
      <Section tone="blush">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <Eyebrow className="mb-4">Brand patterns</Eyebrow>
            <Heading size="md">
              The motion <em>system.</em>
            </Heading>
            <ul className="mt-8 space-y-3 text-warmgray">
              <li>
                <span className="text-gold mr-3">✦</span>Scroll-triggered
                slide-ups with editorial easing
              </li>
              <li>
                <span className="text-gold mr-3">✦</span>Staggered card grids
                that cascade in
              </li>
              <li>
                <span className="text-gold mr-3">✦</span>Magnetic primary
                buttons with sliding gold fill
              </li>
              <li>
                <span className="text-gold mr-3">✦</span>Continuous marquee
                ticker for the stats bar
              </li>
              <li>
                <span className="text-gold mr-3">✦</span>Pinned scroll
                reveals on dark sections
              </li>
              <li>
                <span className="text-gold mr-3">✦</span>Animated count-up
                numbers
              </li>
              <li>
                <span className="text-gold mr-3">✦</span>Subtle film grain on
                charcoal sections for depth
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <Card tone="charcoal" interactive>
              <Eyebrow className="mb-4">Try me</Eyebrow>
              <Heading level={3} size="sm" className="text-cream">
                Hover this card.
              </Heading>
              <p className="mt-3 text-cream/70 text-sm leading-body">
                It lifts six pixels, the border deepens to solid gold, a soft
                gold halo appears, and a thin gold accent line scales across
                the top edge.
              </p>
              <div className="mt-6">
                <Button variant="outline" size="md" href="/contact">
                  Get In Touch
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/* ---------- helpers ---------- */

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

function RevealPanel({
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
      className={`w-full border ${featured ? "border-gold bg-gold/5" : "border-brand"} p-8 md:p-10`}
    >
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        {label}
      </p>
      <p className="font-heading text-5xl md:text-7xl text-cream leading-heading">
        {value}
      </p>
      <p className="mt-4 text-cream/70 text-sm leading-body">{sub}</p>
    </div>
  );
}
