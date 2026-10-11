import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import HeroFrame from "@/components/HeroFrame";
import VillaCandaceSlider from "@/components/VillaCandaceSlider";
import NewsletterCaptureForm from "@/components/NewsletterCaptureForm";
import { CK_TAGS } from "@/lib/convertkit";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata = {
  title: "What Is Coliving? How the Model Works",
  description:
    "Coliving turns single-family homes into affordable, flexible housing for residents while generating significantly more revenue for investors. Learn how the model works and how to underwrite it.",
  alternates: { canonical: "/what-is-coliving" },
  openGraph: {
    title: "What Is Coliving? How the Model Works",
    description:
      "Coliving turns single-family homes into affordable, flexible housing for residents while generating significantly more revenue for investors. Learn how the model works and how to underwrite it.",
    url: "/what-is-coliving",
    images: [DEFAULT_OG_IMAGE],
  },
};

// What Is Coliving — pixel-perfect rewrite of coliving-cait-what-is-coliving.html.
// Sections: Hero · Problem · Traditional Options · Solution · The Math (Villa
// Candace slider) · Calculator CTA · Communities · Two Paths · Lead Magnet ·
// Coliving 101 Upsell · Quote · Final CTA.

const solution = [
  { icon: "⌂", title: "Furnished Room", copy: "Move in with a suitcase. Bed, dresser, desk, everything you need — already there." },
  { icon: "↻", title: "Flexible Terms", copy: "Weekly or monthly leases. No 12-month commitment. Stay as long as you need." },
  { icon: "$", title: "Affordable", copy: "$750–$1,000/month all-in. Utilities, internet, furnishing included. No surprise bills." },
  { icon: "✓", title: "High Quality", copy: "Clean, well-maintained homes in good neighborhoods. Not a last resort — a real option." },
  { icon: "♀", title: "Community", copy: "Shared common spaces, respectful housemates, and a sense of belonging." },
  { icon: "⚷", title: "Individual Accountability", copy: "Your lease, your room, your responsibility. No cosigner. No shared liability." },
];

const impact = [
  { icon: "⌂", title: "More Housing, Faster", copy: "Converting existing homes creates housing in weeks, not years." },
  { icon: "$", title: "Affordable by Design", copy: "Room rates are 40–60% less than a one-bedroom apartment." },
  { icon: "✓", title: "Quality Standards", copy: "Professionally managed, fully furnished, well-maintained homes." },
  { icon: "♀", title: "Community Impact", copy: "Every home opened is one more option for someone who needs it." },
];

export default function WhatIsColivingPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-32 pb-16 lg:pt-[180px] lg:pb-[100px] bg-white">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] text-center lg:text-left">
        <div className="max-w-[640px] mx-auto lg:mx-0">
          <span className="eyebrow eyebrow-center">What Is Coliving</span>
          <h1
            className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-7 leading-[1.06] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
            style={{ fontSize: "clamp(38px, 4.4vw, 60px)" }}
          >
            The housing solution our communities need — and the{" "}
            <em className="italic text-gold font-light">investment opportunity you&apos;ve been looking for.</em>
          </h1>
          <p className="text-[17px] leading-[1.85] text-warmgray max-w-[620px] mx-auto lg:mx-0 opacity-0 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
            Rent-by-the-room housing that&apos;s affordable for residents and profitable for investors. One model, two wins.
          </p>
        </div>
        <div className="max-w-[480px] mx-auto lg:max-w-none">
          <HeroFrame src="/images/raven/ravenbed1.jpg" alt="Furnished coliving bedroom" ratio="4 / 5" />
        </div>
        </div>
      </section>

      {/* ===== 2. THE PROBLEM ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-20 items-start lg:grid-cols-[1fr_0.45fr]">
          <div className="reveal">
            <span className="eyebrow">The Problem</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
            >
              The people keeping our world running are being{" "}
              <em className="italic text-gold font-light">priced out of it.</em>
            </h2>
            <p className="text-[15.5px] leading-[1.9] text-warmgray mb-5">
              Nurses, teachers, mechanics, bus drivers — the people who hold our communities together can&apos;t afford to live in them anymore. Rents are outpacing wages, credit requirements are tightening, and the people who need housing the most have the fewest options.
            </p>
            <p className="text-[15.5px] leading-[1.9] text-warmgray">
              At the same time, traditional real estate investing has stopped working. Single-family rentals barely break even. The math that penciled ten years ago doesn&apos;t anymore. Coliving solves both problems at the same time.
            </p>
          </div>

          <div className="reveal reveal-d2 lg:sticky lg:top-32">
            <div className="font-heading font-light italic text-2xl leading-[1.35] text-charcoal pl-6 border-l-2 border-gold">
              “Coliving investors are rolling up their sleeves and creating housing solutions in communities that need them — one room at a time.”
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. TRADITIONAL OPTIONS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white">
        <div className="mx-auto max-w-[900px]">
          <div className="reveal text-center mb-14">
            <span className="eyebrow eyebrow-center">The Current Options</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              What&apos;s available today <em className="italic text-gold font-light">isn&apos;t working.</em>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Rent Alone",
                items: [
                  "Requires 3x monthly income to qualify",
                  "Credit check and rental history required",
                  "12-month lease minimum",
                  "First, last, and security deposit upfront",
                  "Unfurnished — buy everything yourself",
                  "One missed payment and you're out",
                ],
              },
              {
                title: "Find a Cosigner",
                items: [
                  "Shared financial liability",
                  "Puts someone else's credit at risk",
                  "Not everyone has someone to ask",
                  "Still requires long lease commitment",
                  "Still unfurnished",
                  "Doesn't solve the affordability problem",
                ],
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`reveal reveal-d${i + 1} p-10 border border-soft bg-white transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card`}
              >
                <h3 className="font-heading font-medium text-[22px] text-charcoal mb-4">
                  {card.title}
                </h3>
                <ul className="list-none">
                  {card.items.map((it, idx) => (
                    <li
                      key={it}
                      className={`text-sm text-warmgray py-2 flex items-start gap-3 ${idx === card.items.length - 1 ? "" : "border-b border-soft"}`}
                    >
                      <span className="text-gold text-[7px] mt-2 shrink-0">✦</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. THE SOLUTION ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">The Solution</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
            >
              What coliving gives residents{" "}
              <em className="italic text-gold font-light">that nothing else can.</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {solution.map((s, i) => (
              <div
                key={s.title}
                className={`reveal reveal-d${i + 1} group p-10 lg:px-8 bg-white border border-soft text-center transition-all duration-500 hover:border-brand hover:-translate-y-1 hover:shadow-card`}
              >
                <span className="block text-[28px] text-gold mb-4 transition-transform duration-500 group-hover:scale-[1.15]">
                  {s.icon}
                </span>
                <h3 className="font-heading font-medium text-xl text-charcoal mb-2.5">
                  {s.title}
                </h3>
                <p className="text-sm leading-[1.75] text-warmgray">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-14">
            <span className="eyebrow eyebrow-center">Why Coliving</span>
            <h2 className="font-heading font-normal tracking-[-0.02em] text-charcoal" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
              One strategy. <em className="italic text-gold font-light">Three wins.</em>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ["$", "For Investors", "Higher cashflow and a model that turns one house into several income streams."],
              ["⌂", "For Residents", "Affordable, furnished rooms with an individual lease and no cosigner."],
              ["◈", "For Communities", "More housing from the homes already standing, without waiting on new construction."],
            ].map(([icon, title, copy]) => (
              <div key={title} className="reveal text-center p-8 border border-soft">
                <span className="block text-[28px] text-gold mb-4">{icon}</span>
                <h3 className="font-heading font-medium text-2xl text-charcoal mb-3">{title}</h3>
                <p className="text-sm leading-[1.8] text-warmgray">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. FOR COMMUNITIES ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16 max-w-[600px]">
            <span className="eyebrow">For Communities</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-5"
              style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
            >
              Coliving investors are doing something{" "}
              <em className="italic text-gold font-light">politicians aren&apos;t.</em>
            </h2>
            <p className="text-[15px] text-warmgray">
              Rather than waiting for new construction that takes decades, coliving reconfigures the housing we already have to serve the people who need it right now.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((c, i) => (
              <div
                key={c.title}
                className={`reveal reveal-d${i + 1} p-9 lg:px-7 border border-soft text-center transition-all duration-500 hover:border-brand hover:-translate-y-[3px]`}
              >
                <span className="block text-2xl text-gold mb-3.5">{c.icon}</span>
                <h3 className="font-heading font-medium text-lg text-charcoal mb-2">
                  {c.title}
                </h3>
                <p className="text-[13px] text-warmgray leading-[1.7]">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. THE MATH — VILLA CANDACE ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16">
            <div className="grid items-end gap-4 lg:gap-[60px] lg:grid-cols-2">
              <div>
                <span className="eyebrow">The Math — A Real House From My Portfolio</span>
                <h2
                  className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-4"
                  style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
                >
                  The math that makes coliving{" "}
                  <em className="italic text-gold font-light">impossible to ignore.</em>
                </h2>
              </div>
              <div>
                <p className="text-[15px] text-warmgray leading-[1.8]">
                  This is Villa Candace. I bought it as a 5-bedroom, 3-bath. Cleaned it up, added a room in the finished basement, converted the garage into 2 more rooms. Same house — from $1,800/month to $6,000/month. Drag the slider to see the transformation.
                </p>
              </div>
            </div>
          </div>

          <VillaCandaceSlider />
        </div>
      </section>

      {/* ===== 6. CALCULATOR CTA ===== */}
      <section
        className="px-8 lg:px-[60px] py-16 lg:py-[72px] text-center"
        style={{ background: "linear-gradient(135deg, #C4955A 0%, #D4A86A 100%)" }}
      >
        <div className="reveal">
          <h2
            className="font-heading font-normal text-white mb-2 tracking-[-0.01em]"
            style={{ fontSize: "clamp(26px, 2.6vw, 36px)" }}
          >
            Want to see what your property could earn?
          </h2>
          <p className="text-[15px] text-white/80 mb-7">
            Run the numbers on any address and see how it performs as a coliving conversion.
          </p>
          <Link href="/calculator/coliving" className="btn-white">
            Run the Numbers →
          </Link>
        </div>
      </section>

      {/* ===== 8. THREE PATHS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-cream">
        <div className="mx-auto max-w-[1100px]">
          <div className="reveal text-center mb-12">
            <span className="eyebrow eyebrow-center">Three Paths</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              How do you want to be <em className="italic text-gold font-light">involved?</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {[
              {
                icon: "⌂",
                title: "Buy a coliving property with me",
                copy: "Find a house with the layout coliving needs. I underwrite it like an investor and represent you on the purchase.",
                href: "/buy-and-sell",
                cta: "Buy & Sell With Me →",
              },
              {
                icon: "$",
                title: "Partner with me",
                copy: "Put your capital to work in my portfolio. You invest, I operate — with full transparency, legal protections, and consistent returns.",
                href: "/partner-with-me",
                cta: "Partner With Me →",
              },
              {
                icon: "◈",
                title: "Learn the model",
                copy: "Build and operate your own portfolio. Coliving 101 is on the Learn page when you want the full breakdown.",
                href: "/learn",
                cta: "Learn With Me →",
              },
            ].map((p, i) => (
              <div
                key={p.title}
                className={`reveal reveal-d${i + 1} group p-12 lg:px-10 bg-white border border-soft text-center transition-all duration-500 ease-brand hover:border-gold hover:-translate-y-1 hover:shadow-cardGold`}
              >
                <span className="block text-[32px] text-gold mb-5">{p.icon}</span>
                <h3 className="font-heading font-medium text-2xl text-charcoal mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-warmgray leading-[1.75] mb-7">{p.copy}</p>
                <Link href={p.href} className="btn-sm">{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. LEAD MAGNET ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-blush">
        <div className="reveal mx-auto max-w-[720px] text-center">
          <span className="eyebrow eyebrow-center">Free Download</span>
          <h3
            className="font-heading font-normal tracking-[-0.01em] text-charcoal mb-3"
            style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
          >
            Grab the free{" "}
            <em className="italic text-gold font-light">Coliving Conversion Checklist.</em>
          </h3>
          <p className="text-[15px] text-warmgray mb-8">
            Everything you need to evaluate a property for coliving potential — room by room, dollar by dollar.
          </p>
          <NewsletterCaptureForm tag={CK_TAGS.COLIVING_CHECKLIST_DOWNLOADED} buttonLabel="Get the Checklist" />
        </div>
      </section>

      <section className="relative px-8 lg:px-[60px] py-24 lg:py-40 bg-charcoal text-center overflow-hidden">
        <div className="reveal">
          <span className="eyebrow eyebrow-center !text-gold">Next step</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
            style={{ fontSize: "clamp(36px, 3.8vw, 56px)" }}
          >
            Buy, partner, or learn —{" "}
            <em className="italic text-gold-light font-light">start with a call.</em>
          </h2>
          <p className="text-[15px] text-cream mb-11 max-w-[520px] mx-auto leading-[1.8]">
            Tell me which path you&apos;re on. I&apos;ll tell you what I&apos;d do next.
          </p>
          <a href="/book" className="btn-gold">Book a Call</a>
        </div>
      </section>
    </>
  );
}
