"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation logic can go here if needed in the future
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative w-full text-[#e8e8e8] font-mono pb-24 max-md:!pt-24"
      style={{ background: "#050505", paddingTop: "207px" }}
    >
      <div className="w-full relative z-10">

        
        {/* ── Section Header ── */}
        <div className="w-full flex items-end justify-between max-md:flex-col max-md:items-start max-md:!px-6" style={{ paddingLeft: "64px", paddingRight: "64px", marginBottom: "48px" }}>
          <h2
            className="text-[40px] md:text-[50px] uppercase leading-none tracking-[0.05em] text-[#e8e8e8] max-md:text-[32px]"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", fontWeight: 300 }}
          >
            AUTHORIZED CLEARANCES
          </h2>
          <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-mono max-md:items-start max-md:mt-4">
            <span className="text-[#ff2b2b]">[ SYSTEM_VERIFIED ]</span>
            <div className="h-[1px] w-[40px] bg-[#ff2b2b] opacity-50 hidden md:block"></div>
          </div>
        </div>

        {/* ── Header Divider ── */}
        <div
          className="h-[1px] bg-white/10 max-md:!mx-6"
          style={{ marginLeft: "64px", marginRight: "64px", marginBottom: "56px" }}
        />

        {/* ── Grid Layout ── */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-md:!px-6"
          style={{ paddingLeft: "64px", paddingRight: "64px" }}
        >
          {certifications.map((cert) => (
            <div 
              key={cert.id}
              className="cert-card group relative border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden cursor-crosshair flex flex-col justify-between min-h-[240px] max-md:!p-6"
              style={{ padding: "36px" }}
            >
              {/* Animated Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff2b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff2b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff2b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff2b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Huge Background Watermark */}
              <div className="absolute right-[-4%] bottom-[-8%] md:bottom-[-10%] text-[70px] md:text-[110px] font-bold text-white/[0.018] uppercase tracking-tighter leading-none select-none pointer-events-none group-hover:text-white/[0.035] group-hover:scale-105 transition-all duration-500 whitespace-nowrap">
                {cert.watermark}
              </div>

              {/* Internal Content */}
              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] tracking-[0.2em] text-[#e8e8e8]/50">ID: {cert.id}</span>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cert.color }}></div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-[20px] md:text-[24px] uppercase tracking-[0.1em] text-[#e8e8e8] font-semibold leading-snug w-full">
                    {cert.title}
                  </h3>
                  
                  <p className="text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-[#ff2b2b] mt-3">
                    ISSUER: {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Button Link */}
              <div className="relative z-10 mt-10 pt-6 border-t border-white/5 flex justify-start">
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#e8e8e8]/70 hover:text-[#ff2b2b] transition-colors duration-300 group/btn"
                >
                  <span>[ VERIFY_CLEARANCE ]</span>
                  <svg 
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"
                    className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14"></path>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
              
              {/* Scanline Effect on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[100%] bg-gradient-to-b from-transparent via-white/[0.05] to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
