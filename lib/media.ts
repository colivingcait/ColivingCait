// Public media appearances for /about and Person JSON-LD.
// A Talk can be added to `talks` later (National Co-Living Conference).
// An empty talks list renders nothing — no placeholder card.

export type MediaKind = "Podcast" | "Video" | "Talk";

export type MediaAppearance = {
  kind: MediaKind;
  /** Eyebrow: show name, or "Video" / "Talk". */
  eyebrow: string;
  title: string;
  /** One line we wrote. Not a show-notes paste. */
  description: string;
  href: string;
  /** ISO date when the episode or video was published. */
  datePublished?: string;
  /** Podcast series name, for PodcastEpisode.partOfSeries. */
  series?: string;
};

const podcasts: MediaAppearance[] = [
  {
    kind: "Podcast",
    eyebrow: "The Co-Living Show",
    series: "The Co-Living Show",
    title: "CoLiving Cait: The Systems, The Stories, The Reality",
    description:
      "Feb 18, 2026. With Craig Curelop and Miller McSwain, on operating coliving in Atlanta.",
    href: "https://www.youtube.com/watch?v=zLzDu55h3-Q",
    datePublished: "2026-02-18",
  },
  {
    kind: "Podcast",
    eyebrow: "CoLivingiQ",
    series: "CoLivingiQ",
    title:
      "Realtor and CoLiving Investor Caitlyn Verdugo shares her best CoLiving Tips",
    description: "Aug 28, 2025. Coliving tips with host Quentin Wendt.",
    href: "https://podcasts.apple.com/us/podcast/realtor-and-coliving-investor-caitlyn-verdugo-shares/id1826607374?i=1000723867073",
    datePublished: "2025-08-28",
  },
  {
    kind: "Podcast",
    eyebrow: "Coliving Cashflow",
    series: "Coliving Cashflow",
    title: "How Coliving Changed Caitlyn Verdugo's Life & Real Estate Career",
    description:
      "Sep 24, 2025. Clara Arroyave interviews Caitlyn on coliving and her real estate career.",
    href: "https://www.youtube.com/watch?v=8Vo10ARJKGQ",
    datePublished: "2025-09-24",
  },
  {
    kind: "Podcast",
    eyebrow: "CoLiving Investing Podcast",
    series: "CoLiving Investing Podcast",
    title: "Women Leading the Future of Coliving",
    description:
      "Jun 25, 2026. A roundtable live from the Women's Coliving Retreat in Estes Park, Colorado.",
    href: "https://www.buzzsprout.com/2567855/episodes/19399212-women-leading-the-future-of-coliving-live-from-the-women-s-coliving-retreat-in-estes-park-colorado",
    datePublished: "2026-06-25",
  },
];

const videos: MediaAppearance[] = [
  {
    kind: "Video",
    eyebrow: "Video",
    title: "Atlanta Women Investors Meetup: House Hacking Panel",
    description:
      "Sep 2, 2026. Four investors on getting started with house hacking in metro Atlanta.",
    href: "https://www.youtube.com/watch?v=xgLVvu7x7dQ",
    datePublished: "2026-09-02",
  },
  {
    kind: "Video",
    eyebrow: "Video",
    title: "From Cockroaches to Cashflow: My Coliving Origin Story",
    description: "Apr 12, 2026. Caitlyn's coliving origin story.",
    href: "https://www.youtube.com/watch?v=eKEtQeCaPEs",
    datePublished: "2026-04-12",
  },
];

const talks: MediaAppearance[] = [
  {
    kind: "Talk",
    eyebrow: "Talk",
    title: "National Co-Living Conference",
    description: "Caitlyn's presentation at the National Co-Living Conference.",
    href: "https://drive.google.com/file/d/1g76bq9uVhGxUH0yOgULyq80WFY9ioIaJ/view?usp=sharing&t=900",
  },
];

export const mediaAppearances: MediaAppearance[] = [
  ...podcasts,
  ...videos,
  ...talks,
].filter((item) => item.href);

export function mediaAction(kind: MediaKind): "Listen" | "Watch" {
  return kind === "Podcast" ? "Listen" : "Watch";
}

/** PodcastEpisode / VideoObject nodes for Person.subjectOf. */
export function mediaCreativeWorks() {
  return mediaAppearances.map((item) => {
    if (item.kind === "Podcast") {
      return {
        "@type": "PodcastEpisode",
        name: item.title,
        description: item.description,
        url: item.href,
        ...(item.datePublished ? { datePublished: item.datePublished } : {}),
        ...(item.series
          ? { partOfSeries: { "@type": "PodcastSeries", name: item.series } }
          : {}),
      };
    }
    return {
      "@type": "VideoObject",
      name: item.title,
      description: item.description,
      url: item.href,
      ...(item.datePublished ? { uploadDate: item.datePublished } : {}),
    };
  });
}
