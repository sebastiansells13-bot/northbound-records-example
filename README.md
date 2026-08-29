# northbound-records-example

A live example site for a fictional independent record label — **Northbound Records**.

**Live site:** https://sebastiansells13-bot.github.io/northbound-records-example/

## How this differs

Still Eleventy, but styled entirely differently from every other example: a
brutalist, monospace, black/white/neon-green look (`Space Mono`, thick borders, no
rounded corners, a scrolling ticker banner) instead of any of the others' palettes.
The CSS itself is a **third different approach** in this batch — plain hand-written
CSS with no build step at all (compare to `terra-and-table-example`'s Tailwind CDN
and the original examples' Sass).

No blog on this one either — not every site needs one, and skipping it kept the
scope focused on the label's actual content: releases and tour dates.

"Album art" is CSS, not photography — a two-letter monogram on a flat color per
release (`src/_data/releases.json`), reusing the "original graphic instead of
mismatched stock photography" decision from the earlier examples, just taken further
since there's no real music here to have cover art for in the first place.

## Feature: live tour countdown

`src/tour.njk` + `src/_includes/js/tour-countdown.js` — each show's "in X days Y
hours" readout is computed client-side from the actual date, updating every minute,
no library. Server-rendered list (dates come from `src/_data/tour.json`), same
"avoid JS-injecting the DOM" approach as `terra-and-table-example`'s box builder.

## Local development

```bash
npm install
npm start
```
