# `src/components/`

Reusable UI components organised by layer.

## Folder Structure

```
components/
├── layout/      # Structural shell components (Header, Footer, Nav)
├── sections/    # Page section components (Hero, Services, etc.)
├── seo/         # SEO-specific components (SEOHead)
└── ui/          # Primitive design system components (Button, Card, Badge)
```

## Rules

1. `ui/` components are **generic** — no business logic, no hardcoded content
2. `sections/` components are **page-specific** — use `ui/` primitives
3. `layout/` components are **singletons** — rendered once per page
4. Default to `.astro` — only use `.tsx` when interactivity is required

See [`docs/COMPONENT_PRINCIPLES.md`](../../docs/COMPONENT_PRINCIPLES.md) for full guidelines.
