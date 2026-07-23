# Commit Conventions — CodiFlux

This project follows **Conventional Commits** (https://www.conventionalcommits.org/).

Consistent commit messages enable:
- Automated changelog generation (future)
- Clear git history that reads like a changelog
- Easier bisecting and debugging

---

## Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Rules
- Use **imperative mood**: "add feature" not "added feature"
- Keep the subject line under **72 characters**
- Don't capitalize the first letter of the description
- No period at the end of the subject line

---

## Types

| Type | When to Use |
|---|---|
| `feat` | A new feature or visible UI change |
| `fix` | A bug fix |
| `style` | CSS/design changes with no logic change |
| `refactor` | Code restructuring with no feature/fix change |
| `perf` | Performance improvements |
| `a11y` | Accessibility improvements |
| `seo` | SEO-related changes |
| `docs` | Documentation only changes |
| `chore` | Build process, dependency updates, config changes |
| `content` | Content/copy changes (projects, testimonials, etc.) |
| `ci` | CI/CD pipeline changes |
| `revert` | Reverts a previous commit |

---

## Scopes (optional)

| Scope | Area |
|---|---|
| `header` | Site header / navigation |
| `footer` | Site footer |
| `hero` | Hero section |
| `portfolio` | Portfolio section or pages |
| `services` | Services section or page |
| `contact` | Contact section or page |
| `about` | About page |
| `seo` | SEO components |
| `design` | Design system / tokens |
| `deps` | Dependencies |

---

## Examples

```bash
# New feature
feat(hero): add animated gradient background

# Bug fix
fix(nav): correct active link detection on nested routes

# Accessibility improvement
a11y(header): add skip-to-content link

# Content update
content(portfolio): add Shopify project case study

# Dependency update
chore(deps): upgrade astro to v7.2.0

# SEO improvement
seo: add structured data to portfolio pages

# Design system change
style(design): update brand primary to violet-600

# Performance
perf(images): convert hero image to avif format
```

---

## Breaking Changes

Add `!` after the type and include a `BREAKING CHANGE:` footer:

```
feat(layout)!: remove PageLayout in favour of unified Layout

BREAKING CHANGE: PageLayout.astro has been deleted.
Migrate to using Layout.astro directly.
```
