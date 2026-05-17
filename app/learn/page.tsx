import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import { getCourse } from "@/lib/courses";
import BuyButton from "@/components/courses/BuyButton";

const OG_TITLE = "Wherever you are, there's a next step here.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(OG_TITLE)}&eyebrow=${encodeURIComponent("Learn With Me")}`;

export const metadata = {
  title: "Learn With Me",
  description:
    "Whether you're new to coliving or scaling your portfolio, find the right level of guidance — from $99 mini courses to 1:1 coaching and ongoing consulting.",
  openGraph: {
    title: "Learn With Me — Coliving Cait",
    description:
      "Self-paced courses, 1:1 coaching, and ongoing consulting for women building coliving portfolios.",
    url: "https://colivingcait.com/learn",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn With Me — Coliving Cait",
    description:
      "Courses, coaching, and consulting for women building coliving portfolios.",
    images: [OG_IMAGE],
  },
};

// Learn With Me — pixel-perfect rewrite of coliving-cait-learn.html.
// Sections: Hero (with journey nav) · Phase 1 Explorer (3 courses + bundle)
// · Phase 2 Builder (features + 8 pillars + price block) · Phase 3 Operator
// (4-card grid + price/CTA bar) · Fascinations · Strategy Session · Final CTA.

// Per-card lesson count = total entries minus the welcome and the
// module quizzes, i.e. the count of actual module lessons. Matches the
// number used in each course's marketing copy.
function moduleLessonCount(slug: string): number {
  const c = getCourse(slug);
  if (!c) return 0;
  return c.lessons.filter(
    (l) => l.kind !== "module-quiz" && l.moduleNumber !== 0,
  ).length;
}

const courses = [
  {
    icon: "$",
    title: "Real Estate Investing 101",
    slug: "real-estate-101",
    copy: "The key terms and mindset every investor needs — regardless of strategy. Financing basics, deal evaluation, market selection, and a clear framework so you can speak the language and start thinking like an investor.",
    href: "/courses/real-estate-101",
  },
  {
    icon: "◈",
    title: "House Hacking 101",
    slug: "house-hacking-101",
    copy: "Where most investors should start. Learn how to minimize your housing expenses, get your feet wet, and use the best leverage available to you — your primary residence — to start building wealth from day one.",
    href: "/courses/house-hacking-101",
  },
  {
    icon: "⌂",
    title: "Coliving 101",
    slug: "coliving-101",
    copy: "A complete breakdown of the coliving model — how it works, who it serves, how the math works, and what to look for in your first property. Everything you need to understand the strategy of coliving.",
    href: "/courses/coliving-101",
  },
];

const builderFeatures = [
  "Weekly 1:1 meetings — your deal, your market, your pace",
  "Phone calls and texts between sessions — real-time support when you need it",
  "Live deal analysis — bring me any property and I'll break it down with you",
  "PadSplit-specific strategy — screening procedures, SOPs, message templates, collections, listing optimization, and setting the right expectations",
  "Done-for-you templates — leases, underwriting, checklists, listing copy",
  "Custom roadmap — built around your capital, credit, and timeline",
  "Renovation and conversion guidance — room layout, bathroom strategy, phasing",
  "Operations playbook — house rules, maintenance, resident culture",
  "Lifetime access — resources and templates are yours forever after",
];

const pillars = [
  "The coliving model",
  "Market & deal criteria",
  "Underwriting & analysis",
  "Financing",
  "Conversion & renovation",
  "Installation & launch",
  "Operations & culture",
  "Scaling",
];

const operator = [
  { icon: "⊕", title: "Scale Your Portfolio", copy: "Navigate your next deal with confidence — financing, market expansion, underwriting, and building systems that grow with you." },
  { icon: "◉", title: "Fix What's Not Working", copy: "Occupancy dips, cashflow leaks, screening issues, resident problems — we'll audit your operations and find the fix." },
  { icon: "⚷", title: "PadSplit Mastery", copy: "Listings, collections, SOPs, message templates, resident expectations — the operational playbook for running a tight portfolio on PadSplit." },
  { icon: "✦", title: "Ongoing Accountability", copy: "Every-other-week meetings, phone and text access between sessions, and someone who knows your portfolio inside and out." },
];

const fascinations = [
  "A single closet decision can make or cost you $40,000+?",
  "Parking can get your house shut down?",
  "Doing a single-phase renovation can affect your refinancing options by $25K+?",
  "The #1 maintenance issue that sends residents packing?",
  "One screening mistake can cost you thousands?",
  "There's a $15,000 problem hiding in almost every coliving conversion?",
  "Three costs first-time operators always forget to model?",
];

export default function LearnPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-20 lg:pt-40 lg:pb-[100px] bg-white text-center relative">
        <div className="mx-auto max-w-[760px]">
          <span className="eyebrow eyebrow-center">Learn With Me</span>
          <h1
            className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-7 leading-[1.05] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
            style={{ fontSize: "clamp(40px, 4.6vw, 64px)" }}
          >
            Wherever you are in your real estate investing journey, there&apos;s a{" "}
            <em className="italic text-gold font-light">next step here.</em>
          </h1>
          <p className="text-[17px] leading-[1.85] text-warmgray max-w-[560px] mx-auto mb-5 opacity-0 translate-y-5 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
            From learning the coliving model for the first time to scaling a portfolio you&apos;ve already built — I meet you exactly where you are with the right level of guidance.
          </p>
          <p className="text-sm text-warmgray-light opacity-0 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.65s_forwards]">
            Choose your starting point ↓
          </p>

          <div className="flex flex-wrap justify-center items-end gap-6 lg:gap-12 mt-14 opacity-0 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.8s_forwards]">
            {[
              { href: "#foundations", label: "I'm New to This", name: "The Explorer" },
              { href: "#builder", label: "I'm Ready to Build", name: "The Builder" },
              { href: "#operator", label: "I'm Already Operating", name: "The Operator" },
            ].map((step, i, arr) => (
              <span key={step.href} className="flex items-end gap-6 lg:gap-12">
                <a
                  href={step.href}
                  className="group relative pb-4 text-center after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-gold after:transition-[width] after:duration-[350ms] after:ease-brand hover:after:w-full"
                >
                  <span className="block text-[11px] font-medium uppercase tracking-[0.15em] text-gold mb-2">
                    {step.label}
                  </span>
                  <span className="block font-heading font-medium text-2xl text-charcoal group-hover:text-gold-dark transition-colors duration-300">
                    {step.name}
                  </span>
                </a>
                {i < arr.length - 1 && (
                  <span className="hidden sm:inline-flex items-center text-gold text-sm pb-4 opacity-40">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIER 1: FOUNDATIONS ===== */}
      <section id="foundations" className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream scroll-mt-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-gold-dark bg-[rgba(196,149,90,0.1)] px-4 py-2 mb-5">
                ✦ Start Here
              </span>
              <h2
                className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
                style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
              >
                Phase 1: The <em className="italic text-gold font-light">Explorer</em>
              </h2>
              <p className="text-[15px] text-warmgray mt-4 max-w-[480px]">
                Lay the foundation, choose your path, and get a handle on the key terms, math, and strategies that most investors start with.
              </p>
            </div>
          </div>

          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3 mb-12">
            {courses.map((c, i) => (
              <div
                key={c.title}
                className={`reveal reveal-d${i + 1} group bg-white border border-soft p-10 transition-all duration-500 ease-brand relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,25,23,0.06)] hover:border-brand`}
              >
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-brand group-hover:scale-x-100" />
                <span className="block text-[28px] text-gold mb-5 transition-transform duration-500 group-hover:scale-110">
                  {c.icon}
                </span>
                <h3 className="font-heading font-medium text-[22px] leading-tight text-charcoal mb-3">
                  {c.title}
                </h3>
                <p className="text-sm leading-[1.75] text-warmgray mb-6">{c.copy}</p>
                <span className="block text-xs text-warmgray-light tracking-[0.04em] mb-5">
                  6 modules · {moduleLessonCount(c.slug)} lessons · 2–3 hours
                  of course content
                </span>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-base text-warmgray-light line-through">
                    $99
                  </span>
                  <span className="font-heading font-medium text-[28px] text-charcoal block">
                    $49
                  </span>
                  <span className="text-[10px] uppercase tracking-eyebrow text-gold border border-gold/40 px-1.5 py-0.5">
                    Limited
                  </span>
                </div>
                <BuyButton
                  courseSlug={c.slug}
                  className="btn-gold w-full text-center block"
                >
                  Buy Now
                </BuyButton>
                <Link
                  href={c.href}
                  className="block text-center text-[11px] text-warmgray/60 hover:text-charcoal mt-2 transition-colors"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>

          {/* Bundle callout */}
          <div className="reveal bg-white border-2 border-gold p-11 lg:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 text-center lg:text-left">
              <div>
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.15em] text-white bg-gold px-3.5 py-1.5 mb-4">
                  ✦ Best Value
                </span>
                <h3 className="font-heading font-medium text-[28px] text-charcoal mb-2.5">
                  The Complete Explorer Bundle
                </h3>
                <p className="text-[15px] text-warmgray leading-[1.75] max-w-[480px]">
                  All three courses +{" "}
                  <strong className="text-charcoal font-medium">a free 30-minute strategy call with me</strong>{" "}
                  to talk through what you&apos;ve learned, answer your questions, and figure out your next steps.
                </p>
              </div>
              <div className="flex flex-col items-center lg:flex-row gap-6 shrink-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-base text-warmgray-light line-through">$147</span>
                  <span className="font-heading font-medium text-[32px] text-charcoal">$99</span>
                  <span className="text-[10px] uppercase tracking-eyebrow text-gold border border-gold/40 px-1.5 py-0.5">
                    $48 off
                  </span>
                </div>
                <BuyButton courseSlug="bundle" className="btn-primary">
                  Get the Bundle
                </BuyButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIER 2: THE BUILDER ===== */}
      <section id="builder" className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white scroll-mt-24">
        <div className="mx-auto max-w-[1320px] grid gap-12 lg:gap-20 items-start lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow">Ready to Build</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-6 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
            >
              Phase 2: The <em className="italic text-gold font-light">Builder</em>
            </h2>
            <p className="text-[15px] leading-[1.85] text-warmgray mb-9 max-w-[480px]">
              You&apos;re serious. You&apos;re ready to take action and start building your coliving portfolio on PadSplit. Every investor knows that education will come one way or another — whether by making costly mistakes on your first deal (I lost $25K on mine) or by spending the time and money intentionally to prevent those mistakes from happening. This is the intentional path.
            </p>
            <ul className="list-none mb-10">
              {builderFeatures.map((f) => (
                <li
                  key={f}
                  className="text-sm text-warmgray py-2.5 flex items-start gap-3.5 border-b border-soft last:border-b-0"
                >
                  <span className="text-gold text-[8px] mt-2 shrink-0">✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div className="reveal reveal-d2 bg-cream p-12 lg:p-11">
              <h3 className="font-heading font-medium text-2xl text-charcoal mb-5">
                What we&apos;ll cover together
              </h3>
              <p className="text-sm leading-[1.8] text-warmgray mb-5">
                Eight pillars — everything from your first underwrite to your first resident.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((p, i) => (
                  <div
                    key={p}
                    className="flex items-center gap-3 text-[13px] text-warmgray px-4 py-3 bg-white border border-soft hover:border-brand hover:translate-x-1 transition-all duration-300"
                  >
                    <span className="font-heading font-medium text-lg text-gold min-w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-d3 bg-white border border-soft p-10 lg:p-11">
              <div className="font-heading font-medium text-[48px] leading-none text-charcoal mb-1">
                $4,500
              </div>
              <span className="text-sm text-warmgray-light">
                3 months · 1:1 · Limited spots
              </span>
              <a
                href="https://calendly.com/colivingcait/coaching-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center mt-7"
                style={{ display: "block" }}
              >
                Enroll Now
              </a>
              <p className="text-[13px] text-warmgray-light mt-3 text-center">
                Payment plan available at checkout
              </p>
              <a
                href="https://calendly.com/colivingcait/coaching-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text mt-5 flex justify-center"
              >
                Have questions? Book a Discovery Call →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIER 3: THE OPERATOR ===== */}
      <section id="operator" className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-cream scroll-mt-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16">
            <span className="eyebrow">Already Operating</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-5 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
            >
              Phase 3: The <em className="italic text-gold font-light">Operator</em>
            </h2>
            <p className="text-base leading-[1.8] text-warmgray max-w-[640px]">
              You&apos;ve got 1–2 coliving properties on PadSplit. The model works. Now you need a seasoned advisor in your corner to help you scale, tighten operations, and navigate the challenges that come next.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {operator.map((o, i) => (
              <div
                key={o.title}
                className={`reveal reveal-d${(i % 3) + 1} group bg-white border border-soft p-10 lg:px-7 text-center transition-all duration-500 hover:border-brand hover:-translate-y-1 hover:shadow-card`}
              >
                <span className="block text-[28px] text-gold mb-5 transition-transform duration-500 group-hover:scale-[1.15]">
                  {o.icon}
                </span>
                <h3 className="font-heading font-medium text-xl text-charcoal mb-3 leading-tight">
                  {o.title}
                </h3>
                <p className="text-sm leading-[1.75] text-warmgray">{o.copy}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-14 flex flex-col lg:flex-row gap-12 items-center p-12 bg-white border border-soft">
            <div className="flex-1 text-center lg:text-left">
              <div className="font-heading font-medium text-[48px] leading-none text-charcoal mb-1">
                $1,000
              </div>
              <span className="text-sm text-warmgray-light">
                per month · month to month · cancel anytime
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 shrink-0">
              <a
                href="https://calendly.com/colivingcait/coaching-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Start Now — $1,000/mo
              </a>
              <a
                href="https://calendly.com/colivingcait/coaching-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text"
              >
                Have questions? Book a Discovery Call →
              </a>
            </div>
          </div>

          <div className="reveal mt-10 text-center">
            <a
              href="https://calendly.com/colivingcait/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-warmgray hover:text-charcoal transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Just need one call? Book a one-time Strategy Session →
            </a>
          </div>
        </div>
      </section>

      {/* ===== FASCINATIONS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white border-y border-soft">
        <div className="mx-auto max-w-[1320px] grid gap-12 lg:gap-20 items-center lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <span className="eyebrow">Did You Know</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-5 leading-[1.12]"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              The things most investors learn{" "}
              <em className="italic text-gold font-light">the hard way.</em>
            </h2>
            <p className="text-[15px] text-warmgray mb-8">
              These are real lessons from real deals — the kind of knowledge that separates a portfolio that works from one that drains you.
            </p>
            <a
              href="https://calendly.com/colivingcait/coaching-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Discovery Call
            </a>
          </div>

          <ul className="reveal reveal-d2 list-none lg:columns-2 lg:gap-8">
            {fascinations.map((f) => (
              <li
                key={f}
                className="group text-base font-normal text-charcoal py-4 flex items-start gap-3.5 border-b border-soft transition-all duration-300 break-inside-avoid hover:text-gold-dark hover:translate-x-1"
              >
                <span className="text-gold text-[9px] mt-2 shrink-0">✦</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== STRATEGY SESSION ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-blush">
        <div className="reveal mx-auto max-w-[1000px] grid gap-10 items-center text-center lg:text-left lg:grid-cols-[1fr_auto] lg:gap-14">
          <div>
            <h3
              className="font-heading font-normal tracking-[-0.01em] text-charcoal mb-4"
              style={{ fontSize: "clamp(30px, 3vw, 40px)" }}
            >
              Just need a <em className="italic text-gold font-light">one-time deep dive?</em>
            </h3>
            <p className="text-[17px] text-warmgray leading-[1.8]">
              Bring your deal, your question, or your biggest challenge. One hour, one focused conversation — walk away with clarity and a clear next step.
            </p>
          </div>
          <div className="text-center shrink-0">
            <div className="font-heading font-medium text-[52px] leading-none text-charcoal mb-1.5">
              $250
            </div>
            <span className="block text-[15px] text-warmgray-light mb-6">
              One session · 60 minutes
            </span>
            <a
              href="https://calendly.com/colivingcait/strategy-session"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Book a Session — $250
            </a>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative px-8 lg:px-[60px] py-24 lg:py-40 bg-charcoal text-center overflow-hidden">
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold to-transparent"
        />
        <div className="reveal">
          <span className="eyebrow eyebrow-center !text-gold">Not Sure Where to Start?</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
            style={{ fontSize: "clamp(36px, 3.8vw, 56px)" }}
          >
            Let&apos;s figure it out <em className="italic text-gold-light font-light">together.</em>
          </h2>
          <p className="text-[15px] text-warmgray-light mb-11 max-w-[440px] mx-auto leading-[1.8]">
            Book a free discovery call and we&apos;ll talk through where you are, where you want to go, and which path makes the most sense for you.
          </p>
          <a
            href="https://calendly.com/colivingcait/coaching-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Book a Discovery Call
          </a>
        </div>
      </section>
    </>
  );
}
