/** @type {import('next').NextConfig} */
const CRM = process.env.CRM_ORIGIN ?? "https://crm.callcaitlyn.com";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // No app, pages, or public routes exist for /listings, /book, or
  // /crm-static, so the default afterFiles phase is enough for these to win.
  async rewrites() {
    return [
      { source: "/listings", destination: `${CRM}/public-listings` },
      {
        source: "/listings/:path*",
        destination: `${CRM}/public-listings/:path*`,
      },
      { source: "/book", destination: `${CRM}/public-book` },
      { source: "/book/:path*", destination: `${CRM}/public-book/:path*` },
      {
        source: "/crm-static/:path+",
        destination: `${CRM}/crm-static/:path+`,
      },
    ];
  },
};

export default nextConfig;
