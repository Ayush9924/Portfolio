/**
 * SystemLoader — cinematic boot loader
 *
 * Centre layout (top → bottom):
 *   1. Large progress number  (e.g. 45%)
 *   2. SIGNAL TRACING...      (small mono label)
 *   3. WaveformCanvas         (thin scrolling signal trace)
 *
 * HUD chrome:
 *   Top-left  : PORTFOLIO brand + thin horizontal rule
 *   Top-right : LAT/LNG coordinates + [ENCRYPTED] badge
 *   Bottom-left: sequential terminal boot log
 *   Corners   : thin red bracket marks
 *
 * Performance notes:
 *   • No state mutation per frame — waveform is pure canvas RAF
 *   • GSAP used only for mount/unmount transitions (runs once)
 *   • Scan line animates via direct style mutation (no re-render)
 *   • Terminal log uses React state intentionally (low-frequency updates)
 *
 * File: src/components/ui/SystemLoader.tsx
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap }              from "gsap";
import { useLoaderProgress } from "@/hooks/useLoaderProgress";
import WaveformCanvas        from "./WaveformCanvas";

/* ─── Boot log entries ────────────────────────────────────────────── */
const BOOT_LOG = [
  "INIT_SEQ_99",
  "BYPASSING_FIREWALL",
  "ANALYZING_BIOMETRICS",
  "DECRYPTING_DRIVE_C",
  "RESOLVING_HOST",
  "HANDSHAKE_COMPLETE",
] as const;

/* ─── Component ───────────────────────────────────────────────────── */
export default function SystemLoader({ onComplete }: { onComplete?: () => void }) {

  /* Progress */
  const { progress, isComplete } = useLoaderProgress({
    duration:    8000,
    minInterval: 80,
    maxInterval: 180,
  });

  /* Terminal log — reveal one entry per ~16% progress */
  const [visibleLogs, setVisibleLogs] = useState<readonly string[]>([]);
  useEffect(() => {
    const count = Math.floor((progress / 100) * BOOT_LOG.length);
    setVisibleLogs(BOOT_LOG.slice(0, count));
  }, [progress]);

  /* Full-viewport waveform width */
  const [waveW, setWaveW] = useState(1200);
  useEffect(() => {
    const sync = () => setWaveW(window.innerWidth);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* Refs for GSAP */
  const wrapRef    = useRef<HTMLDivElement>(null);
  const topRef     = useRef<HTMLDivElement>(null);
  const numRef     = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const waveRef    = useRef<HTMLDivElement>(null);
  const botRef     = useRef<HTMLDivElement>(null);
  const scanRef    = useRef<HTMLDivElement>(null);

  /* Mount entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(topRef.current,  { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .fromTo(numRef.current,  { opacity: 0, y: 8 },   { opacity: 1, y: 0, duration: 0.45 }, "-=0.2")
        .fromTo(labelRef.current,{ opacity: 0 },         { opacity: 1, duration: 0.35 }, "-=0.1")
        .fromTo(waveRef.current, { opacity: 0 },         { opacity: 1, duration: 0.4 }, "-=0.05")
        .fromTo(botRef.current,  { opacity: 0, y: 10 },  { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  /* Scan line — direct DOM mutation, no React state */
  useEffect(() => {
    const el = scanRef.current;
    if (!el) return;
    const start = performance.now();
    const CYCLE = 3500;
    let rafId: number;

    const tick = (now: number) => {
      const t     = ((now - start) % CYCLE) / CYCLE;
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      el.style.top = `${eased * 100}%`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* Exit animation */
  const exitFired = useRef(false);
  useEffect(() => {
    if (!isComplete || exitFired.current || !wrapRef.current) return;
    exitFired.current = true;

    gsap.timeline()
      .to(wrapRef.current, { opacity: 0.2, duration: 0.07, delay: 0.4 })
      .to(wrapRef.current, { opacity: 1,   duration: 0.07 })
      .to(wrapRef.current, { opacity: 0,   duration: 0.9, ease: "power2.inOut" })
      .then(() => onComplete?.());
  }, [isComplete, onComplete]);

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[10000] overflow-hidden select-none"
      style={{ backgroundColor: "#050505" }}
    >

      {/* ── Subtle grid ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,43,43,0.022) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,43,43,0.022) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Radial vignette ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ── Travelling scan line ─────────────────────────────── */}
      <div
        ref={scanRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 h-px opacity-50"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,43,43,0.5) 30%, rgba(255,43,43,0.5) 70%, transparent)",
          boxShadow: "0 0 10px rgba(255,43,43,0.4)",
          top: "0%",
        }}
      />

      {/* ── Corner brackets ──────────────────────────────────── */}
      {[
        "top-5 left-5 border-l-[1.5px] border-t-[1.5px]",
        "top-5 right-5 border-r-[1.5px] border-t-[1.5px]",
        "bottom-5 left-5 border-l-[1.5px] border-b-[1.5px]",
        "bottom-5 right-5 border-r-[1.5px] border-b-[1.5px]",
      ].map((cls, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`pointer-events-none fixed h-7 w-7 ${cls}`}
          style={{ borderColor: "rgba(255,43,43,0.38)" }}
        />
      ))}

      {/* ══════ TOP ROW ═══════════════════════════════════════════ */}
      <div
        ref={topRef}
        className="absolute left-0 right-0 top-0 flex items-start justify-between px-8 pt-8"
      >
        {/* Brand */}
        <div className="flex items-center gap-5">
          <span
            className="font-mono text-[11px] font-bold uppercase tracking-[0.55em]"
            style={{ color: "#ff2b2b" }}
          >
            PORTFOLIO
          </span>
          <div
            className="h-px"
            style={{
              width: "clamp(40px, 7vw, 160px)",
              background: "linear-gradient(to right, rgba(255,43,43,0.65), transparent)",
            }}
          />
        </div>

        {/* Coordinates */}
        <div className="text-right font-mono" style={{ color: "rgba(255,43,43,0.5)" }}>
          <div className="flex items-center justify-end gap-2 text-[10px]">
            <span style={{ color: "rgba(255,43,43,0.28)" }}>LAT</span>
            <span>37°46&#39;30&#34;N</span>
          </div>
          <div className="mt-0.5 flex items-center justify-end gap-2 text-[10px]">
            <span style={{ color: "rgba(255,43,43,0.28)" }}>LNG</span>
            <span>122°25&#39;09&#34;W</span>
          </div>
          <div
            className="mt-2 inline-block px-[7px] py-[2px] text-[8px] tracking-[0.22em]"
            style={{
              border:     "1px solid rgba(255,43,43,0.35)",
              background: "rgba(255,43,43,0.05)",
              color:      "rgba(255,43,43,0.6)",
            }}
          >
            [ ENCRYPTED ]
          </div>
        </div>
      </div>

      {/* ══════ CENTRE ═══════════════════════════════════════════
          Waveform is the vertically-centred anchor.
          Label + number float OVER it via absolute positioning.
      ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        {/* Waveform wrapper — relative so children can overlay it */}
        <div ref={waveRef} className="relative w-screen">

          {/* Canvas signal trace */}
          <WaveformCanvas
            progress={progress}
            width={waveW}
            height={90}
          />

          {/* Label + number centred ON TOP of the wave */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

            {/* SIGNAL TRACING... / ACCESS GRANTED */}
            {progress < 100 ? (
              <p
                ref={labelRef}
                className="font-mono uppercase"
                style={{
                  fontSize:      "10px",
                  letterSpacing: "0.5em",
                  color:         "rgba(255,43,43,0.55)",
                  marginBottom:  "4px",
                }}
              >
                SIGNAL TRACING...
              </p>
            ) : (
              <div
                ref={labelRef}
                className="flex items-center gap-3 font-mono uppercase"
                style={{
                  fontSize:      "10px",
                  letterSpacing: "0.38em",
                  fontWeight:    700,
                  marginBottom:  "4px",
                }}
              >
                <span style={{ color: "rgba(255,43,43,0.4)", fontSize: "14px", lineHeight: 1 }}>▶</span>
                <span
                  style={{
                    color:         "#ff4444",
                    letterSpacing: "0.42em",
                    textShadow:    "0 0 12px rgba(255,43,43,0.9), 0 0 28px rgba(255,43,43,0.5)",
                  }}
                >
                  ACCESS GRANTED
                </span>
                <span style={{ color: "rgba(255,43,43,0.4)", fontSize: "14px", lineHeight: 1, transform: "scaleX(-1)", display: "inline-block" }}>▶</span>
              </div>
            )}

            {/* Progress number — always the same compact size */}
            <div
              ref={numRef}
              className="flex items-baseline font-mono leading-none"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span
                style={{
                  fontSize:   "clamp(54px, 7vw, 80px)",
                  fontWeight: 700,
                  color:      "#e6e6e6",
                  textShadow: "0 0 24px rgba(255,255,255,0.18), 0 0 60px rgba(255,43,43,0.10)",
                }}
              >
                {String(progress).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize:     "clamp(24px, 3.5vw, 38px)",
                  fontWeight:   700,
                  color:        "rgba(230,230,230,0.35)",
                  marginLeft:   "3px",
                  marginBottom: "4px",
                }}
              >
                %
              </span>
            </div>

          </div>
        </div>
      </div>


      {/* ══════ BOTTOM-LEFT terminal log ══════════════════════════ */}
      <div
        ref={botRef}
        className="absolute bottom-16 left-14 flex gap-3"
      >
        {/* Vertical accent line */}
        <div
          className="w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255,43,43,0.5) 20%, rgba(255,43,43,0.5) 80%, transparent)",
            alignSelf: "stretch",
          }}
        />

        {/* Log entries */}
        <div className="flex flex-col gap-[3px] font-mono text-[10px]">
          {visibleLogs.map((entry, i) => (
            <div
              key={entry}
              className="flex items-center gap-2"
              style={{ animation: "logSlide 0.2s ease-out both", animationDelay: `${i * 60}ms` }}
            >
              <span style={{ color: "rgba(255,43,43,0.22)" }}>
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span style={{ color: "rgba(255,43,43,0.5)" }}>{entry}</span>
              <span style={{ color: "rgba(255,43,43,0.18)" }}>···</span>
              <span style={{ color: "#ff2b2b", fontWeight: 700 }}>OK</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes logSlide {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
