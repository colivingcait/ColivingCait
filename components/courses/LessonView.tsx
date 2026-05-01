"use client";

import { useState } from "react";
import Link from "next/link";
import type { Course, Lesson } from "@/lib/courses/types";
import {
  LessonProgressBar,
  LessonSidebar,
  MobileLessonDrawer,
} from "./LessonChrome";
import LessonSections from "./LessonSections";
import QuizBlock from "./QuizBlock";
import { WorksheetDownload } from "./Callouts";
import Button from "@/components/Button";
import { useCourseProgress } from "./useCourseProgress";
import { cn } from "@/lib/cn";

type LessonViewProps = {
  course: Course;
  lesson: Lesson;
  prev: Lesson | null;
  next: Lesson | null;
};

// LessonView — the full interactive lesson page client component. Owns:
// - Sidebar navigation with lock / completion state
// - Progress bar
// - Section-rendered lesson content
// - Quiz with score tracking
// - Mark Complete button (auto-prompts after 80%+ quiz score)
// - Prev / Next navigation
export default function LessonView({
  course,
  lesson,
  prev,
  next,
}: LessonViewProps) {
  const progress = useCourseProgress(course.slug);
  const [quizScore, setQuizScore] = useState<{
    correct: number;
    total: number;
  } | null>(null);

  const isLessonComplete = progress.isCompleted(lesson.slug);

  const handleMarkComplete = () => {
    progress.markComplete(lesson.slug);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-10 py-12 md:py-20">
      {/* Mobile drawer — sidebar in collapsible form */}
      <MobileLessonDrawer
        course={course}
        currentLessonSlug={lesson.slug}
        completed={progress.completed}
      />

      <div className="grid gap-12 md:grid-cols-[260px_1fr] md:gap-16">
        {/* Desktop sidebar — sticky */}
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <LessonSidebar
              course={course}
              currentLessonSlug={lesson.slug}
              completed={progress.completed}
            />
          </div>
        </aside>

        {/* Lesson content column */}
        <article className="min-w-0">
          {/* Progress bar */}
          <LessonProgressBar
            currentNumber={lesson.number}
            total={course.lessons.length}
            completedCount={progress.completed.length}
          />

          {/* Lesson header */}
          <header>
            <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
              ✦ Lesson {String(lesson.number).padStart(2, "0")} ·{" "}
              {lesson.duration}
            </p>
            <h1 className="font-heading text-4xl md:text-6xl leading-heading text-charcoal">
              {lesson.title}
            </h1>
            <p className="mt-5 text-warmgray leading-body text-[1.0625rem] md:text-[1.125rem] max-w-2xl">
              {lesson.description}
            </p>
          </header>

          {/* Lesson sections */}
          <div className="mt-10">
            <LessonSections sections={lesson.sections} />
          </div>

          {/* Worksheet download */}
          <WorksheetDownload
            title={lesson.worksheet.title}
            href={lesson.worksheet.href}
          />

          {/* Quiz */}
          <QuizBlock
            questions={lesson.quiz}
            onAllAnswered={(correct, total) =>
              setQuizScore({ correct, total })
            }
          />

          {/* Mark complete + nav */}
          <MarkCompleteSection
            isLessonComplete={isLessonComplete}
            quizScore={quizScore}
            onMarkComplete={handleMarkComplete}
            onMarkIncomplete={() => progress.markIncomplete(lesson.slug)}
          />

          {/* Prev / Next */}
          <LessonNavigation
            courseSlug={course.slug}
            prev={prev}
            next={next}
            nextUnlocked={isLessonComplete}
          />
        </article>
      </div>
    </div>
  );
}

/* ----------- Mark complete section ----------- */
type MarkCompleteSectionProps = {
  isLessonComplete: boolean;
  quizScore: { correct: number; total: number } | null;
  onMarkComplete: () => void;
  onMarkIncomplete: () => void;
};

function MarkCompleteSection({
  isLessonComplete,
  quizScore,
  onMarkComplete,
  onMarkIncomplete,
}: MarkCompleteSectionProps) {
  if (isLessonComplete) {
    return (
      <div className="my-12 border border-gold bg-gradient-to-b from-gold/[0.10] to-cream p-6 md:p-8 text-center">
        <p className="text-gold text-3xl mb-3">✓</p>
        <p className="font-heading text-2xl md:text-3xl leading-heading">
          Lesson complete.
        </p>
        <p className="mt-3 text-warmgray text-sm">
          The next lesson is unlocked. Keep going.
        </p>
        <button
          type="button"
          onClick={onMarkIncomplete}
          className="mt-4 text-[10px] uppercase tracking-button text-warmgray/70 hover:text-gold transition-colors"
        >
          Mark lesson incomplete
        </button>
      </div>
    );
  }

  // Encourage completion once they've at least taken a quiz
  return (
    <div className="my-12 border border-brand bg-cream p-6 md:p-8 text-center">
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
        ✦ Ready to move on?
      </p>
      <p className="font-heading text-2xl md:text-3xl leading-heading">
        {quizScore
          ? `${quizScore.correct} / ${quizScore.total} on the quiz.`
          : "Mark this lesson complete."}
      </p>
      <p className="mt-3 text-warmgray text-sm max-w-md mx-auto">
        Marking it complete unlocks the next lesson and adds it to your
        course progress bar.
      </p>
      <div className="mt-6">
        <Button onClick={onMarkComplete} variant="primary" size="lg" magnetic>
          Mark Lesson Complete →
        </Button>
      </div>
    </div>
  );
}

/* ----------- Prev / Next ----------- */
type LessonNavigationProps = {
  courseSlug: string;
  prev: Lesson | null;
  next: Lesson | null;
  nextUnlocked: boolean;
};

function LessonNavigation({
  courseSlug,
  prev,
  next,
  nextUnlocked,
}: LessonNavigationProps) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 border-t border-brand pt-8">
      {prev ? (
        <Link
          href={`/courses/${courseSlug}/${prev.slug}`}
          className="group block border border-brand p-5 hover:border-gold transition-colors"
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
            ← Previous lesson
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            {prev.title}
          </p>
        </Link>
      ) : (
        <Link
          href={`/courses/${courseSlug}`}
          className="group block border border-brand p-5 hover:border-gold transition-colors"
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
            ← Course overview
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            Back to course
          </p>
        </Link>
      )}

      {next ? (
        <Link
          href={
            nextUnlocked ? `/courses/${courseSlug}/${next.slug}` : "#"
          }
          aria-disabled={!nextUnlocked}
          onClick={(e) => {
            if (!nextUnlocked) e.preventDefault();
          }}
          className={cn(
            "group block border p-5 transition-colors text-right",
            nextUnlocked
              ? "border-gold bg-gold/[0.06] hover:border-gold hover:bg-gold/[0.12]"
              : "border-brand/40 bg-cream/50 opacity-60 cursor-not-allowed",
          )}
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-gold">
            {nextUnlocked ? "Next lesson →" : "🔒 Locked — complete this lesson first"}
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            {next.title}
          </p>
        </Link>
      ) : (
        <Link
          href="/get-coaching"
          className="group block border border-gold bg-gold/[0.06] p-5 hover:border-gold hover:bg-gold/[0.12] transition-colors text-right"
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-gold">
            Course complete · Next →
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            Book a coaching call
          </p>
        </Link>
      )}
    </div>
  );
}
