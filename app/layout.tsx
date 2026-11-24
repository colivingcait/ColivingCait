import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import Analytics from "@/components/Analytics";
import { DEFAULT_OG_IMAGE, SITE, SITE_URL } from "@/lib/site";
import JsonLd, {
  graph,
  personSchema,
  businessSchema,
  houseHackingOrgSchema,
  websiteSchema,
} from "@/components/JsonLd";

// Brand fonts loaded once at the root and exposed via CSS variables so they
// can be referenced by Tailwind's font-heading / font-sans utilities.
// Self-hosted from app/fonts (the Latin variable-font files Google Fonts
// serves) so builds never depend on fetching from Google: a bad Google
// response crashes next/font/google in Next 14.
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "300 600", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic-latin.woff2", weight: "300 600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/dm-sans-italic-latin.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Caitlyn Verdugo — Atlanta Realtor & Real Estate Investor | Coliving Cait",
    // Page-level titles are written standalone; this appends the brand.
    template: "%s | Coliving Cait",
  },
  description:
    "Atlanta Realtor and real estate investor helping you build wealth one door at a time — coliving, house hacking, investment properties, and buying or selling your home.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE_URL,
    title:
      "Caitlyn Verdugo — Atlanta Realtor & Real Estate Investor | Coliving Cait",
    description:
      "Helping you build wealth one door at a time. Coliving, house hacking, investment properties, and buying or selling across metro Atlanta.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caitlyn Verdugo — Atlanta Realtor & Real Estate Investor",
    description:
      "Helping you build wealth one door at a time. Coliving, house hacking, and investment real estate in metro Atlanta.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-white text-warmgray">
        <JsonLd
          data={graph(personSchema, businessSchema, houseHackingOrgSchema, websiteSchema)}
        />
        <Analytics />
        <AuthProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
