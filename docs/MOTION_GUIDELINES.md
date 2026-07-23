# Motion & Animation Guidelines — CodiFlux

## Philosophy

> "Animation should serve communication, not decorate it."

Animations exist to:
1. **Guide attention** — direct the user's eye to what matters
2. **Provide feedback** — confirm that an action was registered
3. **Communicate relationships** — show how elements relate spatially
4. **Reduce perceived wait time** — make loading feel faster

Animations should **not**:
- Exist purely for decoration
- Distract from content
- Loop endlessly without purpose
- Run on every scroll event (performance killer)

---

## Accessibility First: `prefers-reduced-motion`

All animations **must** respect the user's OS-level reduced motion preference.
This is implemented globally in `global.css` — no per-component action needed.

```css
/* Already in global.css — disables all animations for reduced-motion users */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

For JavaScript animations (e.g. GSAP, Framer Motion):
```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  // run animation
}
```

---

## Duration Standards

Defined in `global.css` `@theme`:

| Token | Value | Use Case |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states, color transitions |
| `--duration-base` | `250ms` | Most UI transitions (default) |
| `--duration-slow` | `400ms` | Page section entrances, modals |

**Rule**: Never exceed `600ms` for UI feedback. Longer = feels broken.

---

## Easing Standards

| Token | Curve | Use Case |
|---|---|---|
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default — most transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful, springy entrances |
| `--ease-in-expo` | `cubic-bezier(0.95, 0.05, 0.795, 0.035)` | Elements exiting screen |

Never use `linear` for UI animations — it feels mechanical.
Use `ease-out` for entrances, `ease-in` for exits.

---

## Animation Patterns

### 1. Fade Up (Section entrance)
```css
.animate-fade-up {
  animation: fadeUp var(--duration-slow) var(--ease-smooth) both;
}
```
Use for: Hero headings, section titles, card entrances.

### 2. Fade In (Simple reveal)
```css
.animate-fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-smooth) both;
}
```
Use for: Images, subtle reveals.

### 3. Hover Transitions (CSS only)
```css
/* Standard hover — always use this pattern */
.element {
  transition: color var(--duration-fast) var(--ease-smooth),
              background-color var(--duration-fast) var(--ease-smooth),
              border-color var(--duration-fast) var(--ease-smooth),
              box-shadow var(--duration-base) var(--ease-smooth);
}
```

---

## What NOT to Animate

| Avoid | Reason |
|---|---|
| Animating `width` / `height` | Triggers layout recalculation (slow) |
| Animating `top` / `left` | Triggers layout recalculation |
| Continuous background animations | High CPU, distracting |
| Animating on every scroll event | Jank on slower devices |

**Only animate**: `transform`, `opacity`, `filter`. These use the GPU compositor.

---

## Scroll-Triggered Animations (Future — Phase 4)

Use the Intersection Observer API instead of scroll event listeners:

```ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-up');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

Add `data-animate` attribute to elements that should animate in on scroll.
This pattern works with `prefers-reduced-motion` since the class simply won't
run (durations are set to 0.01ms by the media query).
