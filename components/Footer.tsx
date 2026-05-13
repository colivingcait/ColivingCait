import Link from "next/link";

// Footer mirrors Section 8 of the playbook v2:
//   col 1: ColivingCait logo + tagline
//   col 2: Navigate
//   col 3: Connect (community, contact, socials)
// Bottom bar: copyright + email
const navigate = [
  { href: "/about", label: "About" },
  { href: "/what-is-coliving", label: "What Is Coliving" },
  { href: "/learn", label: "Learn With Me" },
  { href: "/partner-with-me", label: "Partner With Me" },
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/calculator", label: "Calculators" },
];

const connect = [
  { href: "/community", label: "Community", external: false },
  { href: "/contact", label: "Contact", external: false },
  { href: "https://instagram.com/colivingcait", label: "Instagram", external: true },
  { href: "https://youtube.com/colivingcait", label: "YouTube", external: true },
  { href: "https://facebook.com/colivingcait", label: "Facebook", external: true },
  { href: "https://www.linkedin.com/in/coliving-cait/", label: "LinkedIn", external: true },
  { href: "https://tiktok.com/@colivingcait", label: "TikTok", external: true },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal px-8 lg:px-[60px] border-t border-white/[0.04]">
      <div className="mx-auto grid w-full max-w-[1320px] gap-10 py-14 md:gap-[60px] md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="font-heading text-xl font-normal text-white hover:opacity-70 transition-opacity inline-block"
          >
            Coliving<em className="italic font-light text-gold-light">Cait</em>
          </Link>
          <p className="mt-3 max-w-[280px] text-[13px] leading-[1.6] text-warmgray">
            Helping women build wealth through intentional coliving. Atlanta-based investor, coach, and Keller Williams Realtor.
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-[10px] font-medium uppercase tracking-[0.15em] text-gold">
            Navigate
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {navigate.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[13px] text-warmgray-light hover:text-white transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-[10px] font-medium uppercase tracking-[0.15em] text-gold">
            Connect
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {connect.map((l) =>
              l.external ? (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-warmgray-light hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-warmgray-light hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-2 border-t border-white/[0.06] py-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <span className="text-[11px] text-warmgray">
          © 2026 Coliving Cait · Lustra House LLC
        </span>
        <a
          href="mailto:colivingcait@gmail.com"
          className="text-[11px] text-warmgray-light hover:text-gold transition-colors duration-200"
        >
          colivingcait@gmail.com
        </a>
      </div>
    </footer>
  );
}
