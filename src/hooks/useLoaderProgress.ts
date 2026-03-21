/**
 * useLoaderProgress — deterministic boot progress hook
 *
 * Increments progress 0→100 using a setInterval approach.
 * Uses a mounted-ref guard so React 18 Strict Mode's double-invoke
 * of useEffect does NOT cause a double-speed counter.
 *
 * File: src/hooks/useLoaderProgress.ts
 */

"use client";

import { useState, useEffect, useRef } from "react";

interface Options {
  /** Approximate total duration in ms. Default 8000 */
  duration?: number;
  /** Min tick interval in ms. Default 80 */
  minInterval?: number;
  /** Max tick interval in ms. Default 180 */
  maxInterval?: number;
}

interface Result {
  progress:   number;   // 0-100 integer
  isComplete: boolean;
}

export function useLoaderProgress({
  duration    = 8000,
  minInterval = 80,
  maxInterval = 180,
}: Options = {}): Result {

  const [progress,   setProgress]   = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const progressRef  = useRef(0);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef     = useRef(0);
  const mountedRef   = useRef(false); // Strict Mode guard

  useEffect(() => {
    // React 18 Strict Mode invokes effects twice in dev.
    // The second invocation finds mountedRef already true and exits.
    if (mountedRef.current) return;
    mountedRef.current = true;
    startRef.current   = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const ratio   = Math.min(elapsed / duration, 1);

      /*
       * Step size increases as we approach the end so it never
       * sticks at 99 forever, but we also cap at 1 early on
       * for a cinematic feel.
       */
      const base = ratio < 0.4 ? 1 : ratio < 0.75 ? 2 : ratio < 0.9 ? 3 : 5;
      const step = base + Math.random() * base;

      const next = Math.min(Math.floor(progressRef.current + step), 100);
      progressRef.current = next;
      setProgress(next);

      if (next >= 100) {
        setIsComplete(true);
        return; // stop loop
      }

      const interval = minInterval + Math.random() * (maxInterval - minInterval);
      timerRef.current = setTimeout(tick, interval);
    };

    timerRef.current = setTimeout(tick, minInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      mountedRef.current = false; // allow re-mount (HMR)
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { progress, isComplete };
}
