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
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    // Sync GSAP ScrollTrigger with the Lenis smooth scroll engine
    lenis.on('scroll', ScrollTrigger.update);

    // Instead of raw requestAnimationFrame, intercept GSAP's native ticker for true sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Fix bug where GSAP's lag smoothing causes jitters when used alongside Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
