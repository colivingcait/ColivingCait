import Image from "next/image";
import Link from "next/link";
import CaseStudyOptInForm from "@/components/CaseStudyOptInForm";

export const metadata = {
  title: "Hey from NCC 2026 — Coliving Cait",
  description:
    "Thanks for scanning the chip! Everything Caitlyn mentioned at the National Coliving Conference — book a call, grab the free case study, or explore the courses.",
};

// Standalone landing page handed out at the National Coliving Conference
// (June 4–6, 2026). Personal follow-up flow: video → book a call → free
// case study → courses → coaching → footer CTA. The site nav is hidden
// on this route (see components/Nav.tsx) so this page renders its own
// minimal header.

const courses = [
  {
    icon: "$",
    title: "Real Estate Investing 101",
    copy: "Key terms, financing basics, and the mindset every investor needs before their first deal.",
    // TODO: confirm course slug once finalized
    href: "/courses/real-estate-101",
  },
  {
    icon: "◈",
    title: "House Hacking 101",
    copy: "Cut your housing cost in half by turning your primary residence into your first investment.",
    // TODO: confirm course slug once finalized
    href: "/courses/house-hacking-101",
  },
  {
    icon: "⌂",
    title: "Coliving 101",
    copy: "The full coliving model — how it works, who it serves, and what to look for in your first deal.",
    // TODO: confirm course slug once finalized
    href: "/courses/coliving-101",
  },
];

export default function NccPage() {
  return (
    <>
      {/* ===== MINIMAL HEADER ===== */}
      <header className="px-8 lg:px-[60px] py-5 bg-white">
        <div className="mx-auto max-w-[1320px]">
          <Link
            href="/"
            aria-label="ColivingCait — home"
            className="inline-flex items-center hover:opacity-70 transition-opacity"
          >
            <Image
              src="/images/colivingcait-logo.png"
              alt="ColivingCait"
              width={200}
              height={40}
              priority
              className="h-6 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* ===== 1. VIDEO HERO ===== */}
      <section className="px-8 lg:px-[60px] pt-8 lg:pt-10 pb-10 lg:pb-12 bg-white">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-gold-dark bg-[rgba(196,149,90,0.1)] px-4 py-2 mb-6">
            ✦ NCC 2026
          </span>
          <h1
            className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-8 leading-[1.1]"
            style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
          >
            Hey — great meeting you at <em className="italic text-gold font-light">NCC.</em>
          </h1>

          {/*
            TODO: replace the placeholder block below with the actual video
            embed (YouTube/Loom). Keep the 16:9 aspect-ratio wrapper.
          */}
          <div className="relative w-full bg-charcoal overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream/70">
              <span className="flex h-16 w-16 items-center justify-center border border-cream/30">
                <span className="ml-1 inline-block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-cream/70" />
              </span>
              <span className="text-[12px] uppercase tracking-[0.15em]">
                Video from Cait at NCC 2026
              </span>
            </div>
          </div>

          <p className="text-[15px] text-warmgray mt-6 leading-[1.7]">
            Thanks for scanning the chip. Here&apos;s everything I mentioned — pick whatever&apos;s useful.
          </p>
        </div>
      </section>

      {/* ===== 2. BOOK A CALL ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-white border-t border-soft">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gold mb-4">
            Let&apos;s Keep The Conversation Going
          </span>
          <h2
            className="font-heading font-normal tracking-[-0.02em] text-charcoal mb-4 leading-[1.1]"
            style={{ fontSize: "clamp(32px, 3.2vw, 44px)" }}
          >
            Book a <em className="italic text-gold font-light">Call.</em>
          </h2>
          <p className="text-[15px] text-warmgray leading-[1.8] mb-10 max-w-[520px] mx-auto">
            Whether you&apos;re exploring coliving for the first time or you&apos;re already operating — let&apos;s talk about your next move.
          </p>

          {/*
            TODO: confirm the Calendly account URL. Pointing at the general
            event list so visitors can pick whichever call type fits them.
          */}
          <div className="mx-auto max-w-[560px]">
            <iframe
              src="https://calendly.com/colivingcait?hide_gdpr_banner=1&hide_landing_page_details=1"
              title="Book a call with Caitlyn"
              className="block w-full border-0"
              style={{ height: "520px" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== 3. FREE CASE STUDY ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-cream">
        <div className="mx-auto max-w-[820px]">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-gold-dark bg-[rgba(196,149,90,0.1)] px-4 py-2">
              ✦ Start Here — Free
            </span>
          </div>

          <div className="bg-white border-[1.5px] border-gold p-6 lg:p-8">
            <h3
              className="font-heading font-normal tracking-[-0.01em] text-charcoal leading-[1.2] mb-3"
              style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}
            >
              How I Turned My Basement Into a{" "}
              <em className="italic text-gold font-light">$1,500/Month Asset</em>
            </h3>
            <p className="text-[14px] leading-[1.7] text-warmgray mb-5">
              The full story of my first house hack — $15K down, $12K renovation, $1,500/month rental income. Real photos, real math.
            </p>

            <div className="grid grid-cols-3 gap-3 border-b border-soft pb-4 mb-5">
              {[
                { num: "$300K", label: "Purchase price" },
                { num: "$12K", label: "Reno cost" },
                { num: "$1,500", label: "Monthly income" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-medium text-[20px] lg:text-[22px] text-charcoal leading-none mb-1">
                    {s.num}
                  </div>
                  <span className="block text-[10px] uppercase tracking-[0.08em] text-warmgray-light">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <CaseStudyOptInForm />

            <p className="text-[11px] text-warmgray-light mt-3">
              Instant PDF. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. EXPLORE COURSES ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gold mb-3">
              Learn At Your Own Pace
            </span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              Courses Built for{" "}
              <em className="italic text-gold font-light">Where You Are.</em>
            </h2>
          </div>

          <div className="grid gap-5 max-w-[400px] mx-auto lg:max-w-none lg:grid-cols-3 mb-10">
            {courses.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group bg-white border border-soft p-8 transition-all duration-500 ease-brand relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,25,23,0.06)] hover:border-brand"
              >
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-brand group-hover:scale-x-100" />
                <span className="block text-[26px] text-gold mb-4 transition-transform duration-500 group-hover:scale-110">
                  {c.icon}
                </span>
                <h3 className="font-heading font-medium text-[20px] leading-tight text-charcoal mb-2">
                  {c.title}
                </h3>
                <p className="text-[13px] leading-[1.7] text-warmgray mb-5">{c.copy}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-medium text-[22px] text-charcoal">$49</span>
                  <span className="text-[11px] text-warmgray-light">/ self-paced</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[14px] text-warmgray mb-4">
              Get all three +{" "}
              <strong className="text-charcoal font-medium">a free strategy call</strong>{" "}
              with me.
            </p>
            {/* TODO: confirm bundle route once finalized */}
            <Link href="/courses?bundle=1" className="btn-gold">
              Get the Explorer Bundle — $99
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 5. COACHING ===== */}
      <section className="px-8 lg:px-[60px] py-16 lg:py-20 bg-cream">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gold mb-3">
              Ready To Go Deeper?
            </span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.1]"
              style={{ fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              Work with me{" "}
              <em className="italic text-gold font-light">1:1.</em>
            </h2>
          </div>

          <p className="text-center text-[13px] text-warmgray-light mb-8">
            <span className="inline-block text-[10px] font-medium uppercase tracking-[0.15em] text-white bg-gold px-2 py-0.5 mr-2 align-middle">
              NCC Discount
            </span>
            Special pricing for everyone I met at NCC 2026.
          </p>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="bg-white border border-soft p-8 lg:p-10 flex flex-col">
              <span className="block text-[11px] font-medium uppercase tracking-[0.15em] text-gold mb-3">
                The Builder
              </span>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-heading font-medium text-[36px] leading-none text-charcoal">
                  $3,000
                </span>
                <span className="text-[18px] text-warmgray-light line-through">$4,500</span>
              </div>
              <span className="text-[13px] text-warmgray-light mb-5">3 months · 1:1</span>
              <p className="text-[14px] leading-[1.7] text-warmgray mb-7 flex-1">
                1:1 hands-on portfolio building. Deal analysis, operations setup, and accountability from first property to full portfolio.
              </p>
              <Link href="/learn#builder" className="btn-outline text-center">
                Learn More
              </Link>
            </div>

            <div className="bg-white border border-soft p-8 lg:p-10 flex flex-col">
              <span className="block text-[11px] font-medium uppercase tracking-[0.15em] text-gold mb-3">
                The Operator
              </span>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-heading font-medium text-[36px] leading-none text-charcoal">
                  $750<span className="text-[18px] text-warmgray-light font-normal">/mo</span>
                </span>
                <span className="text-[18px] text-warmgray-light line-through">$1,000</span>
              </div>
              <span className="text-[13px] text-warmgray-light mb-5">Month to month · cancel anytime</span>
              <p className="text-[14px] leading-[1.7] text-warmgray mb-7 flex-1">
                Ongoing consulting for active housing operators scaling their coliving business. Systems, staffing, and strategy.
              </p>
              <Link href="/learn#operator" className="btn-outline text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. FOOTER CTA ===== */}
      <section className="relative px-8 lg:px-[60px] py-20 lg:py-24 bg-charcoal text-center overflow-hidden">
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gold to-transparent"
        />
        <h2
          className="font-heading font-normal tracking-[-0.02em] text-white mb-8 leading-[1.1]"
          style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}
        >
          Let&apos;s build something{" "}
          <em className="italic text-gold-light font-light">together.</em>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link href="/contact" className="btn-gold">
            Book a Call
          </Link>
          <a
            href="https://instagram.com/colivingcait"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            Follow @colivingcait
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.15em] text-warmgray-light">
          <a
            href="https://instagram.com/colivingcait"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-light transition-colors"
          >
            Instagram · @colivingcait
          </a>
          <a
            href="https://tiktok.com/@colivingcait"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-light transition-colors"
          >
            TikTok · @colivingcait
          </a>
          <a
            href="https://youtube.com/@colivingcait"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-light transition-colors"
          >
            YouTube · @colivingcait
          </a>
        </div>
      </section>
    </>
  );
}
