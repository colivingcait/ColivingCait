import Link from "next/link";
import { EVENTBRITE_ORGANIZER_URL, HOUSE_HACKING_URL } from "@/lib/site";

// Nico's approved site footer. /listings and /book are CRM rewrites, so they
// stay plain anchors — next/link would client-navigate inside this app.
const navigateA = [
  { href: "/about", label: "About" },
  { href: "/what-is-coliving", label: "What Is Coliving" },
  { href: "/learn", label: "Learn With Me" },
  { href: "/partner-with-me", label: "Partner With Me" },
];

const navigateB = [
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/listings", label: "Listings", plain: true },
  { href: "/community", label: "Community" },
  { href: "/calculator", label: "Calculators" },
];

function FooterLink({
  href,
  plain,
  children,
}: {
  href: string;
  plain?: boolean;
  children: React.ReactNode;
}) {
  if (plain) {
    return <a href={href}>{children}</a>;
  }
  return <Link href={href}>{children}</Link>;
}

function EqualHousingIcon() {
  // House-with-equals mark from the public-domain HUD Equal Housing insignia.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5.1 3.35 139.57 102.43"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M74.89 3.35 5.1 39.07v14.54l7.73.1v52.07h123.6l-.07-52.17h8.31V39.08L74.89 3.35zm47.77 88.68H26.58V45.72L74.89 20.8l47.77 24.92v46.31zM52.04 57.89h45.27V45.38H52.04v12.51zm0 22.49h45.07V67.87H52.04v12.51z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ftop">
        <Link href="/" className="brand">
          Coliving<em>Cait</em>
        </Link>
        <p>Helping you build wealth through real estate, one door at a time.</p>
      </div>

      <div className="grid g3">
        <div>
          <h4>Navigate</h4>
          <ul>
            {navigateA.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 aria-hidden="true">&nbsp;</h4>
          <ul>
            {navigateB.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href} plain={item.plain}>
                  {item.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="tel:+16788844494">678-884-4494</a>
            </li>
            <li>
              <a href="mailto:CV.SellsHomes@gmail.com">CV.SellsHomes@gmail.com</a>
            </li>
            <li>
              <a href={HOUSE_HACKING_URL} target="_blank" rel="noopener noreferrer">
                House Hacking Atlanta
              </a>
            </li>
            <li>
              <a href={EVENTBRITE_ORGANIZER_URL} target="_blank" rel="noopener noreferrer">
                Meetups on Eventbrite
              </a>
            </li>
          </ul>
          <a className="fbook" href="/book">
            BOOK A MEETING
          </a>
        </div>
      </div>

      <div className="broker">
        <img
          className="kwimg"
          src="/images/kw-metro-atlanta.png"
          alt="Keller Williams Realty Metro Atlanta"
        />
        <div className="btxt">
          <b>Keller Williams Realty Metro Atlanta</b>
          <span>Caitlyn Verdugo, Realtor® · Licensed in Georgia · 678-884-4494</span>
          <span>101 W Ponce de Leon Ave, Decatur, GA 30030 · Office 404-564-5560</span>
          <span className="ind">Each office is independently owned and operated.</span>
        </div>
        <div className="eho">
          <EqualHousingIcon />
          Equal Housing Opportunity
        </div>
      </div>

      <div className="legal">
        <span>© 2026 Coliving Cait</span>
        <span>Keller Williams Realty Metro Atlanta</span>
      </div>
    </footer>
  );
}
