import { notFound } from "next/navigation";
import LessonView from "@/components/courses/LessonView";
import { courses, getLesson } from "@/lib/courses";

// Pre-generate every (course, lesson) pair for available courses
export async function generateStaticParams() {
  const params: { slug: string; lesson: string }[] = [];
  for (const course of courses) {
    if (course.status !== "available") continue;
    for (const lesson of course.lessons) {
      params.push({ slug: course.slug, lesson: lesson.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const data = getLesson(slug, lessonSlug);
  if (!data) return {};
  return {
    title: `${data.lesson.title} — ${data.course.title}`,
    description: data.lesson.description,
  };
}

// Lesson page — server component shell that loads lesson data and hands
// off to the client LessonView for the interactive experience.
export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const data = getLesson(slug, lessonSlug);
  if (!data) notFound();

  return (
    <LessonView
      course={data.course}
      lesson={data.lesson}
      prev={data.prev}
      next={data.next}
    />
  );
}
