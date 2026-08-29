# AGENTS.md

Instructions for AI coding assistants working in this repo.

## Commands

- **Dev**: `npm start` (Eleventy with hot reload at http://localhost:8080/)
- **Build**: `npm run build` → `docs/`
- **CI build**: `npm run build:ci` (adds `scripts/optimize-media.mjs`, a no-op here
  since this site has no raster images — cover art is CSS)

## Architecture

- **SSG**: Eleventy (11ty) v3
- **Styling**: plain hand-written CSS (`src/_includes/css/site.css`), passthrough-
  copied — no Sass, no Tailwind, no build step for CSS at all
- **No CMS, no blog.** Content lives in `src/_data/releases.json` and
  `src/_data/tour.json`, edited by hand
- **Feature**: `src/tour.njk` + `src/_includes/js/tour-countdown.js` — live,
  client-side countdown timers computed from plain date strings

## What NOT to do

- Don't add a CSS build step back in without a real reason — that's the whole point
  of this example
- Don't add real audio/cover-art images without checking licensing — the current
  "album art" is deliberately CSS-only
