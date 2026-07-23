/**
 * General-purpose utility functions.
 * Keep this file pure — no side effects, no DOM access.
 */

/**
 * Joins class names conditionally. Filters out falsy values.
 * Lightweight alternative to `clsx` — no extra dependency needed.
 *
 * @example cn('base-class', isActive && 'active', undefined) → 'base-class active'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a date string like "2024-06" into "June 2024".
 */
export function formatDate(dateString: string): string {
  const date = new Date(`${dateString}-01`);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

/**
 * Truncates a string to `maxLength` characters, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 1)}…`;
}

/**
 * Converts a plain string to a URL-safe slug.
 * @example slugify('Hello World!') → 'hello-world'
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
