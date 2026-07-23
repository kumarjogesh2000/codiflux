# Component Design Principles — CodiFlux

## The Non-Negotiables

These rules apply to every component written in this project.
They are not preferences — they are architectural requirements.

---

## 1. Astro-First, React-When-Necessary

**Rule**: Default to `.astro`. Only use `.tsx` when the component needs client-side
interactivity (state, event handlers, browser APIs).

| Use `.astro` | Use `.tsx` |
|---|---|
| Static content sections | Mobile menu (open/close state) |
| Navigation structure | Contact form (validation, submission) |
| Cards, layouts | Accordion, tabs |
| SEO components | Animated counters |
| Footer, header shell | Interactive maps |

**Why**: React adds JavaScript to the user's browser. Each React component
hydrated with `client:load` sends KB of JS. Astro components send **zero JS**.

---

## 2. Props Over Internal State (Where Possible)

Components should be **controlled** — receiving data as props rather than
managing their own complex state. This makes components:
- Testable in isolation
- Reusable in different contexts
- Easier to debug (data flows down)

```astro
<!-- ✅ Good — data flows from constants/CMS into component -->
<ServiceCard
  title={service.title}
  description={service.description}
  icon={service.icon}
/>

<!-- ❌ Avoid — component fetches its own data -->
<!-- (Acceptable in React for async/interactive data only) -->
```

---

## 3. Single Responsibility

Every component should do **one thing well**.

| Component | Responsibility |
|---|---|
| `Button.astro` | Renders a styled button — nothing else |
| `Card.astro` | Renders a styled card container — nothing else |
| `ServiceCard.astro` | Renders a service card (uses Card internally) |
| `Services.astro` | Renders the services grid (uses ServiceCard) |

If a component is doing two unrelated things, split it.

---

## 4. Small, Focused Interface (Props)

Keep the props interface minimal. Every prop you add is a contract you must maintain.

```typescript
// ✅ Good — minimal, purposeful interface
interface Props {
  title: string;
  description: string;
  href?: string;
  featured?: boolean;
}

// ❌ Avoid — too many props signals the component is doing too much
interface Props {
  title: string;
  subtitle: string;
  description: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  hrefLabel: string;
  featured: boolean;
  variant: 'default' | 'compact' | 'expanded' | 'hero';
  showBorder: boolean;
  showShadow: boolean;
  // ...10 more props
}
```

---

## 5. Accessibility Built In

**Accessibility is not an afterthought.** Every component is born accessible.

- Interactive elements use correct HTML semantics (`<button>`, `<a>`, `<nav>`)
- Every `<button>` has visible text or `aria-label`
- Every `<a>` has descriptive text (not "click here")
- Every `<img>` has `alt` text
- Every icon-only element has `aria-hidden="true"` or `aria-label`

```astro
<!-- ✅ Good -->
<button aria-label="Close menu" aria-expanded={isOpen}>
  <Icon name="x" aria-hidden="true" />
</button>

<!-- ❌ Bad -->
<div onclick="closeMenu()">X</div>
```

---

## 6. Design Tokens Over Magic Values

Never write raw color values, spacing values, or animation durations in components.
Always use CSS custom properties from `global.css`.

```astro
<!-- ✅ Good — uses design tokens -->
<div class="bg-[var(--color-surface-raised)] border border-[var(--color-border-base)]">

<!-- ✅ Also good — Tailwind token class -->
<div class="bg-brand-600 hover:bg-brand-700 transition-colors duration-150">

<!-- ❌ Bad — magic values disconnected from design system -->
<div style="background-color: #7c3aed; border: 1px solid #252a3a;">
```

---

## 7. Document Non-Obvious Decisions

Use JSDoc comments for:
- Why a component exists (architectural decision)
- Non-obvious prop behaviour
- Performance considerations
- Accessibility notes

```astro
---
/**
 * MobileMenu.tsx
 * React component — requires client-side state for open/close toggle.
 *
 * Uses `client:load` because it's in the header (above fold, interactive).
 * For below-fold interactive components, prefer `client:visible`.
 *
 * Accessibility: traps focus within the menu when open.
 * Closes on Escape key and on overlay click.
 */
---
```

---

## 8. File Naming Conventions

| Pattern | Example |
|---|---|
| Astro components | `PascalCase.astro` — `ServiceCard.astro` |
| React components | `PascalCase.tsx` — `MobileMenu.tsx` |
| TypeScript utilities | `camelCase.ts` — `formatDate.ts` |
| Content collection files | `kebab-case.md` — `shopify-project.md` |
| Pages | `kebab-case.astro` — `index.astro`, `about.astro` |

---

## 9. Component Checklist

Before marking a component as "done", verify:

- [ ] Works on mobile (375px) and desktop (1280px)
- [ ] Uses only design tokens (no magic values)
- [ ] Has correct semantic HTML
- [ ] Interactive elements have `aria-*` attributes
- [ ] Keyboard navigable
- [ ] Props interface is documented
- [ ] No hardcoded content that belongs in `constants.ts`
- [ ] TypeScript interface defined for all props (`Astro.props` typed)
