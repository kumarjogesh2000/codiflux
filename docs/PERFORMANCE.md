# Performance Checklist — CodiFlux

**Targets (Core Web Vitals — "Good" thresholds)**

| Metric | Target | Measures |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Loading speed |
| INP (Interaction to Next Paint) | < 200ms | Interactivity |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| TTFB (Time to First Byte) | < 600ms | Server response |
| FCP (First Contentful Paint) | < 1.8s | Perceived speed |

Run Lighthouse in Chrome DevTools → Performance tab to measure.

---

## Build-Time Optimizations (Astro handles these ✅)

- [x] Static HTML generation — zero JavaScript for static pages
- [x] Sitemap auto-generation (`@astrojs/sitemap`)
- [x] TypeScript compiled and stripped at build time
- [x] Dead code elimination via Vite tree-shaking
- [x] CSS purging (Tailwind only ships used classes)

## Fonts

- [x] Google Fonts loaded via CSS `@import` with `display=swap`
- [x] `<link rel="preconnect">` to `fonts.googleapis.com` and `fonts.gstatic.com`
- [ ] **Consider**: Self-host Inter for zero external requests
  - Tool: https://gwfh.mranftl.com/fonts/inter
  - Place `.woff2` files in `public/fonts/`
  - Replace Google Fonts import with local `@font-face`

## Images

- [ ] All images use Astro `<Image />` component
- [ ] Hero image: `loading="eager"`, all others: `loading="lazy"`
- [ ] Hero image served as WebP, < 150KB
- [ ] All images have explicit `width` and `height` (prevents CLS)
- [ ] Open Graph image is exactly 1200×630px

## JavaScript

- [ ] React components only used where interactivity is required
- [ ] `client:load` only for above-fold interactive components
- [ ] `client:visible` for below-fold interactive components (defers JS)
- [ ] `client:idle` for low-priority interactive components
- [ ] No large third-party JS libraries imported unnecessarily

**Astro client directives reference:**
```astro
<!-- Hydrate immediately (above-fold interactive) -->
<Component client:load />

<!-- Hydrate when component enters viewport -->
<Component client:visible />

<!-- Hydrate when browser is idle -->
<Component client:idle />

<!-- Never hydrate (static, no JS sent) -->
<Component />
```

## CSS

- [x] Tailwind CSS v4 — only used classes are compiled
- [x] CSS custom properties for design tokens (no duplicate values)
- [ ] Critical CSS inlined for above-fold content (future optimization)
- [ ] No unused `@import` statements

## Caching (Hostinger)

Configure these in Hostinger's `.htaccess` (cPanel → File Manager):

```apache
# Cache static assets for 1 year
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
  AddOutputFilterByType DEFLATE image/svg+xml application/json
</IfModule>
```

## Pre-Launch Performance Checklist

- [ ] Lighthouse Performance score: ≥ **95**
- [ ] LCP < 2.5s (measured on real mobile 4G)
- [ ] CLS < 0.1 on all pages
- [ ] No render-blocking resources
- [ ] PageSpeed Insights score ≥ 90 (mobile)
- [ ] Total page weight < 500KB (excluding fonts)
- [ ] `.htaccess` caching rules configured on Hostinger
- [ ] gzip compression enabled
