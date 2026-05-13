import Image from "next/image";
import RevealObserver from "@/components/RevealObserver";
import BuySellForms from "@/components/BuySellForms";

export const metadata = {
  title: "Buy & Sell With Me — Coliving Cait | Atlanta Investment Properties & House Hacking",
  description:
    "Work with an Atlanta Realtor who thinks like an investor. Caitlyn Verdugo specializes in investment properties, coliving conversions, and house hacking across Decatur, Atlanta, Snellville, Stone Mountain, and the greater Atlanta metro.",
};

// Buy & Sell With Me — pixel-perfect rewrite of coliving-cait-buy-sell.html.
// Sections: Hero · Buyer/Seller panels · Why Work With Me · Forms · Testimonials
// · Service Areas · Lead Magnet · Final CTA.

const buyerFeatures = [
  ["House Hacking", "Live for free (or close to it) while your residents cover your mortgage. The smartest first move most investors can make."],
  ["Coliving Conversions", "Properties with coliving conversion potential. I know what to look for: room count, layout, parking, and the hidden spaces most people walk right past."],
  ["Occupied Coliving Properties", "Already-operating coliving homes come with unique complexities. I help you navigate the nuances of occupied transactions so nothing falls through the cracks."],
  ["Other Investment Properties", "Single-family rentals, small multifamily, and buy-and-hold properties with strong cashflow and appreciation potential."],
] as const;

const sellerFeatures = [
  ["Full-Service Listing", "Market analysis, pricing strategy, staging guidance, professional marketing, and full MLS exposure."],
  ["Transaction Management", "Contract to close handled for you: inspections, appraisal, title, repairs, and closing coordination."],
  ["Negotiation", "I protect your bottom line at every stage, from initial offers through repairs and final walkthrough."],
  ["Alternative Strategies", "Not sure selling is the right move? Explore leasing your property for coliving arbitrage or getting a property management referral first."],
] as const;

const whyMe = [
  { icon: "◈", title: "Investor Mindset", copy: "I evaluate every property the way I'd evaluate it for my own portfolio — not just the listing sheet." },
  { icon: "⌂", title: "Renovation Knowledge", copy: "I know what work costs, what adds value, and what to walk away from before you're in too deep." },
  { icon: "✦", title: "Coliving Expertise", copy: "I specialize in identifying properties with coliving conversion potential that most agents overlook entirely." },
  { icon: "$", title: "Sharp Negotiation", copy: "Whether you're buying or selling, I protect your bottom line at every stage of the transaction." },
  { icon: "⊕", title: "Full Transaction Support", copy: "Contract to close — inspections, appraisal, title, repairs, and closing coordination handled." },
];

const reviews = [
  '"Caitlyn made the entire process seamless. She knew exactly what to look for and guided us through every step. I wouldn\'t work with anyone else."',
  '"Her knowledge of investment properties is unmatched. She helped me see potential in a property I would have passed on — and it turned out to be my best deal."',
  '"Professional, responsive, and genuinely invested in my success. Caitlyn goes above and beyond for every client."',
  '"I came in with a vague idea about real estate investing. Caitlyn helped me build a clear plan and execute on it. Can\'t recommend her enough."',
];

const counties = [
  {
    name: "DeKalb County",
    cities: ["Decatur", "Stone Mountain", "Lithonia", "Tucker", "Clarkston", "Avondale Estates", "Scottdale", "Redan", "Ellenwood", "Pine Lake", "Chamblee", "Dunwoody", "Brookhaven"],
  },
  {
    name: "Gwinnett County",
    cities: ["Snellville", "Lawrenceville", "Lilburn", "Loganville", "Norcross", "Duluth", "Suwanee", "Buford", "Grayson", "Dacula", "Peachtree Corners"],
  },
  {
    name: "Fulton County",
    cities: ["Atlanta", "East Point", "College Park", "Hapeville", "Fairburn", "Palmetto", "Union City", "Roswell", "Alpharetta", "Sandy Springs", "Johns Creek"],
  },
];

export default function BuyAndSellPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-20 lg:pt-[180px] lg:pb-[100px] bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:gap-16 items-center lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
          <div className="opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
            <span className="eyebrow lg:inline-flex">Buy &amp; Sell With Me</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-6 leading-[1.05]"
              style={{ fontSize: "clamp(40px, 4.4vw, 60px)" }}
            >
              A Realtor who thinks like{" "}
              <em className="italic text-gold font-light">an investor.</em>
            </h1>
            <p className="text-base leading-[1.85] text-warmgray max-w-[480px] mx-auto lg:mx-0 mb-7">
              I don&apos;t just help you find a property — I help you find the right one. Whether you&apos;re buying your first investment, selling a property, or house hacking your way to financial freedom, you&apos;ll work with someone who&apos;s done all three.
            </p>
            <div className="flex flex-wrap gap-6 mb-9 justify-center lg:justify-start">
              {["7 Years Experience", "5.0 Zillow", "Top Realtor in DeKalb County"].map((c) => (
                <span
                  key={c}
                  className="text-xs font-medium tracking-[0.04em] text-charcoal bg-cream px-4 py-2"
                >
                  {c}
                </span>
              ))}
            </div>
            <a
              href="https://calendly.com/colivingcait/buyer-or-seller-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Schedule a Call →
            </a>
          </div>
          <div className="w-full opacity-0 [animation:heroReveal_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] max-w-[480px] mx-auto lg:max-w-none">
            <div
              className="relative w-full overflow-hidden bg-cream"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src="/images/caitlyn-buy-sell.jpg"
                alt="Caitlyn Verdugo, Keller Williams Realtor"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. THREE PANELS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16 lg:mb-[72px]">
            <span className="eyebrow eyebrow-center">How I Can Help</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Whether you&apos;re buying or selling, you deserve a Realtor who{" "}
              <em className="italic text-gold font-light">gets it.</em>
            </h2>
          </div>

          {[
            {
              icon: "◈",
              title: "For Buyers & Investors",
              intro: "Finding a property is easy. Finding the right one takes an investor's eye. I specialize in identifying properties with real potential and helping you navigate every step from search to close.",
              cta: "Tell Me What You're Looking For →",
              features: buyerFeatures,
              delay: "",
            },
            {
              icon: "$",
              title: "For Sellers",
              intro: "Selling is more than putting a sign in the yard. I help you understand your options, price strategically, and navigate the full transaction from contract to close.",
              cta: "Let's Talk About Your Property →",
              features: sellerFeatures,
              delay: "reveal-d1",
            },
          ].map((panel) => (
            <div
              key={panel.title}
              className={`reveal ${panel.delay} bg-white border border-soft mb-6 transition-all duration-500 hover:border-brand hover:shadow-card grid lg:grid-cols-[0.4fr_1fr]`}
            >
              <div className="p-12 lg:p-11 bg-white flex flex-col justify-center border-b border-soft lg:border-b-0 lg:border-r">
                <span className="block text-[32px] text-gold mb-5">{panel.icon}</span>
                <h3 className="font-heading font-medium text-[26px] text-charcoal mb-3 leading-tight">
                  {panel.title}
                </h3>
                <p className="text-[15px] text-warmgray leading-[1.8] mb-7">{panel.intro}</p>
                <a href="#forms" className="btn-sm self-start">{panel.cta}</a>
              </div>
              <div className="p-12 lg:p-11 flex flex-col justify-center">
                <ul className="list-none">
                  {panel.features.map(([title, body], idx) => (
                    <li
                      key={title}
                      className={`text-sm text-warmgray py-3 grid grid-cols-[12px_1fr] gap-3 items-start ${idx === panel.features.length - 1 ? "" : "border-b border-soft"}`}
                    >
                      <span className="text-gold text-[7px] mt-2">✦</span>
                      <span>
                        <strong className="text-charcoal font-medium">{title}</strong>
                        <br />
                        <span className="text-warmgray">{body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. WHY WORK WITH ME ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal mb-16">
            <span className="eyebrow">Why Work With Me</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-4"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              What makes this <em className="italic text-gold font-light">different.</em>
            </h2>
            <p className="text-[15px] text-warmgray max-w-[560px]">
              You&apos;re not working with a traditional Realtor. You&apos;re working with an active investor who understands both sides of every deal — and that changes everything about how I show up for you.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[rgba(28,25,23,0.06)] border border-soft">
            {whyMe.map((c, i) => (
              <div
                key={c.title}
                className={`reveal reveal-d${i + 1} group bg-white px-7 py-9 text-center transition-colors duration-500 hover:bg-cream`}
              >
                <span className="block text-2xl text-gold mb-3.5 transition-transform duration-500 group-hover:scale-[1.15]">
                  {c.icon}
                </span>
                <h3 className="font-heading font-medium text-[17px] text-charcoal mb-2 leading-tight">
                  {c.title}
                </h3>
                <p className="text-xs text-warmgray leading-[1.7]">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. FORMS ===== */}
      <section id="forms" className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-cream scroll-mt-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">Get Started</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Tell me what you&apos;re working{" "}
              <em className="italic text-gold font-light">with.</em>
            </h2>
          </div>
          <BuySellForms />
        </div>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[120px] bg-white">
        <div className="mx-auto max-w-[1320px]">
          <div className="reveal text-center mb-16">
            <span className="eyebrow eyebrow-center">What Clients Are Saying</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-2"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Real reviews from <em className="italic text-gold font-light">real clients.</em>
            </h2>
            <p className="text-[13px] text-warmgray-light">
              <span className="text-gold tracking-[2px]">★★★★★</span>
              &nbsp;&nbsp;5.0 on Zillow
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {reviews.map((r, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 1} bg-cream p-10 border border-transparent transition-all duration-500 hover:border-brand hover:-translate-y-[3px] hover:shadow-card`}
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

      {/* ===== 6. SERVICE AREAS ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-cream">
        <div className="reveal mx-auto max-w-[1320px] text-center">
          <span className="eyebrow eyebrow-center">Service Areas</span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-3"
            style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
          >
            Serving investors across the{" "}
            <em className="italic text-gold font-light">Atlanta metro.</em>
          </h2>
          <p className="text-[15px] text-warmgray mb-12">
            I work with buyers, sellers, and investors across the greater Atlanta area.
          </p>

          <div className="grid gap-6 max-w-[1100px] mx-auto text-left grid-cols-1 md:grid-cols-3">
            {counties.map((c) => (
              <div key={c.name} className="bg-white p-8 border border-soft">
                <h4 className="font-heading font-medium text-xl text-charcoal mb-4">
                  {c.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {c.cities.map((city) => (
                    <span
                      key={city}
                      className="text-sm font-normal text-charcoal bg-white px-5 py-2.5 border border-soft transition-all duration-300 hover:border-gold hover:-translate-y-0.5"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 max-w-[1100px] mx-auto mt-10 lg:grid-cols-2 text-left">
            {[
              { icon: "◈", title: "Don't see your area listed?", body: "I may still cover it.", linkText: "Reach out below" },
              { icon: "⌂", title: "Investing outside of Atlanta?", body: "I'd love to connect you with a great Realtor in my network.", linkText: "Let me know your market" },
            ].map((c) => (
              <div
                key={c.title}
                className="p-7 lg:px-8 bg-white border border-soft flex items-start gap-4"
              >
                <span className="text-gold text-xl shrink-0 mt-0.5">{c.icon}</span>
                <div>
                  <strong className="text-charcoal text-[15px] block mb-1">{c.title}</strong>
                  <span className="text-sm text-warmgray">
                    {c.body}{" "}
                    <a
                      href="#forms"
                      className="text-gold-dark hover:text-gold border-b border-brand pb-px transition-colors"
                    >
                      {c.linkText}
                    </a>{" "}
                    and {c.linkText.toLowerCase().includes("market") ? "I'll make the introduction." : "let me know where you're looking."}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. LEAD MAGNET ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-blush">
        <div className="reveal mx-auto max-w-[720px] text-center">
          <span className="eyebrow eyebrow-center">Free Download</span>
          <h3
            className="font-heading font-normal tracking-[-0.01em] text-charcoal mb-3"
            style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
          >
            Grab the <em className="italic text-gold font-light">Atlanta Investment Property Guide.</em>
          </h3>
          <p className="text-[15px] text-warmgray mb-8">
            Neighborhoods, price points, rental comps, and what to look for — everything you need to start evaluating deals in the Atlanta metro.
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
              Get the Guide
            </button>
          </form>
        </div>
      </section>

      {/* ===== 8. FINAL CTA ===== */}
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
            Your next property is out there.{" "}
            <em className="italic text-gold-light font-light">Let&apos;s go find it.</em>
          </h2>
          <p className="text-[15px] text-warmgray-light mb-11 max-w-[440px] mx-auto leading-[1.8]">
            Whether you&apos;re buying, selling, or house hacking — it starts with one conversation.
          </p>
          <a
            href="https://calendly.com/colivingcait/buyer-or-seller-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Schedule a Discovery Call
          </a>
        </div>
      </section>
    </>
  );
}
