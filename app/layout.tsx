import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ConditionalFooter from "@/components/ConditionalFooter";
import AuthProvider from "@/components/AuthProvider";

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
  metadataBase: new URL("https://colivingcait.com"),
  title: {
    default: "Coliving Cait — Building wealth through intentional coliving",
    template: "%s — Coliving Cait",
  },
  description:
    "Caitlyn Verdugo is an Atlanta-based coliving investor, Realtor, and women's coliving coach helping women build wealth through real estate.",
  icons: {
    icon: "/images/colivingcait-favicon.png",
    shortcut: "/images/colivingcait-favicon.png",
    apple: "/images/colivingcait-favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Coliving Cait",
    title: "Real estate education and community — built by women, for women.",
    description:
      "Courses, coaching, and community for women building wealth through real estate.",
    url: "https://colivingcait.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coliving Cait — Helping women build wealth through intentional coliving",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real estate education and community — built by women, for women.",
    description:
      "Courses, coaching, and community for women building wealth through real estate.",
    images: [
      "/og-image.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4487692104845796');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4487692104845796&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="bg-white text-warmgray">
        <AuthProvider>
          <Nav />
          <main>{children}</main>
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
