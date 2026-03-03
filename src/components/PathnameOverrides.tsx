"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Module-level store for pathname overrides.
 * Works across layout/page boundaries (unlike React context).
 * Used by language selectors to navigate to the correct translated slug.
 */
type Overrides = Record<string, string>;

let current: Overrides = {};
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return current;
}

const EMPTY: Overrides = {};

function getServerSnapshot(): Overrides {
  return EMPTY;
}

export function usePathnameOverrides(): Overrides {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Drop this component into a page to set pathname overrides.
 * Cleans up on unmount (navigating away from the page).
 */
export function SetPathnameOverrides({ overrides }: { overrides: Overrides }) {
  useEffect(() => {
    current = overrides;
    notify();
    return () => {
      current = {};
      notify();
    };
  }, [overrides]);
  return null;
}
