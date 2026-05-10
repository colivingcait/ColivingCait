import type { Course } from "./types";
import { coliving101 } from "./coliving-101";

// All courses in the catalog. Two are stubs awaiting full content. The
// stubs render on /courses but route nowhere — `status: "coming-soon"`.
export const courses: Course[] = [
  coliving101,
  {
    slug: "house-hacking-101",
    title: "House Hacking 101",
    tagline: "The cheat code for first-time investors.",
    description:
      "Six lessons on every major house-hacking strategy — spare bedroom, basement / ADU, coliving house hack, and small multifamily.",
    longDescription:
      "Coming soon — full course content in production.",
    price: 99,
    status: "coming-soon",
    symbol: "⌂",
    outcomes: [
      "Understand all four house-hack types",
      "Project your effective monthly housing cost",
      "Manage tenants when you live in the property",
      "Plan your exit and roll into the next deal",
    ],
    audience: [
      "First-time buyers exploring owner-occupied investing",
      "House-hack curious folks figuring out which type fits",
      "Anyone planning to scale from house hack to portfolio",
    ],
    lessons: [],
  },
  {
    slug: "real-estate-101",
    title: "Real Estate Investing 101",
    tagline: "Every way to invest in residential real estate.",
    description:
      "Six lessons on the eight major residential investing strategies — and how to choose your first move.",
    longDescription:
      "Coming soon — full course content in production.",
    price: 99,
    status: "coming-soon",
    symbol: "$",
    outcomes: [
      "Understand 8 residential investing strategies end-to-end",
      "Pick the right first strategy for your life",
      "Run any deal through a 4-metric framework",
      "Avoid the 7 mistakes that cost first-time investors most",
    ],
    audience: [
      "Anyone considering real estate as their first investment",
      "Investors deciding which strategy to commit to",
      "Folks who want a high-level overview before going deep",
    ],
    lessons: [],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = index > 0 ? course.lessons[index - 1] : null;
  const next =
    index < course.lessons.length - 1 ? course.lessons[index + 1] : null;
  return { course, lesson, prev, next, index };
}
