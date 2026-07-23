# Loading States Strategy — CodiFlux

## Overview

Loading states communicate to users that something is happening. Without them,
users assume the interface is broken.

For a **static Astro site**, most pages load instantly (no server-side data fetching).
Loading states are primarily needed for:
1. React components that fetch data client-side
2. Form submissions (contact form)
3. Image loading
4. Route transitions

---

## Strategy by Context

### 1. Page Navigation
Astro uses traditional full-page navigation by default (no SPA routing).
The browser's native loading indicator handles this — no custom implementation needed.

*Future: If adding View Transitions API (Astro's `<ViewTransitions />`), loading feedback
is handled by the transition animation itself.*

### 2. Images
Use Astro's `<Image />` component which generates correct `width` and `height`,
preventing layout shift. For added polish, CSS blur-up technique:

```astro
<Image
  src={image}
  alt="..."
  class="transition-[filter] duration-300 data-[loaded]:blur-0 blur-sm"
/>
```

### 3. Form Submission (Contact Form — Phase 3)
Use a React component with explicit states:

```tsx
type FormState = 'idle' | 'submitting' | 'success' | 'error';

// States to implement:
// idle     → Normal form, submit button enabled
// submitting → Button shows spinner, inputs disabled, submit disabled
// success  → Form replaced with success message + animation
// error    → Error message shown, form re-enabled
```

**Never use `disabled` attribute without visual feedback** — users can't tell
if their click registered.

### 4. Skeleton Screens (Future)
If content is fetched client-side (e.g. dynamic portfolio from a CMS), use
skeleton screens instead of spinners. Skeletons reduce perceived load time
because they show the layout while content loads.

```astro
<!-- Skeleton card pattern -->
<div class="animate-pulse rounded-md bg-[var(--color-surface-muted)] h-48 w-full" />
```

---

## Loading Indicators Hierarchy

| Context | Indicator Type | Why |
|---|---|---|
| Full page navigation | Browser native | Sufficient for static pages |
| Button action (form submit) | Inline spinner + disabled state | Confirms click was registered |
| Image loading | CSS blur transition or skeleton | Prevents layout shift perception |
| Data fetch (CMS) | Skeleton screen | Shows layout, reduces perceived wait |
| Long background task | Progress bar | For operations > 3 seconds |

---

## Spinner Component (Reference — Phase 1)

```tsx
// src/components/ui/Spinner.tsx
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string; // aria-label for screen readers
}

export function Spinner({ size = 'md', label = 'Loading...' }: SpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <div role="status" aria-label={label}>
      <svg
        className={`${sizes[size]} animate-spin text-brand-500`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
```

---

## Rules

1. **Always show feedback** within 100ms of user action
2. **Never block UI** for more than 10 seconds without an escape
3. **Always handle errors** — loading states that never resolve break trust
4. **Respect reduced motion** — use opacity fades instead of spinning animations if `prefers-reduced-motion` is set
