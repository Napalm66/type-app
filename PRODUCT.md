# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are design students and self-learners studying type/graphic design who need to actually recognize and correctly classify typefaces — for coursework, a portfolio, or self-study. Their work may be graded or critiqued, so correct classification and font lineage matter, not just a plausible-looking answer.

## Product Purpose

"Type Classified" is a field guide to type classification: it teaches the major historical typeface classifications (Blackletter, Venetian & Garalde Oldstyle, Transitional, Modern/Didone, Slab Serif, Sans-Serif subtypes, Glyphic, Script, Display) through visual diagnostics, a historical timeline, and comparison — so a learner can go from "this looks old-fashioned" to correctly naming the classification and explaining why.

## Positioning

Where a static classification poster or Wikipedia table only shows finished examples, this app makes the diagnostic reasoning interactive and inspectable: live specimens rendered in verified, historically-accurate typefaces (not just any font that vaguely fits), zoomable anatomy diagrams with a magnifier for inspecting serif brackets/stress axis up close, a decision-tree "Identify" quiz that walks the same reasoning a person would use, and a timeline that places each classification against the broader art-historical eras it emerged within.

## Operating Context

- Four views: Explore (card grid, 13 classifications), Identify (branching quiz that narrows down to a classification from visual traits), Timeline (Gantt-style chart of classifications over art-historical eras), Compare (up to 3 classifications side by side).
- Detail panel (opened from an Explore card) shows the full diagnostic writeup, a serif-shape spectrum, and a font-accurate anatomy diagram with hover/tap-to-magnify.
- Deployed publicly at type-app-nine.vercel.app; also used and tested locally via a PowerShell static file server.

## Capabilities and Constraints

- **Classification and font-lineage accuracy is the top priority** — every specimen typeface was deliberately researched and, where the obvious choice was wrong (e.g. a font that looks right but has the wrong design lineage), replaced with a genuine revival or metric-compatible match. This is not negotiable for expression's sake: a beautiful specimen in the wrong lineage is a defect, not a style choice.
- **Font licensing must stay clean.** Only freely-licensed fonts (Google Fonts / SIL OFL) are used or self-hosted. Commercial/non-redistributable fonts (e.g. the real Times New Roman, Berkeley, Adobe Jenson, Centaur, Athelas) are never embedded, even disguised as an outline conversion — system-font references by name are fine since no redistribution is involved, but the actual font file is never shipped without a license that permits it.
- **Static site, no backend, no build step.** Plain HTML/CSS/JS loaded as classic scripts; no framework, no server-side code, no database. Deploys as-is.
- **Must work well on mobile, not just desktop.** Touch interactions (e.g. the anatomy-diagram magnifier) are a first-class target, tuned deliberately for tap/drag rather than treated as a desktop afterthought.
- Per-visitor customization (custom specimen text) persists only in the visitor's own `localStorage` — there is no account system and no cross-device sync.

## Brand Commitments

Name: "Type Classified." Tagline: "A field guide to type classification. For people who read type like weather."

## Evidence on Hand

No fabricated testimonials, benchmarks, or customer references — none exist and none should be invented. Font attributions in the footer (e.g. Coelacanth by Ben Whitmore, Tinos by Steve Matteson) are real and must stay accurate to whatever fonts are actually shipped.

## Product Principles

1. Correct classification and font lineage beats a prettier but wrong specimen, every time.
2. Interactive/inspectable beats static — let the learner see the reasoning (diagnostics, anatomy, magnifier, quiz), not just a labeled example.
3. Stay a focused reference/field guide — no accounts, no saved progress, no course structure, no community features. The four views are the whole scope.
4. Clean licensing is a hard constraint, not a nice-to-have, because the audience may be relying on this for graded academic work.
5. Treat mobile as equally real as desktop, not a secondary target.
