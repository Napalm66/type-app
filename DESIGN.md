---
name: Type Classified
description: A field guide to type classification, for people who read type like weather.
colors:
  parchment: "#f4f1ea"
  parchment-raised: "#fbf9f4"
  ink: "#1c1a15"
  ink-soft: "#514c3f"
  ink-faint: "#8a8371"
  rule: "#d9d3c1"
  sealing-wax: "#a8391f"
  sealing-wax-soft: "#d9c9a8"
  focus-ring: "#1c1a15"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.2rem, 5vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "10px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "0.35rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.25rem"
  xl: "1.75rem"
  2xl: "2.5rem"
components:
  card:
    backgroundColor: "{colors.parchment-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "1.25rem 1.25rem 1.1rem"
  tab:
    textColor: "{colors.ink-faint}"
    typography: "{typography.label}"
    padding: "0.65rem 0.9rem"
  tab-active:
    textColor: "{colors.ink}"
  filter-chip:
    backgroundColor: "{colors.parchment-raised}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.9rem"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "{colors.parchment-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.6rem 0.85rem"
  quiz-option:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.85rem 1rem"
  quiz-option-hover:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: Type Classified

## Overview

**Creative North Star: "The Specimen Ledger"**

Type Classified reads like a naturalist's logbook crossed with a type foundry's specimen book: warm parchment pages, ink-brown text, and each classification laid out and labeled like a catalogued specimen — measured, comparative, quietly authoritative. Nothing here performs; it records. The system exists to make a diagnostic legible (contrast, axis, serif shape, x-height) at a glance, then reward a closer look with real detail — a magnifiable anatomy diagram, a font rendered in its correct historical lineage, a timeline that places the specimen in its century.

The palette and type pairing commit to warm and unhurried over cold and efficient: a serif display face (Fraunces) for names and headings paired with a plain, quiet sans (Inter) for everything functional, sitting on parchment rather than white or near-black. The one color note — a sealing-wax red — is used the way a stamp or a wax seal is used: sparingly, to mark something as worth attention, never as a fill. This system explicitly rejects the flashy SaaS-dashboard register (no neon gradients, no glassmorphism, no dense KPI-tile chrome) and the cold-minimalist-tech register (no stark white/black, no monospace-everything) in favor of staying legible, precise, and warm throughout.

**Key Characteristics:**
- Warm parchment surfaces, never true white or true black
- A serif display face for identity and naming; a quiet sans for everything else
- One accent color, used only as a mark (underline, tag, border, dot) — never a fill
- Flat surfaces at rest; shadow appears only as a response to hover or an overlay opening
- Diagnostic, comparative density — small uppercase tracked labels do a lot of the organizing work

## Colors

A parchment-and-ink palette with a single sealing-wax accent used exclusively as a small mark, never a field.

### Primary
- **Sealing Wax** (`#a8391f` light / `#d9714a` dark): the system's only accent. Marks the active tab's underline, classification branch tags, the "key tell" callout's left border and heading, the timeline's era pins and progress dots, and link/hover states. Never used as a background fill of any real size.

### Neutral
- **Parchment** (`#f4f1ea` light / `#17150f` dark): page background.
- **Parchment Raised** (`#fbf9f4` light / `#211e17` dark): the surface color for anything that sits above the page — cards, panels, modals, tooltips, popovers.
- **Ink** (`#1c1a15` light / `#f2ede0` dark): primary text and the highest-emphasis foreground color (active states, headings, focus rings).
- **Ink Soft** (`#514c3f` light / `#b8ae98` dark): secondary text — descriptions, taglines, body copy that isn't the headline.
- **Ink Faint** (`#8a8371` light / `#7d7562` dark): tertiary text — eyebrow labels, era text, disabled/quiet chrome.
- **Rule** (`#d9d3c1` light / `#38342a` dark): every hairline border and divider in the system.

### Named Rules
**The Small Mark Rule.** Sealing Wax never fills a surface larger than a tag, a 3px border, or a 1-2px underline/pin. If an element needs to feel important, give it a mark in this color; do not give it a background in this color.

**The Warm-Neutral-Only Rule.** No pure white (`#fff`) or pure black (`#000`) appears anywhere in the system, light or dark mode. Every neutral — background, text, or border — carries the same warm, slightly yellow-brown cast, so the whole page reads as one paper stock rather than a UI floating on top of a color.

## Typography

**Display Font:** Fraunces (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)

**Character:** A classical serif for anything that names or announces (the brand, a classification's name, a quiz result) against a plain, disciplined sans for everything functional (navigation, body copy, form fields, diagnostic data) — the pairing of a specimen's handwritten label against the printed ledger it's filed in.

### Hierarchy
- **Display** (600, `clamp(2.2rem, 5vw, 3.2rem)`, 1.05, -0.01em tracking): the site brand/H1 only.
- **Headline** (600, `2rem`, 1.1): a classification's name in the detail panel and quiz result screen.
- **Title** (600, `1.4rem`–`1.9rem` depending on context, 1.1–1.2): section intros (`view-intro h2`) and the quiz question.
- **Body** (400, `1rem`, 1.5): running copy — classification descriptions, quiz hints, tagline text. Body copy is capped at a readable measure (`max-width: 62ch` / `46ch` in narrower contexts), never allowed to run full-width.
- **Label** (700, `0.65rem`–`0.85rem`, 1.3, `0.05em`–`0.06em` tracking, uppercase): the system's workhorse — eyebrow labels on diagnostics, branch tags, section headings ("SERIF SHAPE, OLDSTYLE TO SLAB", "ANATOMY"), timeline branch pills. Small, uppercase, and letter-spaced is the system's default way of saying "this is a label, not content."

### Named Rules
**The Whisper-Label Rule.** Every organizing label in the system (section headings, diagnostic tags, branch pills) is small, uppercase, letter-spaced, and colored `ink-faint` — quiet enough to never compete with the content it's labeling.

## Layout

A single centered column, `max-width: 1080px`, with fluid `clamp()`-based horizontal padding (`1.25rem` to `2.5vw`→`2.5rem`) rather than a hard breakpoint grid — the layout compresses continuously as the viewport narrows instead of jumping between fixed states. The only hard breakpoint (`520px`) tightens tab padding for small phones; everything else (headings, section padding, card grids) is fluid via `clamp()`.

Content density stays generous and unhurried: `1.5` body line-height, `62ch`/`46ch` measure caps on prose, and consistent `1.25rem`–`1.75rem` breathing room between major blocks. The card grid (`repeat(auto-fill, minmax(260px, 1fr))`) and compare grid (`minmax(220px, 1fr)`) reflow by content, not by named breakpoints. Modals (the detail overlay) center over a dimmed backdrop and scroll independently once content exceeds the viewport.

## Elevation & Depth

Flat by default; shadow is a response, not a resting state. Cards, chips, and panels sit flush with the page — no ambient shadow at rest. Depth appears only when something becomes interactive or floats above the page: a card lifts 2px and gains the ambient shadow on hover, and anything that floats over content (the detail modal, tooltips, the serif-spectrum zoom popover, the anatomy magnifier lens) carries its own shadow because it structurally needs to read as "above" the page, not because elevation is decorative.

### Shadow Vocabulary
- **Ambient** (`0 1px 2px rgba(28,26,21,.06), 0 8px 24px -12px rgba(28,26,21,.18)`; dark mode swaps to a pure-black-based rgba pair): the shared soft, two-layer shadow — card hover, tooltips, the serif-spectrum zoom popover.
- **Modal** (`0 24px 64px -12px rgba(28,26,21,.35)`): heavier and more diffuse, reserved for the detail overlay panel — the one surface that needs to visually separate from everything behind it.
- **Lens** (`0 6px 20px -4px rgba(28,26,21,.4)`): tight and directional, under the circular anatomy magnifier only.

### Named Rules
**The Flat-At-Rest Rule.** No card, chip, or panel carries a shadow in its default state. Shadow is earned by hover or by floating above the page — never applied as ambient decoration.

## Shapes

Every surface is bordered with a 1px `rule` hairline before it is (optionally) shadowed — borders, not shadows, do the primary job of separating one surface from another. Corner radius scales with a surface's size and role: small tags and micro-chips use `4px`–`6px`, functional controls (inputs, diagnostic boxes, quiz options) use `8px`, and major containers (cards, the detail panel, the quiz card, the timeline frame) use the shared `10px` (`--radius`). Filter chips and progress dots go fully circular/pill (`999px`); the anatomy magnifier lens is a true circle. Nothing in the system uses a sharp 0px corner or an exaggerated large radius — corners stay modest and consistent within each size class.

## Components

### Tabs
- **Style:** plain text buttons in the Label type role, `ink-faint` at rest, `ink` on hover, sitting on a shared `1px rule` bottom border.
- **Active:** `ink` text with a `2px sealing-wax` underline — the system's clearest use of the Small Mark Rule.
- **Focus:** `2px focus-ring` outline, `2px` offset.

### Chips
- **Filter chip:** `parchment-raised` background, `1px rule` border, full pill radius (`999px`), `ink-soft` text.
- **Active filter chip:** inverts to `ink` background / `parchment` text — the one place a neutral (not the accent) carries a filled background, reserved for "this is currently selected."
- **Branch tag:** small, uppercase, `sealing-wax` text on a `color-mix(sealing-wax 12%, transparent)` tint background, `4px` radius — the system's only tinted (not solid) accent fill, used at tag scale only.

### Cards / Containers
- **Family:** the spec-card (Explore grid), compare-col, quiz-card, and timeline frame all share one visual language: `parchment-raised` background, `1px rule` border, `10px` radius, `1.25rem` internal padding.
- **Shadow Strategy:** flat at rest; the Explore spec-card is the only one with a hover state (2px lift + ambient shadow + border darkens to `ink-faint`) since it's the only card that's also a button.
- **Border:** always `1px solid rule`.

### Inputs / Fields
- **Style:** `parchment-raised` background, `1px rule` border, `8px` radius, `Inter` body type.
- **Focus:** `2px focus-ring` outline with `1px` offset, border deepens to `ink-faint`.

### Buttons (quiz options / nav)
- **Quiz option:** full-width, left-aligned, `parchment` background (one step quieter than a card), `1px rule` border, `8px` radius; hover deepens the border to `sealing-wax` rather than changing the fill — the interaction stays a mark, not a repaint.
- **Text buttons** (back/restart/clear): no border or fill, `ink-faint` → `ink` on hover, Label-scale type.

### Anatomy Lens (signature component)
A fixed-position circular magnifier (`170px` diameter) that renders a live, scaled (2.8×) clone of the anatomy diagram's SVG under the cursor or touch point. Circular clipping, a `2px ink` ring, and the Lens shadow give it real object-hood — it should read as a physical magnifying glass laid over a specimen, not a UI tooltip. Hidden by default (`opacity: 0`, `scale(0.85)`), it snaps to `opacity:1`/`scale(1)` over `120ms`. On mobile it's tap-to-open/tap-to-close with drag-to-reposition rather than hover, and is constrained to disappear once its center leaves the diagram it's magnifying — it never floats free of the thing it's meant to be inspecting.

### Timeline Bar & Era Band (signature component)
The Gantt-style timeline layers two systems on one shared linear year-axis: broad, low-contrast "era band" rectangles (art-historical backdrop, `cursor: help`, darken slightly on hover) behind narrower, saturated classification bars (`cursor: pointer`, brighten on hover) with a `sealing-wax` pin marker. Both drive the same cursor-following or anchored tooltip pattern (`parchment-raised` background, `rule` border, Ambient shadow, small arrow tail) — era tooltips stay anchored to the band; bar tooltips follow the cursor, since a bar is a specific thing being inspected rather than a broad backdrop being labeled.

## Do's and Don'ts

### Do:
- **Do** keep every neutral warm — background, text, and border colors all carry the same paper-and-ink cast; never introduce a cool gray or pure white/black.
- **Do** use Sealing Wax only as a mark: an underline, a border, a tag tint, a dot, a pin. If it needs to fill a surface larger than a few px of border or a small tag, use `ink` instead.
- **Do** pair Fraunces (names, headings, identity) with Inter (everything functional) — never use Fraunces for body copy or Inter for a classification's name.
- **Do** leave cards and panels flat at rest; only add shadow in response to hover or when a surface floats above the page (modal, tooltip, popover, lens).
- **Do** use the small-uppercase-tracked Label style for anything that organizes content (section headers, diagnostic tags) rather than making it look like body copy.

### Don't:
- **Don't** add shadows, gradients, or glassmorphism as decoration — this system explicitly rejects the flashy SaaS-dashboard register.
- **Don't** introduce a second accent color. One mark color, used sparingly, is the entire palette's point.
- **Don't** let corner radius exceed `10px` on any surface, or drop to a sharp `0px` — the modest, consistent radius scale is part of the paper-and-ink materiality, not an arbitrary choice.
- **Don't** ship a font whose classification lineage is wrong for the sake of a better-looking specimen — accuracy is a harder constraint here than in almost any other kind of app (see PRODUCT.md).
