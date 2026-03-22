"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    // Determine if we need to register ScrollTrigger. Generally Safe.
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1, // Optimal standard smoothness
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
