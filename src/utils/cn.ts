/**
 * cn — class-name merge utility
 *
 * Combines multiple class strings, filtering out falsy values.
 * Kept dependency-free intentionally; swap the body for
 * `clsx` + `tailwind-merge` if Tailwind utility conflicts appear.
 *
 * Usage:
 *   cn("base-class", condition && "conditional-class", props.className)
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}
