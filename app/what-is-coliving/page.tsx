import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import VillaCandaceSlider from "@/components/VillaCandaceSlider";

export const metadata = {
  title: "What Is Coliving — Coliving Cait",
  description:
    "Coliving transforms single-family homes into affordable, flexible housing for residents while generating significantly more revenue for investors. Learn how the model works.",
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
      <section className="px-8 lg:px-[60px] pt-32 pb-16 lg:pt-[180px] lg:pb-[100px] bg-white text-center">
        <div className="mx-auto max-w-[800px]">
          <span className="eyebrow eyebrow-center">What Is Coliving</span>
          <h1
            className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-7 leading-[1.06] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
            style={{ fontSize: "clamp(38px, 4.4vw, 60px)" }}
          >
            The housing solution our communities need — and the{" "}
            <em className="italic text-gold font-light">investment opportunity you&apos;ve been looking for.</em>
          </h1>
          <p className="text-[17px] leading-[1.85] text-warmgray max-w-[620px] mx-auto opacity-0 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
            Rent-by-the-room housing that&apos;s affordable for residents and profitable for investors. One model, two wins.
          </p>
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

      {/* ===== 8. TWO PATHS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-cream">
        <div className="mx-auto max-w-[900px]">
          <div className="reveal text-center mb-12">
            <span className="eyebrow eyebrow-center">Two Paths</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              How do you want to be <em className="italic text-gold font-light">involved?</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-2">
            {[
              {
                icon: "◈",
                title: "Active Investor",
                copy: "Build and operate your own coliving portfolio. Learn the model, find the deals, run the properties. I'll show you how.",
                href: "/learn",
                cta: "Learn With Me →",
              },
              {
                icon: "$",
                title: "Passive Investor",
                copy: "Put your capital to work in my portfolio. You invest, I operate — with full transparency, legal protections, and consistent returns.",
                href: "/partner-with-me",
                cta: "Partner With Me →",
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
          <form className="flex flex-col sm:flex-row gap-0 max-w-[520px] mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-4 font-sans text-sm font-light text-charcoal border border-soft sm:border-r-0 bg-white outline-none transition-colors duration-300 focus:border-gold placeholder:text-warmgray-light"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-charcoal text-white font-sans text-[11px] font-medium uppercase tracking-[0.1em] cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-gold"
            >
              Get the Checklist
            </button>
          </form>
        </div>
      </section>

      {/* ===== 10. COLIVING 101 UPSELL ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white border-t border-soft">
        <div className="mx-auto grid max-w-[900px] gap-10 lg:gap-16 items-center lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow">Go Deeper</span>
            <h2
              className="font-heading font-normal tracking-[-0.01em] text-charcoal mb-4"
              style={{ fontSize: "clamp(26px, 2.6vw, 34px)" }}
            >
              Ready to learn the full <em className="italic text-gold font-light">coliving model?</em>
            </h2>
            <p className="text-[15px] text-warmgray leading-[1.8] mb-7">
              Coliving 101 breaks down everything — how the model works, who it serves, how the math works, and what to look for in your first property. Six lessons, quizzes, worksheets, and a certificate when you&apos;re done.
            </p>
            <p className="text-sm text-warmgray">
              Coliving 101 is part of The Explorer — my foundations curriculum for new investors. See all three courses, the bundle deal, and the full learning path.
            </p>
          </div>

          <div className="reveal reveal-d2 bg-cream p-12 lg:px-10 text-center border border-soft">
            <span className="eyebrow eyebrow-center justify-center">Coliving 101</span>
            <div className="font-heading font-medium text-[48px] leading-none text-charcoal mb-2">
              $37
            </div>
            <span className="block text-[13px] text-warmgray-light mb-6">
              6 lessons · Self-paced · Certificate
            </span>
            <Link
              href="/courses/coliving-101"
              className="btn-gold w-full text-center mb-3"
              style={{ display: "block" }}
            >
              Buy Now
            </Link>
            <Link
              href="/learn#foundations"
              className="text-[13px] text-warmgray hover:text-charcoal transition-colors duration-300"
            >
              See all courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 11. QUOTE ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream text-center relative overflow-hidden">
        <span
          aria-hidden
          className="absolute -top-5 left-1/2 -translate-x-1/2 font-heading font-light leading-none pointer-events-none"
          style={{ fontSize: "280px", color: "rgba(196,149,90,0.06)" }}
        >
          “
        </span>
        <div className="reveal relative">
          <blockquote
            className="font-heading font-light italic leading-[1.4] text-charcoal max-w-[760px] mx-auto"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            “Every coliving home any of us opens is one more option for someone in our community who needs a safe, stable, clean, high quality and affordable place to land.”
            <span className="font-sans not-italic block mt-7 text-[11px] font-medium uppercase tracking-[0.15em] text-gold">
              — Caitlyn Verdugo
            </span>
          </blockquote>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative px-8 lg:px-[60px] py-24 lg:py-40 bg-charcoal text-center overflow-hidden">
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold to-transparent"
        />
        <div className="reveal">
          <span className="eyebrow eyebrow-center !text-gold">Be Part of the Solution</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
            style={{ fontSize: "clamp(36px, 3.8vw, 56px)" }}
          >
            Join the <em className="italic text-gold-light font-light">movement.</em>
          </h2>
          <p className="text-[15px] text-warmgray-light mb-11 max-w-[560px] mx-auto leading-[1.8]">
            Coliving is how we solve the housing crisis and build real wealth at the same time. The only question is how you want to be part of it.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/learn" className="btn-gold">Start Building Your Portfolio →</Link>
            <Link href="/partner-with-me" className="btn-outline-light">
              Put Your Capital to Work →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
