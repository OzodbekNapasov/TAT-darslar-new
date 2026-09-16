'use client';

import type {LucideIcon} from 'lucide-react';

/** Shared shell for every interactive block in the practice section. */
export function PracticeCard({
  n,
  Icon,
  title,
  lead,
  children,
}: {
  n: number;
  Icon: LucideIcon;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-4 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-ink">
            {n}-mashq
          </p>
          <h3 className="mt-0.5 text-lg font-bold leading-snug text-fg sm:text-xl">
            {title}
          </h3>
        </div>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-fg-muted sm:text-base">
        {lead}
      </p>

      {children}
    </section>
  );
}

/** The "what you just clicked" panel every block shows under its widget. */
export function Explain({
  title,
  children,
  tone = 'teal',
}: {
  title: string;
  children: React.ReactNode;
  tone?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'teal';
}) {
  const tones = {
    blue: 'border-blue-edge bg-blue-tint text-blue-ink',
    emerald: 'border-emerald-edge bg-emerald-tint text-emerald-ink',
    amber: 'border-amber-edge bg-amber-tint text-amber-ink',
    rose: 'border-rose-edge bg-rose-tint text-rose-ink',
    purple: 'border-purple-edge bg-purple-tint text-purple-ink',
    teal: 'border-teal-edge bg-teal-tint text-teal-ink',
  } as const;

  return (
    <div
      className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed sm:text-base ${tones[tone]}`}
    >
      <strong className="mb-1 block font-bold">{title}</strong>
      <div>{children}</div>
    </div>
  );
}

/** Small "done / not yet" progress pill used by the step-based blocks. */
export function StepPill({done, total}: {done: number; total: number}) {
  const complete = done >= total;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
        complete
          ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
          : 'border-line bg-subtle text-fg-muted'
      }`}
    >
      {done} / {total}
    </span>
  );
}
