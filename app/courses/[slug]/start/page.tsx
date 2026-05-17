import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { courses, getCourse } from "@/lib/courses";

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
    title: `Welcome to ${course.title} — Coliving Cait`,
    description: `Thanks for joining ${course.title}. Your course is unlocked — start with lesson 01.`,
    robots: { index: false, follow: false },
  };
}

// Post-purchase landing for an individual course. Stripe Payment Link's
// success URL should point here. Confirms purchase and points the buyer
// at lesson 01.
export default async function CourseWelcomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.status !== "available") notFound();

  const first = course.lessons[0];
  const lessonCount = course.lessons.filter(
    (l) => l.kind !== "module-quiz" && l.moduleNumber !== 0,
  ).length;
  const moduleCount = course.modules?.length ?? 6;

  return (
    <>
      {/* Hero */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">✦ You&apos;re in</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="xl" className="text-cream">
              Welcome to{" "}
              <em className="text-gold-light">{course.title}.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-2xl mx-auto">
              Your course is unlocked and yours for life. A receipt is
              on its way to your inbox. {moduleCount} modules,{" "}
              {lessonCount} lessons, quizzes, and worksheets — all
              self-paced.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <Button
                href={`/courses/${course.slug}/${first.slug}`}
                variant="primary"
                size="lg"
                magnetic
              >
                Start lesson 01 →
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Next steps */}
      <Section tone="cream">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">What&apos;s next</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              Take it at <em>your pace.</em>
            </Heading>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <div className="border-l-2 border-gold pl-5">
              <p className="font-heading text-lg text-charcoal leading-heading">
                Bookmark the course
              </p>
              <p className="mt-2 text-warmgray text-sm leading-body">
                Save{" "}
                <Link
                  href={`/courses/${course.slug}`}
                  className="text-gold-dark border-b border-brand hover:text-gold transition-colors"
                >
                  the course page
                </Link>{" "}
                — you can pick up where you left off any time.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-5">
              <p className="font-heading text-lg text-charcoal leading-heading">
                Questions or trouble?
              </p>
              <p className="mt-2 text-warmgray text-sm leading-body">
                Email{" "}
                <a
                  href="mailto:hello@colivingcait.com"
                  className="text-gold-dark border-b border-brand hover:text-gold transition-colors"
                >
                  hello@colivingcait.com
                </a>{" "}
                and I&apos;ll sort it within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
