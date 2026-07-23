# `src/content/`

Astro Content Collections — type-safe, schema-validated content.

## Structure

```
content/
├── projects/       # Portfolio project markdown files (.md)
└── testimonials/   # Client testimonial data files (.json)
```

## Schema

Schemas are defined in `src/content.config.ts` (project root of `src/`).
Astro validates every file against the schema at build time — a bad file
causes a build error, not a runtime error.

## Adding a Project

1. Create a new `.md` file in `src/content/projects/`
2. Use `kebab-case` filename (becomes the URL slug): `acme-shopify-store.md`
3. Fill in all required frontmatter fields
4. The portfolio page will automatically include it

**Required frontmatter:**
```yaml
---
title: "Project Title"
tagline: "One-line summary for cards"
description: "Full description for the project detail page"
platform: "Shopify"
techStack: ["Liquid", "JavaScript", "CSS"]
coverImage: "/images/projects/acme-shopify-store.jpg"
coverImageAlt: "Descriptive alt text for the screenshot"
liveUrl: "https://acme.com"  # optional
featured: true                # appears on home page preview
order: 1                      # lower = displayed first
completedAt: "2024-06"        # YYYY-MM format
---

Full project case study content goes here in Markdown...
```

## Adding a Testimonial

Create a `.json` file in `src/content/testimonials/`:
```json
{
  "name": "Jane Smith",
  "role": "Founder",
  "company": "Acme Co.",
  "quote": "CodiFlux transformed our online presence completely.",
  "rating": 5,
  "date": "2024-06"
}
```
