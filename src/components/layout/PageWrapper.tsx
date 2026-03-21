/**
 * PageWrapper — section layout container
 *
 * Every page section is wrapped in this component.  It provides:
 *   - Consistent horizontal padding that responds to breakpoints
 *   - An optional max-width constraint that keeps lines readable
 *   - Cinematic "full viewport height" mode for hero-style sections
 *   - A polymorphic `as` prop so the rendered HTML element is correct
 *     (section, article, div, main) without extra wrappers
 *
 * File location:  src/components/layout/PageWrapper.tsx
 *
 * Usage:
 *   <PageWrapper id="hero" fullHeight>
 *     <HeroContent />
 *   </PageWrapper>
 *
 *   <PageWrapper id="skills" className="py-32">
 *     <Skills />
 *   </PageWrapper>
 */

import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

// ── Types ────────────────────────────────────────────────────────────────────

type AllowedTag = "section" | "article" | "div" | "main" | "aside";

/**
 * PageWrapperProps extends the native attributes of whatever HTML element
 * `as` resolves to, so callers can pass e.g. aria-label or data attributes
 * without a custom prop for each.
 */
type PageWrapperProps<T extends AllowedTag = "section"> = {
  /** Content to render inside the wrapper. */
  children: ReactNode;
  /** Additional Tailwind classes applied to the outer element. */
  className?: string;
  /** Anchor id — used by smooth-scroll navigation links. */
  id?: string;
  /**
   * Stretch to fill the full viewport height and vertically centre
   * content.  Enable for hero-style, cinematic opening sections.
   * @default false
   */
  fullHeight?: boolean;
  /**
   * Apply a max-width cap and auto horizontal margins so text lines
   * never become too wide on ultra-wide screens.
   * @default true
   */
  contained?: boolean;
  /**
   * The HTML tag to render.  Pick the semantically correct element
   * for the section's role in the document outline.
   * @default "section"
   */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "id" | "children">;

// ── Component ────────────────────────────────────────────────────────────────

export default function PageWrapper<T extends AllowedTag = "section">({
  children,
  className,
  id,
  fullHeight = false,
  contained = true,
  as,
  ...rest
}: PageWrapperProps<T>) {
  // Cast needed because TypeScript cannot narrow `as` through the generic.
  const Tag = (as ?? "section") as ElementType;

  return (
    <Tag
      id={id}
      className={cn(
        // ── Base ──────────────────────────────────────────────────────────
        "relative w-full",

        // ── Responsive horizontal padding ─────────────────────────────────
        // Tighter on small screens; generous on desktop so the grid is
        // visible at the edges and content doesn't feel claustrophobic.
        "px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24",

        // ── Cinematic full-height mode ────────────────────────────────────
        // min-h-dvh instead of min-h-screen: respects mobile viewport
        // changes from browser chrome appearing / disappearing.
        fullHeight && "flex min-h-dvh flex-col justify-center",

        // ── Content containment ───────────────────────────────────────────
        // max-w-screen-2xl keeps layout sane on 4K monitors.
        // mx-auto centres the constrained block.
        contained && "mx-auto max-w-screen-2xl",

        // ── Caller overrides ──────────────────────────────────────────────
        className,
      )}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Tag>
  );
}
