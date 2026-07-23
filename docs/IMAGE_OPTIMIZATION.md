# Image Optimization Strategy — CodiFlux

## Overview

Astro provides a built-in `<Image />` component that automatically:
- Converts images to modern formats (WebP, AVIF)
- Generates correct `width` and `height` attributes (prevents layout shift)
- Applies lazy loading by default
- Generates responsive `srcset` attributes

**Always prefer `<Image />` over plain `<img />` for local images.**

---

## Decision Matrix

| Image Type | Recommended Approach | Reason |
|---|---|---|
| Portfolio screenshots | `<Image />` from `src/assets/` | Astro optimizes at build time |
| Hero/section backgrounds | `<Image />` or CSS `background-image` | Depends on CLS requirements |
| Team/avatar photos | `<Image />` from `src/assets/` | Consistent sizing + format |
| SVG icons/logos | Inline SVG or `<img>` | SVGs don't need raster optimization |
| Open Graph images | Static PNG in `public/og/` | Must be exact size: 1200×630px |
| Client logos (small) | Inline SVG where possible | Sharpest at all resolutions |

---

## Directory Structure

```
src/
└── assets/
    └── images/
        ├── projects/        # Portfolio project screenshots
        ├── team/            # Team/avatar photos
        └── sections/        # Section-specific images

public/
└── og/
    └── og-default.png      # Default OG image (1200×630px)
```

**Rule**: Images in `src/assets/` are **processed by Astro** (optimized).
Images in `public/` are **copied as-is** (use for favicons, OG images, robots.txt).

---

## Usage

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/images/sections/hero-bg.jpg';
---

<!-- Astro optimizes this automatically -->
<Image
  src={heroImage}
  alt="Descriptive alt text — never leave this empty"
  width={1200}
  height={630}
  loading="eager"
  decoding="async"
  format="webp"
/>
```

### Loading Priority

| Scenario | `loading` value | Reason |
|---|---|---|
| Hero image (above fold) | `eager` | LCP candidate — load immediately |
| All other images | `lazy` (default) | Defer until near viewport |

---

## Format Guidelines

| Format | Use When |
|---|---|
| **WebP** | Default for all photos and screenshots |
| **AVIF** | Higher compression needed (larger images) |
| **PNG** | Screenshots with sharp text/UI |
| **SVG** | Icons, logos, illustrations |
| **JPEG** | Legacy fallback only |

---

## Quality Settings

```astro
<!-- High quality for portfolio hero shots -->
<Image src={image} alt="..." quality={90} />

<!-- Standard quality for thumbnails -->
<Image src={image} alt="..." quality={80} />
```

---

## Alt Text Requirements

- **Never** use empty alt (`alt=""`) on informational images
- **Always** describe what the image communicates, not what it looks like
- ❌ `alt="screenshot"` — useless
- ❌ `alt="project image"` — useless
- ✅ `alt="Homepage of Acme Co Shopify store showing hero banner and featured products"` — descriptive

Decorative images that convey no information should use `alt=""` and `role="presentation"`.

---

## Performance Targets

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total image weight per page | < 500KB |
| Hero image | < 150KB (WebP) |

---

## Pre-launch Checklist

- [ ] All `<img>` tags replaced with `<Image />` where applicable
- [ ] All images have meaningful `alt` text
- [ ] Hero image uses `loading="eager"`
- [ ] OG image exists at `public/og/og-default.png` (1200×630px)
- [ ] No images served over 1MB
- [ ] Run Lighthouse and verify LCP < 2.5s
