import { notFound } from "next/navigation";
import LessonView from "@/components/courses/LessonView";
import CourseGate from "@/components/courses/CourseGate";
import { courses, getLesson } from "@/lib/courses";
import { getCurrentUser, hasAccess } from "@/lib/auth/helpers";

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

// Force dynamic rendering so auth checks run on every request
export const dynamic = "force-dynamic";

// Lesson page — checks purchase status before rendering content.
// If not purchased, shows the CourseGate paywall.
export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const data = getLesson(slug, lessonSlug);
  if (!data) notFound();

  // Check if user has access
  const user = await getCurrentUser();
  const purchased = user ? await hasAccess(user.id, slug) : false;

  // If not purchased, show the gate
  if (!purchased) {
    return (
      <CourseGate
        courseSlug={data.course.slug}
        courseTitle={data.course.title}
        price={data.course.price}
        originalPrice={data.course.originalPrice}
      />
    );
  }

  const isLastLesson = data.next === null;

  return (
    <LessonView
      course={data.course}
      lesson={data.lesson}
      prev={data.prev}
      next={data.next}
      isLastLesson={isLastLesson}
    />
  );
}
