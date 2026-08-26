import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/auth/",
        // Course sales pages live at /courses/<slug> and stay indexable.
        // Everything one level deeper — lessons and the overview map — is
        // paywalled, so crawling it only ever reaches the gate.
        "/courses/*/",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
