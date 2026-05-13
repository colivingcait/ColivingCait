import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";

const STRATEGY_URL = "https://calendly.com/colivingcait/strategy-session";
const COACHING_URL = "https://calendly.com/colivingcait/coaching-discovery-call";

export const metadata = {
  title: "Strategy Session — Coliving Cait",
  description:
    "A focused 60-minute 1:1 strategy session with Caitlyn Verdugo — talk through your floor plan, pressure-test a deal, or solve an operational headache. $250.",
};

const audience = [
  "You're exploring coliving and want to know if it's the right strategy for your market, budget, and goals before you commit.",
  "You have a specific property in mind and want a second set of eyes on the floor plan, room count, or conversion potential.",
  "You're under contract or about to make an offer and want to pressure-test the numbers before you close.",
  "You're already operating and hit a wall — a resident issue, a vacancy problem, a pricing question, an operational headache you can't solve.",
  "You've taken a course or done your research but want to talk through your specific situation with someone who does this every day.",
  "Someone told you to \"just Google it\" and you're done taking advice from people who've never done it.",
];

const coverageGroups: { title: string; items: string[] }[] = [
  {
    title: "Floor plan & conversion",
    items: [
      "“Does this property work for coliving?”",
      "“How many rooms can I get out of this floor plan?”",
      "“What would you convert and in what order?”",
      "“Is this worth the renovation or should I walk?”",
    ],
  },
  {
    title: "Underwriting & deal analysis",
    items: [
      "“Do these numbers actually work?”",
      "“Am I missing any expenses?”",
      "“What's a realistic cashflow projection for this deal?”",
      "“Should I make an offer at this price?”",
    ],
  },
  {
    title: "Getting started",
    items: [
      "“Is coliving right for my market?”",
      "“What strategy makes sense for where I am right now?”",
      "“What do I need to have in place before I move forward?”",
      "“I've done the research — what am I missing?”",
    ],
  },
  {
    title: "Operations",
    items: [
      "“I have a vacancy I can't fill — what am I doing wrong?”",
      "“My pricing feels off — how do I fix it?”",
      "“I'm dealing with a difficult resident situation — how do I handle it?”",
      "“My PadSplit account isn't performing — what would you change?”",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Book & pay",
    body:
      "Select a time at the link below. Payment is collected at booking — $250 secures your spot and you'll receive a confirmation with a short prep form so I can come to the call ready to go.",
  },
  {
    num: "02",
    title: "Come prepared",
    body:
      "Fill out the prep form before our call. The more specific you are, the more we can get done. If you have a property address, floor plan photos, or PadSplit screenshots — bring them.",
  },
  {
    num: "03",
    title: "Show up and get answers",
    body:
      "We meet on Zoom for 60 minutes. Direct, honest guidance based on your specific situation. No holding back, no upselling.",
  },
];

const faqs = [
  {
    q: "What if my question is simple — is it still worth it?",
    a: "If you're asking the question, it matters to you. Simple questions often have nuanced answers that depend on your specific market, property, and situation. That nuance is what you're paying for.",
  },
  {
    q: "What if I need more than one session?",
    a: "Some people book a single session and walk away with everything they need. Others come back a few months later when they're at a new stage. There's no pressure either way — but if you find yourself wanting ongoing support, scroll down.",
  },
  {
    q: "Will you look at my actual property or PadSplit account?",
    a: "Yes — if you share materials in advance through the prep form, I'll review them before our call so we can use our time efficiently.",
  },
  {
    q: "Is this a sales call for your coaching program?",
    a: "No. A Strategy Session is a standalone product. I'll mention coaching if it's genuinely the right fit — but this call is about answering your questions, not selling you something else.",
  },
];

const operatorIncludes = [
  "PadSplit account review — messages, occupancy data, resident feedback, payment history, platform metrics. I tell you what I see, what I'd change, and why.",
  "Pricing & vacancy strategy — if rooms are sitting empty or you're leaving money on the table, we'll identify it and fix it.",
  "Operational troubleshooting — resident issues, turnover problems, maintenance patterns, anything creating friction.",
  "Strategic recommendations — specific, actionable changes for your properties and your data.",
];

const operatorFit = [
  "You're already operating at least one active coliving property.",
  "You want your portfolio to perform better but aren't sure what to change.",
  "You want a strategic partner who looks at your specific data and tells you what they see.",
  "You want to build systems and confidence to run independently long-term.",
];

export default function StrategySessionPage() {
  return (
    <>
      {/* 1 · HERO */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">Book a Strategy Session</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              Got a coliving question?{" "}
              <em className="text-gold-light">Let&apos;s answer it.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-2xl mx-auto">
              You don&apos;t always need a full coaching program. Sometimes
              you just need an hour with someone who&apos;s been there — to
              talk through a floor plan, pressure-test a deal, work through
              an operational issue, or figure out if coliving is even the
              right move for you. That&apos;s what a Strategy Session is for.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <Button href={STRATEGY_URL} variant="primary" size="lg" magnetic>
                Book Your Strategy Session — $250
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 2 · WHAT IS IT */}
      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">What to expect</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading size="lg">
                One hour. Your questions.{" "}
                <em>Real answers.</em>
              </Heading>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-warmgray leading-body text-[1.0625rem] border-t border-brand pt-6">
              A Strategy Session is a focused 60-minute 1:1 call where we
              dig into whatever you&apos;re working through. No fluff, no
              sales pitch — just direct, actionable guidance from someone
              actively operating 50+ coliving rooms across the Atlanta
              metro. You bring the question. I bring the experience.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 3 · WHO IS THIS FOR */}
      <Section tone="blush">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Is this for you?</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              You might be in the right place{" "}
              <em>if…</em>
            </Heading>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 max-w-3xl mx-auto" stagger={0.06}>
          {audience.map((a) => (
            <StaggerItem key={a}>
              <p className="flex gap-4 text-charcoal leading-body text-[1.0625rem] border-t border-brand pt-4">
                <span className="text-gold mt-1">✦</span>
                <span>{a}</span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3}>
          <div className="mt-14 max-w-3xl mx-auto grid md:grid-cols-2 gap-px border border-brand bg-brand">
            <div className="bg-blush p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-eyebrow text-warmgray mb-3">
                A Strategy Session is NOT
              </p>
              <ul className="list-none space-y-2 text-warmgray text-sm leading-body">
                <li className="flex gap-3"><span className="text-warmgray/60">✦</span> A sales call</li>
                <li className="flex gap-3"><span className="text-warmgray/60">✦</span> A generic overview of coliving</li>
                <li className="flex gap-3"><span className="text-warmgray/60">✦</span> A substitute for ongoing support</li>
              </ul>
            </div>
            <div className="bg-blush p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                It IS
              </p>
              <ul className="list-none space-y-2 text-charcoal text-sm leading-body">
                <li className="flex gap-3"><span className="text-gold">✦</span> Your questions, answered directly</li>
                <li className="flex gap-3"><span className="text-gold">✦</span> Your situation, evaluated honestly</li>
                <li className="flex gap-3"><span className="text-gold">✦</span> Your next step, made clear</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 4 · WHAT WE CAN COVER */}
      <Section tone="cream">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Bring any of these</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              One hour can cover <em>a lot.</em>
            </Heading>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.08}>
          {coverageGroups.map((g) => (
            <StaggerItem key={g.title}>
              <div className="h-full border border-brand bg-cream p-7 md:p-8">
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
                  {g.title}
                </p>
                <ul className="list-none space-y-3 text-warmgray text-[15px] leading-body">
                  {g.items.map((q) => (
                    <li key={q} className="flex gap-3">
                      <span className="text-gold mt-1.5 text-[8px]">✦</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 5 · HOW IT WORKS */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-4">Simple process</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              Three <em className="text-gold-light">steps.</em>
            </Heading>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid gap-8 md:grid-cols-3"
          stagger={0.1}
        >
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="h-full border border-cream/15 p-7 md:p-8">
                <p className="font-heading text-4xl md:text-5xl text-gold-light/80 leading-none tabular-nums">
                  {s.num}
                </p>
                <p className="mt-4 font-heading text-xl md:text-2xl text-cream leading-heading">
                  {s.title}
                </p>
                <p className="mt-3 text-cream/70 text-sm leading-body">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 6 · PRICING CTA */}
      <Section tone="blush">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-4">Investment</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              $250 for 60 minutes of{" "}
              <em>focused expertise.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-warmgray leading-body text-[1.0625rem]">
              One hour with someone operating 50+ coliving rooms across six
              properties in the Atlanta metro. Someone who has made the
              mistakes, learned from them, and can help you avoid the ones
              that cost real money. $250 is not a large number relative to
              the decisions you&apos;re making. A single bad acquisition can
              cost $30,000. One hour now can prevent that.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Button href={STRATEGY_URL} variant="primary" size="lg" magnetic>
                Book Your Strategy Session →
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7 · FAQ */}
      <Section tone="cream">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Questions</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              A few things <em>people ask.</em>
            </Heading>
          </Reveal>
        </div>

        <Stagger className="mt-12 max-w-3xl mx-auto space-y-4" stagger={0.06}>
          {faqs.map((f) => (
            <StaggerItem key={f.q}>
              <details className="group border border-brand bg-cream open:border-gold transition-colors">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-6">
                  <span className="font-heading text-lg md:text-xl text-charcoal leading-heading">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 text-gold text-xl leading-none transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 -mt-1">
                  <p className="text-warmgray leading-body text-[15px]">
                    {f.a}
                  </p>
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 8 · OPERATOR TRANSITION */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-4">Need more than one session?</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              Already operating? Let&apos;s make your portfolio{" "}
              <em className="text-gold-light">perform.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem]">
              Some coliving operators don&apos;t need coaching to get
              started. They need a strategic partner who can look at what
              they&apos;ve already built and help them optimize it.
              That&apos;s what The Operator is.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 9 · THE OPERATOR DETAILS */}
      <Section tone="blush">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <Reveal>
              <Eyebrow className="mb-4">The Operator — $1,000/month</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading size="lg">
                Monthly consulting for{" "}
                <em>active coliving operators.</em>
              </Heading>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-warmgray leading-body text-[1.0625rem]">
              The Operator is a monthly consulting subscription for active
              coliving operators who want ongoing strategic support —
              without hiring a property manager.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 font-heading text-xl text-charcoal leading-heading">
              Each month I dig into your operation:
            </p>
            <ul className="list-none mt-5 space-y-3">
              {operatorIncludes.map((it) => (
                <li
                  key={it}
                  className="flex gap-3 text-warmgray text-[15px] leading-body border-t border-brand/40 pt-3"
                >
                  <span className="text-gold mt-1.5 text-[8px]">✦</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 border-l-2 border-gold bg-cream/60 p-6 md:p-7">
              <p className="text-charcoal leading-body text-[15px]">
                The Operator is consulting — not property management. I
                advise. You execute. The goal is to get your operation
                running so efficiently that after a few months of working
                together, you don&apos;t need me anymore. That&apos;s a win.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="mt-10 font-heading text-xl text-charcoal leading-heading">
              Who it&apos;s for:
            </p>
            <ul className="list-none mt-5 space-y-3">
              {operatorFit.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-warmgray text-[15px] leading-body border-t border-brand/40 pt-3"
                >
                  <span className="text-gold mt-1.5 text-[8px]">✦</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-brand pt-8">
              <div>
                <p className="font-heading text-3xl md:text-4xl text-charcoal leading-none">
                  $1,000<span className="text-base text-warmgray-light">/mo</span>
                </p>
                <p className="mt-2 text-[13px] text-warmgray">
                  Month to month · Cancel anytime · Most operators work
                  together for 2–4 months then run independently.
                </p>
              </div>
              <Button href={COACHING_URL} variant="primary" size="lg" magnetic>
                Book a Discovery Call →
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 10 · FINAL DUAL CTA */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Eyebrow className="mb-4">Ready to get started?</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg" className="text-cream">
              Two ways to <em className="text-gold-light">work together.</em>
            </Heading>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 items-stretch" stagger={0.1}>
          <StaggerItem>
            <div className="h-full flex flex-col border border-cream/15 p-8 md:p-10">
              <p className="text-3xl text-gold-light mb-5">◈</p>
              <p className="font-heading text-2xl md:text-3xl text-cream leading-heading">
                Strategy Session
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-button text-gold-light">
                $250 · 60 minutes
              </p>
              <p className="mt-5 text-cream/70 text-[15px] leading-body flex-1">
                One focused call. Your questions answered.
              </p>
              <div className="mt-8">
                <Button href={STRATEGY_URL} variant="primary" size="lg" magnetic>
                  Book Your Strategy Session →
                </Button>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="h-full flex flex-col border border-cream/15 p-8 md:p-10">
              <p className="text-3xl text-gold-light mb-5">◈</p>
              <p className="font-heading text-2xl md:text-3xl text-cream leading-heading">
                The Operator
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-button text-gold-light">
                $1,000/month · Month to month
              </p>
              <p className="mt-5 text-cream/70 text-[15px] leading-body flex-1">
                Ongoing consulting for active operators.
              </p>
              <div className="mt-8">
                <Button href={COACHING_URL} variant="primary" size="lg" magnetic>
                  Book a Discovery Call →
                </Button>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>
    </>
  );
}
