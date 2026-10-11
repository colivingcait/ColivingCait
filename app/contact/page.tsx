import RevealObserver from "@/components/RevealObserver";
import ContactFormV2 from "@/components/ContactFormV2";
import HeroFrame from "@/components/HeroFrame";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

export const metadata = {
  title: "Contact Caitlyn Verdugo",
  description:
    "Get in touch with Caitlyn Verdugo — Atlanta Keller Williams Realtor, real estate investor, and coach. Buying, selling, partnerships, speaking, and media.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Caitlyn Verdugo",
    description:
      "Get in touch with Caitlyn Verdugo — Atlanta Keller Williams Realtor, real estate investor, and coach. Buying, selling, partnerships, speaking, and media.",
    url: "/contact",
    images: [DEFAULT_OG_IMAGE],
  },
};

// Contact — pixel-perfect rewrite of coliving-cait-contact.html.
// Sections: Hero · Quick Links · Contact Form · Contact Info · Socials.

const quickLinks = [
  { icon: "⌂", title: "Buy & Sell", copy: "Investment properties, coliving conversions, or house hacking.", topic: "buy-sell" },
  { icon: "$", title: "Partnership & Investing", copy: "Private lending, partnerships, or coliving arbitrage.", topic: "partnership" },
  { icon: "◈", title: "Learning & Coaching", copy: "Courses, coaching, consulting, or a strategy session.", topic: "coaching" },
];

const info = [
  { icon: "☎", label: "Phone", val: <a href="tel:+16788844494" className="text-charcoal hover:text-gold-dark transition-colors duration-300">678-884-4494</a> },
  { icon: "✉", label: "Email", val: <a href="mailto:colivingcait@gmail.com" className="text-charcoal hover:text-gold-dark transition-colors duration-300">colivingcait@gmail.com</a> },
  { icon: "◈", label: "Location", val: "Atlanta Metro, Georgia" },
  { icon: "⌂", label: "Brokerage", val: "Keller Williams Metro Atlanta" },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { topic?: string };
}) {
  const topic = typeof searchParams?.topic === "string" ? searchParams.topic : "";
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-16 lg:pt-[180px] lg:pb-20 bg-white">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1.1fr_0.8fr] text-center lg:text-left">
          <div>
            <span className="eyebrow lg:inline-flex">Contact</span>
            <h1
              className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-4 leading-[1.05] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
              style={{ fontSize: "clamp(44px, 5vw, 68px)" }}
            >
              Let&apos;s <em className="italic text-gold font-light">connect.</em>
            </h1>
            <p className="text-[17px] text-warmgray mb-8 opacity-0 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
              Buying, selling, a partnership, or a question — the right conversation starts here.
            </p>
            <a href="/book" className="btn-primary">Book a Call</a>
          </div>
          <div className="max-w-[420px] mx-auto lg:max-w-none">
            <HeroFrame src="/images/caitlyn-staircase.jpg" alt="Caitlyn Verdugo" />
          </div>
        </div>
      </section>

      {/* ===== 2. QUICK LINKS ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-cream">
        <div className="mx-auto max-w-[1100px]">
          <div className="reveal text-center mb-12">
            <p className="text-[15px] text-warmgray">
              Pick a topic and the form below opens on it.
            </p>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {quickLinks.map((q, i) => (
              <a
                key={q.title}
                href={`/contact?topic=${q.topic}#message`}
                className={`reveal reveal-d${i + 1} group bg-white border border-soft p-10 lg:px-8 text-center transition-all duration-500 ease-brand hover:border-gold hover:-translate-y-1 hover:shadow-cardGold`}
              >
                <span className="block text-[28px] text-gold mb-4 transition-transform duration-500 group-hover:scale-[1.15]">
                  {q.icon}
                </span>
                <h3 className="font-heading font-medium text-[22px] text-charcoal mb-2">
                  {q.title}
                </h3>
                <p className="text-[13px] text-warmgray leading-[1.6] mb-4">{q.copy}</p>
                <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-gold-dark group-hover:gap-3 transition-all duration-300">
                  Write me →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. CONTACT FORM ===== */}
      <section id="message" className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white scroll-mt-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:gap-20 items-start lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow">Send a Message</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-4"
              style={{ fontSize: "clamp(30px, 3vw, 42px)" }}
            >
              Or just reach out{" "}
              <em className="italic text-gold font-light">directly.</em>
            </h2>
            <p className="text-[15px] text-warmgray max-w-[420px]">
              General inquiries, speaking requests, media, partnerships, or anything else — I&apos;d love to hear from you. Fill out the form and I&apos;ll get back to you within 48 hours.
            </p>
          </div>
          <ContactFormV2 initialTopic={topic} />
        </div>
      </section>

      {/* ===== 4. CONTACT INFO ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-cream">
        <div className="reveal mx-auto grid max-w-[1100px] gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {info.map((c) => (
            <div key={c.label} className="p-8 lg:px-6 text-center">
              <span className="block text-xl text-gold mb-3">{c.icon}</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-warmgray-light mb-2">
                {c.label}
              </span>
              <span className="text-[15px] text-charcoal font-normal">{c.val}</span>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
