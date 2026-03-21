/**
 * hooks/index.ts — custom-hook barrel export
 *
 * Export every custom hook from this file so consumers can write:
 *   import { useMousePosition, useLenis, useLoaderProgress } from "@/hooks"
 *
 * Hooks implemented:
 *   - useLoaderProgress   — boot sequence progress (0-100%)
 *
 * Hooks to implement (add as needed):
 *   - useMousePosition    — normalised [-1,1] cursor coords for shader uniforms
 *   - useLenis            — returns the Lenis scroll instance
 *   - useGSAPRef          — typed ref that auto-cleans GSAP contexts on unmount
 *   - useMediaQuery       — reactive CSS media query boolean
 *   - useIntersection     — IntersectionObserver wrapper for scroll triggers
 *   - useDevicePixelRatio — reactive DPR for renderer quality control
 */

export { useLoaderProgress } from "./useLoaderProgress";
export { useScrollLine }     from "./useScrollLine";

