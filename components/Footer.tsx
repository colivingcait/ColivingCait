import Link from "next/link";
import Eyebrow from "./Eyebrow";

// Footer: charcoal background, gold accents, four columns on desktop
// collapsing to a single column on mobile. Mirrors brand voice and CTAs.
const explore = [
  { href: "/about", label: "About" },
  { href: "/what-is-coliving", label: "What Is Coliving" },
  { href: "/get-coaching", label: "Get Coaching" },
  { href: "/partner-with-me", label: "Partner With Me" },
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/community", label: "Community" },
];

const tools = [
  { href: "/calculator", label: "Calculators" },
  { href: "/courses", label: "Mini Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Free Resources" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand block */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-heading text-3xl tracking-tight text-cream"
            >
              Coliving <span className="italic text-gold">Cait</span>
            </Link>
            <p className="mt-4 text-sm text-warmgray leading-body">
              Building wealth through intentional coliving — for women
              ready to invest in real estate.
            </p>
            <p className="mt-6 text-sm text-cream/80">
              Atlanta metro · Decatur, GA<br />
              Keller Williams Metro Atlanta
            </p>
          </div>

          {/* Explore */}
          <div>
            <Eyebrow className="mb-4">Explore</Eyebrow>
            <ul className="space-y-2">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/90 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <Eyebrow className="mb-4">Tools</Eyebrow>
            <ul className="space-y-2">
              {tools.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/90 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <Eyebrow className="mb-4">Connect</Eyebrow>
            <ul className="space-y-2 text-sm text-cream/90">
              <li>
                <a
                  href="mailto:colivingcait@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  colivingcait@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/colivingcait"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Instagram · @colivingcait
                </a>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-gold transition-colors"
                >
                  She Leads Coliving
                </Link>
              </li>
              <li>
                <Link
                  href="/summit"
                  className="hover:text-gold transition-colors"
                >
                  Women&apos;s Coliving Summit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-brand pt-8 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} Coliving Cait. All rights reserved.</p>
          <p className="italic font-heading text-gold-light">
            There&apos;s a seat at this table for you.
          </p>
        </div>
      </div>
    </footer>
  );
}
