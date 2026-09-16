'use client';

import {useSyncExternalStore} from 'react';

const noSubscribe = () => () => {};

/**
 * Reads a value that only exists in the browser (the clock, in practice).
 *
 * These pages are prerendered, so computing such a value during render would
 * bake it into the exported HTML and go stale. useSyncExternalStore renders
 * `serverSnapshot` on the server and during hydration, then the real value —
 * without the cascading render that a setState-in-effect would cause.
 *
 * `getSnapshot` must return a primitive (or a stable reference).
 */
export function useClientValue<T>(getSnapshot: () => T, serverSnapshot: T): T {
  return useSyncExternalStore(noSubscribe, getSnapshot, () => serverSnapshot);
}
