"use client";

import Link from "next/link";
import type { Course } from "@/lib/courses/types";
import { useCourseProgress } from "./useCourseProgress";
import Button from "@/components/Button";
import { cn } from "@/lib/cn";

// CourseOverviewMap — the learner-focused course map. Shows every lesson
// in the course in order, grouped by module, with completion state +
// a "Continue" CTA pointing to the next un-completed lesson. This is
// the page learners use to orient themselves between sessions; it's
// distinct from the marketing-oriented /courses/[slug] landing.
export default function CourseOverviewMap({ course }: { course: Course }) {
  const progress = useCourseProgress(course.slug);
  const useModules = !!course.modules && course.modules.length > 0;

  const completedCount = course.lessons.filter((l) =>
    progress.completed.includes(l.slug),
  ).length;
  const totalCount = course.lessons.length;
  const pct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const nextLesson =
    course.lessons.find((l) => !progress.completed.includes(l.slug)) ??
    course.lessons[0];

  const isStarted = completedCount > 0;
  const isComplete = completedCount === totalCount;

  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
          ✦ Course overview
        </p>
        <h1 className="font-heading text-4xl md:text-5xl leading-heading text-charcoal">
          {course.title}
        </h1>

        {/* Stats + resume CTA */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-eyebrow font-medium mb-3">
              <span className="text-gold">
                {completedCount} of {totalCount} complete
              </span>
              {useModules && course.modules && (
                <span className="text-warmgray/60">
                  · {course.modules.length} modules ·{" "}
                  {course.lessons.filter((l) => l.kind === "module-quiz").length}{" "}
                  module quizzes
                </span>
              )}
            </div>
            <div className="h-px bg-brand/40 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div>
            {isComplete ? (
              <Button
                href={`/courses/${course.slug}/${course.lessons[0].slug}`}
                variant="primary"
                size="md"
              >
                Course complete · Review →
              </Button>
            ) : (
              <Button
                href={`/courses/${course.slug}/${nextLesson.slug}`}
                variant="primary"
                size="md"
              >
                {isStarted ? "Continue" : "Start the course"} →
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Lesson list */}
      {useModules ? (
        <div className="space-y-12">
          {/* Welcome / intro lessons (moduleNumber === 0) */}
          {course.lessons
            .filter((l) => l.moduleNumber === 0)
            .map((lesson) => (
              <LessonCard
                key={lesson.slug}
                course={course}
                lesson={lesson}
                completed={progress.completed.includes(lesson.slug)}
                isStartHere
              />
            ))}

          {course.modules!.map((mod) => {
            const modLessons = course.lessons.filter(
              (l) => l.moduleNumber === mod.number,
            );
            const modCompletedCount = modLessons.filter((l) =>
              progress.completed.includes(l.slug),
            ).length;
            const modTotalCount = modLessons.length;

            return (
              <div key={mod.slug}>
                <div className="grid grid-cols-[auto_1fr_auto] gap-5 md:gap-7 items-baseline mb-5">
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
                  </div>
                  {modTotalCount > 0 && (
                    <span className="text-[10px] uppercase tracking-eyebrow text-warmgray/70 whitespace-nowrap">
                      {modCompletedCount}/{modTotalCount}
                    </span>
                  )}
                </div>
                {modLessons.length === 0 ? (
                  <div className="md:ml-12 border border-dashed border-brand/60 bg-cream/40 p-5 md:p-6 text-sm text-warmgray italic">
                    Lessons coming soon.
                  </div>
                ) : (
                  <div className="md:ml-12 space-y-3">
                    {modLessons.map((lesson) => (
                      <LessonCard
                        key={lesson.slug}
                        course={course}
                        lesson={lesson}
                        completed={progress.completed.includes(lesson.slug)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {course.lessons.map((lesson) => (
            <LessonCard
              key={lesson.slug}
              course={course}
              lesson={lesson}
              completed={progress.completed.includes(lesson.slug)}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ----- Lesson card ----- */
function LessonCard({
  course,
  lesson,
  completed,
  isStartHere = false,
}: {
  course: Course;
  lesson: Course["lessons"][number];
  completed: boolean;
  isStartHere?: boolean;
}) {
  const isQuiz = lesson.kind === "module-quiz";

  return (
    <Link
      href={`/courses/${course.slug}/${lesson.slug}`}
      className={cn(
        "group block border p-5 md:p-6 transition-colors",
        isStartHere
          ? "border-gold bg-cream hover:bg-gold/[0.04]"
          : isQuiz
            ? "border-gold bg-gold/[0.06] hover:bg-gold/[0.10]"
            : completed
              ? "border-brand bg-cream hover:border-gold"
              : "border-brand bg-cream hover:border-gold",
      )}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
        {/* Marker */}
        {isStartHere ? (
          <span className="text-[10px] uppercase tracking-eyebrow text-gold whitespace-nowrap">
            ✦ Start here
          </span>
        ) : isQuiz ? (
          <span className="font-heading text-2xl md:text-3xl text-gold leading-none">
            ✦
          </span>
        ) : (
          <span
            aria-hidden
            className={cn(
              "shrink-0 w-7 h-7 border flex items-center justify-center text-[11px] font-medium tabular-nums",
              completed
                ? "border-gold bg-gold text-cream"
                : "border-brand text-charcoal",
            )}
          >
            {completed ? "✓" : String(lesson.moduleLessonNumber).padStart(2, "0")}
          </span>
        )}

        {/* Title + meta */}
        <div className="min-w-0">
          {isQuiz && (
            <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-1">
              Module quiz · {lesson.quiz.length} questions
            </p>
          )}
          <p
            className={cn(
              "font-heading text-lg md:text-xl leading-heading",
              completed && !isStartHere && "text-warmgray",
            )}
          >
            {lesson.title}
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          {completed && !isStartHere && (
            <span
              aria-hidden
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-eyebrow text-gold"
            >
              ✓ Done
            </span>
          )}
          <span className="text-[10px] uppercase tracking-eyebrow text-gold">
            {lesson.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
