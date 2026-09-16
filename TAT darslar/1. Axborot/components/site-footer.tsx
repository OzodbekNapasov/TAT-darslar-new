'use client';

import {SITE} from '@/lib/site';
import {useClientValue} from '@/lib/use-client-value';

export function SiteFooter({note}: {note?: string}) {
  // read on the client for the same reason as the header date: these pages are
  // prerendered, so a build-time year would go stale on 1 January.
  const year = useClientValue(() => String(new Date().getFullYear()), '');

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs font-medium text-fg-muted sm:flex-row sm:px-8 sm:text-[13px]">
        <p className="text-center sm:text-left" suppressHydrationWarning>
          © {year} {SITE.college} — {SITE.subject}
        </p>
        <p className="text-center text-fg-subtle sm:text-right">
          {note ?? `Yo‘nalish: ${SITE.program}`}
        </p>
      </div>
    </footer>
  );
}
