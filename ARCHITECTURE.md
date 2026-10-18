# Architecture / Styling Contract

Project: Next.js 13.5.11 (App Router), React 18, Motion.

## Separation of concerns

- `styles/theme.css` — **single source of truth for color themes**; three ready palettes, semantic variables.
- `config/themes.js` — theme IDs, text labels, swatches, default theme, persistence key.
- `components/ui/ThemeSwitcher.jsx` — controlled UI in Footer; updates `<html data-theme>` and localStorage.
- `styles/theme-switcher.css` — isolated theme-switcher layout.
- `app/layout.jsx` — sets default theme on SSR and restores saved theme before first paint.
- `styles/globals.css` — global reset, shared infrastructure; no unscoped `header`, `section`, or `button` layout rules.
- `styles/<section>.css` — **layout and component design only**; should use theme tokens for foregrounds/backgrounds.
- `components/sections/*.jsx` — content and section-specific behavior.
- `components/layout/Footer.jsx` — includes interactive palette selector for review.
- `config/site.js` — price, official contacts, GetCourse, contraindications text.

## CSS rules

1. Avoid one-off `#...` colors in section CSS unless for photo overlays or transparent white glass effects.
2. Component selectors are scoped to unique prefixes, such as `ed-results__*`, `mk-price__*`, `.exp-hero__*`.
3. Never use broad global `header`/`h2`/`.section` CSS that can interfere with other sections.
4. All themes keep the Hero picture; theme changes only surface/typography/accent tokens.
5. Provide `prefers-reduced-motion` paths; clickable items use `<button>` and keyboard navigation where appropriate.

## New theme

See `THEMES.md`.
