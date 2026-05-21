"use client";

import BuyButton from "./BuyButton";
import Link from "next/link";

type CourseGateProps = {
  courseSlug: string;
  courseTitle: string;
  price: number;
  originalPrice?: number;
};

// Full-page gate shown in place of lesson content when the user
// hasn't purchased the course. Matches the brand design system.
export default function CourseGate({
  courseSlug,
  courseTitle,
  price,
  originalPrice,
}: CourseGateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
          ✦ Unlock this course
        </p>
        <h1 className="font-heading text-3xl md:text-5xl leading-heading text-charcoal mb-4">
          {courseTitle}
        </h1>
        <p className="text-warmgray leading-body mb-8">
          This lesson is part of a paid course. Purchase to unlock all lessons,
          quizzes, and lifetime access.
        </p>

        <div className="mb-8">
          {originalPrice ? (
            <p className="font-heading text-3xl text-charcoal">
              <span className="line-through text-warmgray/50 text-xl">
                ${originalPrice}
              </span>{" "}
              <span className="text-gold">${price}</span>
            </p>
          ) : (
            <p className="font-heading text-3xl text-charcoal">${price}</p>
          )}
          <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/60 mt-1">
            One-time payment · Lifetime access
          </p>
        </div>

        <BuyButton
          courseSlug={courseSlug}
          className="bg-charcoal text-cream px-8 py-3 text-sm uppercase tracking-eyebrow hover:bg-charcoal/90 transition-colors"
        >
          Purchase course →
        </BuyButton>

        <div className="mt-6 space-y-2">
          <Link
            href={`/courses/${courseSlug}`}
            className="block text-sm text-gold underline"
          >
            View course details
          </Link>
          <Link href="/learn" className="block text-sm text-warmgray/60">
            ← Back to all courses
          </Link>
        </div>
      </div>
    </div>
  );
}
