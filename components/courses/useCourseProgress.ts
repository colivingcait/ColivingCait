"use client";

import { useEffect, useState, useCallback } from "react";

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

  // Load progress from API (falls back to localStorage if not signed in)
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/progress?course=${courseSlug}`);
        const data = await res.json();
        if (!cancelled && Array.isArray(data.completed) && data.completed.length > 0) {
          setCompleted(data.completed);
          setIsLoaded(true);
          return;
        }
      } catch (err) {
        // API unavailable — fall through to localStorage
      }

      // Fallback to localStorage
      if (!cancelled) {
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
      }
    }

    load();
    return () => { cancelled = true; };
  }, [courseSlug]);

  const persist = useCallback(
    (next: string[], lessonSlug: string, action: "complete" | "incomplete") => {
      setCompleted(next);

      // Save to localStorage as fallback
      try {
        window.localStorage.setItem(
          `${KEY_PREFIX}${courseSlug}`,
          JSON.stringify(next),
        );
      } catch (err) {
        // localStorage might be unavailable — ignore
      }

      // Save to API (fire and forget)
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug, lessonSlug, action }),
      }).catch(() => {
        // Silently fail if not signed in or API unavailable
      });
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
      persist([...completed, lessonSlug], lessonSlug, "complete");
    },
    [completed, persist],
  );

  const markIncomplete = useCallback(
    (lessonSlug: string) => {
      persist(
        completed.filter((s) => s !== lessonSlug),
        lessonSlug,
        "incomplete",
      );
    },
    [completed, persist],
  );

  const reset = useCallback(() => {
    setCompleted([]);
    try {
      window.localStorage.removeItem(`${KEY_PREFIX}${courseSlug}`);
    } catch (err) {}
  }, [courseSlug]);

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
