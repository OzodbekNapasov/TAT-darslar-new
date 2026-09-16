'use client';

/**
 * Theme is external state (localStorage + the OS colour-scheme setting), so it
 * is exposed as a tiny store and read through useSyncExternalStore rather than
 * copied into React state inside an effect.
 *
 * The matching boot script in app/layout.tsx applies the stored value before
 * first paint, so the page never flashes the wrong theme.
 */

export type ThemeMode = 'light' | 'system' | 'dark';

export const THEME_KEY = 'tat-theme';

const listeners = new Set<() => void>();
let cache: ThemeMode | null = null;

function read(): ThemeMode {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' || v === 'system' ? v : 'system';
  } catch {
    return 'system';
  }
}

function prefersDark(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolve(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  return prefersDark() ? 'dark' : 'light';
}

function apply(mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = resolve(mode);
  root.dataset.themeMode = mode;
}

/** Stable snapshot getter: returns the same string until setMode changes it. */
export function getMode(): ThemeMode {
  if (cache === null) cache = read();
  return cache;
}

export const SERVER_MODE: ThemeMode = 'system';

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  // while the user stays on "system", follow the OS
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onOsChange = () => {
    if (getMode() === 'system') {
      apply('system');
      onChange();
    }
  };
  mq.addEventListener('change', onOsChange);

  // another tab changed the preference
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_KEY) return;
    cache = read();
    apply(cache);
    onChange();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(onChange);
    mq.removeEventListener('change', onOsChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function setMode(mode: ThemeMode) {
  cache = mode;
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {
    // private mode / storage disabled: the choice simply will not persist
  }

  // transition chrome colours only, never layout
  const root = document.documentElement;
  root.classList.add('theme-tween');
  apply(mode);
  window.setTimeout(() => root.classList.remove('theme-tween'), 320);

  listeners.forEach((l) => l());
}
