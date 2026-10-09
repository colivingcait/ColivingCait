import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Link from "next/link";
import { BUNDLE_PRICE_USD, courses } from "@/lib/courses";
import { cn } from "@/lib/cn";
import BuyButton from "@/components/courses/BuyButton";

export const metadata = {
  title: "Real Estate Investing Mini Courses",
  description:
    "Three self-paced mini courses on coliving, house hacking, and real estate investing. $49 each, $99 bundle. Lifetime access. Module quizzes included.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Real Estate Investing Mini Courses",
    description:
      "Three self-paced mini courses on coliving, house hacking, and real estate investing. $49 each, $99 bundle. Lifetime access. Module quizzes included.",
    url: "/courses",
  },
};

// Course marketplace — three cards at the individual course price, plus the bundle.
export default function CoursesPage() {
  const coursePrice = courses[0]?.price ?? 49;

  return (
    <>
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">
              ✦ Mini courses
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="display" className="text-cream">
              Learn it on <em className="text-gold-light">your time.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 inline-flex items-baseline gap-3 text-cream/85">
              <span className="font-heading text-3xl md:text-4xl text-gold-light">
                ${coursePrice} each
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-2xl mx-auto">
              Three self-paced courses on coliving, house hacking, and
              real estate investing. Bundle all three for ${BUNDLE_PRICE_USD} —
              lifetime access, module quizzes included.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream">
        <Stagger
          className="grid gap-6 md:grid-cols-3 items-stretch"
          stagger={0.1}
        >
          {courses.map((c) => (
            <StaggerItem key={c.slug}>
              <CourseCard course={c} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <div
            id="bundle"
            className="mt-12 border border-gold bg-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          >
            <div>
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-2">
                Bundle
              </p>
              <p className="font-heading text-2xl text-charcoal">
                All three courses
              </p>
              <p className="mt-2 text-sm text-warmgray max-w-md">
                Coliving 101, House Hacking 101, and Real Estate Investing
                101. Lifetime access, module quizzes included.
              </p>
            </div>
            <div className="flex items-center gap-5 shrink-0">
              <p className="font-heading text-4xl text-charcoal leading-none">
                ${BUNDLE_PRICE_USD}
              </p>
              <BuyButton
                courseSlug="bundle"
                className="bg-charcoal text-cream px-8 py-3 text-sm uppercase tracking-eyebrow hover:bg-charcoal/90 transition-colors"
              >
                Get the bundle
              </BuyButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-xs text-warmgray/70 italic">
            ✦ Course unlocks immediately after checkout. Lifetime access
            includes all future updates.
          </p>
        </Reveal>
      </Section>
    </>
  );
}

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const isAvailable = course.status === "available";
  const inner = (
    <div
      className={cn(
        "group relative h-full flex flex-col border p-8 md:p-10 transition-all duration-300",
        isAvailable
          ? "border-brand bg-cream hover:border-gold hover:shadow-[0_20px_60px_-20px_rgba(196,149,90,0.35)] hover:-translate-y-1.5"
          : "border-brand bg-cream/60 opacity-75",
      )}
    >
      {isAvailable && (
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
        />
      )}

      <p className="text-3xl text-gold mb-5">{course.symbol}</p>
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        Mini course
      </p>
      <Heading level={3} size="sm">
        {course.title}
      </Heading>
      <p className="mt-2 text-xs uppercase tracking-button text-warmgray">
        {course.tagline}
      </p>

      <p className="mt-5 text-warmgray text-sm leading-body flex-1">
        {course.description}
      </p>

      <div className="mt-8 pt-6 border-t border-brand flex items-baseline justify-between">
        <p className="font-heading text-4xl text-charcoal leading-none">
          ${course.price}
        </p>
        <p className="text-xs uppercase tracking-button">
          {isAvailable ? (
            <span className="text-gold link-underline inline-block">
              Start course →
            </span>
          ) : (
            <span className="text-warmgray/60">Coming soon</span>
          )}
        </p>
      </div>
    </div>
  );

  if (!isAvailable) return inner;
  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
