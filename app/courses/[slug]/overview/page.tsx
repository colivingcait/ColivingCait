import { notFound, redirect } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import CourseOverviewMap from "@/components/courses/CourseOverviewMap";
import { getCurrentUser, hasAccess } from "@/lib/auth/helpers";

export const dynamic = "force-dynamic";

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

// Course overview — gated behind purchase. Redirects to the course
// landing page if the user hasn't bought it.
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

  const user = await getCurrentUser();
  const purchased = user ? await hasAccess(user.id, slug) : false;

  if (!purchased) {
    redirect(`/courses/${slug}`);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 md:px-10 py-12 md:py-20">
      <CourseOverviewMap course={course} />
    </div>
  );
}
