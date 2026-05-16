import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Link from "next/link";
import { courses } from "@/lib/courses";

const STRATEGY_CALL_URL = "https://calendly.com/colivingcait/coaching-discovery-call";

export const metadata = {
  title: "Welcome to the Explorer Bundle — Coliving Cait",
  description:
    "Thanks for joining. Your three Explorer courses are unlocked — start with any of them, then book your free 30-minute strategy call.",
  robots: { index: false, follow: false },
};

// Post-purchase landing for the Explorer Bundle. Stripe Payment Link's
// success URL should point here. Confirms purchase, links into all three
// courses, surfaces the free 30-min strategy call bonus.
export default function BundleWelcomePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">✦ You&apos;re in</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              Welcome to the <em className="text-gold-light">Explorer Bundle.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-2xl mx-auto">
              All three courses are unlocked and yours for life. A receipt
              is on its way to your inbox. Take the courses in any order —
              they each stand alone but build on one another.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 text-[10px] uppercase tracking-eyebrow text-gold-light">
              ✦ Lifetime access · Quizzes & worksheets included
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Start a course */}
      <Section tone="cream">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Start a course</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              Pick where you want to <em>begin.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-warmgray leading-body text-[1.0625rem]">
              Not sure which to start with? Coliving 101 is the most
              direct path into the model. House Hacking 101 is the best
              first move for most new investors. Real Estate Investing
              101 sets the foundation if you&apos;re brand new.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
          stagger={0.08}
        >
          {courses.map((c) => {
            const first = c.lessons[0];
            const lessonCount = c.lessons.filter(
              (l) => l.kind !== "module-quiz" && l.moduleNumber !== 0,
            ).length;
            return (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/courses/${c.slug}/${first.slug}`}
                  className="group h-full flex flex-col border border-brand bg-cream p-8 md:p-10 transition-all duration-300 hover:border-gold hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-20px_rgba(196,149,90,0.35)]"
                >
                  <p className="text-3xl text-gold mb-5">{c.symbol}</p>
                  <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                    Mini course · Unlocked
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
                    {c.modules?.length ?? 6} modules · {lessonCount} lessons
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-button text-gold link-underline">
                    Start lesson 01 →
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Strategy call bonus */}
      <Section tone="blush">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center max-w-5xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Your bundle bonus</Eyebrow>
            <Heading size="md">
              Book your free 30-minute{" "}
              <em>strategy call.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-warmgray leading-body text-[1.0625rem]">
              Once you&apos;ve worked through the courses, grab a time on
              my calendar. Bring your questions, your deal, or just your
              blank-slate ambition — we&apos;ll talk through what
              you&apos;ve learned and map out your next step.
            </p>
            <div className="mt-6">
              <Button href={STRATEGY_CALL_URL} variant="primary" size="lg" magnetic>
                Book the strategy call →
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Housekeeping */}
      <Section tone="cream">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Good to know</Eyebrow>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Reveal delay={0.1}>
              <div className="border-l-2 border-gold pl-5">
                <p className="font-heading text-lg text-charcoal leading-heading">
                  Lifetime access
                </p>
                <p className="mt-2 text-warmgray text-sm leading-body">
                  Bookmark this page or any course detail page. You can
                  pick up where you left off any time.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="border-l-2 border-gold pl-5">
                <p className="font-heading text-lg text-charcoal leading-heading">
                  Questions or trouble?
                </p>
                <p className="mt-2 text-warmgray text-sm leading-body">
                  Email{" "}
                  <a
                    href="mailto:colivingcait@gmail.com"
                    className="text-gold-dark border-b border-brand hover:text-gold transition-colors"
                  >
                    colivingcait@gmail.com
                  </a>{" "}
                  and I&apos;ll sort it within 48 hours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
