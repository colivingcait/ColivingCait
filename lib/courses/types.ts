// Course data types. Lesson content is stored as a structured array of
// "section" objects so it can be rendered without bundling React JSX into
// the data layer. Quizzes and worksheets live alongside.

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  /** Short explanation shown after the user picks an answer. */
  explanation: string;
};

export type LessonSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "subheading"; content: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "quote"; content: string; attribution?: string }
  | { type: "key-takeaway"; title: string; body: string }
  | { type: "fascination"; body: string }
  | { type: "callout"; tone: "cream" | "blush" | "gold"; body: string }
  | { type: "video"; placeholder?: string }
  | {
      type: "padsplit";
      body: string;
      bullets?: string[];
    }
  /** Bordered card grouping content under an optional title. Useful for
   *  breaking up long paragraph runs, definitions, side-by-side
   *  comparisons, or boxed examples. */
  | {
      type: "card";
      tone?: "cream" | "blush" | "charcoal";
      title?: string;
      eyebrow?: string;
      paragraphs?: string[];
      bullets?: string[];
    }
  /** Decorative ✦ divider used to break sections without a heading. */
  | { type: "divider" };

export type Lesson = {
  slug: string;
  number: number;
  /** Module this lesson belongs to. 0 = course-level intro / welcome. */
  moduleNumber: number;
  /** Display title of the module. */
  moduleTitle: string;
  /** Position within its module — "Lesson 2 of 4". For module-quiz
   *  entries this is one greater than the last regular lesson in the
   *  module (e.g. "Lesson 5 of 5" if the module has 4 lessons). */
  moduleLessonNumber: number;
  title: string;
  description: string;
  /** Approximate read time, e.g. "12 min" */
  duration: string;
  sections: LessonSection[];
  /** Quiz questions. For regular lessons this is empty. For module-quiz
   *  entries (kind === "module-quiz") this is the entire module quiz. */
  quiz: QuizQuestion[];
  /** Lesson kind. "lesson" = normal content. "module-quiz" = the
   *  end-of-module quiz, rendered as its own page (no sections, no
   *  navigation chrome — just the quiz). Defaults to "lesson". */
  kind?: "lesson" | "module-quiz";
};

export type Module = {
  number: number;
  slug: string;
  title: string;
  /** Optional one-line summary used on the course landing page. */
  summary?: string;
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  status: "available" | "coming-soon";
  /** Two-letter symbol for the course card */
  symbol: string;
  /** What the student walks away with — bullet list */
  outcomes: string[];
  /** Who the course is for */
  audience: string[];
  /** Optional module grouping for courses that organize lessons by module. */
  modules?: Module[];
  lessons: Lesson[];
};
