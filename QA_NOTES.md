# QA status — 18 October 2026

## Completed checks

- JSX/JS syntax parsed for all project modules (TypeScript transpiler, JSX-preserving mode): **passed**.
- CSS syntax parsed for all stylesheets (PostCSS): **passed**.
- Local relative JS/CSS imports and public photo/video references: **passed**.
- Each theme has palette definitions and semantic CSS tokens: **passed**.
- Color contrast checked for dark text and muted accents against main backgrounds (the four palettes are designed for readable normal text).
- Mobile CSS breakpoints added/reviewed for **320, 375, 390, 430px**, tablet and desktop layout patterns; reasons and format cards become one-column on narrow phones, photo galleries and CTA adapt.
- Project-local `npm run check` verifies theme registry, imports and media references with Node 16.

## Limitations

- A complete `next build` was **not** run successfully in the sandbox because package installation could not complete.
- Headless Chromium was attempted but did not produce reliable screenshots in this sandbox. Therefore **actual browser appearance and interactive behavior on physical phones are not yet verified**. Please check locally in WebStorm before publishing.
- Payment/contacts in `config/site.js` are placeholders; final customer-approved URLs and terms are needed before publication.

## Suggested browser QA

1. `npm install`, then `npm run check`, then `npm run dev`.
2. Chrome DevTools responsive mode: widths 320, 375, 390, 430, 768, 1024, 1440px.
3. Check Hero text doesn't cover Marina's face; 3 benefits fit at the bottom.
4. Swipe gallery thumbnails; change week tabs with pointer and keyboard.
5. Open video modal, press Escape, check video pauses; check FAQ contraindication dialog.
6. Select all four themes in Footer; refresh and verify the saved theme persists.
7. Check 12 700 ₽ in the card and separately in real payment configuration.

## v1.3 — educational block and four-theme update

- Replaced rendered personal before/after portrait in the concerns section with a model demonstration preview and native HTML video dialog.
- Restored the three source anatomy illustrations in their own responsive cards.
- Removed duplicate model clip from the practice list.
- Added `taupe` to both the theme CSS and picker registry.
- Ran project-local `npm run check`; validated 27 JS/JSX modules with TypeScript parser and 16 CSS files with PostCSS.
- A focused *static HTML/CSS rendering* in headless Chromium was checked at 320, 390, 768, and 1440px — no horizontal overflow in those updated sections.
- Caveat: full Next.js production build and in-app interactive visual test remain unverified in this environment.
