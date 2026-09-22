'use client';

import {Calendar, GraduationCap, LayoutGrid, Printer, Stethoscope} from 'lucide-react';
import {ThemeToggle} from './theme-toggle';
import {formatUzbekDate, href, SITE} from '@/lib/site';
import {useClientValue} from '@/lib/use-client-value';

/** Rendered empty on the server, filled on the client, so the prerendered
 *  HTML can never freeze a stale build-time date into the page. */
function TodayDate() {
  const today = useClientValue(() => formatUzbekDate(), '');
  return (
    <span
      suppressHydrationWarning
      className="inline-flex min-w-[9.5rem] items-center gap-1.5 text-xs font-semibold text-fg-subtle"
    >
      <Calendar className="h-3.5 w-3.5 text-blue-ink" />
      {today}
    </span>
  );
}

export function SiteHeader({
  eyebrow,
  title,
  subtitle,
  back,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** shows a "back to mundarija" control on lesson pages */
  back?: {label: string; to: string};
}) {
  return (
    <header className="glass sticky top-0 z-40 border-b border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3.5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
            <Stethoscope className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="rounded-md border border-blue-edge bg-blue-tint-strong px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-ink">
                {eyebrow}
              </span>
              <TodayDate />
            </div>
            <h1 className="mt-1 truncate text-lg font-bold leading-tight text-fg sm:text-xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-fg-muted sm:text-[13px]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch md:self-auto">
          <div className="flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-line bg-subtle px-3 md:flex-none">
            <GraduationCap className="h-5 w-5 shrink-0 text-blue-ink" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase leading-tight tracking-wider text-fg-subtle">
                {"O'quv muassasasi"}
              </p>
              <p className="truncate text-xs font-bold leading-tight text-fg">{SITE.college}</p>
            </div>
          </div>

          <a
            href={href(back ? back.to : '/')}
            aria-label={back?.label || 'Mundarijaga qaytish'}
            title={back?.label || 'Mundarijaga qaytish'}
            className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-subtle text-fg-muted shadow-sm transition-all duration-200 hover:border-blue-edge hover:bg-blue-tint hover:text-blue-ink hover:scale-105 active:scale-95"
          >
            <LayoutGrid className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          </a>

          {/* Ochiq turgan bo'limni chop etadi / PDF qilib saqlaydi.
              Chop etishda sarlavha, tugmalar va test yashiriladi. */}
          <button
            type="button"
            onClick={() => window.print()}
            aria-label="Konspektni chop etish"
            title="Konspektni chop etish yoki PDF qilib saqlash"
            className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-subtle text-fg-muted shadow-sm transition-all duration-200 hover:scale-105 hover:border-blue-edge hover:bg-blue-tint hover:text-blue-ink active:scale-95"
          >
            <Printer className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
