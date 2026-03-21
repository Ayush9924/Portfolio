"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

export default function EvidenceBoard() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"SLIDER" | "LIST">("SLIDER");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector(".heading-row");
      if (heading) {
        gsap.fromTo(heading,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } }
        );
      }

      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll("[data-card]");
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: trackRef.current, start: "top 90%", once: true } }
          );
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [view]);

  // Arrow Navigation
  const scrollPrev = () => trackRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollNext = () => trackRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      id="evidence"
      className="relative w-full overflow-visible text-[#e8e8e8] font-mono pb-32 pt-16 md:pt-24"
      style={{ background: "#050505" }}
    >
      <div className="flex flex-col gap-10 md:gap-14 w-full relative z-10 mb-8 md:mb-12 pr-8 md:pr-20 lg:pr-24 pl-10 md:pl-24 lg:pl-32 max-md:!px-6">
        {/* ── Main Header Row ── */}
        <div className="heading-row flex flex-col items-start justify-between pr-2 md:pr-4 md:flex-row md:items-end w-full gap-6" style={{ marginTop: "87px" }}>

          {/* Left: EVIDENCE BOARD */}
          <div className="flex items-center max-md:!pl-0" style={{ paddingLeft: "87px" }}>
            <h2
              className="text-[50px] uppercase leading-tight tracking-[0.05em] text-[#e8e8e8] max-md:text-[34px]"
              style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", fontWeight: 300 }}
            >
              EVIDENCE BOARD
            </h2>
          </div>

          {/* Right: HUD info (SECTOR / SCANNING) */}
          <div className="mt-4 md:mt-0 flex flex-col items-end gap-1 text-[9px] uppercase tracking-[0.3em] font-mono max-md:!right-0 max-md:!items-start max-md:mt-4 max-md:pl-2" style={{ position: "relative", right: "80px" }}>
            <p className="text-[#e8e8e8]/50">SECTOR: WEB</p>
            <div className="flex gap-2">
              <span className="text-[#e8e8e8]/50">SCANNING:</span>
              <span className="text-white">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Horizontal Divider beneath Header */}
        <div className="h-[1px] bg-white/10 max-md:!ml-0 max-md:!w-full" style={{ marginLeft: "57px", width: "calc(100% - 107px)" }} />
        {/* ── Sub-Controls Row (Slider/List Toggle & Center Arrows) ── */}
        <div className="relative flex items-center md:items-start w-full mt-4 md:mt-10">
          
          {/* Left: SLIDER / LIST Toggle */}
          <div className="flex font-mono text-[10px] uppercase tracking-[0.2em] relative z-10 max-md:!pl-0" style={{ paddingLeft: "34px" }}>
            <button
              onClick={() => setView("SLIDER")}
              className="flex items-center justify-center gap-2 transition-colors duration-300 outline-none cursor-crosshair"
              style={{ 
                width: "120px", 
                height: "44px", 
                border: view === "SLIDER" ? "1px solid rgba(255, 43, 43, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                backgroundColor: view === "SLIDER" ? "rgba(30, 5, 5, 0.9)" : "transparent",
                color: view === "SLIDER" ? "#ff2b2b" : "rgba(255, 255, 255, 0.3)",
                zIndex: view === "SLIDER" ? 2 : 1
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="2" width="2" height="8" fill="currentColor" /><rect x="8" y="2" width="2" height="8" fill="currentColor" /></svg>
              <span>SLIDER</span>
            </button>

            <button
              onClick={() => setView("LIST")}
              className="flex items-center justify-center gap-2 transition-colors duration-300 outline-none cursor-crosshair"
              style={{ 
                width: "120px", 
                height: "44px", 
                border: view === "LIST" ? "1px solid rgba(255, 43, 43, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                backgroundColor: view === "LIST" ? "rgba(30, 5, 5, 0.9)" : "transparent",
                color: view === "LIST" ? "#ff2b2b" : "rgba(255, 255, 255, 0.3)",
                zIndex: view === "LIST" ? 2 : 1,
                marginLeft: "-1px"
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="1.5" fill="currentColor" /><rect x="1" y="5.5" width="10" height="1.5" fill="currentColor" /><rect x="1" y="9" width="10" height="1.5" fill="currentColor" /></svg>
              <span>LIST</span>
            </button>
          </div>

          {/* Center: Arrow Navigation (Only for Slider) */}
          {view === "SLIDER" && (
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.5 z-0">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-[#ff2b2b]/90 font-mono tracking-[0.2em] flex items-center gap-2 whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#ff2b2b]"></span> X: 257 Y: 393
              </div>

              <button onClick={scrollPrev} className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all font-mono bg-[#0a0a0a]">
                &lt;
              </button>
              <button onClick={scrollNext} className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all font-mono bg-[#0a0a0a]">
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Slider View ── */}
      {view === "SLIDER" && (
        <div className="relative" style={{ marginTop: "50px" }}>
          <div
            ref={trackRef}
            className="flex gap-7 overflow-x-auto pl-4 md:pl-10 pr-32 md:pr-40 pb-10 pt-4 scroll-smooth min-h-[500px] md:min-h-[550px] lg:min-h-[600px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((p, i) => <EvidenceCard key={p.id} project={p} index={i} />)}
          </div>

          {/* Right Floating 3D Version Element */}
          <div className="absolute -right-1 top-[20%] hidden md:flex items-center gap-4 bg-[#080303] border border-white/10 border-r-0 py-4 pl-5 w-48 shadow-2xl z-20 overflow-hidden group hover:border-[#ff2b2b]/50 transition-colors cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ff2b2b]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Hexagon icon */}
            <div className="text-[#ff2b2b] shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>

            <div className="flex flex-col text-[#ff2b2b] uppercase tracking-[0.2em] font-mono leading-tight">
              <span className="text-[6px] text-[#e8e8e8]/50 mb-1">IMMERSIVE_MODE</span>
              <span className="text-[10px] font-bold text-white tracking-[0.1em]">3D VERSION</span>
              <span className="text-[7px] mt-1 tracking-[0.1em] flex items-center gap-1.5"><span className="w-1 h-1 bg-[#ff2b2b] inline-block animate-pulse rounded-full" /> AVAILABLE</span>
            </div>
          </div>
        </div>
      )}

      {/* ── List View ── */}
      {/* ── List View ── */}
      {view === "LIST" && (
        <div ref={trackRef} className="flex flex-col w-full" style={{ marginTop: "50px" }}>
          
          {/* Top Divider for the very first item */}
          <div className="w-full h-[1px] bg-white/10 opacity-0" data-card />

          {projects.map((p, i) => (
            <a 
              key={p.id} 
              href={p.url || p.github || "#"} 
              target="_blank" 
              rel="noreferrer"
              data-card 
              className="group relative flex items-center w-full h-[120px] md:h-[160px] border-b border-white/10 overflow-hidden cursor-crosshair opacity-0"
            >
              {/* Cinematic Background Image */}
              {p.thumbnail && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {/* Base Image */}
                  <img 
                    src={p.thumbnail} 
                    alt="" 
                    className="w-full h-full object-cover grayscale opacity-20 filter group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700 ease-out" 
                  />
                  {/* Strong Black Gradient Fades */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent w-[80%] md:w-[60%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                </div>
              )}

              {/* Main Content Row */}
              <div className="relative z-10 flex items-center justify-between w-full h-full pr-8 md:pr-24 lg:pr-32 transition-colors duration-500 group-hover:bg-[#ff2b2b]/5">
                
                {/* Left Side: Evidence # & Title */}
                <div className="flex items-center h-full max-md:!pl-6" style={{ paddingLeft: "87px" }}>
                  
                  {/* Decorative Red Vertical Dash */}
                  <div className="absolute left-[65px] w-[2px] h-[36px] bg-[#ff2b2b] opacity-80 group-hover:opacity-100 group-hover:h-[48px] transition-all duration-300 shadow-[0_0_10px_rgba(255,43,43,0.8)] max-md:!left-[16px]" />
                  
                  <div className="flex flex-col transform transition-transform duration-500 group-hover:translate-x-3">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#ff2b2b] mb-2 font-bold flex items-center gap-2">
                       EVIDENCE #{pad(i + 1)}
                       {/* Blinking dot on hover */}
                       <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b2b] opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                    </span>
                    <h3 
                      className="text-[32px] md:text-[46px] text-[#e8e8e8] leading-none mb-1 group-hover:text-white transition-colors duration-300"
                      style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", fontWeight: 300 }}
                    >
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Category & Interactive Link */}
                <div className="hidden md:flex flex-col items-end justify-center gap-4 h-full pr-6">
                  
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/50 group-hover:text-white/70 transition-colors">
                    {p.status === "CLASSIFIED" ? "TOP SECRET" : "PORTFOLIO"} <span className="text-[#ff2b2b] ml-1">•</span>
                  </span>
                  
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/30 group-hover:text-[#ff2b2b] transition-colors flex items-center gap-2">
                    [ CLICK TO DECRYPT ]
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="transform group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Bottom Subtle line */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff2b2b]/20 to-transparent" />
    </section>
  );
}

/* ─── Expandable Card ─── */
function EvidenceCard({ project, index }: { project: import("@/data/projects").Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = () => {
    setHovered(true);
    if (ref.current) {
      gsap.to(ref.current, { width: "400px", borderColor: "rgba(255,43,43,0.8)", duration: 0.4, ease: "power3.out" });
      const img = ref.current.querySelector("img");
      if (img) gsap.to(img, { filter: "grayscale(0%) brightness(1)", duration: 0.4 });
    }
  };
  const onLeave = () => {
    setHovered(false);
    if (ref.current) {
      gsap.to(ref.current, { width: "250px", borderColor: "rgba(255,255,255,0.15)", duration: 0.4, ease: "power3.out" });
      const img = ref.current.querySelector("img");
      if (img) gsap.to(img, { filter: "grayscale(80%) brightness(0.5)", duration: 0.4 });
    }
  };

  return (
    <div
      ref={ref}
      data-card
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex shrink-0 cursor-crosshair flex-col overflow-hidden border border-white/10 opacity-0 transition-shadow duration-300 h-[450px] md:h-[550px] lg:h-[600px]"
      style={{ width: "250px", scrollSnapAlign: "start" }}
    >
      {/* Background Image / Placeholder */}
      <div className="pointer-events-none absolute inset-0 bg-[#060606]">
        {project.thumbnail ? (
          <img src={project.thumbnail} className="h-full w-full object-cover" style={{ filter: "grayscale(80%) brightness(0.5)", transition: "transform 2s ease-out", transform: hovered ? "scale(1.03)" : "scale(1)" }} alt="" />
        ) : (
          <div className="h-full w-full border border-[rgba(255,43,43,0.1)]">
            <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
              <pattern id={`g${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0L0 0 0 20" fill="none" stroke="red" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill={`url(#g${index})`} />
            </svg>
          </div>
        )}
      </div>

      {/* Dark Gradient Overlay for Text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* Decorative Brackets */}
      <div className={`absolute left-4 top-4 h-3 w-3 border-l border-t transition-colors duration-300 ${hovered ? "border-[#ff2b2b]" : "border-white/20"}`} />
      <div className={`absolute right-4 top-4 h-3 w-3 border-r border-t transition-colors duration-300 ${hovered ? "border-[#ff2b2b]" : "border-white/20"}`} />
      <div className={`absolute bottom-4 right-4 h-3 w-3 border-b border-r transition-colors duration-300 ${hovered ? "border-[#ff2b2b]" : "border-white/20"}`} />

      {/* Vertical Status Label */}
      <div className="absolute right-4 top-12 font-mono">
        <p className="text-[7px] uppercase tracking-[0.2em]"
          style={{
            writingMode: "vertical-rl", transform: "rotate(180deg)",
            color: project.status === "ACTIVE" ? "#ff2b2b" : "rgba(255,43,43,0.5)",
            borderLeft: `1px solid ${project.status === "ACTIVE" ? "#ff2b2b" : "rgba(255,43,43,0.3)"}`, paddingLeft: "4px"
          }}>
          {project.status === "CLASSIFIED" ? "TOP SECRET // CASE" : project.status}
        </p>
      </div>

      {/* Bottom Text Area (Inside Image) */}
      <div className="absolute bottom-6 left-6 right-6">
        <p className="mb-2 text-[11px] uppercase tracking-[0.35em] font-mono text-[#ff2b2b]/90 font-bold drop-shadow-md">
          EVIDENCE # {pad(index + 1)}
        </p>
        <h3
          className="text-[28px] font-normal tracking-wide text-white drop-shadow-lg leading-tight"
          style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
        >
          {project.title}
        </h3>

        {/* Reveal on hover */}
        <div className={`mt-3 flex items-center gap-2 overflow-hidden transition-all duration-300 font-mono ${hovered ? "opacity-100 max-h-12" : "opacity-0 max-h-0"}`}>
          <a href={project.url || project.github || "#"} target="_blank" rel="noreferrer"
            className="text-[11px] uppercase tracking-[0.25em] text-[#ff2b2b] hover:text-white transition-colors drop-shadow-md font-bold">
            [CLICK TO DECRYPT]
          </a>
        </div>
      </div>
    </div>
  );
}
