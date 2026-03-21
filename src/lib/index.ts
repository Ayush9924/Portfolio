/**
 * lib/index.ts — third-party library initialisation
 *
 * Centralise all plugin registrations and singleton setup here so
 * they run once and are shared across the application.
 *
 * Things to add here:
 *   - gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText)
 *   - Lenis instance factory
 *   - Analytics / monitoring clients
 *
 * Example:
 *
 *   import { gsap } from "gsap";
 *   import { ScrollTrigger } from "gsap/ScrollTrigger";
 *
 *   if (typeof window !== "undefined") {
 *     gsap.registerPlugin(ScrollTrigger);
 *   }
 */
