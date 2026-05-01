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
    };

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  description: string;
  /** Approximate read time, e.g. "12 min" */
  duration: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  worksheet: {
    title: string;
    /** PDF download path; placeholder until real PDFs are produced. */
    href: string;
  };
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
  lessons: Lesson[];
};
