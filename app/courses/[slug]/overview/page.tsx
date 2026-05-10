import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import CourseOverviewMap from "@/components/courses/CourseOverviewMap";

// Pre-generate static params for every available course
export async function generateStaticParams() {
  return courses
    .filter((c) => c.status === "available")
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} · Course overview — Coliving Cait`,
    description: `Course map for ${course.title}. Track your progress, jump to any lesson, and pick up where you left off.`,
  };
}

// Course overview — learner-focused course map. Shows every lesson in
// order, grouped by module, with completion checkmarks + a "Continue"
// CTA pointing to the next un-completed lesson. Distinct from the
// marketing-oriented /courses/[slug] landing page; this is what
// learners use to orient themselves between sessions.
export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.status !== "available") {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 md:px-10 py-12 md:py-20">
      <CourseOverviewMap course={course} />
    </div>
  );
}
