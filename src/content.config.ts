import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// ─── Projects Collection ──────────────────────────────────────────────────────
// Markdown files in src/content/projects/*.md
// The glob loader replaces the legacy `type: 'content'` pattern in Astro v5+

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    platform: z.string(),
    techStack: z.array(z.string()),
    coverImage: z.string(),
    coverImageAlt: z.string(),
    liveUrl: z.string().optional(), // URL format — validated editorially

    featured: z.boolean().default(false),
    order: z.number().default(99),
    completedAt: z.string(), // Format: "YYYY-MM"
  }),
});

// ─── Testimonials Collection ──────────────────────────────────────────────────
// JSON files in src/content/testimonials/*.json

const testimonials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string().optional(),
    quote: z.string(),
    avatar: z.string().optional(),
    rating: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ]),
    date: z.string().optional(),
  }),
});

export const collections = {
  projects,
  testimonials,
};
