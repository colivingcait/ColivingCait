import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Link from "next/link";
import { courses, getCourse } from "@/lib/courses";

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
    title: `${course.title} — Coliving Cait`,
    description: course.description,
  };
}

// Course landing — curriculum overview, who it's for, what you'll walk
// away with, and a CTA into the first lesson.
export default async function CourseLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.status !== "available") {
    notFound();
  }

  const firstLesson = course.lessons[0];

  return (
    <>
      {/* Hero */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">
                Mini course · ${course.price}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading level={1} size="xl" className="text-cream">
                {course.title} —{" "}
                <em
                  className="text-gold-light"
                >
                  {course.tagline.toLowerCase()}
                </em>
              </Heading>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-xl">
                {course.longDescription}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8">
                <Button
                  href={`/courses/${course.slug}/${firstLesson.slug}`}
                  variant="primary"
                  size="lg"
                  magnetic
                >
                  Get started →
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Course metadata */}
          <Reveal delay={0.3}>
            <div className="md:pl-12 md:border-l md:border-cream/15 grid grid-cols-2 md:grid-cols-1 gap-6">
              {course.modules && course.modules.length > 0 ? (
                <CourseMeta label="Modules" value={`${course.modules.length}`} />
              ) : null}
              <CourseMeta label="Lessons" value={`${course.lessons.length} self-paced`} />
              <CourseMeta
                label="Total time"
                value="2–3 hours of course content"
              />
              <CourseMeta
                label="Quizzes"
                value={`${course.lessons.filter((l) => l.quiz.length > 0).length} module quizzes`}
              />
              <CourseMeta label="Access" value="Lifetime" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What you'll walk away with */}
      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">By the end</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading size="lg">
                What you&apos;ll <em>walk away with.</em>
              </Heading>
            </Reveal>
          </div>
          <Stagger className="grid gap-4" stagger={0.06}>
            {course.outcomes.map((o) => (
              <StaggerItem key={o}>
                <p className="flex gap-4 text-warmgray leading-body text-[1.0625rem] border-t border-brand pt-4">
                  <span className="text-gold mt-1">✦</span>
                  <span>{o}</span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Curriculum */}
      <Section tone="blush">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Curriculum</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              {course.modules && course.modules.length > 0 ? (
                <>
                  Six modules. <em>Twenty-three lessons.</em>
                </>
              ) : (
                <>
                  Six lessons. <em>One model.</em>
                </>
              )}
            </Heading>
          </Reveal>
        </div>

        {course.modules && course.modules.length > 0 ? (
          <div className="mt-14 space-y-12">
            {/* Welcome lessons (moduleNumber === 0) render above the
                module groupings — no module number, marked "Start here". */}
            {course.lessons
              .filter((l) => l.moduleNumber === 0)
              .map((lesson) => (
                <Reveal key={lesson.slug}>
                  <Link
                    href={`/courses/${course.slug}/${lesson.slug}`}
                    className="group block border border-gold bg-cream p-5 md:p-6 hover:bg-gold/[0.04] transition-colors"
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
                      <span className="text-[10px] uppercase tracking-eyebrow text-gold whitespace-nowrap">
                        ✦ Start here
                      </span>
                      <div className="min-w-0">
                        <p className="font-heading text-lg md:text-xl leading-heading">
                          {lesson.title}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-eyebrow text-gold whitespace-nowrap">
                        {lesson.duration}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            {course.modules.map((mod) => {
              const modLessons = course.lessons.filter(
                (l) => l.moduleNumber === mod.number,
              );
              return (
                <div key={mod.slug}>
                  <Reveal>
                    <div className="grid grid-cols-[auto_1fr] gap-5 md:gap-7 items-baseline mb-5">
                      <span className="font-heading text-2xl md:text-3xl text-gold leading-none tabular-nums">
                        {String(mod.number).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-1">
                          Module {mod.number}
                        </p>
                        <p className="font-heading text-xl md:text-2xl leading-heading">
                          {mod.title}
                        </p>
                        {mod.summary && (
                          <p className="mt-2 text-sm text-warmgray leading-body max-w-2xl">
                            {mod.summary}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                  {modLessons.length === 0 ? (
                    <Reveal delay={0.1}>
                      <div className="md:ml-12 border border-dashed border-brand/60 bg-cream/40 p-5 md:p-6 text-sm text-warmgray italic">
                        Lessons coming soon — phase 2 build.
                      </div>
                    </Reveal>
                  ) : (
                    <Stagger className="md:ml-12 space-y-3" stagger={0.05}>
                      {modLessons.map((lesson) => {
                        const isQuiz = lesson.kind === "module-quiz";
                        return (
                          <StaggerItem key={lesson.slug}>
                            <Link
                              href={`/courses/${course.slug}/${lesson.slug}`}
                              className={
                                isQuiz
                                  ? "group block border border-gold bg-gold/[0.06] p-5 md:p-6 hover:bg-gold/[0.10] transition-colors"
                                  : "group block border border-brand bg-cream p-5 md:p-6 hover:border-gold transition-colors"
                              }
                            >
                              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
                                {isQuiz ? (
                                  <span className="font-heading text-2xl md:text-3xl text-gold leading-none">
                                    ✦
                                  </span>
                                ) : (
                                  <span className="font-heading text-2xl md:text-3xl text-gold/60 leading-none tabular-nums">
                                    {String(lesson.moduleLessonNumber).padStart(2, "0")}
                                  </span>
                                )}
                                <div className="min-w-0">
                                  {isQuiz && (
                                    <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-1">
                                      Module quiz · {lesson.quiz.length} questions
                                    </p>
                                  )}
                                  <p className="font-heading text-lg md:text-xl leading-heading">
                                    {lesson.title}
                                  </p>
                                </div>
                                <span className="text-[10px] uppercase tracking-eyebrow text-gold whitespace-nowrap">
                                  {lesson.duration}
                                </span>
                              </div>
                            </Link>
                          </StaggerItem>
                        );
                      })}
                    </Stagger>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <Stagger className="mt-14 space-y-3" stagger={0.05}>
            {course.lessons.map((lesson) => (
              <StaggerItem key={lesson.slug}>
                <Link
                  href={`/courses/${course.slug}/${lesson.slug}`}
                  className="group block border border-brand bg-cream p-5 md:p-6 hover:border-gold transition-colors"
                >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
                    <span className="font-heading text-3xl md:text-4xl text-gold/60 leading-none tabular-nums">
                      {String(lesson.number).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading text-lg md:text-xl leading-heading">
                        {lesson.title}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-eyebrow text-gold whitespace-nowrap">
                      {lesson.duration}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>

      {/* Audience */}
      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">Who it&apos;s for</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading size="lg">
                Built <em>for women.</em>
              </Heading>
            </Reveal>
          </div>
          <Stagger className="grid gap-4" stagger={0.06}>
            {course.audience.map((a) => (
              <StaggerItem key={a}>
                <p className="flex gap-4 text-warmgray leading-body text-[1.0625rem] border-t border-brand pt-4">
                  <span className="text-gold mt-1">✦</span>
                  <span>{a}</span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">Ready</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="xl" className="text-cream">
              {course.modules && course.modules.length > 0 ? (
                <>
                  {course.modules.length} modules. ${course.price}.{" "}
                  <em className="text-gold-light">Lifetime access.</em>
                </>
              ) : (
                <>
                  {course.lessons.length} lessons. ${course.price}.{" "}
                  <em className="text-gold-light">Lifetime access.</em>
                </>
              )}
            </Heading>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/70 leading-body max-w-xl mx-auto">
              Start with lesson 01 right now — no checkout while we&apos;re
              in development. The Stripe paywall will be added before
              public launch.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <Button
                href={`/courses/${course.slug}/${firstLesson.slug}`}
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
    </>
  );
}

function CourseMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
        {label}
      </p>
      <p className="font-heading text-xl md:text-2xl text-cream leading-heading">
        {value}
      </p>
    </div>
  );
}
