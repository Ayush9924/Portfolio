/**
 * HudChrome — fixed telemetry overlays
 *
 * Renders the four corner elements that frame every page in the
 * intelligence-dashboard aesthetic.  These are layout-level UI —
 * they persist across all page sections and belong in the root
 * layout, not in individual sections.
 *
 * Extracted from page.tsx so:
 *   1. page.tsx stays pure section composition
 *   2. HUD can be conditionally hidden per-page via a context later
 *   3. GSAP can target [data-hud] elements for entrance animations
 *
 * File location:  src/components/ui/HudChrome.tsx
 */

interface HudChromeProps {
  /** Build version string shown in the bottom-right corner. */
  version?: string;
}

export default function HudChrome({ version = "v0.1.0 // 2026.03.12" }: HudChromeProps) {
  return (
    // Fragment — no wrapper div needed since all children are fixed-position
    <>
      {/* ── Top-left: geographic coordinates ─────────────────────────── */}
      <div
        data-hud="top-left"
        aria-hidden="true"
        className="fixed left-4 top-4 z-[9999] font-mono text-xs text-muted"
      >
        <span>LAT 00°00&#39;00&#39;&#39;N</span>
        <span className="mx-3 text-ghost">//</span>
        <span>LNG 000°00&#39;00&#39;&#39;E</span>
      </div>

      {/* ── Top-right: node ID and clearance level ────────────────────── */}
      <div
        data-hud="top-right"
        aria-hidden="true"
        className="fixed right-4 top-4 z-[9999] text-right font-mono text-xs text-muted"
      >
        <span>NODE-Δ7</span>
        <span className="mx-3 text-ghost">//</span>
        <span>CLEARANCE: OMEGA</span>
      </div>

      {/* ── Bottom-left: live telemetry ───────────────────────────────── */}
      <div
        data-hud="bottom-left"
        aria-hidden="true"
        className="fixed bottom-4 left-4 z-[9999] space-y-0.5 font-mono text-xs text-muted"
      >
        <p>[UPLINK]&nbsp; ████████░░ 83%</p>
        <p>[CIPHER]&nbsp; AES-256-GCM / ACTIVE</p>
      </div>

      {/* ── Bottom-right: build version stamp ─────────────────────────── */}
      <div
        data-hud="bottom-right"
        aria-hidden="true"
        className="fixed bottom-4 right-4 z-[9999] font-mono text-xs text-muted"
      >
        {version}
      </div>
    </>
  );
}
