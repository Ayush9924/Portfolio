"use client";

/**
 * Contact — secure communications section matching design.
 *
 * - Full-viewport, edge-to-edge (bypasses PageWrapper padding via negative margin trick).
 * - All content is absolutely/flex centered on the page true center.
 * - Background text is angled (-12deg) and moves right when scrolling into view (parallax).
 * - TrackingLine anchor dot sits centered at top.
 */

import { useEffect, useRef } from "react";

export default function Contact() {
  const bgTextRef = useRef<HTMLSpanElement>(null);

  /* ── Parallax: shift bg text on scroll ──────────────────────────── */
  useEffect(() => {
    const el = bgTextRef.current;
    if (!el) return;

    const onScroll = () => {
      const section = el.closest("section") as HTMLElement | null;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 when section top hits viewport bottom, 1 when section bottom leaves viewport top
      const progress = 1 - (rect.bottom / (vh + rect.height));
      // map progress to a horizontal shift: enters from left (-250px), exits to right (+250px)
      const shift = (progress - 0.5) * 500;
      el.style.transform = `rotate(-12deg) translateX(${shift}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-28"
    >
      {/* ── Angled parallax background text ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          ref={bgTextRef}
          className="whitespace-nowrap font-mono font-black leading-none tracking-tighter text-white"
          style={{
            fontSize: "clamp(70px, 17vw, 230px)",
            opacity: 0.028,
            transform: "rotate(-12deg) translateX(0px)",
            willChange: "transform",
            display: "block",
          }}
        >
          INITIATE PROTOCOL
        </span>
      </div>

      {/* ── Main centered content ─────────────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 text-center">

        {/* Anchor node for TrackingLine end dot */}
        <div id="contact-tracking-node" style={{ width: 14, height: 14, flexShrink: 0 }} />

        {/* Gap between node and CHANNEL OPEN */}
        <div style={{ height: 56 }} />

        {/* CHANNEL OPEN row — dot + label, truly centered together */}
        <div className="flex items-center gap-[12px]">
          <div
            className="rounded-full bg-red-600 animate-pulse"
            style={{
              width: 6,
              height: 6,
              boxShadow: "0 0 10px rgba(255,43,43,0.9)",
              flexShrink: 0,
            }}
          />
          <span className="font-mono text-[14px] uppercase tracking-[0.2em] text-red-600 font-bold">
            CHANNEL OPEN
          </span>
        </div>

        {/* Red vertical tick line */}
        <div
          className="bg-red-600 hidden"
          style={{ width: 1, height: 20, marginTop: 14 }}
        />

        {/* Main serif headline */}
        <h2
          className="font-serif text-white/95"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.08,
            marginTop: 32,
            textShadow: "0 0 60px rgba(255,255,255,0.08)",
          }}
        >
          What if we<br />worked together?
        </h2>

        {/* Email */}
        <div style={{ marginTop: 24 }}>
          <a
            href="mailto:karanjio2001@gmail.com"
            className="font-mono text-[13px] tracking-wide text-red-600 transition-colors hover:text-red-400"
            style={{ cursor: "crosshair" }}
          >
            karanjio2001@gmail.com
          </a>
        </div>

        {/* INITIATE CONTACT button */}
        <button
          className="group relative overflow-hidden border border-white/[0.12] bg-transparent transition-all hover:border-white/25 active:scale-[0.98]"
          style={{
            marginTop: 36,
            padding: "16px 48px",
            cursor: "crosshair",
          }}
        >
          <span className="relative z-10 font-mono text-[12px] tracking-[0.22em] text-white/75 transition-colors group-hover:text-white">
            INITIATE CONTACT
          </span>
          <div className="absolute inset-0 bg-white/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

        {/* Social links */}
        <div
          className="flex items-center font-mono text-[12px] tracking-[0.16em] text-red-600"
          style={{ gap: 28, marginTop: 40 }}
        >
          <a href="https://github.com/Ayush9924" target="_blank" rel="noreferrer" className="opacity-80 transition-all hover:opacity-100 hover:text-red-400" style={{ cursor: "crosshair" }}>
            [ GITHUB ]
          </a>
          <a href="https://www.linkedin.com/in/kumar-ayush-904955298/" target="_blank" rel="noreferrer" className="opacity-80 transition-all hover:opacity-100 hover:text-red-400" style={{ cursor: "crosshair" }}>
            [ LINKEDIN ]
          </a>
        </div>

      </div>

      {/* ── Footer telemetry — pinned to bottom center ─────────────── */}
      <div
        className="absolute bottom-7 left-0 right-0 flex flex-col items-center gap-[6px] font-mono uppercase text-white/50"
        style={{ fontSize: 9, letterSpacing: "0.2em" }}
      >
        <p>SECURE LINE ESTABLISHED</p>
        <p>© 2026 KUMAR AYUSH</p>
      </div>
    </section>
  );
}
