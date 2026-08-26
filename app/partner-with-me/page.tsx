import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import PropertyCard from "@/components/PropertyCard";

export const metadata = {
  title: "Partner on Atlanta Coliving Deals",
  description:
    "Put your capital to work in Atlanta's coliving market. Three partnership models — private money lending, private money partnerships, and coliving arbitrage.",
  alternates: { canonical: "/partner-with-me" },
  openGraph: {
    title: "Partner on Atlanta Coliving Deals",
    description:
      "Put your capital to work in Atlanta's coliving market. Three partnership models — private money lending, private money partnerships, and coliving arbitrage.",
    url: "/partner-with-me",
  },
};

// Partner With Me — pixel-perfect rewrite of coliving-cait-partner.html.
// Sections: Hero · How It Works (3 steps) · Partnership Models (3 cards) ·
// Portfolio (4 property cards + photo grid) · Trust & Protections (4) ·
// Partner Testimonial · Final CTA.

const steps = [
  { num: "01", title: "We Meet & Align", copy: "We hop on a call, I walk you through my portfolio, my track record, and the opportunity. You ask questions, I give straight answers. No pressure — just clarity." },
  { num: "02", title: "We Structure the Deal", copy: "We find the model that fits your goals — lending, partnership, or arbitrage. Everything is documented with proper legal protections for both sides." },
  { num: "03", title: "You Earn, I Operate", copy: "Your capital goes to work. I handle everything — acquisition, conversion, operations, residents, maintenance. You get consistent reporting and returns." },
];

const models = [
  {
    icon: "$",
    title: "Private Money Lending",
    copy: "You lend capital at a fixed rate. I pay you back with interest on a set schedule. You're the bank — predictable returns, secured position, no operational involvement.",
    items: ["Fixed interest rate", "Set repayment schedule", "Secured by the property", "No operational involvement", "Promissory note documentation"],
  },
  {
    icon: "◈",
    title: "Private Money Partnership",
    copy: "You invest capital into a deal and we share the returns. You have equity in the property and upside in its performance. I operate, you earn.",
    items: ["Equity position in the deal", "Shared returns based on performance", "Operating agreement in place", "Quarterly reporting", "Upside in appreciation and cashflow"],
  },
  {
    icon: "⌂",
    title: "Coliving Arbitrage",
    copy: "You own the property. I lease it from you and operate it as a coliving house. You get guaranteed monthly rent — I handle everything else.",
    items: ["You retain ownership", "Guaranteed monthly lease payment", "I handle all operations and residents", "Master lease agreement", "No vacancy risk for you"],
  },
];

const photoGrid = [
  "/images/colivingconsulting/1.png",
  "/images/colivingconsulting/2.png",
  "/images/colivingconsulting/3.png",
  "/images/colivingconsulting/4.png",
  "/images/colivingconsulting/5.png",
  "/images/colivingconsulting/8.png",
  "/images/colivingconsulting/9.png",
  "/images/colivingconsulting/10.png",
];

const trust = [
  { icon: "§", title: "Promissory Note", copy: "Every lending partnership is backed by a legally binding promissory note with clear terms." },
  { icon: "⊞", title: "Operating Agreement", copy: "Equity partnerships are structured with detailed operating agreements that define roles and returns." },
  { icon: "↻", title: "Quarterly Reporting", copy: "Full transparency — you see exactly how the property is performing, every quarter." },
  { icon: "✓", title: "Payment History", copy: "Consistent payment track record across my entire portfolio. Ask me about it on our call." },
];

export default function PartnerPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-20 lg:pt-[180px] lg:pb-[100px] bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-16 items-center lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
          <div className="opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
            <span className="eyebrow lg:inline-flex">Partner With Me</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-6 leading-[1.05]"
              style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
            >
              Your money working while you{" "}
              <em className="italic text-gold font-light">live your life.</em>
            </h1>
            <p className="text-base leading-[1.85] text-warmgray max-w-[480px] mx-auto lg:mx-0 mb-9">
              I operate coliving properties across the Atlanta metro. You bring the capital, I bring the expertise and operations. Three partnership models, full transparency, and a track record you can verify.
            </p>
            <Link href="/contact?topic=partnership" className="btn-primary">
              Schedule a Discovery Call →
            </Link>
          </div>
          <div className="opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[480px] mx-auto lg:max-w-none">
            <div
              className="relative w-full overflow-hidden bg-cream"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src="/images/villacandace-after.png"
                alt="Villa Candace — Atlanta metro coliving property"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. HOW IT WORKS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16 lg:mb-[72px]">
            <span className="eyebrow eyebrow-center">How It Works</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Three steps to putting your capital{" "}
              <em className="italic text-gold font-light">to work.</em>
            </h2>
          </div>
          <div className="grid gap-10 lg:gap-12 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`reveal reveal-d${i + 1} text-center relative`}
              >
                <div
                  className="font-heading font-light leading-none mb-4 text-[64px]"
                  style={{ color: "rgba(28,25,23,0.06)" }}
                >
                  {s.num}
                </div>
                <h3 className="font-heading font-medium text-[22px] text-charcoal mb-2.5">
                  {s.title}
                </h3>
                <p className="text-sm text-warmgray leading-[1.75]">{s.copy}</p>
                {i < steps.length - 1 && (
                  <span className="hidden lg:block absolute top-8 -right-6 text-gold text-lg opacity-40">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PARTNERSHIP MODELS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16">
            <span className="eyebrow">Partnership Models</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-4"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Three ways to <em className="italic text-gold font-light">partner.</em>
            </h2>
            <p className="text-[15px] text-warmgray max-w-[560px]">
              Every partnership is structured differently based on your goals, risk tolerance, and how involved you want to be. Here are the three models I work with.
            </p>
          </div>

          <div className="grid gap-4 lg:gap-px lg:grid-cols-3 lg:bg-[rgba(28,25,23,0.06)] lg:border lg:border-soft">
            {models.map((m, i) => (
              <div
                key={m.title}
                className={`reveal reveal-d${i + 1} group bg-white p-12 lg:p-10 transition-[background] duration-500 ease-brand relative overflow-hidden flex flex-col border border-soft lg:border-0 hover:bg-cream`}
              >
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-brand group-hover:scale-x-100" />
                <span className="block text-[28px] text-gold mb-5 transition-transform duration-500 group-hover:scale-[1.15]">
                  {m.icon}
                </span>
                <h3 className="font-heading font-medium text-2xl text-charcoal mb-3">
                  {m.title}
                </h3>
                <p className="text-sm leading-[1.8] text-warmgray mb-5">{m.copy}</p>
                <ul className="list-none mb-7 flex-1">
                  {m.items.map((it) => (
                    <li
                      key={it}
                      className="text-[13px] text-warmgray py-1.5 flex items-start gap-2.5"
                    >
                      <span className="text-gold text-[7px] mt-[7px] shrink-0">✦</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?topic=partnership" className="btn-sm self-start">
                  Schedule a Call →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. PORTFOLIO ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16">
            <span className="eyebrow">The Portfolio</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-4"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Real houses. Real numbers.{" "}
              <em className="italic text-gold font-light">Real results.</em>
            </h2>
            <p className="text-[15px] text-warmgray">
              Here&apos;s a look at some of the properties I operate across the Atlanta metro.
            </p>
          </div>

          <PropertyCard
            name="Villa Candace"
            location="Atlanta Metro, Georgia"
            original="5 Bed / 3 Bath"
            converted="8 Rooms / 3 Bath"
            gross="$6,000"
            strategy="Acquisition"
            images={[
              "/images/villacandace-before.png",
              "/images/villacandace-after.png",
            ]}
          >
            Added <strong className="text-charcoal font-medium">1 room in the finished basement</strong> and{" "}
            <strong className="text-charcoal font-medium">converted the garage into 2 rooms</strong>. Cleaned up, furnished, and listed on PadSplit.
          </PropertyCard>

          <PropertyCard
            name="Raven"
            location="Stone Mountain, Georgia"
            original="4 Bed / 3 Bath"
            converted="8 Rooms / 3 Bath"
            gross="$6,500"
            strategy="Acquisition"
            delay={1}
            images={[
              "/images/raven/ravenfront.jpg",
              "/images/raven/ravenkitchen.jpg",
              "/images/raven/ravenbed1.jpg",
              "/images/raven/ravenbed2.jpg",
              "/images/raven/ravenbed3.jpg",
            ]}
          >
            Converted the living room, dining room and basement into{" "}
            <strong className="text-charcoal font-medium">4 additional bedrooms</strong>.
          </PropertyCard>

          <PropertyCard
            name="Meadow"
            location="Snellville, Georgia"
            original="4 Bed / 3 Bath"
            converted="8 Rooms / 3 Bath"
            gross="$5,000"
            strategy="Arbitrage"
            delay={2}
            images={[
              "/images/Meadow/meadowfront.jpg",
              "/images/Meadow/meadow2.jpg",
              "/images/Meadow/meadow3.jpg",
              "/images/Meadow/meadow4.jpg",
              "/images/Meadow/meadow5.jpg",
              "/images/Meadow/meadow6.jpg",
              "/images/Meadow/meadow7.jpg",
            ]}
          >
            Converted the living rooms, dining room and basement into{" "}
            <strong className="text-charcoal font-medium">4 additional bedrooms</strong>.
          </PropertyCard>

          <div className="reveal mt-16">
            <h3
              className="font-heading font-normal text-[28px] text-charcoal mb-3 tracking-[-0.01em]"
            >
              More coliving properties I&apos;ve{" "}
              <em className="italic text-gold font-light">worked on.</em>
            </h3>
            <p className="text-[15px] text-warmgray mb-8">
              Consulting, property management, or helping a client purchase or sell.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {photoGrid.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square bg-blush border border-soft cursor-pointer overflow-hidden transition-all duration-300 hover:border-brand"
                >
                  <Image
                    src={src}
                    alt={`Portfolio property ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. TRUST ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">Trust &amp; Protections</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Your investment is <em className="italic text-gold font-light">protected.</em>
            </h2>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <div
                key={t.title}
                className={`reveal reveal-d${i + 1} p-10 border border-soft text-center transition-all duration-500 hover:border-brand hover:-translate-y-[3px]`}
              >
                <span className="block text-2xl text-gold mb-4">{t.icon}</span>
                <h3 className="font-heading font-medium text-lg text-charcoal mb-2">
                  {t.title}
                </h3>
                <p className="text-[13px] text-warmgray leading-[1.7]">{t.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TESTIMONIAL ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto max-w-[900px]">
          <div className="reveal text-center mb-14">
            <span className="eyebrow eyebrow-center">From Partners</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              What my partners <em className="italic text-gold font-light">say.</em>
            </h2>
          </div>
          <div className="reveal text-center">
            <blockquote
              className="font-heading font-light italic leading-[1.45] text-charcoal mb-6"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
            >
              “Partner testimonial placeholder — a quote from a current lending or equity partner about their experience working with Caitlyn, the transparency, and the returns.”
            </blockquote>
            <span className="block text-sm font-medium text-charcoal">Partner Name</span>
            <span className="block text-xs text-warmgray-light">Partnership Type</span>
          </div>
        </div>
      </section>

      {/* ===== 7. FINAL CTA ===== */}
      <section className="relative px-8 lg:px-[60px] py-24 lg:py-40 bg-charcoal text-center overflow-hidden">
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold to-transparent"
        />
        <div className="reveal">
          <span className="eyebrow eyebrow-center !text-gold">Ready?</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
            style={{ fontSize: "clamp(36px, 3.8vw, 56px)" }}
          >
            Let&apos;s put your money to work{" "}
            <em className="italic text-gold-light font-light">together.</em>
          </h2>
          <p className="text-[15px] text-warmgray-light mb-11 max-w-[440px] mx-auto leading-[1.8]">
            Every partnership starts with a conversation. No pressure, no commitment — just a chance to see if we&apos;re a good fit.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Link href="/contact?topic=partnership" className="btn-gold">
              Schedule a Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
