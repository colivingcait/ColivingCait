import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { courses } from "@/lib/courses";

const BUNDLE_STRIPE_URL = "https://buy.stripe.com/3cI14oc1p0e35KQa9EaZi00";
const BUNDLE_PRICE = 149;
const BUNDLE_ORIGINAL = 447;

const OG_TITLE = "The Complete Explorer Bundle.";
const OG_SUBTITLE = "All three courses + a free 30-minute strategy call.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(OG_TITLE)}&eyebrow=${encodeURIComponent("$149 · 3 courses · 1 call")}&subtitle=${encodeURIComponent(OG_SUBTITLE)}`;

export const metadata = {
  title: "The Complete Explorer Bundle",
  description:
    "All three Explorer mini courses — Coliving 101, House Hacking 101, and Real Estate Investing 101 — plus a free 30-minute strategy call. $149 (a $447 value).",
  openGraph: {
    title: "The Complete Explorer Bundle — Coliving Cait",
    description:
      "All three Explorer mini courses plus a free 30-minute strategy call. Lifetime access. $149 (a $447 value).",
    url: "https://colivingcait.com/courses/bundle",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Complete Explorer Bundle — Coliving Cait",
    description: "All three Explorer courses + a free 30-min strategy call.",
    images: [OG_IMAGE],
  },
};

export default function BundlePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">
                ✦ Best value ·{" "}
                <span className="line-through text-cream/40">
                  ${BUNDLE_ORIGINAL}
                </span>{" "}
                <span className="text-gold-light">${BUNDLE_PRICE}</span> ·
                Limited time
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading level={1} size="xl" className="text-cream">
                The Complete Explorer{" "}
                <em className="text-gold-light">Bundle.</em>
              </Heading>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-xl">
                All three Explorer mini courses, plus{" "}
                <strong className="text-cream">
                  a free 30-minute strategy call with me
                </strong>{" "}
                to talk through what you&apos;ve learned, answer your
                questions, and figure out your next steps. Lifetime access
                to every lesson, quiz, and worksheet.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <Button
                  href={BUNDLE_STRIPE_URL}
                  variant="primary"
                  size="lg"
                  magnetic
                >
                  Buy the Bundle — ${BUNDLE_PRICE}
                </Button>
                <span className="text-[11px] uppercase tracking-button text-cream/60">
                  $298 off · 3 courses · 1 call
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="md:pl-12 md:border-l md:border-cream/15 grid grid-cols-2 md:grid-cols-1 gap-6">
              <BundleMeta label="Courses" value="3" />
              <BundleMeta label="Strategy call" value="30 min · 1:1" />
              <BundleMeta label="Access" value="Lifetime" />
              <BundleMeta label="You save" value={`$${BUNDLE_ORIGINAL - BUNDLE_PRICE}`} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What's inside — three course briefs */}
      <Section tone="cream">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">What&apos;s inside</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              Three courses. <em>One foundation.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-warmgray leading-body text-[1.0625rem]">
              Each course is self-paced, module-based, and ends with a
              quiz. Take them in any order — together they form the
              Explorer curriculum.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
          stagger={0.08}
        >
          {courses.map((c) => {
            const lessonCount = c.lessons.filter(
              (l) => l.kind !== "module-quiz" && l.moduleNumber !== 0,
            ).length;
            return (
              <StaggerItem key={c.slug}>
                <div className="h-full flex flex-col border border-brand bg-cream p-8 md:p-10">
                  <p className="text-3xl text-gold mb-5">{c.symbol}</p>
                  <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                    Mini course · Included
                  </p>
                  <Heading level={3} size="sm">
                    {c.title}
                  </Heading>
                  <p className="mt-2 text-xs uppercase tracking-button text-warmgray">
                    {c.tagline}
                  </p>
                  <p className="mt-5 text-warmgray text-sm leading-body flex-1">
                    {c.description}
                  </p>
                  <p className="mt-6 pt-5 border-t border-brand text-[11px] uppercase tracking-eyebrow text-warmgray/70">
                    {c.modules?.length ?? 6} modules · {lessonCount} lessons · 2–3 hours
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Bundle bonus */}
      <Section tone="blush">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center max-w-5xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Bundle bonus</Eyebrow>
            <Heading size="md">
              A free 30-minute{" "}
              <em>strategy call with me.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-warmgray leading-body text-[1.0625rem]">
              Once you&apos;ve worked through the courses, we hop on a
              call. Bring your questions, your deal, or your blank-slate
              ambition — we&apos;ll talk through what you&apos;ve learned
              and map out your next step. Only included with the bundle.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">Ready</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="xl" className="text-cream">
              <span className="line-through text-cream/40">
                ${BUNDLE_ORIGINAL}
              </span>{" "}
              <span className="text-gold-light">${BUNDLE_PRICE}</span>.{" "}
              <em className="text-gold-light">Lifetime access.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[10px] uppercase tracking-eyebrow text-gold-light">
              ✦ Limited-time launch pricing
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/70 leading-body max-w-xl mx-auto">
              Secure checkout via Stripe. Three full courses plus a free
              30-minute strategy call — yours for life.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <Button
                href={BUNDLE_STRIPE_URL}
                variant="primary"
                size="lg"
                magnetic
              >
                Buy the Bundle — ${BUNDLE_PRICE}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function BundleMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
        {label}
      </p>
      <p className="font-heading text-xl md:text-2xl text-cream leading-heading">
        {value}
      </p>
    </div>
  );
}
