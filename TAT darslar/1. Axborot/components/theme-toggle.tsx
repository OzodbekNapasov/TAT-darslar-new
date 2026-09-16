'use client';

import {useSyncExternalStore} from 'react';
import {Moon, Sun} from 'lucide-react';
import {
  getMode,
  resolve,
  SERVER_MODE,
  setMode,
  subscribe,
} from '@/lib/theme';

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getMode, () => SERVER_MODE);
  const isDark = resolve(mode) === 'dark';

  const toggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Yorug‘ rejimga o‘tish" : "Tungi rejimga o‘tish"}
      title={isDark ? "Yorug‘ rejimga o‘tish" : "Tungi rejimga o‘tish"}
      className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line bg-subtle text-fg-muted shadow-sm transition-all duration-200 hover:border-blue-edge hover:bg-blue-tint hover:text-blue-ink hover:scale-105 active:scale-95"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform duration-200 group-hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-200 group-hover:-rotate-12" />
      )}
    </button>
  );
}
