"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import TrackingLine from "@/components/hero/TrackingLine";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

  const wrapRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2
      });

      // Create high-performance tracking logic for mouse parallax
      const xToBg = gsap.quickTo(".parallax-bg", "x", { duration: 0.8, ease: "power3.out" });
      const yToBg = gsap.quickTo(".parallax-bg", "y", { duration: 0.8, ease: "power3.out" });
      
      const posters = gsap.utils.toArray<HTMLElement>(".floating-poster");
      const posterTrackers = posters.map(el => {
         const speed = parseFloat(el.getAttribute("data-speed") || "1");
         return {
           quickX: gsap.quickTo(el, "x", { duration: 1.5, ease: "power4.out" }),
           quickY: gsap.quickTo(el, "y", { duration: 1.5, ease: "power4.out" }),
           speed
         };
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!wrapRef.current) return;
        const { left, top, width, height } = wrapRef.current.getBoundingClientRect();
        // Calculate normalized offset from center (-1 to 1)
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        
        xToBg(x * -20);
        yToBg(y * -20);
        
        posterTrackers.forEach(p => {
           p.quickX(x * p.speed);
           p.quickY(y * p.speed);
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      tl
        .fromTo(".floating-poster", { opacity: 0, scale: 0.95, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power3.out" })
        .fromTo(scanRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: "left center" }, "-=1")
        .fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .fromTo(".name-char", { opacity: 0, y: 24, rotationX: 90 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" }, "-=0.3")
        .fromTo(descRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(leftRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.4")
        .fromTo(rightRef.current, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.5 }, "<")
        .fromTo(bottomRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");

      // Random flickering effect
      gsap.timeline({ repeat: -1, repeatDelay: 5, delay: 2 })
        .to(scanRef.current, { opacity: 0.15, duration: 0.06 })
        .to(scanRef.current, { opacity: 0.7, duration: 0.06 })
        .to(scanRef.current, { opacity: 0.12, duration: 0.04 })
        .to(scanRef.current, { opacity: 0.65, duration: 0.08 });

      // Scanning travel from top to bottom
      gsap.fromTo(
        scanRef.current,
        { top: "0%" },
        {
          top: "100%",
          duration: 8,
          ease: "none",
          repeat: -1,
        }
      );

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        ctx.revert();
      };
    }, wrapRef);
  }, []);

  return (

    <section
      ref={wrapRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(30,0,0,0.55) 0%, #050505 70%)"
      }}
    >

      {/* Noise */}

      <div
        className="parallax-bg pointer-events-none absolute inset-[-5%] w-[110%] h-[110%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.6
        }}
      />

      {/* Floating Posters */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Poster 1 (Top Right) */}
        <div 
          className="floating-poster absolute hidden md:block opacity-0"
          data-speed="-70"
          style={{ top: "12%", right: "12%", willChange: "transform" }}
        >
          <div className="relative w-48 h-64 border border-white/5 p-1.5 shadow-[0_4px_30px_rgba(255,43,43,0.04)]" style={{ background: "rgba(10,5,5,0.7)", transform: "rotate(4deg)", filter: "sepia(1) hue-rotate(-50deg) saturate(3)" }}>
             {/* Thumbnail logic if needed, otherwise raw aesthetic block */}
             <div className="w-full h-full border border-white/10 opacity-60" style={{ background: "repeating-linear-gradient(45deg, rgba(255,43,43,0.05) 0, rgba(255,43,43,0.05) 1px, transparent 1px, transparent 4px)" }} />
             <div className="absolute -bottom-6 right-0 font-mono text-[9px] tracking-[0.3em] text-[#ff2b2b]/40">
               EVIDENCE_A.jpg
             </div>
          </div>
        </div>
        
        {/* Poster 2 (Bottom Left) */}
        <div 
          className="floating-poster absolute hidden md:block opacity-0"
          data-speed="-40"
          style={{ bottom: "16%", left: "8%", willChange: "transform" }}
        >
          <div className="relative w-40 h-52 border border-white/5 p-1.5 shadow-[0_4px_30px_rgba(255,43,43,0.04)]" style={{ background: "rgba(10,5,5,0.7)", transform: "rotate(-6deg)", filter: "sepia(1) hue-rotate(-50deg) saturate(3)" }}>
             <div className="w-full h-full border border-white/10 opacity-60" style={{ background: "repeating-linear-gradient(-45deg, rgba(255,43,43,0.05) 0, rgba(255,43,43,0.05) 1px, transparent 1px, transparent 4px)" }} />
             <div className="absolute -bottom-6 left-0 font-mono text-[9px] tracking-[0.3em] text-[#ff2b2b]/40">
               SYSTEM_DUMP.bin
             </div>
          </div>
        </div>
      </div>

      {/* Scan line */}

      <div
        ref={scanRef}
        className="pointer-events-none absolute left-0 right-0 top-0 z-20"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent 0%, rgba(255,43,43,0.06) 12%, rgba(255,43,43,0.65) 30%, rgba(255,43,43,0.65) 70%, rgba(255,43,43,0.06) 88%, transparent 100%)",
          boxShadow: "0 0 18px rgba(255,43,43,0.4),0 0 40px rgba(255,43,43,0.15)",
          opacity: 0.65
        }}
      />

      {/* Tracking Line */}
      {/* <TrackingLine /> */}

      {/* Left HUD */}

      <div
        ref={leftRef}
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 font-mono hidden md:block"
        style={{ opacity: 0 }}
      >

        <div style={{
          width: "1px",
          height: "48px",
          background: "linear-gradient(to bottom,transparent,rgba(255,43,43,0.5),transparent)"
        }} />

        <div className="mt-3 space-y-1.5 text-[10px]">

          <div className="flex gap-2">
            <span style={{ color: "rgba(255,43,43,0.38)" }}>CAM_04</span>
            <span style={{ color: "rgba(255,43,43,0.6)" }}>REC</span>
          </div>

          <div className="flex gap-2">
            <span style={{ color: "rgba(255,43,43,0.38)" }}>SIGNAL</span>
            <span style={{ color: "rgba(255,43,43,0.6)" }}>STRONG</span>
          </div>

        </div>

      </div>

      {/* Right HUD */}

      <div
        ref={rightRef}
        className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 font-mono text-right hidden md:block"
        style={{ opacity: 0 }}
      >

        <div className="space-y-1.5 text-[10px]">

          <div className="flex justify-end gap-3">
            <span style={{ color: "rgba(255,43,43,0.28)" }}>LAT</span>
            <span style={{ color: "rgba(255,43,43,0.55)" }}>48.8566 N</span>
          </div>

          <div className="flex justify-end gap-3">
            <span style={{ color: "rgba(255,43,43,0.28)" }}>LON</span>
            <span style={{ color: "rgba(255,43,43,0.55)" }}>2.3522 E</span>
          </div>

        </div>

      </div>

      {/* CENTER CONTENT */}

      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ marginTop: "clamp(38px,6.6vh,94px)" }}
      >

        {/* Badge */}

        <div
          ref={badgeRef}
          className="font-mono text-[13px] uppercase"
          style={{
            opacity: 0,
            border: "1px solid rgba(255,43,43,0.45)",
            padding: "7px 22px",
            lineHeight: "1",
            color: "rgba(255,43,43,0.7)",
            background: "rgba(255,43,43,0.04)",
            letterSpacing: "0.34em",
            marginTop: "clamp(-52px,-7vh,-96px)",
            marginBottom: "clamp(50px,7.2vh,104px)",
            boxShadow: "0 0 16px rgba(255,43,43,0.12)"
          }}
        >
          TOP SECRET // CASE #2026
        </div>

        {/* Title */}

        <div
          ref={titleRef}
          className="select-none text-center"
          style={{
            width: "100%",
            letterSpacing: "-0.02em",
            lineHeight: "0.83"
          }}
        >
          {/* Name Arrays mapped for stagger animation */}
          <h1
            className="text-[clamp(96px,21vh,320px)] max-md:text-[clamp(44px,14vw,90px)]"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 900,
              color: "#e8e8e8",
              textTransform: "uppercase",
              textShadow: "0 2px 40px rgba(255,255,255,0.08),0 0 80px rgba(255,43,43,0.06)",
              perspective: "1000px"
            }}
          >
            {"KUMAR".split("").map((char, i) => (
              <span key={`k-${i}`} className="name-char inline-block" style={{ transformOrigin: "50% 50% -50px" }}>
                {char}
              </span>
            ))}
          </h1>

          <h1
            className="text-[clamp(96px,21vh,320px)] max-md:text-[clamp(44px,14vw,90px)]"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 900,
              color: "#e8e8e8",
              textTransform: "uppercase",
              textShadow: "0 2px 40px rgba(255,255,255,0.08),0 0 80px rgba(255,43,43,0.06)",
              perspective: "1000px"
            }}
          >
            {"AYUSH".split("").map((char, i) => (
              <span key={`a-${i}`} className="name-char inline-block" style={{ transformOrigin: "50% 50% -50px" }}>
                {char}
              </span>
            ))}
          </h1>

        </div>

        {/* DESCRIPTION */}

        <div
          ref={descRef}
          className="flex flex-col items-center text-center"
          style={{
            opacity: 0,
            marginTop: "clamp(54px,7.8vh,112px)",
            color: "rgba(232,232,232,0.5)",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(15px,1.2vw,20px)",
            lineHeight: "1.62",
            rowGap: "clamp(8px,1.1vh,14px)",
            maxWidth: "min(92vw,760px)"
          }}
        >

          <p style={{ margin: "0", fontSize: "1.1em", color: "rgba(232,232,232,0.74)" }}>
            <span style={{ color: "#ff4444", fontWeight: 600 }}>
              Fullstack
            </span>{" "}
            Developer.
          </p>

          <p style={{ margin: "0" }}>
            <span style={{ color: "#ff4444", fontWeight: 600 }}>Backend</span>{" "}
            <span style={{ color: "rgba(232,232,232,0.74)" }}>Rigor</span>{" "}
            &{" "}
            <span style={{ color: "#ff4444", fontWeight: 600 }}>Frontend</span>{" "}
            <span style={{ color: "rgba(232,232,232,0.74)" }}>Interactivity</span>{" "}.
          </p>

          <p style={{
            margin: "0",
            color: "rgba(232,232,232,0.35)",
            fontSize: "0.9em",
            letterSpacing: "0.04em"
          }}>
            Seeking graduation opportunities.
          </p>

        </div>

      </div>

      {/* Bottom panel */}

      <div
        ref={bottomRef}
        className="pointer-events-none absolute bottom-10 right-8 font-mono text-right"
        style={{ opacity: 0 }}
      >

        <div
          className="text-[9px]"
          style={{ color: "rgba(255,43,43,0.35)", letterSpacing: "0.18em" }}
        >

          <div>IMMERSIVE_MODE</div>
          <div style={{ color: "rgba(255,43,43,0.2)" }}>
            3D VERSION AVAILABLE
          </div>

        </div>

      </div>

      {/* Scroll */}

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono"
        style={{
          color: "rgba(255,43,43,0.22)",
          fontSize: "8px",
          letterSpacing: "0.4em"
        }}
      >
        SCROLL ↓
      </div>

    </section>

  );
}