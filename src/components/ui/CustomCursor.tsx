"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide native cursor strictly where our custom GSAP cursor works
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      document.body.style.cursor = "none";
      const interactiveElements = document.querySelectorAll("a, button, input");
      interactiveElements.forEach((el) => {
        (el as HTMLElement).style.cursor = "none";
      });
    }

    const mouse = { x: 0, y: 0 };
    
    // Create zero-latency QuickSet trackers for the physical x/y transforms
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xTo(mouse.x);
      yTo(mouse.y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scan for interactive hover states across the whole document
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .cert-card, .hover-trigger")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement;
      if (!target || !target.closest("a, button, .cert-card, .hover-trigger")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(bracketsRef.current, { scale: 1.5, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(cursorRef.current, { borderColor: "rgba(255,43,43, 0.4)", duration: 0.3 });
    } else {
      gsap.to(bracketsRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(cursorRef.current, { borderColor: "rgba(255,255,255, 0.1)", duration: 0.3 });
    }
  }, [isHovering]);

  return (
    <div className="hidden md:block pointer-events-none fixed top-0 left-0 z-[99999]" style={{ mixBlendMode: "difference" }}>
      {/* Container physically mapped by GSAP */}
      <div 
        ref={cursorRef} 
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[12px] h-[12px] border border-white/10 rounded-full"
      >
        {/* Central targeting dot */}
        <div className="w-[2px] h-[2px] bg-[#ff2b2b] rounded-full shadow-[0_0_8px_#ff2b2b]" />

        {/* Expanding targeting brackets [   ] for hover interaction */}
        <div 
          ref={bracketsRef} 
          className="absolute inset-0 flex items-center justify-between opacity-0 scale-75 text-[#ff2b2b] text-[10px] font-mono tracking-widest pointer-events-none w-[32px] h-[32px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="leading-none select-none">[</span>
          <span className="leading-none select-none">]</span>
        </div>
      </div>
    </div>
  );
}
