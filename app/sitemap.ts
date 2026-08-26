import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";
import { absoluteUrl } from "@/lib/site";

// Marketing routes, ordered roughly by priority. Paywalled lesson routes are
// deliberately excluded — they sit behind CourseGate, so indexing them would
// only surface the paywall.
const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/buy-and-sell", changeFrequency: "monthly", priority: 0.9 },
  { path: "/what-is-coliving", changeFrequency: "monthly", priority: 0.9 },
  { path: "/learn", changeFrequency: "monthly", priority: 0.8 },
  { path: "/courses", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partner-with-me", changeFrequency: "monthly", priority: 0.8 },
  { path: "/calculator", changeFrequency: "monthly", priority: 0.7 },
  { path: "/calculator/coliving", changeFrequency: "yearly", priority: 0.7 },
  { path: "/calculator/pro-forma", changeFrequency: "yearly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/community", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Course sales pages are public; their lessons are not.
  const coursePages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: absoluteUrl(`/courses/${c.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...coursePages];
}
