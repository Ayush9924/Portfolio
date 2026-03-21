"use client";

/**
 * TrackingLine
 *
 * Red diagonal line that:
 *  - Starts at a glowing white ORIGIN DOT (top-right area, in hero)
 *  - Draws itself top → bottom as user scrolls the entire page
 *  - Ends at a glowing white DESTINATION DOT at the very bottom of the page
 *
 * ARCHITECTURE:
 *  - The wrapper is `position: absolute` on the document body so the
 *    end-dot can be placed at the true page bottom (scrollHeight).
 *  - The line is drawn on a full-document-height SVG.
 *  - strokeDashoffset scrolls from 100% → 0% as user scrolls the whole page.
 *  - Mouse parallax curves the bezier without breaking dashoffset.
 */

import { useEffect, useRef } from "react";
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrackingLine() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const startDotRef = useRef<HTMLDivElement>(null); // origin dot (top)
  const endDotRef   = useRef<HTMLDivElement>(null); // destination dot (bottom)

  const progressRef = useRef(0);   // 0→1 driven by scroll
  const mouseXRef   = useRef(0.5); // raw mouse x
  const smoothMX    = useRef(0.5); // lerped mouse x
  const totalLen    = useRef(0);

  useEffect(() => {
    const wrap     = wrapRef.current;
    const svg      = svgRef.current;
    const path     = pathRef.current;
    const startDot = startDotRef.current;
    const endDot   = endDotRef.current;
    if (!wrap || !svg || !path || !startDot || !endDot) return;

    /* ── Measurements ──────────────────────────────────────────── */
    let W  = window.innerWidth;
    let VH = window.innerHeight;
    let PH = document.body.scrollHeight; // full page height

    /*
     * START: top-right of the viewport (in page coords = same as viewport
     *        since page starts at scroll 0)
     *   x ≈ 68% of viewport width
     *   y ≈ 15% of viewport height (inside hero, near the top)
     *
     * END: center-bottom of the entire page
     *   x ≈ 50% of viewport width
     *   y ≈ PH - 48px  (near the very bottom)
     */
    // START: horizontally centered, just inside the top of the hero
    const startFn = () => ({ x: W * 0.50, y: VH * 0.10 });
    // END: anchored to the contact section node if it exists, otherwise bottom of page
    const endFn = () => {
      const target = document.getElementById("contact-tracking-node");
      if (target) {
        const rect = target.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY + rect.height / 2,
        };
      }
      return { x: W * 0.50, y: PH - 60 };
    };

    /* ── Build S-curve bezier path ──────────────────────────────── */
    const buildD = (mx: number) => {
      const s = startFn();
      const e = endFn();
      // Mouse shifts the whole curve slightly left/right
      const delta = (mx - 0.5) * W * 0.10;
      /*
       * S-curve: first half sweeps LEFT, second half swings RIGHT.
       * The 0.38 / 0.28 factors give a wide, cinematic swing.
       */
      const c1x = s.x - W * 0.38 + delta;          // hard left
      const c1y = s.y + (e.y - s.y) * 0.28;
      const c2x = e.x + W * 0.28 - delta;           // hard right
      const c2y = s.y + (e.y - s.y) * 0.72;
      return `M ${s.x} ${s.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${e.x} ${e.y}`;
    };

    /* ── Position dots ─────────────────────────────────────────── */
    const placeDots = () => {
      const s = startFn();
      const e = endFn();
      startDot.style.left = `${s.x}px`;
      startDot.style.top  = `${s.y}px`;
      endDot.style.left   = `${e.x}px`;
      endDot.style.top    = `${e.y}px`;
    };

    /* ── Resize the wrapper + SVG to full document height ──────── */
    const init = () => {
      W  = window.innerWidth;
      VH = window.innerHeight;
      PH = document.body.scrollHeight;

      // wrapper and svg cover the whole page
      wrap.style.width  = `${W}px`;
      wrap.style.height = `${PH}px`;
      svg.setAttribute("viewBox", `0 0 ${W} ${PH}`);

      const d = buildD(smoothMX.current);
      path.setAttribute("d", d);

      const len = path.getTotalLength();
      totalLen.current = len;
      path.style.strokeDasharray  = `${len}`;
      path.style.strokeDashoffset = `${len * (1 - progressRef.current)}`;

      placeDots();
    };

    init();

    /* ── ScrollTrigger: draw line as user scrolls entire page ──── */
    const st = ScrollTrigger.create({
      trigger:  "body",
      start:    "top top",
      end:      "bottom bottom",
      scrub:    1.4,
      onUpdate(self) {
        progressRef.current = self.progress;
        path.style.strokeDashoffset =
          `${totalLen.current * (1 - self.progress)}`;
      },
    });

    /* ── Mouse tracking ─────────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX / window.innerWidth;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── RAF loop: smooth curve, preserve progress ─────────────── */
    let rafId = 0;
    const tick = () => {
      smoothMX.current += (mouseXRef.current - smoothMX.current) * 0.05;

      const d = buildD(smoothMX.current);
      path.setAttribute("d", d);

      const newLen = path.getTotalLength();
      totalLen.current = newLen;
      path.style.strokeDasharray  = `${newLen}`;
      path.style.strokeDashoffset = `${newLen * (1 - progressRef.current)}`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* ── Resize ────────────────────────────────────────────────── */
    const onResize = () => {
      init();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* ── Content Load / Height Change Observer ─────────────────── */
    // If images or lazy content loads, document height changes.
    // ResizeObserver ensures the dot stays at the absolute bottom.
    const ro = new ResizeObserver(() => {
      if (document.body.scrollHeight !== PH) {
        init();
        ScrollTrigger.refresh();
      }
    });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    onResize);
      ro.disconnect();
      st.kill();
    };
  }, []);

  /* Shared dot style factory */
  const dotStyle = (size: number, extra?: React.CSSProperties): React.CSSProperties => ({
    position:     "absolute",
    transform:    "translate(-50%, -50%)",
    width:        `${size}px`,
    height:       `${size}px`,
    borderRadius: "50%",
    background:   "#ffffff",
    boxShadow:
      `0 0 0 2px rgba(255,255,255,0.20), ` +
      `0 0 ${size}px rgba(255,255,255,0.9), ` +
      `0 0 ${size * 2.4}px rgba(255,43,43,0.5), ` +
      `0 0 ${size * 5}px rgba(255,43,43,0.20)`,
    zIndex: 6,
    ...extra,
  });

  return (
    /*
     * position: absolute — covers the FULL document (not just viewport).
     * This allows the end dot to sit at the true page bottom.
     * top:0 left:0 so it starts at the same origin as the page.
     */
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        position: "absolute",
        top:      0,
        left:     0,
        zIndex:   5,
      }}
    >
      {/* Full-document SVG */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top:      0,
          left:     0,
          width:    "100%",
          height:   "100%",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="tLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#ff2b2b" stopOpacity="0.95" />
            <stop offset="50%"  stopColor="#ff2b2b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff2b2b" stopOpacity="0.18" />
          </linearGradient>

          <filter id="tLineGlow" x="-80%" y="-2%" width="260%" height="104%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          fill="none"
          stroke="url(#tLineGrad)"
          filter="url(#tLineGlow)"
          style={{
            strokeWidth:   "1.6px",
            strokeLinecap: "round",
            vectorEffect:  "non-scaling-stroke",
          }}
        />
      </svg>

      {/* ── Origin dot (start of line, top-right in hero) ────── */}
      <div ref={startDotRef} style={dotStyle(18)} />

      {/* ── Destination dot (end of line, page bottom) ────────── */}
      <div ref={endDotRef}   style={dotStyle(18, { background: "rgba(255,255,255,0.85)" })} />
    </div>
  );
}