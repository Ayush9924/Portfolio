/**
 * Skills — technical capabilities section
 *
 * This will eventually contain:
 *   - Skills grouped by domain (Frontend, 3D/WebGL, Tools, etc.)
 *   - Each skill shown as a classified-system "operational capability"
 *   - Proficiency rendered as a scanline progress bar that fills on
 *     intersection with the viewport
 *   - Subtle GSAP stagger on the capability bars
 *
 * File location:  src/sections/skills/Skills.tsx
 */

import PageWrapper from "@/components/layout/PageWrapper";

// Placeholder capability groups — replace with real data
const CAPABILITY_GROUPS = [
  { domain: "FRONTEND OPS", count: 8 },
  { domain: "3D / WEBGL",   count: 5 },
  { domain: "TOOLCHAIN",    count: 6 },
] as const;

export default function Skills() {
  return (
    <PageWrapper id="skills" className="py-32 max-md:py-16">
      <div className="terminal-panel w-full px-8 py-7 font-mono max-md:px-4">

        <header className="mb-6 flex items-center justify-between border-b border-[rgba(255,43,43,0.12)] pb-4 text-xs">
          <span className="text-muted">[SECTION 04 // SKILLS]</span>
          <span className="text-ghost">CAPABILITY ASSESSMENT: COMPLETE</span>
        </header>

        <div className="space-y-2">
          <p className="text-xs tracking-[0.3em] text-muted">
            OPERATIVE CAPABILITIES // TECHNICAL ASSESSMENT
          </p>
          <h2 className="text-xl font-bold tracking-widest">SKILLS</h2>
        </div>

        <hr className="term-divider" />

        {/* Capability groups */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CAPABILITY_GROUPS.map(({ domain, count }) => (
            <div key={domain} className="space-y-3">
              <p className="text-xs text-muted">{domain}</p>
              {/* Placeholder skill bars */}
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs text-ghost">████████████</p>
                  {/* Progress bar shell */}
                  <div className="h-px w-full bg-[rgba(255,43,43,0.12)]">
                    <div className="h-full w-0 bg-[rgba(255,43,43,0.4)]" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <hr className="term-divider" />

        <p className="text-xs text-ghost">
          ↳ [PENDING] Skill data from @/data + scrollTrigger progress bars
        </p>

      </div>
    </PageWrapper>
  );
}
