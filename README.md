# Type Classified

A field guide to type classification, built for the web. Explore the major typeface classifications — Blackletter, Oldstyle (Venetian & Garalde), Transitional, Modern (Didone), Slab Serif, Sans-Serif subtypes, Glyphic, Script, and Display — with visual diagnostics and a historical timeline.

**Live app:** [type-app-nine.vercel.app](https://type-app-nine.vercel.app/)

## Views

- **Explore** — browse all 13 classifications as cards, each with era, key typefaces, diagnostic "tells," and a live specimen you can customize.
- **Identify** — anatomy diagrams with a hover magnifier for inspecting serif shapes, stroke contrast, and axis details up close.
- **Timeline** — a Gantt-style chart placing every classification against the century it emerged in, layered over a backdrop of broader typographic/art-historical eras (Romanesque through Digital & Variable Age).
- **Compare** — put two classifications side by side to see how their diagnostics differ.

## Running locally

No build step — it's plain HTML, CSS, and JS loaded as classic scripts. Any static file server works:

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

This serves the app at `http://localhost:8420`. Alternatively, use any static server of your choice (`npx serve`, Python's `http.server`, etc.) pointed at the project root.

## Structure

```
index.html        entry point, tab navigation
css/style.css      design tokens, layout, dark mode
js/data.js         the 13 classifications (era, diagnostics, key typefaces, specimen config)
js/explore.js       js/identify.js       js/timeline.js
js/compare.js       js/detail.js         js/anatomy.js
js/magnifier.js     js/specimen.js
js/main.js         wires up views and tab switching
```

## Fonts

Specimens are rendered with freely-licensed typefaces served via Google Fonts, matched to each classification's historical style.
