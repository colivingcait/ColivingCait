import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";

const OG_TITLE = "Built to build. Born to sell. Here to help.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(OG_TITLE)}&eyebrow=${encodeURIComponent("About Caitlyn")}`;

export const metadata = {
  title: "About Caitlyn",
  description:
    "Meet Caitlyn Verdugo — Atlanta-based coliving investor, Realtor, and women's coliving coach. From founding a swim school at 17 to building 50+ coliving rooms across Atlanta.",
  openGraph: {
    title: "About Caitlyn — Coliving Cait",
    description:
      "From founding a swim school at 17 to building 50+ coliving rooms across Atlanta — meet the investor, coach, and Realtor behind Coliving Cait.",
    url: "https://colivingcait.com/about",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Caitlyn — Coliving Cait",
    description:
      "Atlanta-based coliving investor, Realtor, and women's coliving coach.",
    images: [OG_IMAGE],
  },
};

// About page — pixel-perfect rewrite of coliving-cait-about.html.
// Sections: Hero · My Story · Mission · She Leads + WCS · Media · Testimonials
// · Triple CTA · Final CTA. Reveal animations driven by RevealObserver.

const stats = [
  { val: "$2.5M", label: "AUM" },
  { val: "50+", label: "Rooms" },
  { val: "100+", label: "Residents" },
  { val: "5.0", label: "Zillow" },
];

const storyParagraphs = [
  "I grew up in Southern California, watching my parents build businesses. Both entrepreneurs — they showed me early what it looked like to bet on yourself, create something from nothing, and never wait for someone else to open the door. That idea has really shaped who I am today.",
  "At 17 I started my first business — not from a business plan, but from a moment that mattered. A family friend's two-year-old had a near-drowning experience. As a lifelong competitive swimmer who had been teaching swim lessons for the city of Huntington Beach, I stepped in and taught her how to swim in my parents' backyard pool. One lesson quickly grew into a full-fledged business. By the time I was 21, Jump Start Swimming had over 20 instructors, three pools, and hundreds of families every year across Orange County, California. While studying business and child development at Cal State Fullerton I was simultaneously managing staff, running operations, responding to midnight emails, and learning what it actually means to build something real from the ground up.",
  "After graduating I decided I wanted to live my life and travel a little more — so I booked one-way tickets to places I'd never been. I spent a year living in Hawaii, backpacking South America, then Asheville North Carolina, then St. Pete Florida, where I fell in love with marathon swimming and real estate in 2019/2020 — right as the pandemic was just getting started. Perfect timing.",
  "I moved to Atlanta to be closer to family and pretty quickly felt the pull toward investing. I started attending real estate investing meetups. In 2022 I converted my basement into a studio apartment, rented it out, and felt the click of something falling into place. A few months later, I unknowingly walked into a PadSplit meetup — and that was it. I knew coliving was the strategy I'd been looking for.",
  "Coliving is one of the most powerful tools we have right now — working to accomplish the joint mission of solving the affordable housing crisis and helping everyday women build real wealth through real estate. And what I love most about it is that it's the ultimate creative solution. We don't have enough housing for the people who need it — but rather than just throwing our hands up and saying “we need to build more,” which takes decades, we can reconfigure the housing we already have to better serve the people who need it right now.",
  "I've now built a growing portfolio of coliving homes across the Atlanta metro, co-founded She Leads Coliving and the Women's Coliving Summit, and built a coaching program to help women do exactly what I did — but faster, smarter, and with someone in their corner.",
  "Because real estate is the entrepreneur's dream. You can make it as big as you want. There's no ceiling, no set path. And I'm proof of that.",
];

const roles = [
  { icon: "$", title: "Investor", copy: "50+ rooms across the Atlanta metro" },
  { icon: "◈", title: "Coach", copy: "Helping women build their first portfolios" },
  { icon: "♀", title: "She Leads Co-Founder", copy: "500+ women in coliving community" },
  { icon: "★", title: "WCS Co-Founder", copy: "The first summit for women in coliving" },
  { icon: "⌂", title: "KW Realtor", copy: "Top agent in DeKalb County" },
];

const media = [
  { type: "Podcast", title: "Podcast Episode Title", copy: "Brief description of the episode and what was discussed.", link: "Listen →" },
  { type: "Speaking", title: "Conference or Event Name", copy: "Brief description of the talk or panel topic.", link: "Watch →" },
  { type: "YouTube", title: "Video Title", copy: "Brief description of the video content.", link: "Watch →" },
];

const reviews = [
  '"Caitlyn made the entire process seamless. She knew exactly what to look for and guided us through every step. I wouldn\'t work with anyone else."',
  '"Her knowledge of investment properties is unmatched. She helped me see potential in a property I would have passed on — and it turned out to be my best deal."',
  '"Professional, responsive, and genuinely invested in my success. Caitlyn goes above and beyond for every client."',
  '"I came in with a vague idea about real estate investing. Caitlyn helped me build a clear plan and execute on it. Can\'t recommend her enough."',
];

const triple = [
  { icon: "◈", title: "Learn With Me", copy: "Courses, coaching, and consulting — from your first lesson to your tenth deal.", href: "/learn", cta: "Explore Options →" },
  { icon: "$", title: "Partner With Me", copy: "Put your capital to work in Atlanta's coliving market. You invest, I operate.", href: "/partner-with-me", cta: "Learn More →" },
  { icon: "⌂", title: "Buy & Sell With Me", copy: "A Realtor who thinks like an investor. Investment properties, conversions, and house hacking.", href: "/buy-and-sell", cta: "Get Started →" },
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
              I&apos;m an Atlanta-based coliving investor, Keller Williams Realtor, and women&apos;s coliving coach. I&apos;ve built a portfolio of 50+ coliving rooms across the Atlanta metro, and I&apos;m on a mission to help women do the same.
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

          <div className="w-full opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[420px] mx-auto lg:max-w-none">
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

      {/* ===== 3. THE MISSION ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-charcoal">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal max-w-[680px] mb-16 lg:mb-[72px]">
            <span className="eyebrow !text-gold-light before:!bg-gold-light">The Mission</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-white mb-6 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
            >
              Coliving as a vehicle for{" "}
              <em className="italic text-gold-light font-light">wealth and community.</em>
            </h2>
            <p className="text-base leading-[1.85] text-warmgray-light">
              Coliving is one of the most powerful tools we have right now — working to accomplish the joint mission of solving the affordable housing crisis and helping everyday women build real wealth through real estate. I wear a lot of hats to make that happen.
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
                <p className="text-xs text-warmgray-light mt-1.5 leading-[1.6]">{r.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. SHE LEADS + WCS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-blush">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-2">
          <div className="reveal p-10 lg:px-11 lg:py-12 bg-white border border-soft transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card">
            <span className="block text-[28px] text-gold mb-5">♀</span>
            <h3 className="font-heading font-medium text-2xl text-charcoal mb-3 leading-tight">
              She Leads Coliving
            </h3>
            <p className="text-sm leading-[1.8] text-warmgray mb-2">
              A private online community for women in coliving — investors, operators, and those just getting started. Real conversations, real support, completely free.
            </p>
            <span className="block text-xs text-warmgray-light tracking-[0.04em] mb-6">
              500+ members · Free to join
            </span>
            <a
              href="https://www.facebook.com/groups/1407759770477235"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sm"
            >
              Join on Facebook →
            </a>
          </div>

          <div className="reveal reveal-d2 p-10 lg:px-11 lg:py-12 bg-white border border-soft transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card">
            <span className="block text-[28px] text-gold mb-5">★</span>
            <h3 className="font-heading font-medium text-2xl text-charcoal mb-3 leading-tight">
              Women&apos;s Coliving Summit
            </h3>
            <p className="text-sm leading-[1.8] text-warmgray mb-2">
              The first and only live event built for and by women in coliving. Two days of panels, workshops, deal reviews, and connection you won&apos;t find anywhere else.
            </p>
            <span className="block text-xs text-warmgray-light tracking-[0.04em] mb-6">
              Oct 16–17, 2026 · Atlanta · ~150 attendees
            </span>
            <a
              href="https://www.eventbrite.com/e/the-womens-coliving-summit-atlanta-2026-tickets-1986277433272?aff=ebdsoporgprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sm"
            >
              Reserve Your Seat →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 5. MEDIA & APPEARANCES ===== */}
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

          <div className="grid gap-6 max-w-[480px] mx-auto lg:max-w-none lg:grid-cols-3">
            {media.map((m, i) => (
              <div
                key={m.title}
                className={`reveal reveal-d${i + 1} border border-soft p-9 lg:px-8 bg-white transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card`}
              >
                <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-gold mb-3.5">
                  {m.type}
                </span>
                <h3 className="font-heading font-medium text-xl leading-tight text-charcoal mb-2.5">
                  {m.title}
                </h3>
                <p className="text-[13px] text-warmgray leading-[1.7] mb-4">{m.copy}</p>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal hover:text-gold-dark hover:gap-3 transition-all duration-300"
                >
                  {m.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">What People Are Saying</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-2 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Real reviews from <em className="italic text-gold font-light">real clients.</em>
            </h2>
            <p className="text-[13px] text-warmgray-light">
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
            {reviews.map((r, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} bg-white p-10 border border-soft transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card`}
              >
                <span className="block text-gold text-xs tracking-[3px] mb-4">★★★★★</span>
                <p className="text-[14.5px] leading-[1.75] text-warmgray italic mb-5">{r}</p>
                <span className="block text-[13px] font-medium text-charcoal">Zillow Review</span>
                <span className="block text-[11px] text-warmgray-light">Verified Client</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. TRIPLE CTA ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white border-t border-soft">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">Work With Me</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
            >
              Ready to take the <em className="italic text-gold font-light">next step?</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {triple.map((t, i) => (
              <div
                key={t.title}
                className={`reveal reveal-d${i + 1} group p-12 lg:px-9 border border-soft text-center bg-white transition-all duration-500 ease-brand hover:border-gold hover:-translate-y-1 hover:shadow-cardGold`}
              >
                <span className="block text-[28px] text-gold mb-5 transition-transform duration-500 group-hover:scale-110">
                  {t.icon}
                </span>
                <h3 className="font-heading font-medium text-[22px] text-charcoal mb-3">
                  {t.title}
                </h3>
                <p className="text-sm leading-[1.75] text-warmgray mb-6">{t.copy}</p>
                <Link href={t.href} className="btn-sm">{t.cta}</Link>
              </div>
            ))}
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
          <span className="eyebrow eyebrow-center !text-gold">Let&apos;s Connect</span>
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
