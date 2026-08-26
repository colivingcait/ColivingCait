import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { SITE, SITE_URL } from "@/lib/site";
import JsonLd, { graph, personSchema, businessSchema, websiteSchema } from "@/components/JsonLd";

// Brand fonts loaded once at the root and exposed via CSS variables so they
// can be referenced by Tailwind's font-heading / font-sans utilities.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
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
    images: [{ url: "/images/caitlyn-yellow-blazer.jpg", width: 1200, height: 1600, alt: SITE.personName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caitlyn Verdugo — Atlanta Realtor & Real Estate Investor",
    description:
      "Helping you build wealth one door at a time. Coliving, house hacking, and investment real estate in metro Atlanta.",
    images: ["/images/caitlyn-yellow-blazer.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/images/colivingcait-favicon.png",
    shortcut: "/images/colivingcait-favicon.png",
    apple: "/images/colivingcait-favicon.png",
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
        <JsonLd data={graph(personSchema, businessSchema, websiteSchema)} />
        <AuthProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
