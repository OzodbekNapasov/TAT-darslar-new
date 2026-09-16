import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FlaskConical,
  HeartPulse,
  Layers,
  ListChecks,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {LESSONS, TOTALS, type Lesson} from '@/lib/lessons';
import {href, SITE} from '@/lib/site';

export const metadata = {
  title: 'Mundarija',
  description: `${SITE.college} — ${SITE.subject} fani bo‘yicha interaktiv darslar mundarijasi.`,
};

const STATS = [
  {Icon: BookOpen, value: TOTALS.lessons, label: 'Tayyor dars'},
  {Icon: Clock, value: TOTALS.minutes, label: 'Daqiqa material'},
  {Icon: ListChecks, value: TOTALS.questions, label: 'Test savoli'},
];

const FEATURES = [
  {
    Icon: Layers,
    title: 'Nazariya va amaliyot birga',
    text: 'Har bir dars kirish, nazariya, interaktiv amaliyot va test bo‘limlaridan iborat.',
  },
  {
    Icon: FlaskConical,
    title: 'Virtual simulyator',
    text: 'Talaba hamshira ish stolida bemor ko‘rsatkichlarini xatosiz kiritishni mashq qiladi.',
  },
  {
    Icon: ShieldCheck,
    title: 'Internetsiz ishlaydi',
    text: 'Offline nusxa serverdagi versiya bilan bir xil — barcha vizual effektlar saqlanadi.',
  },
];

function LessonCard({lesson}: {lesson: Lesson}) {
  return (
    <a
      href={href(lesson.slug)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-edge hover:shadow-lift sm:p-7"
    >
      {/* accent wash that warms up on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-tint-strong opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
          <HeartPulse className="h-6 w-6" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-edge bg-emerald-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-ink">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Tayyor
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-ink">
          {lesson.label}
        </p>
        <h2 className="mt-1.5 text-xl font-bold leading-snug text-fg sm:text-2xl">
          {lesson.title}
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
          {lesson.summary}
        </p>
      </div>

      <ul className="relative mt-5 grid gap-2">
        {lesson.sections.map((s, i) => (
          <li
            key={s.title}
            className="flex items-start gap-2.5 rounded-xl border border-line bg-subtle px-3 py-2"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-blue-tint-strong text-[11px] font-black text-blue-ink">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-bold text-fg">
                {s.title}
              </span>
              <span className="block text-xs leading-relaxed text-fg-subtle">
                {s.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-4 text-xs font-bold text-fg-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {lesson.minutes} daqiqa
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ListChecks className="h-4 w-4" />
            {lesson.quizCount} savol
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all group-hover:gap-2.5 group-hover:bg-blue-700">
          Darsni ochish
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

function UpcomingCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-line-strong bg-surface/60 p-8 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-subtle text-fg-subtle">
        <Plus className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-bold text-fg">Keyingi mavzular</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-fg-muted">
        Yangi dars qo‘shilganda u shu yerda avtomatik paydo bo‘ladi — mundarijani
        qo‘lda yangilash shart emas.
      </p>
      <code className="mt-4 rounded-lg border border-line bg-subtle px-3 py-1.5 font-mono text-[11px] text-fg-subtle">
        lib/lessons.ts
      </code>
    </div>
  );
}

export default function MundarijaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-fg antialiased">
      <SiteHeader
        eyebrow="Elektron qo‘llanma"
        title={SITE.subject}
        subtitle={`${SITE.program} yo‘nalishi uchun interaktiv darslar to‘plami`}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8 sm:py-12">
        {/* ============================== HERO ============================== */}
        <section className="animate-[rise_0.5s_cubic-bezier(0.22,1,0.36,1)_both] relative overflow-hidden rounded-[28px] border border-line bg-surface p-7 shadow-card sm:p-11">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-tint-strong opacity-70 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-edge bg-blue-tint px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-ink">
              <Sparkles className="h-3.5 w-3.5" />
              {SITE.college}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-[1.12] text-fg sm:text-5xl">
              Darslar mundarijasi
            </h2>

            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
              Kerakli mavzuni tanlang. Har bir dars nazariya, interaktiv
              amaliyot va o‘z-o‘zini baholash testi bilan to‘liq jihozlangan —
              internet ulanmagan holatda ham xuddi shunday ishlaydi.
            </p>

            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {STATS.map(({Icon, value, label}) => (
                <div
                  key={label}
                  className="rounded-2xl border border-line bg-subtle px-4 py-3.5"
                >
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-fg-subtle">
                    <Icon className="h-3.5 w-3.5 text-blue-ink" />
                    {label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ============================ LESSONS ============================= */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-blue-ink" />
            <h2 className="text-lg font-bold text-fg sm:text-xl">Darslar</h2>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {LESSONS.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
            <UpcomingCard />
          </div>
        </section>

        {/* =========================== FEATURES ============================ */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({Icon, title, text}) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-tint text-blue-ink">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-fg">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {text}
              </p>
            </div>
          ))}
        </section>
      </main>

      <SiteFooter note={`Fan: ${SITE.subject}`} />
    </div>
  );
}
