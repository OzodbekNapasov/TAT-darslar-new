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
  /** short label, e.g. "3-dars" */
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
    n: 3,
    slug: '/3-dars',
    label: '3-dars',
    title: 'Tibbiyotda ishchi o‘rinlari (AIO) va axborot o‘lchov birliklari',
    topic:
      'Tibbiyotda ishchi o‘rinlarini avtomatlashtirishda va tibbiy masalalarni yechishda axborot texnologiyalari. Axborot o‘lchov birliklari.',
    summary:
      'Shifoxonada qog‘oz daftar o‘rniga kompyuterda ishlash, avtomatlashtirilgan ishchi o‘rin (AIO), elektron tibbiy karta, axborot o‘lchov birliklari (bit, bayt, KB, MB, GB, TB) va tibbiy maxfiylik. Amaliyotda — Windows’da papka yaratish, faylni to‘g‘ri saqlash va shakl to‘ldirish.',
    status: 'ready',
    accent: 'teal',
    minutes: 80,
    quizCount: 20,
    sections: [
      {
        title: 'Nazariya',
        detail:
          'AIO nima va nimalardan tashkil topadi, shifoxonada qayerda ishlatiladi, elektron tibbiy karta, axborot o‘lchov birliklari, parol va tibbiy sir',
      },
      {
        title: 'Amaliyot',
        detail:
          'Windows: papka yaratish, faylni to‘g‘ri joyga saqlash, elektron kartani to‘ldirish, maxfiylik holatlari va kompyuterda bajariladigan 4 ta amaliy topshiriq',
      },
      {
        title: 'Bilimni sinash',
        detail:
          'Nazariy test (10 savol) va amaliy test (10 savol) — javob variantlari har safar aralashtiriladi, izoh darhol ko‘rsatiladi',
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
