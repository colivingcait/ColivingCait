import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import WorkWithMe from "@/components/WorkWithMe";
import NewsletterCaptureForm from "@/components/NewsletterCaptureForm";
import { CK_TAGS } from "@/lib/convertkit";
import {
  ATLANTA_WOMEN_INVESTORS_URL,
  EVENTBRITE_ORGANIZER_URL,
  HOUSE_HACKING_URL,
} from "@/lib/site";
import { ZillowRatingLink, ZillowReviewGrid } from "@/components/ZillowReviews";

// Homepage — pixel-perfect rewrite of coliving-cait-homepage.html.
// Sections: Hero · Stats Ticker · Service Cards · Coliving Math · Lead Magnet 1
// · Why Coliving · Quote · Testimonials · Community · Lead Magnet 2 · Final CTA.
//
// All component-level styles (.btn-*, .eyebrow, .reveal) live in globals.css
// so utility usage matches the source HTML 1:1.

const tickerItems = [
  "5.0 from 18 Zillow reviews",
  "50+ Rooms",
  "$2.5M AUM",
  "6+ Years Experience",
  "Top Realtor in DeKalb County",
  "100+ Residents",
  "500+ Women in Coliving",
  "First summit for women in coliving",
];

export default function HomePage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="min-h-screen flex items-end pt-[140px] px-8 lg:px-[60px] bg-white relative">
        <div className="mx-auto grid w-full max-w-[1320px] items-end gap-10 lg:gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="lg:pb-24 z-[2] text-center lg:text-left">
            <span className="eyebrow lg:inline-flex">Realtor · Investor · Coach</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mt-0 mb-8 leading-[1.03] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
              style={{ fontSize: "clamp(44px, 5vw, 72px)" }}
            >
              Helping you build wealth —{" "}
              <em className="italic text-gold font-light">one door at a time.</em>
            </h1>
            <p className="text-base leading-[1.85] text-warmgray mb-11 max-w-[440px] mx-auto lg:mx-0 opacity-0 translate-y-5 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
              Atlanta Realtor with Keller Williams. Coliving, house hacking, your first home or your tenth deal. I&apos;ve built a portfolio of 50+ coliving rooms across the Atlanta metro — and I help investors and house hackers buy, sell, and partner.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 opacity-0 translate-y-5 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_forwards]">
              <a href="/book" className="btn-primary">Book a Call</a>
              <a href="/listings" className="btn-text">
                View listings <span>→</span>
              </a>
            </div>
          </div>

          <div className="relative self-end opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[420px] lg:max-w-none mx-auto lg:mx-0">
            <div
              className="relative w-full overflow-hidden bg-cream"
              style={{ aspectRatio: "3 / 4" }}
            >
              <Image
                src="/images/caitlyn-yellow-blazer.jpg"
                alt="Caitlyn Verdugo, Atlanta Realtor"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
              <div className="hidden lg:block absolute bottom-6 left-6 bg-white px-6 py-5 z-[3] shadow-photo">
                <div className="font-heading font-medium text-[28px] leading-none text-charcoal">50+</div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-warmgray whitespace-nowrap">
                  Coliving Rooms
                </div>
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

      <WorkWithMe
        title={
          <>
            Three ways to work <em className="italic text-gold font-light">with me.</em>
          </>
        }
        intro="Whether you're buying, selling, investing, or ready to learn — I meet you exactly where you are."
      />

      {/* ===== 4. WHAT IS COLIVING — MATH ===== */}
      <section className="px-8 lg:px-[60px] bg-white">
        <div className="mx-auto max-w-[1320px] grid lg:grid-cols-2 min-h-[560px]">
          <div className="reveal bg-cream px-10 py-16 lg:px-[72px] lg:py-20 flex flex-col justify-center">
            <span className="eyebrow">What Is Coliving</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-6 leading-[1.12]"
              style={{ fontSize: "clamp(28px, 2.8vw, 40px)" }}
            >
              Same house.{" "}
              <em className="italic text-gold font-light">A different set of numbers.</em>
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="px-8 lg:px-[60px] py-24 lg:py-[140px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-14 lg:mb-[72px]">
            <span className="eyebrow eyebrow-center">What Clients Are Saying</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-2 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
            >
              Real reviews from <em className="italic text-gold font-light">real clients.</em>
            </h2>
            <p className="text-[13px] text-warmgray-light tracking-[0.06em]">
              <ZillowRatingLink />
            </p>
          </div>
          <ZillowReviewGrid
            limit={3}
            cardClassName="bg-cream p-10 border border-transparent hover:border-brand hover:-translate-y-[3px] hover:shadow-card transition-all duration-500"
          />
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
              Find your people{" "}
              <em className="italic text-gold font-light">in Atlanta.</em>
            </h2>
            <p className="mt-5 text-[15px] text-warmgray max-w-[520px] mx-auto leading-[1.8]">
              Two free communities — house hacking, and women building portfolios. Find the room that fits where you are.
            </p>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-[880px] lg:grid-cols-2">
            {[
              {
                icon: "⌂",
                title: "Atlanta House Hackers",
                copy: "For anyone getting their home to pay for itself. Deal breakdowns, lender intel, and a free library of house hacking guides for the Atlanta market.",
                detail: "Free · Facebook group · Metro Atlanta",
                cta: "Explore house hacking →",
                href: HOUSE_HACKING_URL,
                external: true,
                secondary: {
                  cta: "Meetups on Eventbrite →",
                  href: EVENTBRITE_ORGANIZER_URL,
                },
              },
              {
                icon: "◈",
                title: "Atlanta Women Investors",
                copy: "A monthly in-person meetup for women investing in Atlanta real estate — every strategy, every experience level. Bring your questions, your deals, and your ambition.",
                detail: "Last Tuesday · Atlanta · Free",
                cta: "See the next meetup →",
                href: ATLANTA_WOMEN_INVESTORS_URL,
                external: true,
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
                <div className="flex flex-col items-start gap-4">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="btn-sm"
                  >
                    {c.cta}
                  </a>
                  {"secondary" in c && c.secondary ? (
                    <a
                      href={c.secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-text"
                    >
                      {c.secondary.cta}
                    </a>
                  ) : null}
                </div>
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
        tag={CK_TAGS.COLIVING_MISTAKES_DOWNLOADED}
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
            Buying, selling, or investing in Atlanta?{" "}
            <em className="italic text-gold-light font-light">Start with a call.</em>
          </h2>
          <p className="text-[15px] text-cream mb-11 max-w-[440px] mx-auto leading-[1.8]">
            Tell me what you&apos;re looking at. I&apos;ll tell you how I&apos;d underwrite it.
          </p>
          <a href="/book" className="btn-gold">Book a Call</a>
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
  tag,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  button: string;
  bg: string;
  tag: string;
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
        <NewsletterCaptureForm tag={tag} buttonLabel={button} />
      </div>
    </section>
  );
}
