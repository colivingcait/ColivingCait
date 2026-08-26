import { SITE, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Renders a JSON-LD block. Schema graphs are static, author-controlled data,
 * so dangerouslySetInnerHTML is the standard (and only) way to emit them —
 * but `<` is still escaped so a stray sequence can't close the script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// Stable @ids so every page's nodes reference one canonical entity rather
// than declaring a duplicate person/business per page.
export const PERSON_ID = `${SITE_URL}/#caitlyn`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.personName,
  url: SITE_URL,
  image: absoluteUrl("/images/caitlyn-yellow-blazer.jpg"),
  jobTitle: "Real Estate Investor, Realtor & Coach",
  worksFor: { "@id": BUSINESS_ID },
  email: `mailto:${SITE.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  knowsAbout: [
    "Coliving",
    "House hacking",
    "Real estate investing",
    "Rental property management",
    "Home buying",
    "Home selling",
  ],
  // Sister properties are the same operator — declaring them here is the
  // honest way to relate the domains without reciprocal link-building.
  sameAs: [...SITE.sameAs, ...SITE.sisterSites],
};

export const businessSchema = {
  "@type": "RealEstateAgent",
  "@id": BUSINESS_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  image: absoluteUrl("/images/caitlyn-yellow-blazer.jpg"),
  logo: absoluteUrl("/images/colivingcait-logo.png"),
  email: `mailto:${SITE.email}`,
  founder: { "@id": PERSON_ID },
  employee: { "@id": PERSON_ID },
  parentOrganization: { "@type": "Organization", name: SITE.brokerage },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
  knowsAbout: [
    "Coliving investment properties",
    "House hacking",
    "Investment property sales",
    "First-time home buyers",
  ],
  sameAs: [...SITE.sameAs, ...SITE.sisterSites],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE.name,
  publisher: { "@id": BUSINESS_ID },
};

/** Wraps nodes in a single @graph so entities cross-reference by @id. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Course node for a paid mini course sales page. */
export function courseSchema(course: {
  slug: string;
  title: string;
  description: string;
  price: number;
  lessons: Array<{ duration: string }>;
}) {
  // Lesson durations are authored as "12 min"; sum them into an ISO 8601
  // duration rather than guessing a workload.
  const minutes = course.lessons.reduce((total, lesson) => {
    const parsed = parseInt(lesson.duration, 10);
    return total + (Number.isNaN(parsed) ? 0 : parsed);
  }, 0);

  return {
    "@type": "Course",
    "@id": `${absoluteUrl(`/courses/${course.slug}`)}#course`,
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/courses/${course.slug}`),
    provider: { "@id": BUSINESS_ID },
    author: { "@id": PERSON_ID },
    inLanguage: "en-US",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/courses/${course.slug}`),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      ...(minutes > 0 ? { courseWorkload: `PT${minutes}M` } : {}),
    },
  };
}

/** Breadcrumb trail. Pass items in order, root first. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
