"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/courses/types";
import { cn } from "@/lib/cn";

// Quiz block — multiple choice with instant feedback per question.
// Once all questions are answered, the score and a "you can mark this
// lesson complete" prompt appear. Fully self-contained — owns its
// answer state internally.
type QuizBlockProps = {
  questions: QuizQuestion[];
  /** Called when the student has answered every question. */
  onAllAnswered?: (correctCount: number, total: number) => void;
};

export default function QuizBlock({
  questions,
  onAllAnswered,
}: QuizBlockProps) {
  // Per-question selected answer index (-1 = unanswered)
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );

  const allAnswered = answers.every((a) => a !== -1);
  const correctCount = answers.filter(
    (a, i) => a === questions[i].correctIndex,
  ).length;

  const handleAnswer = (qIdx: number, choice: number) => {
    if (answers[qIdx] !== -1) return; // lock once answered
    const next = [...answers];
    next[qIdx] = choice;
    setAnswers(next);

    if (next.every((a) => a !== -1)) {
      const correct = next.filter(
        (a, i) => a === questions[i].correctIndex,
      ).length;
      onAllAnswered?.(correct, questions.length);
    }
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(-1));
  };

  return (
    <section className="my-12 border-t border-brand pt-12">
      <div className="text-center max-w-xl mx-auto">
        <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
          ✦ Knowledge check
        </p>
        <h2 className="font-heading text-3xl md:text-4xl leading-heading">
          Quick <em>quiz.</em>
        </h2>
        <p className="mt-3 text-warmgray text-sm leading-body">
          Five questions. Pick an answer to see why. Aim for 4 of 5 before
          moving on.
        </p>
      </div>

      <ol className="mt-10 space-y-8 max-w-2xl mx-auto">
        {questions.map((q, qi) => (
          <QuestionRow
            key={qi}
            number={qi + 1}
            total={questions.length}
            question={q}
            selected={answers[qi]}
            onAnswer={(choice) => handleAnswer(qi, choice)}
          />
        ))}
      </ol>

      {allAnswered && (
        <div className="mt-12 max-w-2xl mx-auto border border-gold bg-gradient-to-b from-gold/[0.08] to-transparent p-6 md:p-8 text-center">
          <p className="text-[10px] uppercase tracking-eyebrow text-gold mb-3">
            ✦ Quiz complete
          </p>
          <p className="font-heading text-3xl md:text-4xl leading-heading">
            {correctCount} / {questions.length} correct
          </p>
          <p className="mt-3 text-warmgray text-sm">
            {correctCount === questions.length
              ? "Perfect score. Mark this lesson complete and move on."
              : correctCount >= Math.ceil(questions.length * 0.8)
                ? "Great work. Mark this lesson complete and move on — or retake to push for 100%."
                : "Worth a retake before moving on. Skim the lesson sections you missed."}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 text-xs uppercase tracking-button text-gold link-underline"
          >
            Retake the quiz
          </button>
        </div>
      )}
    </section>
  );
}

/* ---------------- per-question row ---------------- */
type QuestionRowProps = {
  number: number;
  total: number;
  question: QuizQuestion;
  selected: number; // -1 = unanswered
  onAnswer: (choice: number) => void;
};

function QuestionRow({
  number,
  total,
  question,
  selected,
  onAnswer,
}: QuestionRowProps) {
  const answered = selected !== -1;
  const correct = answered && selected === question.correctIndex;

  return (
    <li>
      <p className="text-[10px] uppercase tracking-eyebrow text-warmgray/70">
        Question {number} of {total}
      </p>
      <p className="mt-2 font-heading text-xl md:text-2xl leading-heading">
        {question.question}
      </p>

      <ul className="mt-5 space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectAnswer = i === question.correctIndex;

          let stateClass =
            "border-brand bg-white hover:border-gold/60 hover:bg-cream";
          if (answered) {
            if (isCorrectAnswer) {
              stateClass = "border-gold bg-gold/[0.10]";
            } else if (isSelected) {
              stateClass = "border-red-300 bg-red-50";
            } else {
              stateClass = "border-brand/40 bg-white opacity-60";
            }
          }

          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => onAnswer(i)}
                className={cn(
                  "w-full text-left border px-5 py-3 transition-colors text-sm",
                  stateClass,
                  answered && "cursor-default",
                )}
              >
                <span className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "shrink-0 w-5 h-5 border border-current flex items-center justify-center text-[10px] font-medium uppercase tracking-eyebrow",
                      answered && isCorrectAnswer
                        ? "bg-gold text-white border-gold"
                        : answered && isSelected
                          ? "bg-red-400 text-white border-red-400"
                          : "text-warmgray",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span
                    className={cn(
                      answered && isCorrectAnswer
                        ? "text-charcoal font-medium"
                        : answered && isSelected
                          ? "text-red-700"
                          : "text-charcoal",
                    )}
                  >
                    {opt}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div
          className={cn(
            "mt-4 text-sm leading-body p-4 border-l-2",
            correct
              ? "border-gold bg-gold/[0.06] text-charcoal"
              : "border-red-300 bg-red-50 text-red-800",
          )}
        >
          <p className="text-[10px] uppercase tracking-eyebrow font-medium mb-1">
            {correct ? "✓ Correct" : "✗ Not quite"}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </li>
  );
}
