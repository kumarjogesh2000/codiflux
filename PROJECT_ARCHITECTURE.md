# CodiFlux — Project Architecture

> **Last updated**: July 2026
> **Status**: Active development — Phase 0.5 (Production Foundation) complete

This document is the definitive technical reference for the CodiFlux website.
Every architectural decision made in this codebase is documented here with its rationale.

---

## Project Overview

**CodiFlux** is the official production website for a professional web development agency
specializing in WordPress, Shopify, Wix, Wix Studio, Squarespace, and React.

| Property | Value |
|---|---|
| Domain | `codiflux.dev` |
| Hosting | Hostinger Premium (Static) |
| Deployment | `astro build` → `dist/` → Hostinger File Manager |
| Repository | GitHub |

---

## Technology Stack

| Layer | Technology | Version | Why |
|---|---|---|---|
| Framework | Astro | ^7 | Best-in-class static site generator. Zero-JS by default, MPA architecture, native content collections, built-in image optimization, and first-class TypeScript support. |
| UI Library | React | ^19 | Used **only** for interactive components (mobile menu, contact form). Astro components handle everything else — zero React overhead on static sections. |
| Styling | Tailwind CSS | v4 | CSS-native design tokens via `@theme`. No config file needed. Excellent DX, minimal bundle (only used classes shipped). |
| Language | TypeScript | strict mode | Type safety prevents an entire class of runtime errors. `@/` path alias prevents fragile relative imports. |
| Sitemap | @astrojs/sitemap | ^3 | Auto-generates `sitemap-index.xml` from all routes. Required for Google Search Console. |
| Linting | ESLint | ^10 (flat config) | Catches bugs and enforces code standards. Includes Astro, TypeScript, and accessibility rules. |
| Formatting | Prettier | ^3 | Consistent code style enforced automatically. Includes Astro and Tailwind class-sorting plugins. |

---

## Architecture Decisions

### 1. Astro Over Next.js / Nuxt

**Decision**: Use Astro for the site framework.

**Rationale**:
- This is a **content site**, not a web application. Astro's MPA model is the correct choice.
- Astro ships **zero JavaScript** to the browser for static components (no hydration overhead).
- Astro's file-based routing, content collections, and image optimization solve 90% of needs natively.
- Next.js/Nuxt ship React/Vue as a baseline runtime even for static pages — unnecessary overhead.

### 2. Static Output Over SSR

**Decision**: Build to static HTML (`output: 'static'`, the Astro default).

**Rationale**:
- Hostinger Premium offers static file hosting — no Node.js runtime available.
- A portfolio/agency site has no need for server-side rendering (no auth, no real-time data).
- Static files: instant TTFB, CDN-cacheable, no server maintenance, zero cold starts.
- Migration to SSR is straightforward if requirements change (flip `output` to `'server'`).

### 3. React Only for Interactivity

**Decision**: Use React exclusively for components requiring client-side state.

**Rationale**:
- Every React component hydrated with `client:load` adds JavaScript to the page.
- Navigation links, service cards, section layouts — none of these need JavaScript.
- Astro's **Islands Architecture** means React and Astro components coexist perfectly.
- Current React islands: `MobileMenu.tsx` (Phase 1), Contact Form (Phase 3).

### 4. Tailwind CSS v4 Without a Config File

**Decision**: Use Tailwind v4 with CSS `@theme` directive for all design tokens.

**Rationale**:
- Tailwind v4 is CSS-native. Tokens are CSS custom properties — consumable anywhere.
- No `tailwind.config.js` means one fewer configuration file to maintain.
- Tokens become utility classes automatically: `--color-brand-600` → `bg-brand-600`.
- Changing a token propagates to the entire site — no find-and-replace.

### 5. Content Collections Over Hard-Coded Data

**Decision**: Portfolio projects and testimonials live in Content Collections (markdown/JSON), not in component code.

**Rationale**:
- Type-safe at build time — Zod schema validation catches bad data before deployment.
- Adding a project = creating one `.md` file, not editing a component.
- Content is separated from presentation (fundamental engineering principle).
- Ready for CMS integration (swap the `glob()` loader for a CMS loader without touching pages).

---

## Folder Structure

```
codiflux/
│
├── docs/                        # Project documentation
│   ├── ACCESSIBILITY.md         # WCAG checklist and testing guide
│   ├── BREAKPOINTS.md           # Responsive breakpoint reference
│   ├── COMMIT_CONVENTIONS.md    # Git commit message standards
│   ├── COMPONENT_PRINCIPLES.md  # Component architecture rules
│   ├── DESIGN_TOKENS.md         # Design token reference
│   ├── IMAGE_OPTIMIZATION.md    # Image strategy and Astro usage
│   ├── LOADING_STATES.md        # Loading state patterns
│   ├── MOTION_GUIDELINES.md     # Animation standards and accessibility
│   ├── PERFORMANCE.md           # Core Web Vitals checklist
│   └── SECURITY_HEADERS.md      # Hostinger .htaccess security config
│
├── public/                      # Copied as-is to dist/ (not processed)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt               # Search engine crawler rules
│   └── og/                      # Open Graph images (1200×630px)
│
├── src/
│   ├── assets/                  # Build-time optimized images (Astro processes)
│   │   └── images/
│   │
│   ├── components/              # All reusable UI
│   │   ├── layout/              # Header, Footer, Nav (Astro — no JS)
│   │   ├── sections/            # Page sections: Hero, Services, etc.
│   │   ├── seo/                 # SEOHead — centralised meta tags
│   │   └── ui/                  # Primitives: Button, Card, Badge, Tag
│   │
│   ├── content/                 # Content Collections data
│   │   ├── projects/            # Portfolio markdown files
│   │   └── testimonials/        # Client testimonial JSON files
│   │
│   ├── layouts/                 # Page wrappers (composition, not UI)
│   │   ├── BaseLayout.astro     # HTML shell: <html>, SEOHead, global CSS
│   │   ├── PageLayout.astro     # Standard: BaseLayout + Header + Footer
│   │   └── ProjectLayout.astro  # Portfolio case study pages
│   │
│   ├── lib/                     # Pure logic (no UI, no DOM)
│   │   ├── constants.ts         # Site-wide constants (single source of truth)
│   │   ├── seo.ts               # SEO helper functions
│   │   └── utils.ts             # General utilities
│   │
│   ├── pages/                   # File-based routing
│   │   ├── index.astro          # / (Home)
│   │   ├── about.astro          # /about
│   │   ├── services.astro       # /services
│   │   ├── portfolio/
│   │   │   ├── index.astro      # /portfolio
│   │   │   └── [slug].astro     # /portfolio/:slug
│   │   ├── contact.astro        # /contact
│   │   ├── 404.astro            # Custom 404
│   │   └── 500.astro            # Custom 500 (SSR reference)
│   │
│   ├── styles/
│   │   └── global.css           # Design system: tokens + Tailwind + base styles
│   │
│   └── types/                   # TypeScript interfaces
│       ├── index.ts             # Barrel re-export
│       ├── nav.ts
│       ├── project.ts
│       ├── service.ts
│       └── testimonial.ts
│
├── .editorconfig                # Editor consistency rules
├── .env.example                 # Environment variable documentation
├── .gitattributes               # Git file handling (LF normalization)
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier formatting configuration
├── .prettierignore              # Prettier ignore rules
├── astro.config.mjs             # Astro configuration
├── content.config.ts            # (future — alternative location)
├── eslint.config.js             # ESLint flat configuration
├── package.json                 # Dependencies and scripts
├── PROJECT_ARCHITECTURE.md      # This file
├── README.md                    # Developer getting-started guide
└── tsconfig.json                # TypeScript configuration
```

---

## Data Flow

```
constants.ts ──────────────────────────────────────────→ components
     │         (site identity, nav, services, process)
     └─────────────────────────────────────────────────→ SEOHead

Content Collections ────────────────────────────────────→ pages
    projects/*.md                                    [slug].astro
    testimonials/*.json                              index.astro

pages/*.astro ──uses──→ PageLayout.astro ──uses──→ BaseLayout.astro
                                │                       │
                                ├──→ Header.astro        └──→ SEOHead.astro
                                │       └──→ Nav.astro
                                └──→ Footer.astro
```

---

## Component Hierarchy

```
BaseLayout (HTML shell, SEO, CSS)
└── PageLayout (Header + main + Footer)
    ├── Header
    │   ├── Logo (wordmark)
    │   ├── Nav (desktop links)
    │   ├── CTA button
    │   └── MobileMenu.tsx (React — client:load)
    │
    ├── [Page Content] — slot
    │   └── sections/*.astro
    │       └── ui/*.astro
    │
    └── Footer
        ├── Brand column
        ├── Navigation groups
        └── Social links
```

---

## SEO Architecture

Every page automatically gets:
- `<title>` — formatted via `buildTitle()` in `seo.ts`
- `<meta name="description">` — from page props or site default
- `<link rel="canonical">` — built from `Astro.url.pathname`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`)
- Twitter Card tags
- JSON-LD structured data (Organization schema)

The `SEOHead.astro` component is the single location for all meta tags.
**Never add `<title>` or `<meta>` tags directly in pages** — always use SEOHead via a layout.

---

## Performance Strategy

| Concern | Solution |
|---|---|
| JavaScript bundle | Astro zero-JS static components |
| Image optimization | Astro `<Image />` with WebP + lazy loading |
| Font loading | Google Fonts with `display=swap` + preconnect |
| CSS bundle | Tailwind purges unused classes at build time |
| Caching | `.htaccess` cache headers on Hostinger |
| Sitemap | Auto-generated by `@astrojs/sitemap` |

See `docs/PERFORMANCE.md` for full checklist and targets.

---

## Development Phases

| Phase | Status | Focus |
|---|---|---|
| Phase 0 | ✅ Complete | Foundation: types, constants, layouts, design system |
| Phase 0.5 | ✅ Complete | Production foundation: tooling, docs, error pages |
| Phase 1 | ⏳ Next | Core UI components: Button, Card, Badge, MobileMenu |
| Phase 2 | 🔲 Planned | Home page: Hero, Services, Portfolio, Testimonials, CTA |
| Phase 3 | 🔲 Planned | Inner pages: About, Services, Portfolio, Contact |
| Phase 4 | 🔲 Planned | Performance & SEO polish: Lighthouse 100, structured data |
| Phase 5 | 🔲 Planned | Deployment: Hostinger setup, DNS, SSL, .htaccess |

---

## Scripts Reference

```bash
npm run dev          # Start dev server (localhost:4321)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run check        # TypeScript + Astro type checking
npm run lint         # ESLint (0 warnings policy)
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier format all files
npm run format:check # Check formatting without writing
```

---

## Deployment Checklist

Before every production deployment:

1. `npm run check` — 0 errors
2. `npm run lint` — 0 warnings
3. `npm run format:check` — all files formatted
4. `npm run build` — successful build
5. Review `dist/` — verify expected pages/assets
6. Upload `dist/` contents to Hostinger `public_html/`
7. Verify `https://codiflux.dev` loads correctly
8. Verify sitemap at `https://codiflux.dev/sitemap-index.xml`
9. Check security headers at `securityheaders.com`
