# Accessibility Checklist — CodiFlux

**Target standard: WCAG 2.1 Level AA**

This is a living checklist. Verify each item before launch and after
significant UI changes. Use automated tools as a *starting point* — they
catch ~30% of issues. Manual testing is required for the rest.

---

## Automated Tools

Run these before every major release:

```bash
# Lighthouse (built into Chrome DevTools)
# Target: 100 Accessibility score

# axe DevTools (browser extension) — free, highly accurate
# Install: https://www.deque.com/axe/devtools/

# Wave (browser extension)
# Install: https://wave.webaim.org/extension/
```

---

## Semantic Structure

- [ ] Every page has exactly **one `<h1>`**
- [ ] Heading levels are sequential (h1 → h2 → h3, never h1 → h3)
- [ ] Navigation uses `<nav>` with descriptive `aria-label`
- [ ] Main content is wrapped in `<main id="main-content">`
- [ ] Footer uses `<footer>`
- [ ] Lists of links use `<ul>` / `<ol>`
- [ ] Forms use `<label>` elements associated with inputs

## Keyboard Navigation

- [ ] All interactive elements are reachable via Tab key
- [ ] Tab order follows logical reading order
- [ ] Focus indicator is visible on all interactive elements
- [ ] Skip-to-content link present and functional (add in Phase 1)
- [ ] Modal/dialog traps focus correctly
- [ ] Escape key closes modals/dropdowns
- [ ] No keyboard traps

## Color & Contrast

- [ ] Text contrast ratio ≥ **4.5:1** (normal text, AA)
- [ ] Text contrast ratio ≥ **3:1** (large text ≥ 18px bold, AA)
- [ ] Interactive element contrast ≥ **3:1** (buttons, links)
- [ ] Information is **not conveyed by color alone**
- [ ] Focus indicators have ≥ 3:1 contrast ratio

**Verify CodiFlux tokens:**

| Token | Use | Check |
|---|---|---|
| `--color-text-primary` (#F1F3F9) on `--color-surface-base` (#0C0D12) | Body text | Verify with contrast checker |
| `--color-text-secondary` (#8892A4) on `--color-surface-base` | Captions | ≥ 4.5:1 required |
| `--color-brand-500` (#8B5CF6) as link color | Links | ≥ 4.5:1 required |

## Images & Media

- [ ] All informational images have descriptive `alt` text
- [ ] Decorative images use `alt=""` and optionally `role="presentation"`
- [ ] SVG icons used as UI have `aria-hidden="true"` or `aria-label`
- [ ] No content relies solely on images to convey meaning
- [ ] Video content has captions (if video is added)

## Forms (Contact Page — Phase 3)

- [ ] Every input has an associated `<label>`
- [ ] Error messages are announced to screen readers
- [ ] Required fields are indicated (not just by color)
- [ ] Form can be submitted via keyboard alone
- [ ] Success/error states are announced via `aria-live`

## ARIA Usage

- [ ] `aria-current="page"` on active navigation link ✅ (done)
- [ ] `aria-label` on icon-only buttons ✅ (done in Header)
- [ ] `aria-expanded` on toggles (mobile menu) ✅ (stubbed in Header)
- [ ] `aria-hidden="true"` on decorative icons
- [ ] No redundant ARIA (don't use `role="button"` on `<button>`)

## Animation & Motion

- [ ] `prefers-reduced-motion` media query implemented ✅ (done)
- [ ] No flashing content (> 3 flashes per second)
- [ ] Animations can be paused/stopped by user

## Screen Reader Testing

Test with at least one screen reader before launch:
- **Windows**: NVDA (free) + Chrome — https://www.nvaccess.org/
- **Windows**: Windows Narrator (built-in)
- **macOS/iOS**: VoiceOver (built-in, ⌘F5)

Test scenarios:
- [ ] Navigate the page using only screen reader
- [ ] All interactive elements are announced correctly
- [ ] Form error messages are read aloud
- [ ] Image alt text is read correctly
- [ ] Page title is announced on navigation

---

## Pre-Launch Accessibility Sign-Off

- [ ] Lighthouse Accessibility score: **100**
- [ ] axe DevTools: **0 violations**
- [ ] Manual keyboard-only navigation test passed
- [ ] Screen reader test passed (NVDA or Narrator on Windows)
- [ ] Color contrast verified for all text/background combinations
