# Responsive Breakpoints — CodiFlux

## Tailwind CSS v4 Default Breakpoints

CodiFlux uses Tailwind's built-in breakpoint system (no customization needed).

| Breakpoint | Prefix | Min-Width | Typical Device |
|---|---|---|---|
| Mobile (default) | _(none)_ | `0px` | Phones portrait |
| Small | `sm:` | `640px` | Phones landscape, small tablets |
| Medium | `md:` | `768px` | Tablets portrait |
| Large | `lg:` | `1024px` | Tablets landscape, small laptops |
| Extra Large | `xl:` | `1280px` | Desktops |
| 2XL | `2xl:` | `1536px` | Large desktops |

---

## Design Strategy: Mobile-First

All styles are written for **mobile first**, then extended for larger screens.

```astro
<!-- ✅ Correct — mobile base, scale up -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- ❌ Wrong — desktop base, scale down -->
<div class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

---

## Container Max-Width

Defined in `global.css` as the `.container` utility:

| Viewport | Max Width | Padding |
|---|---|---|
| Mobile | `100%` | `1.5rem` (24px) each side |
| Tablet (`md:`) | `100%` | `2rem` (32px) each side |
| Desktop (`xl:`) | `1200px` | `2.5rem` (40px) each side |

```astro
<!-- Always wrap page sections in .container -->
<section>
  <div class="container">
    <!-- content -->
  </div>
</section>
```

---

## Section Spacing (Responsive)

The `.section-padding` utility class:

| Viewport | Padding (block) |
|---|---|
| Mobile | `6rem` (96px) |
| Tablet+ (`md:`) | `8rem` (128px) |

---

## Typography Scale (Responsive)

Hero heading example:
```astro
<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
  Headline
</h1>
```

Section heading example:
```astro
<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold">
  Section Title
</h2>
```

---

## Grid Patterns

### Standard Content Grid
```astro
<!-- Cards: 1 → 2 → 3 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Services: 1 → 2 → 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
```

### Portfolio Grid
```astro
<!-- Portfolio: 1 → 2 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
```

### Footer Grid (5-column on desktop)
```astro
<!-- Footer: 1 → 2 → 5 columns -->
<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
```

---

## Navigation Breakpoint

| Viewport | Navigation Style |
|---|---|
| `< md` (< 768px) | Mobile hamburger menu |
| `≥ md` (≥ 768px) | Desktop horizontal nav |

The Header component shows:
- `hidden md:block` — desktop nav
- `md:hidden` — mobile menu button

---

## Testing Breakpoints

During development, use Chrome DevTools device toolbar (Ctrl+Shift+M).

**Priority test viewports:**
- 375px — iPhone SE / small phones
- 390px — iPhone 14 Pro
- 768px — iPad portrait
- 1280px — Standard laptop
- 1440px — Large desktop

**Rule**: Test every component at 375px, 768px, and 1280px as a minimum.
