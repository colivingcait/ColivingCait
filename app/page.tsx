import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";

// Homepage — pixel-perfect rewrite of coliving-cait-homepage.html.
// Sections: Hero · Stats Ticker · Service Cards · Coliving Math · Lead Magnet 1
// · Why Coliving · Quote · Testimonials · Community · Lead Magnet 2 · Final CTA.
//
// All component-level styles (.btn-*, .eyebrow, .reveal) live in globals.css
// so utility usage matches the source HTML 1:1.

const tickerItems = [
  "$2.5M AUM",
  "50+ Rooms",
  "Top Realtor in DeKalb County",
  "5 Star Zillow Rating",
  "Community Builder",
  "Women's Empowerment",
];

const testimonials = [
  '"Caitlyn made the entire process seamless. She knew exactly what to look for and guided us through every step. I wouldn\'t work with anyone else."',
  '"Her knowledge of investment properties is unmatched. She helped me see potential in a property I would have passed on — and it turned out to be my best deal."',
  '"Professional, responsive, and genuinely invested in my success. Caitlyn goes above and beyond for every client."',
  '"I came in with a vague idea about real estate investing. Caitlyn helped me build a clear plan and execute on it. Can\'t recommend her enough."',
];

export default function HomePage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="min-h-screen flex items-end pt-[140px] px-8 lg:px-[60px] bg-white relative">
        <div className="mx-auto grid w-full max-w-[1320px] items-end gap-10 lg:gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="lg:pb-24 z-[2] text-center lg:text-left">
            <span className="eyebrow lg:inline-flex">Investor · Coach · Realtor</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mt-0 mb-8 leading-[1.03] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
              style={{ fontSize: "clamp(44px, 5vw, 72px)" }}
            >
              Helping women build wealth through{" "}
              <em className="italic text-gold font-light">intentional coliving.</em>
            </h1>
            <p className="text-base leading-[1.85] text-warmgray mb-11 max-w-[440px] mx-auto lg:mx-0 opacity-0 translate-y-5 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
              I&apos;ve built a portfolio of 50+ coliving rooms across the Atlanta metro. Now I coach women through doing the same — from first deal to full portfolio. Whether you want to learn, invest, or buy, there&apos;s a seat at this table for you.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 opacity-0 translate-y-5 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_forwards]">
              <a
                href="https://calendly.com/colivingcait/chatwithcaitlyn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a Discovery Call
              </a>
              <Link href="/what-is-coliving" className="btn-text">
                Learn about coliving <span>→</span>
              </Link>
            </div>
          </div>

          <div className="relative self-end w-full opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[420px] lg:max-w-none mx-auto lg:mx-0">
            <div
              className="relative w-full overflow-hidden bg-cream"
              style={{ aspectRatio: "3 / 4" }}
            >
              <Image
                src="/images/caitlyn-yellow-blazer.jpg"
                alt="Caitlyn Verdugo"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block absolute bottom-12 -left-9 bg-white px-7 py-[22px] z-[3] shadow-photo opacity-0 [animation:heroReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_1.1s_forwards]">
              <div className="font-heading font-medium text-[28px] leading-none text-charcoal">50+</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-warmgray-light">
                Coliving Rooms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS TICKER ===== */}
      <section className="bg-cream border-y border-soft overflow-hidden relative py-5">
        <div className="absolute inset-y-0 left-0 w-20 z-[2] pointer-events-none bg-gradient-to-r from-cream to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 z-[2] pointer-events-none bg-gradient-to-l from-cream to-transparent" />
        <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
          {[...tickerItems, ...tickerItems].map((text, i) => (
            <div key={i} className="flex items-center gap-6 px-6 whitespace-nowrap shrink-0">
              <span className="font-heading font-medium text-base tracking-[0.04em] text-charcoal">
                {text}
              </span>
              <span className="text-gold text-[10px]">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. SERVICE CARDS ===== */}
      <section className="px-8 lg:px-[60px] py-24 lg:py-[140px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid items-end gap-4 lg:gap-[60px] mb-12 lg:mb-20 lg:grid-cols-2">
            <div className="reveal">
              <span className="eyebrow">How I Can Help</span>
              <h2
                className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.08]"
                style={{ fontSize: "clamp(32px, 3.4vw, 48px)" }}
              >
                Three ways to work <em className="italic text-gold font-light">with me.</em>
              </h2>
            </div>
            <p className="reveal reveal-d1 max-w-[400px] text-[15px] text-warmgray">
              Whether you&apos;re ready to learn, invest, or buy — I meet you exactly where you are.
            </p>
          </div>

          <div className="grid gap-4 lg:gap-px lg:grid-cols-3 lg:bg-[rgba(28,25,23,0.06)] lg:border lg:border-soft">
            {[
              {
                num: "01",
                title: "Learn With Me",
                desc: "Whether you're starting from scratch or scaling what you've built, I'll meet you where you are with the right level of guidance.",
                items: ["1:1 Coaching Program", "Advisory Retainer", "Mini Courses"],
                href: "/learn",
                cta: "Explore options",
              },
              {
                num: "02",
                title: "Partner With Me",
                desc: "Put your capital to work in Atlanta's coliving market. You invest, I operate — with full transparency, legal protections, and consistent payment history.",
                items: ["Private Money Lending", "Private Money Partnerships", "Coliving Arbitrage"],
                href: "/partner-with-me",
                cta: "Learn more",
              },
              {
                num: "03",
                title: "Buy & Sell With Me",
                desc: "Work with a Keller Williams Realtor who thinks like an investor. I specialize in investment properties, coliving conversions, and house hacking.",
                items: ["Investment Properties", "Coliving Conversions", "House Hacking"],
                href: "/buy-and-sell",
                cta: "Get started",
              },
            ].map((card, i) => (
              <Link
                key={card.num}
                href={card.href}
                className={`reveal reveal-d${i + 1} group bg-white px-9 lg:px-11 py-12 cursor-pointer transition-[background] duration-500 ease-brand relative overflow-hidden border border-soft lg:border-0 hover:bg-cream`}
              >
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-brand group-hover:scale-x-100" />
                <div className="font-heading font-light text-[64px] leading-none mb-7 text-[rgba(28,25,23,0.05)] group-hover:text-[rgba(196,149,90,0.25)] transition-colors duration-500">
                  {card.num}
                </div>
                <h3 className="font-heading font-medium text-[26px] leading-tight tracking-[-0.01em] text-charcoal mb-4">
                  {card.title}
                </h3>
                <p className="text-sm leading-[1.8] text-warmgray mb-6">{card.desc}</p>
                <ul className="list-none mb-8">
                  {card.items.map((it) => (
                    <li key={it} className="text-[13px] text-warmgray py-[5px] flex items-center gap-2.5">
                      <span className="text-gold text-[7px] shrink-0">✦</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal group-hover:text-gold-dark transition-colors duration-300">
                  {card.cta}
                  <span className="relative inline-block w-6 h-px bg-charcoal group-hover:w-10 group-hover:bg-gold-dark transition-all duration-300">
                    <span className="absolute -top-[3px] right-0 w-[7px] h-[7px] border-t border-r border-charcoal group-hover:border-gold-dark rotate-45 transition-colors duration-300" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. WHAT IS COLIVING — MATH ===== */}
      <section className="px-8 lg:px-[60px] bg-white">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-2 min-h-[560px]">
          <div className="reveal bg-cream px-10 py-16 lg:px-[72px] lg:py-20 flex flex-col justify-center">
            <span className="eyebrow">What Is Coliving</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "clamp(28px, 2.8vw, 40px)" }}
            >
              The math that makes coliving{" "}
              <em className="italic text-gold font-light">impossible to ignore.</em>
            </h2>
            <p className="text-[15px] leading-[1.85] text-warmgray mb-10 max-w-[420px]">
              Coliving transforms a single-family home into multiple individual income streams — giving residents affordable, flexible, high-quality housing while generating significantly more revenue than a traditional rental.
            </p>
            <div>
              <Link href="/what-is-coliving" className="btn-outline">
                Learn How Coliving Works →
              </Link>
            </div>
          </div>

          <div className="bg-charcoal px-10 py-16 lg:px-[72px] lg:py-20 flex flex-col justify-center gap-12">
            <div className="reveal relative">
              <span className="block mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-warmgray-light">
                Traditional Rental
              </span>
              <div
                className="font-heading font-normal text-warmgray-light leading-none mb-1 tracking-[-0.02em]"
                style={{ fontSize: "clamp(40px, 4vw, 52px)" }}
              >
                $2,000
              </div>
              <span className="text-[13px] text-warmgray-light block mb-3">
                gross monthly revenue
              </span>
              <div
                className="font-heading font-medium text-xl inline-block pt-3 border-t"
                style={{ color: "#C07070", borderTopColor: "rgba(192,112,112,0.25)" }}
              >
                −$200/mo cashflow
              </div>
            </div>

            <div className="w-full h-px bg-white/[0.06]" />

            <div className="reveal reveal-d2 relative">
              <span className="block mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                Coliving Model
              </span>
              <div
                className="font-heading font-normal text-white leading-none mb-1 tracking-[-0.02em]"
                style={{ fontSize: "clamp(40px, 4vw, 52px)" }}
              >
                $6,500
              </div>
              <span className="text-[13px] text-warmgray-light block mb-3">
                gross monthly revenue · same property
              </span>
              <div
                className="font-heading font-medium text-xl text-gold-light inline-block pt-3 border-t"
                style={{ borderTopColor: "rgba(232,213,181,0.2)" }}
              >
                +$1,500/mo cashflow
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. WHY COLIVING ===== */}
      <section className="px-8 lg:px-[60px] py-24 lg:py-[140px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16 lg:mb-20">
            <span className="eyebrow eyebrow-center">Why Coliving</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
            >
              One strategy. <em className="italic text-gold font-light">Three wins.</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:gap-14 lg:grid-cols-3">
            {[
              {
                icon: "$",
                title: "For Investors",
                copy: "Higher cashflow, built-in risk diversification, and a proven model that turns single-family homes into wealth-building machines. The math speaks for itself.",
              },
              {
                icon: "⌂",
                title: "For Residents",
                copy: "Affordable, flexible, fully furnished housing with individual leases and no cosigner required. A real option for the people who keep our communities running.",
              },
              {
                icon: "♀",
                title: "For Communities",
                copy: "Every coliving home is one more option for someone who needs a safe, stable, high-quality, and affordable place to land — without waiting on politicians or new construction.",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className={`reveal reveal-d${i + 1} group text-center p-10 lg:py-10 lg:px-7 transition-all duration-500 border border-transparent hover:border-brand hover:bg-cream hover:-translate-y-1`}
              >
                <span className="block text-[32px] text-gold mb-6 transition-transform duration-500 group-hover:scale-110">
                  {c.icon}
                </span>
                <h3 className="font-heading font-medium text-2xl text-charcoal mb-3.5 leading-tight">
                  {c.title}
                </h3>
                <p className="text-sm leading-[1.8] text-warmgray">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. QUOTE BANNER ===== */}
      <section className="px-8 lg:px-[60px] py-24 bg-cream text-center relative overflow-hidden">
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
            “Coliving isn&apos;t just a housing strategy — it&apos;s how women are building generational wealth right now.”
            <span className="font-sans not-italic block mt-7 text-[11px] font-medium uppercase tracking-[0.15em] text-gold">
              — Caitlyn Verdugo
            </span>
          </blockquote>
        </div>
      </section>

      {/* ===== 8. TESTIMONIALS ===== */}
      <section className="px-8 lg:px-[60px] py-24 lg:py-[140px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-14 lg:mb-[72px]">
            <span className="eyebrow eyebrow-center">What People Are Saying</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-2 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
            >
              Real reviews from <em className="italic text-gold font-light">real clients.</em>
            </h2>
            <p className="text-[13px] text-warmgray-light tracking-[0.06em]">
              <span className="text-gold tracking-[2px]">★★★★★</span>
              &nbsp;&nbsp;
              <a
                href="https://zillow.com/caitlynverdugo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                5.0 on Zillow
              </a>
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} bg-cream p-10 border border-transparent hover:border-brand hover:-translate-y-[3px] hover:shadow-card transition-all duration-500`}
              >
                <span className="block text-gold text-xs tracking-[3px] mb-4">★★★★★</span>
                <p className="text-[14.5px] leading-[1.75] text-warmgray italic mb-5">{t}</p>
                <span className="block text-[13px] font-medium text-charcoal">Zillow Review</span>
                <span className="block text-[11px] text-warmgray-light tracking-[0.06em]">
                  Verified Client
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. COMMUNITY CALLOUT ===== */}
      <section className="px-8 lg:px-[60px] py-24 lg:py-[140px] bg-cream">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-14 lg:mb-[72px]">
            <span className="eyebrow eyebrow-center">Join Our Community</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
            >
              You don&apos;t have to figure this out{" "}
              <em className="italic text-gold font-light">alone.</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {[
              {
                icon: "♀",
                title: "She Leads Coliving",
                copy: "A private online community for women in coliving — investors, operators, and those just getting started. Real conversations, real support, completely free.",
                detail: "500+ members · Free to join",
                cta: "Join on Facebook →",
                href: "https://www.facebook.com/groups/1407759770477235",
              },
              {
                icon: "◈",
                title: "Atlanta Monthly Meetup",
                copy: "Real conversations, real connections, every month. Join us the last Tuesday of every month in Atlanta. Bring your questions, your deals, and your ambition.",
                detail: "Last Tuesday · Atlanta · Free",
                cta: "RSVP on Eventbrite →",
                href: "https://www.eventbrite.com/cc/women-real-estate-investors-atl-monthly-meetups-4833857?utm-campaign=social&utm-content=creatorshare&utm-medium=discovery&utm-term=odclsxcollection&utm-source=cp&aff=escb",
              },
              {
                icon: "★",
                title: "Women's Coliving Summit",
                copy: "The first and only live event built for and by women in coliving. Two days of panels, workshops, deal reviews, and connection you won't find anywhere else.",
                detail: "Oct 16–17, 2026 · Atlanta · ~150 attendees",
                cta: "Reserve Your Seat →",
                href: "https://www.eventbrite.com/e/the-womens-coliving-summit-atlanta-2026-tickets-1986277433272?aff=ebdsoporgprofile",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className={`reveal reveal-d${i + 1} group border border-soft p-9 lg:p-12 bg-white transition-all duration-500 ease-brand hover:border-gold hover:-translate-y-1 hover:shadow-cardGold`}
              >
                <span className="block text-[28px] text-gold mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[5deg]">
                  {c.icon}
                </span>
                <h3 className="font-heading font-medium text-[22px] leading-tight text-charcoal mb-3">
                  {c.title}
                </h3>
                <p className="text-sm leading-[1.75] text-warmgray mb-3">{c.copy}</p>
                <span className="block text-[11px] text-warmgray-light tracking-[0.06em] mb-6">
                  {c.detail}
                </span>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sm"
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. LEAD MAGNET #2 ===== */}
      <LeadMagnet
        eyebrow="Free Download"
        title={
          <>
            Thinking about investing? Don&apos;t make these{" "}
            <em className="italic text-gold font-light">5 costly mistakes.</em>
          </>
        }
        copy="The five coliving mistakes that cost first-time investors thousands — and exactly how to avoid every one of them."
        button="Get the Guide"
        bg="bg-white border-y border-soft"
      />

      {/* ===== 11. FINAL CTA ===== */}
      <section className="relative px-8 lg:px-[60px] py-24 lg:py-40 bg-charcoal text-center overflow-hidden">
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold to-transparent"
        />
        <div className="reveal">
          <span className="eyebrow eyebrow-center">Ready?</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
            style={{ fontSize: "clamp(36px, 3.8vw, 56px)" }}
          >
            There&apos;s a seat at this table{" "}
            <em className="italic text-gold-light font-light">for you.</em>
          </h2>
          <p className="text-[15px] text-warmgray-light mb-11 max-w-[440px] mx-auto leading-[1.8]">
            Whether you&apos;re exploring coliving for the first time or scaling your portfolio, it starts with one conversation.
          </p>
          <a
            href="https://calendly.com/colivingcait/chatwithcaitlyn"
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

// Reusable lead-magnet block matching the HTML's `.lead-magnet` section.
function LeadMagnet({
  eyebrow,
  title,
  copy,
  button,
  bg,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  button: string;
  bg: string;
}) {
  return (
    <section className={`px-8 lg:px-[60px] py-16 lg:py-20 ${bg}`}>
      <div className="reveal mx-auto max-w-[720px] text-center">
        <span className="eyebrow eyebrow-center">{eyebrow}</span>
        <h3
          className="font-heading font-normal tracking-[-0.01em] text-charcoal mb-3"
          style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
        >
          {title}
        </h3>
        <p className="text-[15px] text-warmgray mb-8">{copy}</p>
        <form className="flex flex-col sm:flex-row gap-0 max-w-[520px] mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-1 px-5 py-4 font-sans text-sm font-light text-charcoal border border-soft sm:border-r-0 bg-white outline-none transition-colors duration-300 focus:border-gold placeholder:text-warmgray-light"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-charcoal text-white font-sans text-[11px] font-medium uppercase tracking-[0.1em] border-none cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-gold"
          >
            {button}
          </button>
        </form>
      </div>
    </section>
  );
}
