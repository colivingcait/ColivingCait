import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Heading from "@/components/Heading";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Link from "next/link";
import { courses } from "@/lib/courses";
import { cn } from "@/lib/cn";

const OG_TITLE = "Learn it on your time.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(OG_TITLE)}&eyebrow=${encodeURIComponent("Mini Courses · $99 each")}`;

export const metadata = {
  title: "Mini Courses",
  description:
    "Three self-paced mini courses on coliving, house hacking, and real estate investing. $99 each, $149 bundle. Lifetime access. Module quizzes included.",
  openGraph: {
    title: "Mini Courses — Coliving Cait",
    description:
      "Three self-paced mini courses on coliving, house hacking, and real estate investing. $99 each, $149 bundle.",
    url: "https://colivingcait.com/courses",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Courses — Coliving Cait",
    description: "Three self-paced mini courses. Lifetime access.",
    images: [OG_IMAGE],
  },
};

// Course marketplace — three cards, $99 each ($149 bundle). Coliving 101
// and House Hacking 101 are live; Real Estate Investing 101 is a stub
// until its content lands.
export default function CoursesPage() {
  return (
    <>
      <Section tone="charcoal" className="relative grain overflow-hidden">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow className="mb-6">
              ✦ Limited time launch pricing
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading level={1} size="display" className="text-cream">
              Learn it on <em className="text-gold-light">your time.</em>
            </Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 inline-flex items-baseline gap-3 text-cream/85">
              <span className="text-cream/40 line-through text-2xl md:text-3xl">
                $149 each
              </span>
              <span className="font-heading text-3xl md:text-4xl text-gold-light">
                $99 each
              </span>
              <span className="text-[10px] uppercase tracking-eyebrow text-gold-light border border-gold-light/40 px-2 py-1 ml-1">
                33% off
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-cream/75 leading-body text-[1.0625rem] max-w-2xl mx-auto">
              Three self-paced courses on coliving, house hacking, and
              real estate investing. Bundle all three for $149 (a $447
              value) — lifetime access, module quizzes included. This
              pricing won&apos;t last.
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
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold">
          Mini course
        </p>
        {course.originalPrice && (
          <span className="text-[10px] uppercase tracking-eyebrow text-gold/80 border border-gold/40 px-1.5 py-0.5">
            Limited time · ${course.originalPrice - course.price} off
          </span>
        )}
      </div>
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
        <div className="flex items-baseline gap-2">
          {course.originalPrice && (
            <span className="text-base text-warmgray-light line-through">
              ${course.originalPrice}
            </span>
          )}
          <p className="font-heading text-4xl text-charcoal leading-none">
            ${course.price}
          </p>
        </div>
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
