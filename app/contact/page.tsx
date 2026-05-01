import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Coliving Cait",
  description:
    "Get in touch with Caitlyn Verdugo — coaching, partnerships, real estate, speaking, or anything else. Personally read, replied within one business day.",
};

// Three discovery-call links per service. Swap these for Caitlyn's real
// Calendly URLs in this single constant when she shares them.
const COACHING_CALL_URL =
  "https://calendly.com/colivingcait/coaching-discovery";
const PARTNERSHIP_CALL_URL =
  "https://calendly.com/colivingcait/partnership-discovery";
const BUY_SELL_CALL_URL =
  "https://calendly.com/colivingcait/buy-sell-discovery";

// Contact — 4 sections per spec. Hero → quick links (bypass the form
// for known intents) → general contact form → contact info.
export default function ContactPage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <ContactFormSection />
      <ContactInfo />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 1. HERO                                                            */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <Section tone="charcoal" className="relative grain overflow-hidden">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-6">Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading level={1} size="display" className="text-cream">
            Let&apos;s <em className="text-gold-light">connect.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-8 text-cream/75 leading-body text-[1.0625rem]">
            The right conversation starts here.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. QUICK LINKS — bypass the form                                   */
/* ---------------------------------------------------------------- */
function QuickLinks() {
  const links: {
    symbol: string;
    label: string;
    title: string;
    body: string;
    cta: string;
    href: string;
  }[] = [
    {
      symbol: "◈",
      label: "For coaching",
      title: "Coaching discovery call",
      body: "Coaching Program ($3K · 8 weeks) or Advisory Retainer ($1.5K / mo). Both start here.",
      cta: "Book a Coaching Call →",
      href: COACHING_CALL_URL,
    },
    {
      symbol: "$",
      label: "For partnerships",
      title: "Partnership discovery call",
      body: "Private money lending, equity partnerships, or coliving arbitrage. Atlanta metro deals only.",
      cta: "Book a Partnership Call →",
      href: PARTNERSHIP_CALL_URL,
    },
    {
      symbol: "⌂",
      label: "For real estate",
      title: "Buy & sell discovery call",
      body: "Investment properties, coliving conversions, or house hacking — across the Atlanta metro.",
      cta: "Book a Real Estate Call →",
      href: BUY_SELL_CALL_URL,
    },
  ];

  return (
    <Section tone="blush">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Skip the form</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Know what you need? <em>Book directly.</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-warmgray">
            Three different discovery calls — pick the one that fits and
            grab a time.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-6 md:grid-cols-3 items-stretch"
        stagger={0.1}
      >
        {links.map((l) => (
          <StaggerItem key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full border border-brand bg-cream p-8 md:p-10 transition-all duration-300 hover:border-gold hover:shadow-[0_20px_60px_-20px_rgba(196,149,90,0.35)] hover:-translate-y-1.5 relative"
            >
              {/* Top gold accent line scales in on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
              />
              <p className="text-3xl text-gold mb-5">{l.symbol}</p>
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                {l.label}
              </p>
              <Heading level={3} size="sm">
                {l.title}
              </Heading>
              <p className="mt-3 text-warmgray text-sm leading-body">
                {l.body}
              </p>
              <p className="mt-6 text-xs uppercase tracking-button text-gold link-underline inline-block">
                {l.cta}
              </p>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. CONTACT FORM                                                    */
/* ---------------------------------------------------------------- */
function ContactFormSection() {
  return (
    <Section tone="cream">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div>
          <Reveal>
            <Eyebrow className="mb-4">Send a message</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="lg">
              Ask me <em>anything.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-warmgray leading-body">
              Press inquiries, speaking requests, partnership questions,
              random thoughts about housing — it all lands in the same
              inbox. I read every message personally and reply within
              one business day.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-8 space-y-3 text-warmgray text-sm">
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>No auto-responders, no chatbots</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Replies within one business day</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold mt-1">✦</span>
                <span>Your information is never shared</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* 4. CONTACT INFO                                                    */
/* ---------------------------------------------------------------- */
function ContactInfo() {
  const items: {
    label: string;
    value: string;
    href?: string;
  }[] = [
    {
      label: "Email",
      value: "colivingcait@gmail.com",
      href: "mailto:colivingcait@gmail.com",
    },
    {
      label: "Location",
      value: "Atlanta metro · Keller Williams Metro Atlanta",
    },
    {
      label: "Instagram",
      value: "@colivingcait",
      href: "https://instagram.com/colivingcait",
    },
    {
      label: "Facebook",
      value: "She Leads Coliving",
      href: "https://facebook.com/groups/sheleadscoliving",
    },
  ];

  return (
    <Section tone="cream" className="border-t border-brand">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Eyebrow className="mb-4">Other ways to reach me</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Heading size="md">
            Or find me <em>here.</em>
          </Heading>
        </Reveal>
      </div>

      <Stagger
        className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto"
        stagger={0.08}
      >
        {items.map((it) => (
          <StaggerItem key={it.label}>
            <div className="border-t border-brand pt-4">
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
                {it.label}
              </p>
              {it.href ? (
                <a
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    it.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="font-heading text-xl md:text-2xl leading-heading text-charcoal hover:text-gold transition-colors"
                >
                  {it.value}
                </a>
              ) : (
                <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal">
                  {it.value}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
