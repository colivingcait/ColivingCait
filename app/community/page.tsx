import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";

export const metadata = {
  title: "Community — Coliving Cait",
  description:
    "Join She Leads Coliving, attend the Atlanta Women's Monthly Meetup, and reserve your seat at the Women's Coliving Summit 2026.",
};

// Community — pixel-perfect rewrite of coliving-cait-community.html.
// Sections: Hero · She Leads · Atlanta Meetup · Quote banner · WCS ·
// Newsletter · Work With Me triple CTA · Final CTA.

const memberTypes = [
  "Women exploring coliving for the first time",
  "First-time investors working toward their first deal",
  "Active operators managing coliving properties",
  "Realtors and agents specializing in investment properties",
  "Passive investors looking for coliving opportunities",
];

const meetupBonus = [
  "Online virtual events and workshops",
  "Special guest meetups and panels",
  "Deal review sessions",
  "Networking events with industry partners",
];

const triple = [
  { icon: "◈", title: "Learn With Me", copy: "Courses, coaching, and consulting — from your first lesson to your tenth deal.", href: "/learn", cta: "Explore Options →" },
  { icon: "$", title: "Partner With Me", copy: "Put your capital to work in Atlanta's coliving market. You invest, I operate.", href: "/partner-with-me", cta: "Learn More →" },
  { icon: "⌂", title: "Buy & Sell With Me", copy: "A Realtor who thinks like an investor. Investment properties, conversions, and house hacking.", href: "/buy-and-sell", cta: "Get Started →" },
];

export default function CommunityPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-20 lg:pt-[180px] lg:pb-[100px] bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-16 items-center lg:grid-cols-2 text-center lg:text-left">
          <div className="opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
            <span className="eyebrow lg:inline-flex">Community</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-6 leading-[1.05]"
              style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
            >
              You don&apos;t have to figure this out{" "}
              <em className="italic text-gold font-light">alone.</em>
            </h1>
            <p className="text-base leading-[1.85] text-warmgray max-w-[460px] mx-auto lg:mx-0">
              Three communities. All built for women. Whether you&apos;re investing in coliving, real estate, or just exploring your options — there&apos;s a place here for you.
            </p>
          </div>
          <div className="opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[480px] mx-auto lg:max-w-none">
            <div
              className="w-full overflow-hidden flex items-center justify-center text-sm text-warmgray-light"
              style={{
                aspectRatio: "4 / 3",
                background:
                  "linear-gradient(165deg, #FAF7F2 0%, #F0E8E0 60%, rgba(196,149,90,0.08) 100%)",
              }}
            >
              WCS group photo
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. SHE LEADS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-20 items-start lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow">Online · Nationwide · Women Only</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-5 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              She Leads <em className="italic text-gold font-light">Coliving</em>
            </h2>
            <p className="text-[15px] leading-[1.85] text-warmgray mb-9 max-w-[480px]">
              A private online community for women in coliving — nationwide, always on, and completely free. This is where women at every stage of the coliving journey connect, ask questions, share wins, and support each other through the real stuff.
            </p>
            <ul className="list-none mb-10">
              {memberTypes.map((m) => (
                <li
                  key={m}
                  className="text-[15px] text-warmgray py-3 flex items-start gap-3.5 border-b border-soft last:border-b-0"
                >
                  <span className="text-gold text-[8px] mt-2 shrink-0">✦</span>
                  {m}
                </li>
              ))}
            </ul>
            <a href="#" className="btn-primary">Join She Leads on Facebook →</a>
          </div>

          <div className="reveal reveal-d2 bg-white border border-soft p-12 lg:p-11 transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card">
            <h3 className="font-heading font-medium text-2xl text-charcoal mb-4">
              What you&apos;ll find inside
            </h3>
            <p className="text-sm text-warmgray leading-[1.75] mb-3">
              Real conversations about real deals. No gatekeeping, no fluff — just women helping women build wealth through coliving. Consistent interaction, daily posts, and a network that shows up for each other.
            </p>
            <span className="block text-xs text-warmgray-light tracking-[0.06em] mb-6">
              500+ members · Free · Private Facebook group · Nationwide
            </span>
            <a href="#" className="btn-sm">Join Now →</a>
            <p className="font-heading italic text-lg text-charcoal leading-[1.45] pt-6 mt-6 border-t border-soft">
              “I joined She Leads not knowing a single person in coliving. Six months later I closed my first deal — and I had a whole community cheering me on.”
            </p>
          </div>
        </div>
      </section>

      {/* ===== 3. MEETUP ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-20 items-center lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow">In Person · Atlanta · Women Only</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-5 leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Atlanta Women&apos;s Monthly{" "}
              <em className="italic text-gold font-light">Meetup</em>
            </h2>
            <p className="text-[15px] leading-[1.85] text-warmgray mb-9 max-w-[480px]">
              A monthly in-person meetup for women real estate investors in Atlanta — all strategies, all experience levels. Whether you&apos;re brand new and exploring your options or ten deals deep and scaling, this is your room. Coliving, house hacking, flips, rentals, commercial — everyone&apos;s welcome.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-9">
              {[
                ["When", "Last Tuesday of every month"],
                ["Where", "Atlanta, Georgia"],
                ["Cost", "Free"],
                ["RSVP", "Eventbrite"],
              ].map(([label, val]) => (
                <div key={label} className="p-6 bg-cream">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-gold mb-1.5">
                    {label}
                  </span>
                  <span className="font-heading font-medium text-lg text-charcoal">
                    {val}
                  </span>
                </div>
              ))}
            </div>
            <a href="#" className="btn-primary">RSVP on Eventbrite →</a>
          </div>

          <div className="reveal reveal-d2 bg-cream p-10 lg:p-11 border border-soft">
            <h3 className="font-heading font-medium text-[22px] text-charcoal mb-3">
              Plus bonus events throughout the year
            </h3>
            <p className="text-sm text-warmgray leading-[1.75]">
              The monthly meetup is just the start. We also host:
            </p>
            <ul className="list-none mt-4">
              {meetupBonus.map((b) => (
                <li
                  key={b}
                  className="text-sm text-warmgray py-2 flex items-center gap-2.5"
                >
                  <span className="text-gold text-[7px] shrink-0">✦</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 4. QUOTE ===== */}
      <section
        className="px-8 lg:px-[60px] py-16 lg:py-20 text-center"
        style={{ background: "linear-gradient(135deg, #C4955A 0%, #D4A86A 100%)" }}
      >
        <div className="reveal">
          <blockquote
            className="font-heading font-light italic leading-[1.4] text-white max-w-[760px] mx-auto"
            style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}
          >
            “Every coliving home any of us opens is one more option for someone in our community who needs a safe, stable, clean, high quality and affordable place to land.”
            <span className="font-sans not-italic block mt-5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">
              — Caitlyn Verdugo
            </span>
          </blockquote>
        </div>
      </section>

      {/* ===== 5. WCS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-charcoal">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-20 items-center lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow !text-gold-light before:!bg-gold-light">
              Annual · Atlanta · Women Only
            </span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
              style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
            >
              Women&apos;s Coliving <em className="italic text-gold-light font-light">Summit</em>
            </h2>
            <p className="text-base leading-[1.85] text-warmgray-light mb-9">
              The first and only live event built for and by women in coliving. Whether you&apos;re just curious about the model or you&apos;re already building a massive coliving portfolio — this is your event. Two days of panels, workshops, deal reviews, networking, and the kind of connection you won&apos;t find anywhere else. Open to women at every stage — from exploring to converting existing housing into coliving units to scaling an established portfolio.
            </p>
            <div className="flex flex-wrap gap-9 mb-10">
              {[
                ["Oct 16–17", "2026"],
                ["Atlanta, GA", "Location"],
                ["~150", "Attendees"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="font-heading font-medium text-xl text-white">{val}</div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-warmgray-light mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="btn-outline-light">
              Reserve Your Seat on Eventbrite →
            </a>
          </div>

          <div
            className="reveal reveal-d2 flex items-center justify-center text-sm text-warmgray-light"
            style={{
              aspectRatio: "4 / 3",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            WCS event photo
          </div>
        </div>
      </section>

      {/* ===== 6. NEWSLETTER ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-blush">
        <div className="reveal mx-auto max-w-[720px] text-center">
          <span className="eyebrow eyebrow-center">Stay in the Loop</span>
          <h3
            className="font-heading font-normal tracking-[-0.01em] text-charcoal mb-3"
            style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
          >
            The coliving intel you won&apos;t find{" "}
            <em className="italic text-gold font-light">anywhere else.</em>
          </h3>
          <p className="text-[15px] text-warmgray mb-8">
            Market insights, deal breakdowns, lessons from my portfolio, and community updates — straight to your inbox.
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
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ===== 7. WORK WITH ME ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white border-t border-soft">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">Ready to Go Deeper?</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(30px, 3vw, 44px)" }}
            >
              Ready to go beyond the{" "}
              <em className="italic text-gold font-light">community?</em>
            </h2>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {triple.map((t, i) => (
              <div
                key={t.title}
                className={`reveal reveal-d${i + 1} group p-12 lg:p-9 border border-soft text-center transition-all duration-500 ease-brand hover:border-gold hover:-translate-y-1 hover:shadow-cardGold`}
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
          <span className="eyebrow eyebrow-center !text-gold">There&apos;s a Seat at This Table</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-white mb-5 leading-[1.08]"
            style={{ fontSize: "clamp(36px, 3.8vw, 56px)" }}
          >
            There&apos;s a seat at this table{" "}
            <em className="italic text-gold-light font-light">for you.</em>
          </h2>
          <p className="text-[15px] text-warmgray-light mb-11 max-w-[440px] mx-auto leading-[1.8]">
            Join the community, show up to a meetup, or reserve your seat at the summit. Wherever you start, you&apos;ll never do this alone again.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="#" className="btn-gold">Join She Leads →</a>
            <a href="#" className="btn-outline-light">Reserve WCS Seat →</a>
          </div>
        </div>
      </section>
    </>
  );
}
