/**
 * useScrollLine — drives the TrackingLine height via GSAP ScrollTrigger.
 *
 * Usage:
 *   const { nodeRef, lineRef } = useScrollLine();
 *   // attach nodeRef to the white origin node DOM element
 *   // attach lineRef to the line div that grows downward
 *
 * How it works:
 *   1. On mount, registers a ScrollTrigger on the hero section.
 *   2. As the user scrolls from the hero top to the EvidenceBoard top,
 *      GSAP tweens the line's `scaleY` from 0 → 1 (origin: top).
 *   3. All mutations are direct DOM style changes — zero React re-renders.
 *
 * File: src/hooks/useScrollLine.ts
 */

"use client";

import { useEffect, useRef } from "react";
import { gsap }              from "gsap";
import { ScrollTrigger }     from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollLineRefs {
  /** Attach to the white node element at the top of the hero. */
  nodeRef: React.RefObject<HTMLDivElement | null>;
  /** Attach to the vertical red line div — will animate scaleY 0→1. */
  lineRef: React.RefObject<HTMLDivElement | null>;
}

export function useScrollLine(): ScrollLineRefs {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    /* Set initial transform state */
    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

    /* Animate the line growing from 0 to full height as user scrolls
     * from the hero section into the evidence board.
     * `scrub: 1` = smooth 1s lag behind pointer for cinematic feel. */
    const st = gsap.to(line, {
      scaleY: 1,
      ease:   "none",
      scrollTrigger: {
        trigger:  "#hero",
        start:    "top top",
        end:      "bottom top",
        scrub:    1.2,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
    };
  }, []);

  return { nodeRef, lineRef };
}
