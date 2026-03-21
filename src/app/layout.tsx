import type { Metadata } from "next";
import { Space_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import GridOverlay from "@/components/ui/GridOverlay";
import HudChrome from "@/components/ui/HudChrome";

/**
 * Space Mono — canonical terminal typeface.
 * Loaded via next/font so it is self-hosted, zero layout-shift.
 * The CSS variable --font-space-mono is picked up by globals.css
 * and mapped to --font-terminal → Tailwind's font-mono utility.
 */
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

/** Playfair Display — cinematic serif for hero headlines. */
const playfair = Playfair_Display({
  weight:   ["400", "700", "800", "900"],
  subsets:  ["latin"],
  variable: "--font-playfair",
  display:  "swap",
});

export const metadata: Metadata = {
  title: "PORTFOLIO // CLASSIFIED",
  description:
    "Classified intelligence system. Unauthorised access is prohibited and monitored.",
  keywords: ["portfolio", "creative developer", "frontend engineer"],
  robots: "index, follow",
  openGraph: {
    title: "PORTFOLIO // CLASSIFIED",
    description: "Classified intelligence system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * Font variable injected at <html> level so it is available
     * inside portals and modals appended to <body>.
     *
     * CRT scanlines (body::before) and vignette (body::after) are
     * still in globals.css.  The grid is handled by <GridOverlay>.
     */
    <html lang="en" className={`${spaceMono.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {/*
         * GridOverlay — fixed radar-grid layer (z-0)
         * Extracted from body CSS so GSAP can animate it per-section.
         *
         * HudChrome — fixed telemetry corners (z-[9999])
         * Sits above all page content; persists across all routes.
         */}
        <GridOverlay />
        <HudChrome />
        {children}
      </body>
    </html>
  );
}

