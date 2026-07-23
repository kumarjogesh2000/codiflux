# `src/lib/`

Non-UI logic: constants, utilities, and helpers.

## Files

| File | Purpose |
|---|---|
| `constants.ts` | **Single source of truth** — site identity, nav items, services, process steps, social links |
| `seo.ts` | SEO helpers — `buildTitle()`, `buildCanonical()`, `buildOGImage()` |
| `utils.ts` | Pure utility functions — `cn()`, `formatDate()`, `slugify()`, `truncate()` |

## Rules

- **No DOM access** — all functions in `lib/` must be pure (work in Node.js and browser)
- **No UI imports** — `lib/` never imports from `components/`
- **No side effects** — functions return values, they don't modify global state
- Add site-wide data here, never inside components

## Importing

```ts
// Always use the @/ path alias
import { SITE, NAV_ITEMS } from '@/lib/constants';
import { cn, formatDate } from '@/lib/utils';
import { buildTitle } from '@/lib/seo';
```
