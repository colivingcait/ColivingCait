import Image from "next/image";
import RevealObserver from "@/components/RevealObserver";
import WorkWithMe from "@/components/WorkWithMe";
import { mediaAction, mediaAppearances } from "@/lib/media";
import {
  ATLANTA_WOMEN_INVESTORS_URL,
  EVENTBRITE_ORGANIZER_URL,
  HOUSE_HACKING_URL,
} from "@/lib/site";

export const metadata = {
  title: "About Caitlyn Verdugo — Atlanta Realtor, Investor & Coach",
  description:
    "Meet Caitlyn Verdugo — Atlanta Keller Williams Realtor, real estate investor, and coach. From founding a swim school at 17 to building 50+ coliving rooms across metro Atlanta.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Caitlyn Verdugo — Atlanta Realtor, Investor & Coach",
    description:
      "Meet Caitlyn Verdugo — Atlanta Keller Williams Realtor, real estate investor, and coach. From founding a swim school at 17 to building 50+ coliving rooms across metro Atlanta.",
    url: "/about",
    images: [{ url: "/images/caitlyn-staircase.jpg", alt: "Caitlyn Verdugo" }],
  },
};

// About page — pixel-perfect rewrite of coliving-cait-about.html.
// Sections: Hero · My Story · Mission · Communities · Media · Testimonials
// · Triple CTA · Final CTA. Reveal animations driven by RevealObserver.

const stats = [
  { val: "$2.5M", label: "AUM" },
  { val: "50+", label: "Rooms" },
  { val: "100+", label: "Residents" },
  { val: "6+", label: "Years" },
  { val: "5.0", label: "Zillow" },
];

const storyParagraphs = [
  "I grew up in Southern California, watching my parents build businesses. Both entrepreneurs — they showed me early what it looked like to bet on yourself, create something from nothing, and never wait for someone else to open the door. That idea has really shaped who I am today.",
  "At 17 I started my first business — not from a business plan, but from a moment that mattered. A family friend's two-year-old had a near-drowning experience. As a lifelong competitive swimmer who had been teaching swim lessons for the city of Huntington Beach, I stepped in and taught her how to swim in my parents' backyard pool. One lesson quickly grew into a full-fledged business. By the time I was 21, Jump Start Swimming had over 20 instructors, three pools, and hundreds of families every year across Orange County, California. While studying business and child development at Cal State Fullerton I was simultaneously managing staff, running operations, responding to midnight emails, and learning what it actually means to build something real from the ground up.",
  "After graduating I decided I wanted to live my life and travel a little more — so I booked one-way tickets to places I'd never been. I spent a year living in Hawaii, backpacking South America, then Asheville North Carolina, then St. Pete Florida, where I fell in love with marathon swimming and real estate in 2019/2020 — right as the pandemic was just getting started. Perfect timing.",
  "I moved to Atlanta to be closer to family and pretty quickly felt the pull toward investing. I started attending real estate investing meetups. In 2022 I converted my basement into a studio apartment, rented it out, and felt the click of something falling into place. A few months later, I unknowingly walked into a PadSplit meetup — and that was it. I knew coliving was the strategy I'd been looking for.",
  "I've now built a growing portfolio of coliving homes across the Atlanta metro, co-founded She Leads Coliving, hosted the Women's Coliving Summit, and built a coaching program to help other investors do exactly what I did — but faster, smarter, and with someone in their corner.",
  "Because real estate is the entrepreneur's dream. You can make it as big as you want. There's no ceiling, no set path. And I'm proof of that.",
];

const roles = [
  { icon: "⌂", title: "KW Realtor", copy: "Top Realtor in DeKalb County" },
  { icon: "$", title: "Investor", copy: "$2.5M AUM · 50+ rooms · 100+ residents" },
  { icon: "◈", title: "Coach", copy: "Helping investors build their first portfolios" },
  { icon: "♀", title: "She Leads Co-Founder", copy: "500+ women in coliving community" },
  { icon: "★", title: "Summit Co-Founder", copy: "Hosted the first summit for women in coliving" },
];

export default function AboutPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-20 lg:pt-40 lg:pb-24 bg-white">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 lg:gap-16 lg:grid-cols-2 text-center lg:text-left">
          <div className="opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
            <span className="eyebrow lg:inline-flex">About Caitlyn</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-6 leading-[1.05]"
              style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
            >
              Built to build. Born to sell.{" "}
              <em className="italic text-gold font-light">Here to help.</em>
            </h1>
            <p className="text-base leading-[1.85] text-warmgray max-w-[460px] mx-auto lg:mx-0">
              I&apos;m an Atlanta-based Keller Williams Realtor, real estate investor, and coach. I&apos;ve built a portfolio of 50+ coliving rooms across the Atlanta metro, and I&apos;m on a mission to help people do the same.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-9">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-heading font-medium text-[28px] leading-none text-charcoal mb-1">
                    {s.val}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-warmgray-light">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[420px] mx-auto lg:max-w-none">
            <div
              className="relative w-full overflow-hidden bg-cream"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Image
                src="/images/caitlyn-staircase.jpg"
                alt="Caitlyn Verdugo"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. THE MISSION ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-charcoal">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal max-w-[680px] mb-16 lg:mb-[72px]">
            <span className="eyebrow !text-gold-light before:!bg-gold-light">What I Do</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-white mb-6 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
            >
              Realtor, investor,{" "}
              <em className="italic text-gold-light font-light">and coach.</em>
            </h2>
            <p className="text-base leading-[1.85] text-cream">
              Keller Williams Realtor first, then the portfolio, then coaching — plus the communities I built around that work.
            </p>
          </div>

          <div className="grid gap-px bg-white/[0.06] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {roles.map((r, i) => (
              <div
                key={r.title}
                className={`reveal reveal-d${i + 1} group bg-charcoal hover:bg-charcoal-soft px-7 py-9 text-center transition-colors duration-500`}
              >
                <span className="block text-2xl text-gold mb-4 transition-transform duration-500 group-hover:scale-[1.15]">
                  {r.icon}
                </span>
                <h3 className="font-heading font-medium text-lg leading-tight text-white">
                  {r.title}
                </h3>
                <p className="text-xs text-cream mt-1.5 leading-[1.6]">{r.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. MY STORY ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto grid w-full max-w-[1320px] items-start gap-10 lg:gap-20 lg:grid-cols-[1fr_0.4fr]">
          <div className="reveal">
            <span className="eyebrow">My Story</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-9 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              From a backyard pool in California to{" "}
              <em className="italic text-gold font-light">50+ coliving rooms in Atlanta.</em>
            </h2>
            {storyParagraphs.map((p, i) => (
              <p key={i} className="text-[15.5px] leading-[1.9] text-warmgray mb-6 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          <div className="reveal reveal-d2 lg:sticky lg:top-32">
            <div className="font-heading font-light italic text-[26px] leading-[1.35] text-charcoal pl-6 border-l-2 border-gold">
              “Real estate is the entrepreneur&apos;s dream. You can make it as big as you want. There&apos;s no ceiling.”
              <span className="font-sans not-italic block mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                — Caitlyn Verdugo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEDIA & APPEARANCES ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">As Seen In</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Media &amp; <em className="italic text-gold font-light">Appearances</em>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mediaAppearances.map((m, i) => (
              <div
                key={m.href}
                className={`reveal reveal-d${(i % 6) + 1} border border-soft p-9 lg:px-8 bg-white transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card`}
              >
                <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-gold mb-3.5">
                  {m.eyebrow}
                </span>
                <h3 className="font-heading font-medium text-xl leading-tight text-charcoal mb-2.5">
                  {m.title}
                </h3>
                <p className="text-[13px] text-warmgray leading-[1.7] mb-4">{m.description}</p>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal hover:text-gold-dark hover:gap-3 transition-all duration-300"
                >
                  {mediaAction(m.kind)} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-blush">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-12">
            <span className="eyebrow eyebrow-center">Community</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Two rooms in <em className="italic text-gold font-light">Atlanta.</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-2">
            <div className="reveal p-10 lg:px-11 lg:py-12 bg-white border border-soft">
              <h3 className="font-heading font-medium text-2xl text-charcoal mb-3 leading-tight">
                Atlanta House Hackers
              </h3>
              <p className="text-sm leading-[1.8] text-warmgray mb-2">
                A free community for anyone house hacking in metro Atlanta — first-timers running the numbers, and owners already living for free.
              </p>
              <span className="block text-xs text-warmgray-light tracking-[0.04em] mb-6">
                Free · Facebook group · Metro Atlanta
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href={HOUSE_HACKING_URL} target="_blank" rel="noopener noreferrer" className="btn-sm">Explore House Hacking →</a>
                <a href={EVENTBRITE_ORGANIZER_URL} target="_blank" rel="noopener noreferrer" className="btn-text">Meetups on Eventbrite →</a>
              </div>
            </div>
            <div className="reveal reveal-d2 p-10 lg:px-11 lg:py-12 bg-white border border-soft">
              <h3 className="font-heading font-medium text-2xl text-charcoal mb-3 leading-tight">
                Atlanta Women Investors
              </h3>
              <p className="text-sm leading-[1.8] text-warmgray mb-2">
                A monthly meetup for women investing in Atlanta real estate — every strategy, every experience level.
              </p>
              <span className="block text-xs text-warmgray-light tracking-[0.04em] mb-6">
                Last Tuesday · Atlanta · Free
              </span>
              <a href={ATLANTA_WOMEN_INVESTORS_URL} target="_blank" rel="noopener noreferrer" className="btn-sm">
                See the next meetup →
              </a>
            </div>
          </div>
        </div>
      </section>

      <WorkWithMe
        eyebrow="Work With Me"
        title={
          <>
            Buy, partner, or <em className="italic text-gold font-light">learn.</em>
          </>
        }
        showBook
      />
    </>
  );
}
