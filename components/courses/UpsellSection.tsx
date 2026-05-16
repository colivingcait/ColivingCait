"use client";

import Link from "next/link";

type UpsellItem = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  tone: "cream" | "blush" | "charcoal" | "gold";
};

const upsells: UpsellItem[] = [
  {
    eyebrow: "✦ 1:1 Coaching",
    title: "The Builder",
    description:
      "Build your coliving portfolio from scratch in 3 months with hands-on, 1:1 guidance. Strategy, deal analysis, systems, and accountability.",
    cta: "Learn more — $4,500",
    href: "/learn#the-builder",
    tone: "charcoal",
  },
  {
    eyebrow: "✦ Ongoing Consulting",
    title: "The Operator",
    description:
      "Already operating? Get monthly consulting to scale your portfolio, optimize operations, and increase profitability.",
    cta: "Learn more — $1,000/mo",
    href: "/learn#the-operator",
    tone: "cream",
  },
  {
    eyebrow: "✦ 1-Hour Deep Dive",
    title: "Strategy Session",
    description:
      "Book a 1-hour session with Cait to map out your coliving strategy, analyze deals, or troubleshoot your portfolio.",
    cta: "Book a session — $250",
    href: "https://calendly.com/colivingcait/strategy-session",
    tone: "blush",
  },
  {
    eyebrow: "✦ All Three Courses",
    title: "Explorer Bundle",
    description:
      "Get Real Estate 101, House Hacking 101, and Coliving 101 together at a discount. The complete foundation.",
    cta: "View bundle",
    href: "/learn",
    tone: "gold",
  },
];

type UpsellSectionProps = {
  /** Hide specific items by title, e.g. hide the bundle if they already own it */
  exclude?: string[];
  /** Limit how many upsells to show */
  max?: number;
};

export default function UpsellSection({ exclude = [], max }: UpsellSectionProps) {
  const filtered = upsells.filter((u) => !exclude.includes(u.title));
  const items = max ? filtered.slice(0, max) : filtered;

  const toneStyles: Record<string, string> = {
    cream: "bg-cream/50 border-brand",
    blush: "bg-blush/30 border-blush/50",
    charcoal: "bg-charcoal text-cream border-charcoal",
    gold: "bg-gold/[0.08] border-gold/30",
  };

  const ctaStyles: Record<string, string> = {
    cream: "text-gold",
    blush: "text-gold",
    charcoal: "text-gold",
    gold: "text-gold",
  };

  return (
    <section className="mt-16 pt-12 border-t border-brand">
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        ✦ Keep going
      </p>
      <h2 className="font-heading text-2xl md:text-3xl leading-heading text-charcoal mb-8">
        Ready for the next step?
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group block border p-6 transition-all duration-300 hover:-translate-y-px hover:shadow-sm ${toneStyles[item.tone]}`}
          >
            <p
              className={`text-[10px] uppercase tracking-eyebrow mb-3 ${
                item.tone === "charcoal" ? "text-gold" : "text-warmgray/60"
              }`}
            >
              {item.eyebrow}
            </p>
            <p
              className={`font-heading text-xl leading-heading mb-2 ${
                item.tone === "charcoal" ? "text-cream" : "text-charcoal"
              }`}
            >
              {item.title}
            </p>
            <p
              className={`text-sm leading-body mb-4 ${
                item.tone === "charcoal" ? "text-cream/70" : "text-warmgray"
              }`}
            >
              {item.description}
            </p>
            <span
              className={`text-sm font-medium ${ctaStyles[item.tone]} group-hover:underline`}
            >
              {item.cta}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
