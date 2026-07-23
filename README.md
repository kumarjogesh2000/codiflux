# CodiFlux — Official Agency Website

**Production website for CodiFlux** — a professional web development agency specializing in WordPress, Shopify, Wix, and React.

🌐 **Live**: [codiflux.dev](https://codiflux.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro v7 |
| UI Library | React v19 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Hosting | Hostinger (static) |
| Deployment | `dist/` → Hostinger File Manager |

---

## Project Structure

```
src/
├── assets/          # Build-time optimized images
├── components/
│   ├── layout/      # Header, Footer, Nav
│   ├── sections/    # Page sections (Hero, Services, etc.)
│   ├── seo/         # SEOHead — centralised meta tags
│   └── ui/          # Primitive UI components (Button, Card, Badge)
├── content/
│   ├── config.ts    # Content Collection schemas (Zod)
│   ├── projects/    # Portfolio project markdown files
│   └── testimonials/# Client testimonial JSON files
├── layouts/
│   ├── BaseLayout.astro     # HTML shell
│   ├── PageLayout.astro     # Header + content + Footer
│   └── ProjectLayout.astro  # Portfolio case study pages
├── lib/
│   ├── constants.ts  # Site identity, nav, services data
│   ├── seo.ts        # SEO helper functions
│   └── utils.ts      # General utilities (cn, formatDate, etc.)
├── pages/            # File-based routing
│   ├── index.astro
│   ├── about.astro
│   ├── services.astro
│   ├── portfolio/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── contact.astro
│   └── 404.astro
├── styles/
│   └── global.css    # Design tokens + Tailwind import
└── types/            # TypeScript interfaces
    ├── index.ts      # Barrel re-export
    ├── nav.ts
    ├── project.ts
    ├── service.ts
    └── testimonial.ts
```

---

## Development

```bash
# Install dependencies
npm install

# Start dev server (background)
astro dev --background

# Stop dev server
astro dev stop

# Check for errors
astro check

# Build for production
astro build

# Preview production build
astro preview
```

Dev server runs at: **http://localhost:4321**

---

## Path Aliases

Use `@/` to import from `src/` — no fragile relative paths.

```ts
import { SITE } from '@/lib/constants';
import type { Project } from '@/types';
```

---

## Deployment

1. Run `astro build`
2. Upload contents of `dist/` to Hostinger via File Manager or FTP
3. Ensure `public_html` root is pointed to the deployed files

---

## Design System

Colors, typography, spacing, and animation tokens are defined in `src/styles/global.css`.
The system uses Tailwind v4's `@theme` directive — no `tailwind.config.js` needed.

**Primary palette**: Violet (`--color-brand-*`)
**Accent palette**: Amber (`--color-accent-*`)
**Font**: Inter (Google Fonts)
