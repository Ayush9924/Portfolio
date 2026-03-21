"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SubjectProfile() {
  const sectionRef = useRef<HTMLElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".sp-heading",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      // Panel reveal
      gsap.fromTo(
        ".sp-panel",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      // Scan line loop animation
      if (scanLineRef.current) {
        gsap.fromTo(
          scanLineRef.current,
          { top: "0%", opacity: 0.9 },
          {
            top: "100%",
            opacity: 0.4,
            duration: 2.2,
            ease: "none",
            repeat: -1,
            repeatDelay: 1.5,
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="subject"
        className="relative w-full text-[#e8e8e8] font-mono"
        style={{ background: "#050505" }}
      >
        {/* ── Big spacer to match the tracking-line travel zone ── */}
        <div style={{ height: "220px" }} />

        {/* ── Section Header ── */}
        <div className="sp-heading w-full flex items-end justify-between max-md:flex-col max-md:items-start max-md:!px-6" style={{ paddingLeft: "64px", paddingRight: "64px", marginBottom: "28px" }}>
          <h2
            className="text-[50px] uppercase leading-none tracking-[0.05em] text-[#e8e8e8] max-md:text-[40px]"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", fontWeight: 300 }}
          >
            SUBJECT PROFILE
          </h2>
          <div className="flex flex-col items-end gap-1 text-[9px] uppercase tracking-[0.3em] font-mono max-md:items-start max-md:mt-4">
            <p className="text-[#e8e8e8]/50">CASE FILE: KH-03</p>
            <p className="text-white">STATUS: GRADUATING</p>
          </div>
        </div>

        {/* ── Header Divider ── */}
        <div
          className="h-[1px] bg-white/10 max-md:!mx-6"
          style={{ marginLeft: "64px", marginRight: "64px", marginBottom: "36px" }}
        />

        {/* ══════════ 3-COLUMN LAYOUT ══════════ */}
        <div
          className="flex flex-row gap-6 pb-24 max-md:flex-col max-md:!px-6"
          style={{ paddingLeft: "64px", paddingRight: "64px" }}
        >
          {/* ═══ LEFT COLUMN ═══ */}
          <div className="sp-panel flex flex-col gap-5 border border-white/10 hover:border-white/40 transition-colors duration-500 max-md:!w-full" style={{ width: "320px", flexShrink: 0, padding: "24px", background: "rgba(255,255,255,0.02)" }}>

            {/* Name label */}
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8e8e8]/35 mb-1.5">SUBJECT_ID</p>
              <p className="text-[19px] uppercase tracking-[0.15em] text-white font-bold">KUMAR AYUSH</p>
            </div>

            {/* Photo box with scan line */}
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                height: "290px",
                border: "1px solid rgba(255,43,43,0.2)",
                background: "rgba(255,43,43,0.04)",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            >
              <img 
                src="/profile.jpeg" 
                alt="Subject Photo" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity brightness-110 contrast-125" 
                style={{ objectPosition: "center 20%" }} 
              />

              {/* Traveling scan line */}
              <div
                ref={scanLineRef}
                className="pointer-events-none absolute left-0 right-0"
                style={{
                  top: "0%",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent 0%, #ff2b2b 30%, #ff2b2b 70%, transparent 100%)",
                  boxShadow: "0 0 10px 3px rgba(255,43,43,0.55)",
                  zIndex: 10,
                }}
              />

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ff2b2b]/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#ff2b2b]/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#ff2b2b]/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ff2b2b]/60" />

              {/* Top right recording block */}
              <div className="absolute top-2 right-3 flex items-center gap-[4px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b2b] animate-pulse" />
                <p className="text-[7px] font-mono text-[#ff2b2b] tracking-[0.2em] uppercase">[ REC_ACTIVE ]</p>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                <p className="text-[7px] text-[#ff2b2b]/70 tracking-[0.2em] uppercase">ID_SCAN_ACTIVE</p>
              </div>
            </div>

            {/* Stats 2x2 grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-1">
              {[
                { label: "CLASS",    value: "DEV_FULLSTACK" },
                { label: "XP_LEVEL", value: "MASTER_DEGREE" },
                { label: "LANG_1",   value: "HI (Native)" },
                { label: "LANG_2",   value: "EN (Fluent)" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-[0.2em] mb-1.5" style={{ color: "rgba(232,232,232,0.32)" }}>{label}</p>
                  <p className="text-[12px] text-white tracking-[0.08em]">{value}</p>
                </div>
              ))}
            </div>

            {/* Open to Work */}
            <div
              style={{ border: "1px solid rgba(255,43,43,0.4)", background: "rgba(255,43,43,0.05)", padding: "20px 24px" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 bg-[#ff2b2b] rounded-full animate-pulse" style={{ boxShadow: "0 0 6px rgba(255,43,43,0.8)" }} />
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff2b2b]">SYSTEM_ALERT</p>
              </div>
              <p className="text-[24px] font-bold text-white uppercase tracking-[0.06em] leading-none mb-6">
                OPEN TO WORK
              </p>
              <div style={{ borderTop: "1px solid rgba(255,43,43,0.2)", paddingTop: "12px" }} className="flex justify-between items-center">
                <p className="text-[9px] text-[#e8e8e8]/50 tracking-[0.15em] uppercase">// CONTRACTS:</p>
                <p className="text-[9px] text-[#e8e8e8]/50 tracking-[0.15em] uppercase">[REMOTE_READY]</p>
              </div>
            </div>
          </div>

          {/* ═══ CENTER COLUMN ═══ */}
          <div className="sp-panel flex flex-col gap-8 border border-white/10 hover:border-white/40 transition-colors duration-500 max-md:!flex-none max-md:!w-full" style={{ flex: 1, minWidth: 0, padding: "28px 32px", background: "rgba(255,255,255,0.02)" }}>

            {/* Report header */}
            <div className="flex items-center justify-between max-md:flex-col max-md:items-start" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "18px", marginBottom: "-8px" }}>
              <p className="text-[12px] uppercase tracking-[0.32em] text-[#ff2b2b] font-bold">COMPETENCE_ANALYSIS_REPORT</p>
              <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "rgba(232,232,232,0.4)" }}>[READ_ONLY]</p>
            </div>

            {/* Bio */}
            <p className="text-[18px] leading-[1.8]" style={{ color: "rgba(232,232,232,0.85)" }}>
              Hybrid developer obsessed with the fusion of{" "}
              <span
                className="text-white font-medium"
                style={{
                  background: "rgba(255,43,43,0.12)",
                  border: "1px solid rgba(255,43,43,0.3)",
                  padding: "3px 8px",
                }}
              >
                technical rigor
              </span>{" "}
              and{" "}
              <span
                className="text-white font-medium"
                style={{
                  background: "rgba(255,43,43,0.12)",
                  border: "1px solid rgba(255,43,43,0.3)",
                  padding: "3px 8px",
                }}
              >
                visual impact
              </span>
              . I don&apos;t just build websites, I design immersive systems that leave a lasting impression.
            </p>

            {/* ── Divider after bio ── */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.15)" }} />

            {/* Education */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(232,232,232,0.5)" }}>// ACADEMIC_LOG [EDUCATION]</p>
              <div className="flex flex-col gap-8">
                {[
                  { title: "COMPUTER SCIENCE ENGINEERING", years: "2023–Present", desc: "B.TECH – Undergraduate (th → 6th Semester)" },
                  { title: "SELF-LEARNING PROTOCOL", years: "2021–Present", desc: "FOCUS – AI, Web Development, System Design" },
                ].map(({ title, years, desc }) => (
                  <div key={title} className="group relative flex flex-col pl-5">
                    {/* Hover line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/20 transition-colors duration-300 group-hover:bg-[#ff2b2b]" />
                    
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[14px] uppercase tracking-[0.08em] font-bold text-[#ff2b2b]">
                        [{title}]
                      </span>
                      <span
                        className="text-[10px] tracking-[0.15em]"
                        style={{ color: "rgba(232,232,232,0.6)", background: "rgba(255,255,255,0.05)", padding: "2px 8px" }}
                      >
                        {years}
                      </span>
                    </div>
                    <p className="text-[14px] tracking-[0.03em] font-normal" style={{ color: "rgba(232,232,232,0.85)" }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(232,232,232,0.5)" }}>// FIELD_OPERATIONS [EXPERIENCE]</p>
              <div className="flex flex-col gap-8">
                {[
                  { title: "ACTIVE DEVELOPMENT", years: "2025–Present", desc: "PERSONAL PROJECT – Fullstack Web & App Developer" },
                  { title: "PROJECT DEPLOYMENTS", years: "2025–Present", desc: "EXAM AUTH SYSTEM – Aadhaar Verification & Role-Based Access" },
                  { title: "PROGRAMMING EXPERIENCE", years: "2021–Present", desc: "TOTAL_RUNTIME – Continuous Learning & Development" },
                ].map(({ title, years, desc }) => (
                  <div key={title} className="group relative flex flex-col pl-5">
                    {/* Hover line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/20 transition-colors duration-300 group-hover:bg-[#ff2b2b]" />
                    
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[14px] uppercase tracking-[0.08em] font-bold text-[#ff2b2b]">
                        [{title}]
                      </span>
                      <span
                        className="text-[10px] tracking-[0.15em]"
                        style={{ color: "rgba(232,232,232,0.6)", background: "rgba(255,255,255,0.05)", padding: "2px 8px" }}
                      >
                        {years}
                      </span>
                    </div>
                    <p className="text-[14px] tracking-[0.03em] font-normal" style={{ color: "rgba(232,232,232,0.85)" }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="sp-panel flex flex-col gap-6 border border-white/10 hover:border-white/40 transition-colors duration-500 max-md:!w-full" style={{ width: "300px", flexShrink: 0, padding: "24px", background: "rgba(255,255,255,0.02)", paddingBottom: "28px" }}>

            {/* Header */}
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-[#e8e8e8]/50"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "12px" }}
            >
              EQUIPMENT_INVENTORY
            </p>

            {/* Hard Skills */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff2b2b] mb-4">HARD SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React", "TypeScript", "Next.js", "Symfony",
                  "Three.js / WebGL", "PHP", "WordPress", "SQL",
                  "Node.js", "GSAP", "Bootstrap", "Tailwind", "Vue / Nuxt",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] uppercase tracking-[0.08em] text-[#e8e8e8]/75 cursor-crosshair transition-colors hover:text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "6px 12px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-white/10 w-full" />

            {/* Soft Skills */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff2b2b] mb-4">SOFT SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Problem Solving", "Critical Thinking",
                  "Autonomy", "Curiosity",
                  "Collaboration", "Creativity",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-[11px] uppercase tracking-[0.08em] text-[#e8e8e8]/75 cursor-crosshair transition-colors hover:text-white"
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "6px 12px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-white/10 w-full" />

            {/* DANGER: HIGH panel */}
            <div
              className="relative flex flex-col items-center justify-center mt-2"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.01)",
                aspectRatio: "1.4 / 1",
              }}
            >
              <div className="relative flex items-center justify-center mb-4" style={{ width: 64, height: 64 }}>
                {/* Glow */}
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at center, rgba(255,43,43,0.15) 0%, transparent 70%)" }}
                />
                
                {/* Static faint triangle outline */}
                <svg viewBox="0 0 24 24" fill="none"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
                >
                  <path d="M12 2.5L22 20.5H2L12 2.5Z"
                    stroke="rgba(255,43,43,0.25)" strokeWidth="1.2" strokeLinejoin="round"
                  />
                </svg>

                {/* Animated red seq tracing the triangle perimeter using pathLength */}
                <svg viewBox="0 0 24 24" fill="none"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2 }}
                >
                  <path
                    d="M12 2.5L22 20.5H2L12 2.5Z"
                    pathLength="100"
                    stroke="#ff2b2b"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeDasharray="25 75"
                    style={{
                      animation: "triangleTrace 2.4s linear infinite",
                      willChange: "stroke-dashoffset",
                    }}
                  />
                </svg>
                {/* Blinking ! */}
                <span
                  className="font-bold text-[#ff2b2b]"
                  style={{ position: "relative", zIndex: 3, fontSize: 13, animation: "dangerBlink 1.2s step-end infinite" }}
                >!</span>
              </div>
              <p className="font-mono uppercase text-[#ff2b2b]" style={{ fontSize: 11, letterSpacing: "0.22em" }}>DANGER: HIGH</p>
            </div>

          </div>
        </div>


      </section>

      {/* ── Post-section divider ── */}
      <div className="relative w-full" style={{ height: "2px", background: "#050505" }}>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,43,43,0.35), transparent)" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff2b2b]"
          style={{ boxShadow: "0 0 8px rgba(255,43,43,0.8)" }} />
      </div>
    </>
  );
}
