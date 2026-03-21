/**
 * GridOverlay — radar-grid background layer
 *
 * Renders the cyber grid as a real DOM node rather than a CSS
 * background-image on <body>.  This approach lets GSAP or
 * React Three Fiber animate the overlay's opacity per-section
 * during scroll transitions — something impossible with a pure-CSS
 * body background.
 *
 * Render order (bottom → top):
 *   black <body>          z-auto
 *   GridOverlay           z-0      ← this component
 *   section content       z-10+
 *   HudChrome overlays    z-[9999]
 *   body::after vignette  z-[9997]
 *   body::before scanline z-[9998]
 *
 * File location:  src/components/ui/GridOverlay.tsx
 */

import { cn } from "@/utils/cn";

interface GridOverlayProps {
  /**
   * Additional classes — useful for scoped opacity overrides
   * e.g. className="opacity-30" on low-information sections.
   */
  className?: string;
  /**
   * Grid cell size in pixels.
   * @default 40
   */
  cellSize?: number;
  /**
   * Line opacity as a decimal.
   * @default 0.06
   */
  lineOpacity?: number;
}

export default function GridOverlay({
  className,
  cellSize = 40,
  lineOpacity = 0.06,
}: GridOverlayProps) {
  const lineColor = `rgba(255, 43, 43, ${lineOpacity})`;
  const size = `${cellSize}px ${cellSize}px`;

  return (
    <div
      aria-hidden="true"
      data-grid-overlay
      className={cn(
        // Fixed so it stays in place during scroll — it's a
        // viewport-level decoration, not a section-level one.
        "pointer-events-none fixed inset-0 z-0",
        className,
      )}
      style={{
        backgroundImage: [
          `linear-gradient(${lineColor} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: size,
      }}
    />
  );
}
