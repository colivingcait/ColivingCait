import Link from "next/link";

// Shared “ways to work with me” block. Order follows the brand:
// Buy & Sell, then Partner, then Learn.
const ways = [
  {
    num: "01",
    title: "Buy & Sell With Me",
    desc: "Work with a Keller Williams Realtor who thinks like an investor — whether you're buying your first home, selling a rental, or hunting your next deal.",
    items: ["Buying & Selling", "Investment Properties", "House Hacking & Coliving"],
    href: "/buy-and-sell",
    cta: "Get started",
  },
  {
    num: "02",
    title: "Partner With Me",
    desc: "Put your capital to work in Atlanta's coliving market. You invest, I operate — with full transparency, legal protections, and consistent payment history.",
    items: ["Private Money Lending", "Private Money Partnerships", "Coliving Arbitrage"],
    href: "/partner-with-me",
    cta: "Learn more",
  },
  {
    num: "03",
    title: "Learn With Me",
    desc: "Whether you're starting from scratch or scaling what you've built, I'll meet you where you are with the right level of guidance.",
    items: ["Mini Courses", "1:1 Coaching Program", "Advisory Retainer"],
    href: "/learn",
    cta: "Explore options",
  },
];

export default function WorkWithMe({
  eyebrow = "How I Can Help",
  title,
  intro,
  showBook = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  showBook?: boolean;
}) {
  return (
    <section className="px-8 lg:px-[60px] py-24 lg:py-[140px] bg-white">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-4 lg:gap-[60px] mb-12 lg:mb-20 lg:grid-cols-2">
          <div className="reveal">
            <span className="eyebrow">{eyebrow}</span>
            <h2
              className="font-heading font-normal tracking-[-0.02em] text-charcoal leading-[1.08]"
              style={{ fontSize: "clamp(32px, 3.4vw, 48px)" }}
            >
              {title}
            </h2>
          </div>
          {intro ? (
            <p className="reveal reveal-d1 max-w-[400px] text-[15px] text-warmgray">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 lg:gap-px lg:grid-cols-3 lg:bg-[rgba(28,25,23,0.06)] lg:border lg:border-soft">
          {ways.map((card, i) => (
            <Link
              key={card.num}
              href={card.href}
              className={`reveal reveal-d${i + 1} group bg-white px-9 lg:px-11 py-12 cursor-pointer transition-[background] duration-500 ease-brand relative overflow-hidden border border-soft lg:border-0 hover:bg-cream`}
            >
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-500 ease-brand group-hover:scale-x-100" />
              <div className="font-heading font-light text-[64px] leading-none mb-7 text-[rgba(28,25,23,0.05)] group-hover:text-[rgba(196,149,90,0.25)] transition-colors duration-500">
                {card.num}
              </div>
              <h3 className="font-heading font-medium text-[26px] leading-tight tracking-[-0.01em] text-charcoal mb-4">
                {card.title}
              </h3>
              <p className="text-sm leading-[1.8] text-warmgray mb-6">{card.desc}</p>
              <ul className="list-none mb-8">
                {card.items.map((it) => (
                  <li key={it} className="text-[13px] text-warmgray py-[5px] flex items-center gap-2.5">
                    <span className="text-gold text-[7px] shrink-0">✦</span>
                    {it}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal group-hover:text-gold-dark transition-colors duration-300">
                {card.cta}
                <span className="relative inline-block w-6 h-px bg-charcoal group-hover:w-10 group-hover:bg-gold-dark transition-all duration-300">
                  <span className="absolute -top-[3px] right-0 w-[7px] h-[7px] border-t border-r border-charcoal group-hover:border-gold-dark rotate-45 transition-colors duration-300" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        {showBook ? (
          <div className="reveal mt-14 text-center">
            <a href="/book" className="btn-gold">
              Book a Call
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
