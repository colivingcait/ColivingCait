import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Link from "next/link";
import { courses, getCourse } from "@/lib/courses";

const STRIPE_CHECKOUT: Record<string, string> = {
  "coliving-101": "https://buy.stripe.com/8x29AU5D13qf7SYbdIaZi01",
  "house-hacking-101": "https://buy.stripe.com/aFaaEYaXl1i7c9edlQaZi02",
  "real-estate-101": "https://buy.stripe.com/9B6fZi3uTf8X8X25ToaZi03",
};

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
  const ogImage = `/api/og?title=${encodeURIComponent(course.title)}&eyebrow=${encodeURIComponent(`Mini course · $${course.price}`)}&subtitle=${encodeURIComponent(course.tagline)}`;
  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} — Coliving Cait`,
      description: course.description,
      url: `https://colivingcait.com/courses/${course.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} — Coliving Cait`,
      description: course.description,
      images: [ogImage],
    },
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
  const checkoutUrl = STRIPE_CHECKOUT[course.slug];

  return (
    <>
      {/* Hero */}
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">
                ✦ Mini course ·{" "}
                {course.originalPrice ? (
                  <>
                    <span className="line-through text-cream/40">
                      ${course.originalPrice}
                    </span>{" "}
                    <span className="text-gold-light">${course.price}</span>{" "}
                    · Limited time
                  </>
                ) : (
                  <>${course.price}</>
                )}
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
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <Button
                  href={checkoutUrl ?? `/courses/${course.slug}/${firstLesson.slug}`}
                  variant="primary"
                  size="lg"
                  magnetic
                >
                  Buy Now — ${course.price}
                </Button>
                <Link
                  href={`/courses/${course.slug}/${firstLesson.slug}`}
                  className="text-[11px] uppercase tracking-button text-cream/70 hover:text-gold-light transition-colors"
                >
                  Preview lesson 01 →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Course metadata — counts only "regular" module lessons
              (i.e. excludes the welcome + module-quiz entries) so the
              numbers match the marketing copy. */}
          <Reveal delay={0.3}>
            <div className="md:pl-12 md:border-l md:border-cream/15 grid grid-cols-2 md:grid-cols-1 gap-6">
              {course.modules && course.modules.length > 0 ? (
                <CourseMeta label="Modules" value={`${course.modules.length}`} />
              ) : null}
              <CourseMeta
                label="Lessons"
                value={`${
                  course.lessons.filter(
                    (l) => l.kind !== "module-quiz" && l.moduleNumber !== 0,
                  ).length
                } self-paced`}
              />
              <CourseMeta
                label="Total time"
                value="2–3 hours of course content"
              />
              <CourseMeta
                label="Quizzes"
                value={`${
                  course.lessons.filter((l) => l.kind === "module-quiz").length
                } module quizzes`}
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

      {/* Curriculum — module-level summary only. The full
          lesson-by-lesson list lives on /courses/[slug]/overview for
          enrolled learners. */}
      <Section tone="blush">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">Curriculum</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading size="md">
              {course.modules && course.modules.length > 0 ? (
                <>
                  Six modules.{" "}
                  <em>
                    {
                      course.lessons.filter(
                        (l) =>
                          l.kind !== "module-quiz" && l.moduleNumber !== 0,
                      ).length
                    }{" "}
                    lessons.
                  </em>
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
          <Stagger className="mt-14 grid gap-4 md:grid-cols-2" stagger={0.05}>
            {course.modules.map((mod) => {
              const modLessons = course.lessons.filter(
                (l) =>
                  l.moduleNumber === mod.number && l.kind !== "module-quiz",
              );
              const hasQuiz = course.lessons.some(
                (l) =>
                  l.moduleNumber === mod.number && l.kind === "module-quiz",
              );
              return (
                <StaggerItem key={mod.slug}>
                  <div className="h-full flex flex-col border border-brand bg-cream p-6 md:p-7">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-heading text-3xl md:text-4xl text-gold/70 leading-none tabular-nums">
                        {String(mod.number).padStart(2, "0")}
                      </span>
                      <p className="text-[10px] uppercase tracking-eyebrow text-gold">
                        Module {mod.number}
                      </p>
                    </div>
                    <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal">
                      {mod.title}
                    </p>
                    {mod.summary && (
                      <p className="mt-3 text-sm md:text-[15px] text-warmgray leading-body flex-1">
                        {mod.summary}
                      </p>
                    )}
                    <p className="mt-5 pt-4 border-t border-brand/40 text-[10px] uppercase tracking-eyebrow text-warmgray/70">
                      {modLessons.length > 0
                        ? `${modLessons.length} ${modLessons.length === 1 ? "lesson" : "lessons"}`
                        : "Coming soon"}
                      {hasQuiz && " · module quiz"}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
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
                Who this <em>is for.</em>
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
              {course.originalPrice ? (
                <>
                  <span className="line-through text-cream/40">
                    ${course.originalPrice}
                  </span>{" "}
                  <span className="text-gold-light">${course.price}</span>.{" "}
                  <em className="text-gold-light">Lifetime access.</em>
                </>
              ) : (
                <>
                  ${course.price}.{" "}
                  <em className="text-gold-light">Lifetime access.</em>
                </>
              )}
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[10px] uppercase tracking-eyebrow text-gold-light">
              ✦ Limited-time launch pricing
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-cream/70 leading-body max-w-xl mx-auto">
              Secure checkout via Stripe. You&apos;ll get instant access to
              every lesson, quiz, and worksheet — yours for life.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10">
              <Button
                href={checkoutUrl ?? `/courses/${course.slug}/${firstLesson.slug}`}
                variant="primary"
                size="lg"
                magnetic
              >
                Buy Now — ${course.price}
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
