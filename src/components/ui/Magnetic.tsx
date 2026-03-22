"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // QuickTo for high performance zero-latency animation frame rendering
    const xTo = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.45); // 45% pull strength toward cursor
      yTo(y * 0.45);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const el = ref.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Clone the child securely overriding and injecting our local physical matrix ref
  return React.cloneElement(children as React.ReactElement<any>, { ref });
}
