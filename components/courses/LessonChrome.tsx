"use client";

import Link from "next/link";
import type { Course } from "@/lib/courses/types";
import { cn } from "@/lib/cn";

// Top-of-lesson progress bar — visual + textual.
type ProgressBarProps = {
  currentNumber: number;
  total: number;
  completedCount: number;
  /** Optional module context — when present, renders as
   *  "Module N · Lesson M of K". */
  moduleNumber?: number;
  moduleLessonNumber?: number;
  moduleLessonTotal?: number;
};

export function LessonProgressBar({
  currentNumber,
  total,
  completedCount,
  moduleNumber,
  moduleLessonNumber,
  moduleLessonTotal,
}: ProgressBarProps) {
  const pct = (completedCount / total) * 100;
  const useModule =
    moduleNumber !== undefined &&
    moduleLessonNumber !== undefined &&
    moduleLessonTotal !== undefined;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-eyebrow font-medium">
        <span className="text-gold">
          {useModule
            ? `Module ${moduleNumber} · Lesson ${moduleLessonNumber} of ${moduleLessonTotal}`
            : `Lesson ${currentNumber} of ${total}`}
        </span>
        <span className="text-warmgray/70">
          {completedCount} / {total} complete
        </span>
      </div>
      <div className="mt-3 h-px bg-brand/40 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// Lesson sidebar — list of all lessons in the course with lock /
// completion icons. Sticky on desktop, collapsible on mobile.
type LessonSidebarProps = {
  course: Course;
  currentLessonSlug: string;
  completed: string[];
};

export function LessonSidebar({
  course,
  currentLessonSlug,
  completed,
}: LessonSidebarProps) {
  const useModules = !!course.modules && course.modules.length > 0;

  function renderLesson(lesson: (typeof course.lessons)[number], globalIdx: number) {
    const isCurrent = lesson.slug === currentLessonSlug;
    const isComplete = completed.includes(lesson.slug);
    const prevSlug = globalIdx > 0 ? course.lessons[globalIdx - 1].slug : null;
    const isLocked =
      globalIdx > 0 && prevSlug !== null && !completed.includes(prevSlug);

    const labelNumber = useModules
      ? String(lesson.moduleLessonNumber).padStart(2, "0")
      : String(globalIdx + 1).padStart(2, "0");

    const inner = (
      <span className="flex items-start gap-3 py-3 pr-3 pl-3 -mx-3 border-l-2 transition-colors text-sm">
        <span
          aria-hidden
          className="shrink-0 w-5 h-5 mt-0.5 border border-current flex items-center justify-center text-[10px] font-medium tabular-nums"
        >
          {isComplete ? "✓" : isLocked ? "🔒" : labelNumber}
        </span>
        <span className="flex-1">
          <span
            className={cn(
              "block font-sans text-sm leading-snug",
              isCurrent && "text-gold",
              isLocked && "text-warmgray/50",
            )}
          >
            {lesson.title}
          </span>
          <span
            className={cn(
              "mt-0.5 block text-[10px] uppercase tracking-eyebrow",
              isCurrent ? "text-gold/80" : "text-warmgray/50",
            )}
          >
            {lesson.duration}
          </span>
        </span>
      </span>
    );

    const stateClass = isCurrent
      ? "border-gold text-gold"
      : isComplete
        ? "border-brand/40 text-charcoal hover:border-gold"
        : isLocked
          ? "border-brand/20 text-warmgray/60 cursor-not-allowed"
          : "border-brand/40 text-charcoal hover:border-gold";

    return (
      <li key={lesson.slug} className={cn("block", stateClass)}>
        {isLocked ? (
          <div aria-disabled="true">{inner}</div>
        ) : (
          <Link href={`/courses/${course.slug}/${lesson.slug}`}>{inner}</Link>
        )}
      </li>
    );
  }

  return (
    <nav aria-label="Course lessons" className="space-y-2">
      <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-4">
        ✦ {course.title}
      </p>

      {useModules ? (
        <div className="space-y-6">
          {course.modules!.map((mod) => {
            const modLessons = course.lessons.filter(
              (l) => l.moduleNumber === mod.number,
            );
            return (
              <div key={mod.slug}>
                <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70 mb-2">
                  Module {mod.number}
                </p>
                <p className="font-heading text-sm leading-snug text-charcoal mb-2">
                  {mod.title}
                </p>
                {modLessons.length === 0 ? (
                  <p className="text-[11px] italic text-warmgray/60 mt-2">
                    Coming soon
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {modLessons.map((lesson) => {
                      const globalIdx = course.lessons.findIndex(
                        (l) => l.slug === lesson.slug,
                      );
                      return renderLesson(lesson, globalIdx);
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-1">
          {course.lessons.map((lesson, idx) => renderLesson(lesson, idx))}
        </ul>
      )}
    </nav>
  );
}

// Mobile drawer wrapping the sidebar. Collapsible — closed by default,
// users tap to open the lesson list.
import { useState } from "react";

export function MobileLessonDrawer(props: LessonSidebarProps) {
  const [open, setOpen] = useState(false);
  const completedCount = props.completed.filter((slug) =>
    props.course.lessons.some((l) => l.slug === slug),
  ).length;

  return (
    <div className="md:hidden border border-brand mb-8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-3 flex items-center justify-between text-xs uppercase tracking-button"
      >
        <span className="text-charcoal">
          {props.course.lessons.length} lessons ·{" "}
          <span className="text-gold">{completedCount} done</span>
        </span>
        <span className="text-gold text-base">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="border-t border-brand p-4 bg-cream">
          <LessonSidebar {...props} />
        </div>
      )}
    </div>
  );
}
