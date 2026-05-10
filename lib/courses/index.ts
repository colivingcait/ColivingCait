import type { Course } from "./types";
import { coliving101 } from "./coliving-101";
import { houseHacking101 } from "./house-hacking-101";
import { realEstate101 } from "./real-estate-101";

// All three courses in the catalog are now fully written.
export const courses: Course[] = [
  coliving101,
  houseHacking101,
  realEstate101,
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
