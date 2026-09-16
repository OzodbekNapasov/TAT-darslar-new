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
  /** short label, e.g. "1-dars" */
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
    n: 1,
    slug: '/1-dars',
    label: '1-dars',
    title: 'Axborot haqida tushuncha',
    topic: 'Axborot haqida tushuncha. Axborot texnologiyalari haqida ma’lumot.',
    summary:
      'Tibbiyotda axborotning o‘rni, uning shakllari va xususiyatlari. Kompyuter qurilmalari, sichqoncha va klaviatura bilan ishlash hamda virtual hamshira ish stolida amaliyot.',
    status: 'ready',
    accent: 'blue',
    minutes: 80,
    quizCount: 20,
    sections: [
      {
        title: 'Kirish',
        detail: 'Tibbiyotda IT ning 4 ta hayotiy ustuni, qog‘oz va elektron tizim solishtiruvi',
      },
      {
        title: 'Nazariya',
        detail: 'Axborotning 7 ta shakli, idrok a’zolari va 5 ta asosiy xususiyati',
      },
      {
        title: 'Amaliyot',
        detail: 'Kompyuter qurilmalari, yoqish/o‘chirish algoritmi, sichqoncha, klaviatura, hamshira ish stoli',
      },
      {
        title: 'Bilimni sinash',
        detail:
          'Nazariy test (10 savol) va amaliy test (10 savol) — rasmli savollar, darhol izoh va alohida baholash',
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
