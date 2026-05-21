"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Course, Lesson } from "@/lib/courses/types";
import {
  LessonProgressBar,
  LessonSidebar,
  MobileLessonDrawer,
} from "./LessonChrome";
import LessonSections from "./LessonSections";
import QuizBlock from "./QuizBlock";
import { useCourseProgress } from "./useCourseProgress";
import UpsellSection from "./UpsellSection";

type LessonViewProps = {
  course: Course;
  lesson: Lesson;
  prev: Lesson | null;
  next: Lesson | null;
  isLastLesson?: boolean;
};

// LessonView — the full interactive lesson page client component. Owns:
// - Sidebar navigation
// - Progress bar
// - Section-rendered lesson content (or quiz, for module-quiz pages)
// - Prev / Next navigation that auto-marks the current lesson complete
//
// Completion is tracked automatically — viewing a lesson marks it done.
export default function LessonView({
  course,
  lesson,
  prev,
  next,
  isLastLesson = false,
}: LessonViewProps) {
  const progress = useCourseProgress(course.slug);

  const isModuleQuiz = lesson.kind === "module-quiz";
  const useModules = !!course.modules && course.modules.length > 0;
  const isWelcome = useModules && lesson.moduleNumber === 0;

  // Auto-mark this lesson as complete when the user views it
  useEffect(() => {
    if (progress.isLoaded && !progress.isCompleted(lesson.slug)) {
      progress.markComplete(lesson.slug);
    }
    // Only run when the lesson changes or progress loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.slug, progress.isLoaded]);

  const handleAdvance = () => {
    progress.markComplete(lesson.slug);
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
        {/* Desktop sidebar — sticky, scrollable when content overflows */}
        <aside className="hidden md:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 -mr-2">
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
            moduleNumber={
              useModules && lesson.moduleNumber > 0
                ? lesson.moduleNumber
                : undefined
            }
            moduleLessonNumber={
              useModules && lesson.moduleNumber > 0
                ? lesson.moduleLessonNumber
                : undefined
            }
            moduleLessonTotal={
              useModules && lesson.moduleNumber > 0
                ? course.lessons.filter(
                    (l) => l.moduleNumber === lesson.moduleNumber,
                  ).length
                : undefined
            }
            label={
              isWelcome
                ? "Welcome"
                : isModuleQuiz
                  ? `Module ${lesson.moduleNumber} · Quiz`
                  : undefined
            }
          />

          {/* Lesson header */}
          <header>
            {useModules ? (
              isWelcome ? (
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                  ✦ Welcome · {lesson.duration}
                </p>
              ) : isModuleQuiz ? (
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                  ✦ Module {lesson.moduleNumber} ·{" "}
                  <span className="text-warmgray">{lesson.moduleTitle}</span> ·{" "}
                  Quiz
                </p>
              ) : (
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                  ✦ Module {lesson.moduleNumber} ·{" "}
                  <span className="text-warmgray">{lesson.moduleTitle}</span>
                </p>
              )
            ) : (
              <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                ✦ Lesson {String(lesson.number).padStart(2, "0")} ·{" "}
                {lesson.duration}
              </p>
            )}
            <h1 className="font-heading text-4xl md:text-6xl leading-heading text-charcoal">
              {lesson.title}
            </h1>
          </header>

          {/* Lesson body — sections OR quiz, depending on kind */}
          {isModuleQuiz ? (
            <div className="mt-10">
              <div className="border border-gold bg-gradient-to-b from-gold/[0.08] to-cream p-6 md:p-8 mb-10">
                <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
                  ✦ Module quiz
                </p>
                <p className="font-heading text-xl md:text-2xl leading-heading text-charcoal">
                  {lesson.quiz.length} questions to lock in what you just
                  learned.
                </p>
                <p className="mt-3 text-warmgray text-sm leading-body">
                  Pick the answer you think fits best. Each question explains
                  the correct answer once you choose.
                </p>
              </div>
              <QuizBlock questions={lesson.quiz} />
            </div>
          ) : (
            <div className="mt-10">
              <LessonSections sections={lesson.sections} />
            </div>
          )}

          {/* Prev / Next — clicking Next auto-marks this lesson complete */}
          <LessonNavigation
            courseSlug={course.slug}
            prev={prev}
            next={next}
            onAdvance={handleAdvance}
          />

          {/* Upsells on the final lesson of a course */}
          {isLastLesson && <UpsellSection />}
        </article>
      </div>
    </div>
  );
}

/* ----------- Prev / Next ----------- */
type LessonNavigationProps = {
  courseSlug: string;
  prev: Lesson | null;
  next: Lesson | null;
  /** Called when the user clicks Next or "Course complete" — marks the
   *  current lesson done before navigating. */
  onAdvance: () => void;
};

function LessonNavigation({
  courseSlug,
  prev,
  next,
  onAdvance,
}: LessonNavigationProps) {
  return (
    <div className="mt-16 grid gap-4 sm:grid-cols-2 border-t border-brand pt-8">
      {prev ? (
        <Link
          href={`/courses/${courseSlug}/${prev.slug}`}
          className="group block border border-brand p-5 hover:border-gold transition-colors"
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
            ← Previous{" "}
            {prev.kind === "module-quiz" ? "module quiz" : "lesson"}
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            {prev.title}
          </p>
        </Link>
      ) : (
        <Link
          href={`/courses/${courseSlug}/overview`}
          className="group block border border-brand p-5 hover:border-gold transition-colors"
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
            ← Course overview
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            Back to overview
          </p>
        </Link>
      )}

      {next ? (
        <Link
          href={`/courses/${courseSlug}/${next.slug}`}
          onClick={onAdvance}
          className="group block border border-gold bg-gold/[0.06] p-5 hover:bg-gold/[0.12] transition-colors text-right"
        >
          <p className="text-[10px] uppercase tracking-eyebrow text-gold">
            {next.kind === "module-quiz"
              ? "Take the module quiz →"
              : "Next lesson →"}
          </p>
          <p className="mt-2 font-heading text-lg leading-heading">
            {next.title}
          </p>
        </Link>
      ) : (
        <Link
          href="/learn"
          onClick={onAdvance}
          className="group block border border-gold bg-gold/[0.06] p-5 hover:bg-gold/[0.12] transition-colors text-right"
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
