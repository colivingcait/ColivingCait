"use client";

import { useEffect, useState, useCallback } from "react";

// Course progress is tracked client-side via localStorage until Clerk +
// Supabase land. The shape (an array of completed lesson slugs per
// course) translates 1:1 to the eventual `user_progress` table.
const KEY_PREFIX = "coliving-cait:progress:";

type ProgressApi = {
  completed: string[];
  isLoaded: boolean;
  isCompleted: (lessonSlug: string) => boolean;
  markComplete: (lessonSlug: string) => void;
  markIncomplete: (lessonSlug: string) => void;
  reset: () => void;
};

export function useCourseProgress(courseSlug: string): ProgressApi {
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(`${KEY_PREFIX}${courseSlug}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCompleted(parsed);
      }
    } catch (err) {
      // Corrupt storage — silently reset
    }
    setIsLoaded(true);
  }, [courseSlug]);

  const persist = useCallback(
    (next: string[]) => {
      setCompleted(next);
      try {
        window.localStorage.setItem(
          `${KEY_PREFIX}${courseSlug}`,
          JSON.stringify(next),
        );
      } catch (err) {
        // localStorage might be unavailable in private mode — ignore
      }
    },
    [courseSlug],
  );

  const isCompleted = useCallback(
    (lessonSlug: string) => completed.includes(lessonSlug),
    [completed],
  );

  const markComplete = useCallback(
    (lessonSlug: string) => {
      if (completed.includes(lessonSlug)) return;
      persist([...completed, lessonSlug]);
    },
    [completed, persist],
  );

  const markIncomplete = useCallback(
    (lessonSlug: string) => {
      persist(completed.filter((s) => s !== lessonSlug));
    },
    [completed, persist],
  );

  const reset = useCallback(() => {
    persist([]);
  }, [persist]);

  return { completed, isLoaded, isCompleted, markComplete, markIncomplete, reset };
}

// Determine whether a lesson is unlocked. A lesson is unlocked if it's
// the first lesson, or the previous lesson has been completed.
export function isLessonUnlocked(
  lessonSlug: string,
  allLessonSlugs: string[],
  completed: string[],
): boolean {
  const idx = allLessonSlugs.indexOf(lessonSlug);
  if (idx <= 0) return true;
  return completed.includes(allLessonSlugs[idx - 1]);
}
