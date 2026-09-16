/**
 * Single source of truth for the table of contents (mundarija).
 *
 * To add a lesson:
 *   1. create app/<slug>/page.tsx
 *   2. add an entry here with status: 'ready'
 * The mundarija, the lesson counters and the prev/next links all follow.
 */

export type LessonStatus = 'ready' | 'draft';

export type Accent = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'teal';

export interface LessonSection {
  title: string;
  detail: string;
}

export interface Lesson {
  n: number;
  slug: string;
  /** short label, e.g. "2-dars" */
  label: string;
  title: string;
  topic: string;
  summary: string;
  status: LessonStatus;
  accent: Accent;
  minutes: number;
  quizCount: number;
  sections: LessonSection[];
}

export const LESSONS: Lesson[] = [
  {
    n: 2,
    slug: '/2-dars',
    label: '2-dars',
    title: 'Axborot turlari va sanoq sistemalari',
    topic: 'Axborot turlari. Sanoq sistemalari. Texnika xavfsizligi.',
    summary:
      'Axborot shakllari va turlari, 2 lik va 10 lik sanoq sistemalari qoidalari. Kompyuterda amaliy ishlash: ish stoli, oynalar, fayl va papkalar, fleshka bilan xavfsiz ishlash hamda texnika va gigiena qoidalari.',
    status: 'ready',
    accent: 'purple',
    minutes: 80,
    quizCount: 20,
    sections: [
      {
        title: 'Nazariya',
        detail:
          'Axborot shakllari va turlari, pozitsion va nopozitsion, 2 va 10 lik sanoq sistemalari',
      },
      {
        title: 'Amaliyot',
        detail:
          'Ish stoli, oynalar, fayl va papkalar, fayl turlari, fleshka, ergonomika va texnika xavfsizligi',
      },
      {
        title: 'Bilimni sinash',
        detail:
          'Nazariy test (10 savol) va amaliy test (10 savol) — aralashtirilgan savollar, darhol izoh va baholash',
      },
    ],
  },
];

export const READY_LESSONS = LESSONS.filter((l) => l.status === 'ready');

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function neighbours(slug: string): {
  prev: Lesson | undefined;
  next: Lesson | undefined;
} {
  const i = LESSONS.findIndex((l) => l.slug === slug);
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

/** Totals shown on the mundarija header. */
export const TOTALS = {
  lessons: READY_LESSONS.length,
  minutes: READY_LESSONS.reduce((s, l) => s + l.minutes, 0),
  questions: READY_LESSONS.reduce((s, l) => s + l.quizCount, 0),
};
