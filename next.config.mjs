import { readFileSync } from "node:fs";
import { legacyPropertyRedirects } from "./lib/legacy-property-paths.mjs";

/** @type {import('next').NextConfig} */
const CRM = process.env.CRM_ORIGIN ?? "https://crm.callcaitlyn.com";

// PostHog analytics go through /ingest on this domain, so ad blockers that
// block PostHog's own domain don't drop events. Region from posthog-config.
const posthogRegion = JSON.parse(
  readFileSync(new URL("./lib/posthog-config.json", import.meta.url), "utf8"),
).region === "eu" ? "eu" : "us";
const POSTHOG_INGEST = process.env.POSTHOG_INGEST_ORIGIN ?? `https://${posthogRegion}.i.posthog.com`;
const POSTHOG_ASSETS = process.env.POSTHOG_ASSETS_ORIGIN ?? `https://${posthogRegion}-assets.i.posthog.com`;

const nextConfig = {
  reactStrictMode: true,
  // PostHog's API paths end in "/", which Next would otherwise redirect.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return legacyPropertyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  // Private audit intake pages: never indexed or cached, and their URL (the
  // lead's only key) is never sent to other sites as a referrer.
  async headers() {
    return [
      {
        source: "/audit/intake/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // No app, pages, or public file serves /listings, /listing, /book,
  // /crm-static, or /icon.svg, so the default afterFiles phase is enough
  // for these to win. /listing stays as a safety net for CRM card links
  // that still point at the singular path.
  async rewrites() {
    return [
      { source: "/listings", destination: `${CRM}/public-listings` },
      {
        source: "/listings/:path*",
        destination: `${CRM}/public-listings/:path*`,
      },
      { source: "/listing", destination: `${CRM}/public-listings` },
      {
        source: "/listing/:path*",
        destination: `${CRM}/public-listings/:path*`,
      },
      { source: "/book", destination: `${CRM}/public-book` },
      { source: "/book/:path*", destination: `${CRM}/public-book/:path*` },
      {
        source: "/crm-static/:path+",
        destination: `${CRM}/crm-static/:path+`,
      },
      { source: "/icon.svg", destination: `${CRM}/icon.svg` },
      { source: "/ingest/static/:path*", destination: `${POSTHOG_ASSETS}/static/:path*` },
      { source: "/ingest/:path*", destination: `${POSTHOG_INGEST}/:path*` },
      // Standalone sample portfolio audit, served as-is from public/.
      { source: "/audit", destination: "/audit/index.html" },
    ];
  },
};

export default nextConfig;
