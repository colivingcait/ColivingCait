import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import ContactFormV2 from "@/components/ContactFormV2";

export const metadata = {
  title: "Contact — Coliving Cait",
  description:
    "Get in touch with Caitlyn Verdugo — Atlanta-based coliving investor, Realtor, and women's coliving coach. General inquiries, coaching, partnerships, speaking, and media.",
};

// Contact — pixel-perfect rewrite of coliving-cait-contact.html.
// Sections: Hero · Quick Links · Contact Form · Contact Info · Socials.

const quickLinks = [
  { icon: "◈", title: "Learning & Coaching", copy: "Courses, coaching, consulting, or a strategy session.", href: "/learn" },
  { icon: "$", title: "Partnership & Investing", copy: "Private lending, partnerships, or coliving arbitrage.", href: "/partner-with-me" },
  { icon: "⌂", title: "Buy & Sell", copy: "Investment properties, coliving conversions, or house hacking.", href: "/buy-and-sell" },
];

const info = [
  { icon: "✉", label: "Email", val: <a href="mailto:colivingcait@gmail.com" className="text-charcoal hover:text-gold-dark transition-colors duration-300">colivingcait@gmail.com</a> },
  { icon: "◈", label: "Location", val: "Atlanta Metro, Georgia" },
  { icon: "⌂", label: "Brokerage", val: "Keller Williams Metro Atlanta" },
  { icon: "★", label: "Website", val: <a href="https://colivingcait.com" className="text-charcoal hover:text-gold-dark transition-colors duration-300">colivingcait.com</a> },
];

const socials = [
  { label: "IG", title: "Instagram", href: "https://instagram.com/colivingcait" },
  { label: "YT", title: "YouTube", href: "#" },
  { label: "FB", title: "Facebook", href: "#" },
  { label: "LI", title: "LinkedIn", href: "#" },
  { label: "TT", title: "TikTok", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <RevealObserver />

      {/* ===== 1. HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-[140px] pb-16 lg:pt-[180px] lg:pb-20 bg-white text-center">
        <div className="mx-auto max-w-[600px]">
          <span className="eyebrow eyebrow-center">Contact</span>
          <h1
            className="font-heading font-normal tracking-[-0.025em] text-charcoal mb-4 leading-[1.05] opacity-0 translate-y-[30px] [animation:heroReveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
            style={{ fontSize: "clamp(44px, 5vw, 68px)" }}
          >
            Let&apos;s <em className="italic text-gold font-light">connect.</em>
          </h1>
          <p className="text-[17px] text-warmgray opacity-0 [animation:heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards]">
            The right conversation starts here.
          </p>
        </div>
      </section>

      {/* ===== 2. QUICK LINKS ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-cream">
        <div className="mx-auto max-w-[1100px]">
          <div className="reveal text-center mb-12">
            <p className="text-[15px] text-warmgray">
              Already know what you need? Skip the form and book directly.
            </p>
          </div>
          <div className="grid gap-6 max-w-[420px] mx-auto lg:max-w-none lg:grid-cols-3">
            {quickLinks.map((q, i) => (
              <Link
                key={q.title}
                href={q.href}
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
                  Schedule a Call →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. CONTACT FORM ===== */}
      <section className="px-8 lg:px-[60px] py-20 lg:py-[100px] bg-white">
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
          <ContactFormV2 />
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

      {/* ===== SOCIALS ===== */}
      <section className="px-8 lg:px-[60px] pt-12 pb-20 bg-cream">
        <div className="reveal mx-auto max-w-[600px] text-center">
          <p className="text-[15px] text-warmgray mb-6">Find me online</p>
          <div className="flex justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.title}
                href={s.href}
                title={s.title}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-12 h-12 border border-soft bg-white flex items-center justify-center text-base text-charcoal hover:border-gold hover:text-gold hover:-translate-y-[3px] transition-all duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
