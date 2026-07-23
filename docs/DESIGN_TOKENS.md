# Design Tokens — CodiFlux

All design tokens are defined in `src/styles/global.css` using Tailwind CSS v4's
`@theme` directive. Tokens automatically become Tailwind utility classes.

**Golden rule: Never use raw hex values in components. Always use tokens.**

---

## Color — Brand (Violet)

Primary action color. Used for CTAs, active states, focus rings, highlights.

| Token | Value | Tailwind Class | Use |
|---|---|---|---|
| `--color-brand-50` | `#f5f3ff` | `bg-brand-50` | Subtle tints on light |
| `--color-brand-100` | `#ede9fe` | `bg-brand-100` | — |
| `--color-brand-200` | `#ddd6fe` | `bg-brand-200` | — |
| `--color-brand-300` | `#c4b5fd` | `bg-brand-300` | — |
| `--color-brand-400` | `#a78bfa` | `text-brand-400` | Text on dark bg |
| `--color-brand-500` | `#8b5cf6` | `bg-brand-500` | Focus rings |
| `--color-brand-600` | `#7c3aed` | `bg-brand-600` | **Primary buttons** |
| `--color-brand-700` | `#6d28d9` | `bg-brand-700` | Button hover |
| `--color-brand-800` | `#5b21b6` | `bg-brand-800` | — |
| `--color-brand-900` | `#4c1d95` | `bg-brand-900` | — |
| `--color-brand-950` | `#2e1065` | `bg-brand-950` | Deep backgrounds |

## Color — Accent (Amber)

Warm contrast to violet. Used for highlighting, badges, secondary CTAs.

| Token | Value | Tailwind Class | Use |
|---|---|---|---|
| `--color-accent-400` | `#fbbf24` | `text-accent-400` | — |
| `--color-accent-500` | `#f59e0b` | `bg-accent-500` | **Accent highlights** |
| `--color-accent-600` | `#d97706` | `bg-accent-600` | Hover |

## Color — Surfaces (Backgrounds)

| Token | Value | Use |
|---|---|---|
| `--color-surface-base` | `#0c0d12` | Page background |
| `--color-surface-raised` | `#12141a` | Cards, header |
| `--color-surface-overlay` | `#1a1d26` | Elevated cards, dropdowns |
| `--color-surface-muted` | `#242736` | Hover states, inputs |

## Color — Borders

| Token | Value | Use |
|---|---|---|
| `--color-border-subtle` | `#1e2130` | Very subtle dividers |
| `--color-border-base` | `#252a3a` | Default borders |
| `--color-border-strong` | `#353d55` | Active/focused |

## Color — Text

| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#f1f3f9` | Headings, body text |
| `--color-text-secondary` | `#8892a4` | Labels, subtext |
| `--color-text-tertiary` | `#4d5666` | Placeholders, disabled |
| `--color-text-inverse` | `#0c0d12` | Text on light/brand bg |

## Color — Semantic

| Token | Value | Use |
|---|---|---|
| `--color-success` | `#10b981` | Success states |
| `--color-warning` | `#f59e0b` | Warning states |
| `--color-error` | `#ef4444` | Error states |
| `--color-info` | `#3b82f6` | Info states |

---

## Typography

| Token | Value |
|---|---|
| `--font-sans` | `'Inter', system-ui, -apple-system, sans-serif` |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` |

### Type Scale (Tailwind defaults + custom usage)

| Size | Token | Example Use |
|---|---|---|
| `text-xs` | 12px | Captions, badges, footer notes |
| `text-sm` | 14px | Navigation, button labels, meta |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Large body, intro paragraphs |
| `text-xl` | 20px | Card titles |
| `text-2xl` | 24px | Section subheadings |
| `text-3xl` | 30px | Section headings (mobile) |
| `text-4xl` | 36px | Section headings (desktop) |
| `text-5xl` | 48px | Hero heading (mobile) |
| `text-6xl` | 60px | Hero heading (tablet) |
| `text-7xl` | 72px | Hero heading (desktop) |

---

## Spacing — Section Level

| Token | Value | Use |
|---|---|---|
| `--spacing-section-sm` | `4rem / 64px` | Compact sections |
| `--spacing-section-md` | `6rem / 96px` | Standard section padding |
| `--spacing-section-lg` | `8rem / 128px` | Desktop section padding |
| `--spacing-section-xl` | `10rem / 160px` | Hero-level spacing |

Use the `.section-padding` utility class for consistent section spacing.

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `6px` | Badges, tags |
| `--radius-md` | `12px` | Cards, inputs |
| `--radius-lg` | `16px` | Large cards |
| `--radius-xl` | `24px` | Modals |
| `--radius-full` | `9999px` | Pills |

---

## Shadows

| Token | Use |
|---|---|
| `--shadow-glow-brand` | Large violet glow for hero/CTA elements |
| `--shadow-glow-sm` | Subtle violet glow for interactive elements |
| `--shadow-card` | Default card elevation |
| `--shadow-card-hover` | Card on hover state |

---

## Transitions

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `150ms` | Hover colors |
| `--duration-base` | `250ms` | Most UI transitions |
| `--duration-slow` | `400ms` | Entrances, modals |
| `--ease-smooth` | Material easing | Default |
| `--ease-spring` | Springy overshoot | Playful interactions |

---

## Utility Classes

| Class | Description |
|---|---|
| `.container` | Max-width centered container with responsive padding |
| `.section-padding` | Responsive block padding for page sections |
| `.gradient-text` | Brand gradient text effect |
| `.glow-brand` | Violet glow box-shadow |
| `.glass` | Glassmorphism card style |
| `.sr-only` | Screen-reader only (visually hidden) |
| `.animate-fade-up` | Fade + slide up entrance animation |
| `.animate-fade-in` | Simple opacity fade in |
