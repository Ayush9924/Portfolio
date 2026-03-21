/**
 * page.tsx — Root page
 *
 * Shows a cinematic system boot loader on mount, then fades to
 * reveal the main portfolio sections.
 *
 * All layout chrome (GridOverlay, HudChrome) lives in layout.tsx.
 * All section logic/markup lives in src/sections/.
 */
"use client";

import { useState } from "react";
import SystemLoader from "@/components/ui/SystemLoader";
import Hero           from "@/sections/hero/Hero";
import TrackingLine   from "@/components/hero/TrackingLine";
import EvidenceBoard from "@/sections/evidence-board/EvidenceBoard";
import SubjectProfile from "@/sections/subject-profile/SubjectProfile";
import Certifications from "@/sections/certifications/Certifications";
import Skills from "@/sections/skills/Skills";
import Contact from "@/sections/contact/Contact";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      {/* System boot loader — visible until complete */}
      {!loaderComplete && (
        <SystemLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Main content — hidden initially, revealed after loader */}
      <main
        className={`relative z-10 transition-opacity duration-1000 ${loaderComplete ? "opacity-100" : "opacity-0"
          }`}
      >
        <TrackingLine />
        <Hero />
        <div className="mt-14 md:mt-24 lg:mt-28">
          <EvidenceBoard />
        </div>
        <SubjectProfile />
        <Certifications />
        {/* <Skills /> */}
        <Contact />
      </main>
    </>
  );
}

