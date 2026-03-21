/**
 * WaveformCanvas
 *
 * 60fps canvas signal trace. Amplitude inversely proportional to progress:
 *
 *   progress = 0%   → amplitude ~28px, fast scroll  (active zigzag signal)
 *   progress = 100% → amplitude ~0.5px, near-still  (flat line)
 *
 * The collapse is quadratic — wave stays energetic through most of the load
 * then flattens sharply in the final ~20%.
 *
 * Performance: all mutable state in closures / refs, zero React re-renders.
 *
 * File: src/components/ui/WaveformCanvas.tsx
 */

"use client";

import { useEffect, useRef } from "react";

interface WaveformCanvasProps {
  /** 0-100. Higher value → flatter, slower signal. */
  progress: number;
  /** Logical CSS width in px */
  width?: number;
  /** Logical CSS height in px */
  height?: number;
  className?: string;
}

/* ─── Value noise ─────────────────────────────────────────────────── */
function valueNoise(x: number, table: Float32Array): number {
  const N  = table.length;            // power-of-two length
  const xi = Math.floor(x) & (N - 1);
  const t  = x - Math.floor(x);
  const st = t * t * (3 - 2 * t);    // smoothstep
  return table[xi] + (table[(xi + 1) & (N - 1)] - table[xi]) * st;
}

export default function WaveformCanvas({
  progress,
  width   = 900,
  height  = 90,
  className = "",
}: WaveformCanvasProps) {

  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const progressRef = useRef(progress);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* Hi-DPI (cap at 2× to avoid excess fill-rate) */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cy = height / 2;

    /* Two independent noise tables for organic, non-repeating texture */
    const SZ = 256;
    const t1  = new Float32Array(SZ).map(() => Math.random() * 2 - 1);
    const t2  = new Float32Array(SZ).map(() => Math.random() * 2 - 1);

    let phase  = 0;
    let lastTs = 0;

    /* ── Polyline draw pass ──────────────────────────────────── */
    const drawSignal = (
      alpha: number,
      lw:    number,
      blur:  number,
      amp:   number,
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 43, 43, ${alpha})`;
      ctx.lineWidth   = lw;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.shadowColor = "rgba(255, 43, 43, 0.9)";
      ctx.shadowBlur  = blur;

      /*
       * Sample every 2px → smooth visual, cheap draw call.
       * Higher base frequency (0.032) gives the denser zigzag
       * seen in the reference image vs. a languid sine wave.
       */
      const STEP = 2;
      const pts  = Math.ceil(width / STEP) + 1;

      for (let i = 0; i < pts; i++) {
        const x = i * STEP;

        /* Base zigzag — medium frequency */
        const n1 = valueNoise(x * 0.032 + phase, t1);
        /* Fine-detail modulation — higher frequency, lower gain */
        const n2 = valueNoise(x * 0.085 + phase * 1.55, t2) * 0.28;

        /* Edge fade: signal tapers to 0 at L/R margins (first/last 4%) */
        const edgeFade =
          Math.min(x           / (width * 0.04), 1) *
          Math.min((width - x) / (width * 0.04), 1);

        const y = cy + (n1 + n2) * amp * edgeFade;

        if (i === 0) ctx.moveTo(x, y);
        else         ctx.lineTo(x, y);
      }

      ctx.stroke();
    };

    /* ── RAF loop ─────────────────────────────────────────────── */
    const frame = (ts: number) => {
      const dt = lastTs ? Math.min(ts - lastTs, 50) : 16;
      lastTs   = ts;

      const p = progressRef.current;

      /*
       * Quadratic flattening:
       *   p = 0%   → flattening = 1.0 → full amplitude + fast scroll
       *   p = 80%  → flattening ≈ 0.04
       *   p = 100% → flattening = 0   → flat line
       *
       * Amplitude range: 0.5px (at 100%) → 28px (at 0%)
       * Scroll speed:    0.0008 (near-still) → 0.012 (fast)
       */
      const flattening = Math.pow(1 - p / 100, 2);
      const amp        = 0.5 + flattening * 27.5;
      const speed      = 0.0008 + flattening * 0.0112;
      phase += dt * speed;

      ctx.clearRect(0, 0, width, height);

      /* Pass 1 — soft glow halo */
      drawSignal(0.12, 10, 14, amp);

      /* Pass 2 — bright core (shadow reset for cleanness) */
      ctx.shadowBlur = 0;
      drawSignal(0.90, 1.8, 0, amp);

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);

  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
