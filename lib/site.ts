// Canonical origin for the site. Set NEXT_PUBLIC_SITE_URL in the environment
// so a domain change is a one-line config edit rather than a code sweep —
// every canonical, sitemap entry, and JSON-LD @id is derived from this.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://colivingcait.com"
).replace(/\/$/, "");

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Business facts reused across metadata and structured data.
export const SITE = {
  name: "Coliving Cait",
  personName: "Caitlyn Verdugo",
  legalName: "Lustra House LLC",
  email: "colivingcait@gmail.com",
  brokerage: "Keller Williams",
  city: "Atlanta",
  region: "GA",
  regionName: "Georgia",
  country: "US",
  sameAs: ["https://instagram.com/colivingcait"],
  /** Sister sites — separate properties, same operator. */
  sisterSites: [
    "https://househackingatlanta.com",
    "https://atlantawomeninvestors.com",
  ],
  /** Metro-area service footprint, used for LocalBusiness areaServed. */
  areaServed: [
    "Atlanta, GA",
    "Decatur, GA",
    "DeKalb County, GA",
    "Stone Mountain, GA",
    "Snellville, GA",
    "Tucker, GA",
    "Brookhaven, GA",
  ],
} as const;
