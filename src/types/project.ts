/**
 * Portfolio project — mirrors the Astro Content Collection schema.
 * Used for TypeScript type safety in components that receive project data.
 */
export interface Project {
  /** URL-safe slug (matches filename in content/projects/) */
  slug: string;
  /** Display title */
  title: string;
  /** One-sentence summary for cards */
  tagline: string;
  /** Full description for the project detail page */
  description: string;
  /** Primary technology / platform (e.g. "Shopify", "WordPress") */
  platform: string;
  /** Additional tech used */
  techStack: string[];
  /** Cover image path (relative to /public or /src/assets) */
  coverImage: string;
  /** Alt text for the cover image */
  coverImageAlt: string;
  /** Live site URL */
  liveUrl?: string;
  /** Featured on home page portfolio preview */
  featured: boolean;
  /** Sort order (lower = displayed first) */
  order: number;
  /** ISO date string — "2024-06" */
  completedAt: string;
}
