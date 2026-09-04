---
name: Type Classified
description: A field guide to type classification, for people who read type like weather.
colors:
  paper: "#efece6"
  panel: "#fdfcfa"
  ink: "#1c1a15"
  ink-soft: "#514c3f"
  ink-faint: "#716a5e"
  rule-solid: "#d7d2c5"
  rule-dashed: "rgba(28, 26, 21, 0.22)"
  sealing-wax: "#a8391f"
  focus-ring: "#1c1a15"
typography:
  display:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.4rem, 7vw, 4rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.003em"
  title:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.4rem, 4vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "'JetBrains Mono', 'Space Mono', monospace"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.045em"
rounded:
  flat: "0px"
spacing:
  xs: "0.4rem"
  sm: "0.6rem"
  md: "0.85rem"
  lg: "1.25rem"
  xl: "1.75rem"
  2xl: "2.5rem"
components:
  row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "1rem 0"
  row-hover:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
  tab:
    textColor: "{colors.ink-faint}"
    typography: "{typography.body}"
  tab-active:
    textColor: "{colors.ink}"
  chip:
    textColor: "{colors.ink-soft}"
    typography: "{typography.mono}"
    rounded: "{rounded.flat}"
    padding: "0.4rem 0.75rem"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tag:
    textColor: "{colors.sealing-wax}"
    typography: "{typography.mono}"
    padding: "0.15rem 0.4rem"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.flat}"
    padding: "clamp(1.5rem, 4vw, 2.5rem)"
---

# Design System: Type Classified

## Overview

**Creative North Star: "The Measured Document"**

Type Classified reads as a technical reference, not a book: a page built like a measured drawing, where a dashed rule and a leader line prove a claim instead of decorating it. This replaced an earlier "Specimen Ledger" identity (warm parchment, a serif display face, soft ambient shadows) at the user's explicit direction, pinned to two references — a portfolio built from massive stacked client names, and the Cooper Hewitt Museum's "Type Culture Now" poster, with its dashed vertical grid and rotated section labels — translated onto a white ground instead of the originals' black.

Every classification name is set in a single oversized condensed grotesque, uppercase, carrying the page the way a poster's headline carries a spread. Everything measured — indices, era dates, diagnostic labels, dimension callouts — is set in a monospace, because a number in a monospace face reads as data, not as prose. The one color note is a sealing-wax red, held to tags and measurement marks exactly as before; nothing else about the palette survived the replacement. Corners are square throughout and nothing casts a shadow — separation between surfaces comes from a rule line or a change in tone, never blur.

**Key Characteristics:**
- Near-white ground, near-black ink — never a warm cream, never a soft shadow
- One condensed display face (Anton) carries every name and headline, always uppercase
- A monospace face marks anything measured: indices, dates, dimensions, tags
- Dashed rules are structural, not decorative — they mark a grid, a leader line, a boundary
- Square corners everywhere; separation comes from a rule or a tone change, never a shadow
- The one accent color still marks only small things — tags, bars, measurement call-outs — never a fill

## Colors

A near-monochrome ink-on-paper system with one accent, used exactly as sparingly as the world it replaced.

### Primary
- **Sealing Wax** (`#a8391f` light / `#d9714a` dark): branch tags, the timeline's classification bars and era pins, the "key tell" callout's left rule, active states. Still never a background fill of any real size — that discipline survived the redesign untouched.

### Neutral
- **Paper** (`#efece6` light / `#18160f` dark): page background.
- **Panel** (`#fdfcfa` light / `#221f18` dark): any surface that sits above the page — the detail modal, quiz card, row hover state, tooltips, popovers. Counterintuitively lighter than Paper in light mode (and correspondingly darker in dark mode) — a raised surface reads as a distinct sheet laid on the page, not a tinted variant of it.
- **Ink** (`#1c1a15` light / `#f2ede0` dark): primary text, headings, borders on floating surfaces (modal, quiz card, tooltips), focus rings.
- **Ink Soft** (`#514c3f` light / `#b8ae98` dark): secondary text — descriptions, taglines.
- **Ink Faint** (`#716a5e` light / `#968e7c` dark): tertiary text and structural marks — indices, era dates, dashed grid rules, inactive tab labels.
- **Rule Solid** (`#d7d2c5` light / `#38342a` dark): ordinary hairline dividers between rows and sections.
- **Rule Dashed** (`rgba(28,26,21,.22)` light / `rgba(242,237,224,.2)` dark): the timeline's gridlines — the one place the dashed-rule motif survives as an actual stroke rather than a border style.

### Named Rules
**The Small Mark Rule.** (Carried over from the previous world, unchanged.) Sealing Wax never fills a surface larger than a tag, a 2px border, or a bar on the timeline. It marks; it never fills.

**The No-Warm-Neutral Rule.** (Replaces the old world's opposite instinct.) No neutral in this system carries a warm parchment cast — paper, panel, ink, and rule are all genuinely near-white/near-black/near-gray. The previous identity's entire palette is the anti-reference here.

## Typography

**Display Font:** Anton (with Arial Narrow, sans-serif fallback)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)
**Mono Font:** JetBrains Mono (with Space Mono, monospace fallback)

**Character:** One oversized condensed grotesque carries every name and heading, always uppercase, the way a poster's headline or a portfolio's client list does — against a plain Inter for running prose and a JetBrains Mono for anything measured. There is no serif anywhere in the interface; the previous world's Fraunces is gone entirely, not merely demoted.

### Hierarchy
- **Display** (400, `clamp(2.4rem, 7vw, 4rem)`, 0.92 line-height, uppercase): the site brand only.
- **Title** (400, `clamp(1.4rem, 4vw, 2.1rem)` down to `clamp(1.6rem, 4.4vw, 2.5rem)` depending on context, 1.0–1.05 line-height, uppercase): every classification name — the Explore row, the detail panel, the quiz result — plus section intros and the quiz question. This single oversized-condensed-uppercase treatment is the system's most repeated move.
- **Body** (400, `1rem`, 1.5 line-height): running prose — descriptions, taglines, quiz hints.
- **Mono** (700, `0.62rem`–`0.72rem`, 1.3 line-height, `0.04em`–`0.06em` tracking, usually uppercase): the system's other workhorse — row indices, era dates, diagnostic labels, branch tags, footer credits, timeline marks. Where the old system's "Whisper Label" was small Inter, this system's equivalent is monospace: it reads as data being cited, not prose being introduced.

### Named Rules
**The One Voice, One Data Rule.** Anton names things; Inter explains things; JetBrains Mono measures things. No role ever borrows another's job — body copy never goes condensed-uppercase, and a measurement is never set in anything but mono.

## Layout

Unchanged from the previous system at the structural level: a single centered column, `max-width: 1120px` (widened slightly from `1080px`), fluid `clamp()`-based padding, no hard breakpoint grid. What changed is the header: the old horizontal tab bar with an underline became a row of rotated, vertical labels riding dashed rules (`writing-mode: vertical-rl`), directly translating the pinned poster reference's own navigation device — each tab is now literally a labeled grid line, and its active state is the line turning solid.

Explore's card grid became a numbered list: each classification is a full-width row (index, oversized name, live specimen, tagline, era, branch tag) separated by hairline rules, rather than a grid of bordered cards. Compare's columns lost their individual card borders in favor of a single shared 1px rule grid (a `background`-and-`gap` trick, not per-cell borders) — reads as one ruled table, not three adjacent cards.

## Elevation & Depth

No shadows anywhere — this is a hard departure from the previous system, which used a soft ambient shadow on hover and floating surfaces. Every surface in this system separates from its neighbor with a rule line (`rule-solid`) or a tone shift (`paper` → `panel`), never blur. Floating surfaces (the detail modal, the quiz card, tooltips, the serif-spectrum zoom popover) get a solid 1px `ink` border instead of a shadow — a page in a measured document doesn't cast light, it's outlined.

### Named Rules
**The Line, Not Light Rule.** No `box-shadow` appears anywhere in this system. A surface separates from the page behind it with a border or a tone change; if neither reads clearly enough, the surface's content or size is wrong, not its shadow.

## Shapes

Every corner in the system is square — `border-radius: 0` everywhere, with no exceptions; the timeline bars' old `rx="4"` rounding was flattened to `rx="0"` in this pass specifically to hold that line. Structure comes from rule lines: solid hairlines divide ordinary content, dashed lines mark the timeline's year grid and the header's tab rail. Borders, not radius or shadow, are this system's entire form language.

## Components

### Tabs (header navigation)
- **Style:** each tab is a vertical dashed rule (`border-left: 1px dashed ink-faint`) topped by a rotated label (`writing-mode: vertical-rl`, Inter, uppercase, tracked).
- **Active:** the rule turns solid `ink`, the label turns `ink` and bold — the direct replacement for the old underline-on-hover pattern.
- **Focus:** `2px focus-ring` outline, `2px` offset.

### Chips (filters, branch tags)
- **Filter chip:** transparent background, `1px rule-solid` border, square corners, JetBrains Mono uppercase text.
- **Active filter chip:** inverts to `ink` background / `paper` text — unchanged behavior from the previous system, just square instead of pill-shaped now.
- **Branch tag:** JetBrains Mono, `sealing-wax` text on a transparent fill with a `sealing-wax` border — a genuine departure from the old tinted-pill tag: this system prefers an outlined "stamped" mark over any tinted fill, even at tag scale.

### Rows (Explore list)
- **Style:** a full-width flex row — mono index, then the classification's oversized Anton name with its live specimen and tagline beneath, then era date and branch tag at the trailing edge. Separated by `1px rule-solid` hairlines, no card border, no radius.
- **Hover/Focus:** background shifts from `paper` to `panel` — the entire row highlights, the way a finger running down a ledger would.

### Panels (detail modal, quiz card)
- **Style:** `panel` background, `1px solid ink` border (not `rule-solid` — floating surfaces get the stronger, higher-contrast border since they're not sitting flush with the page), square corners, no shadow.
- **Internal rhythm:** unchanged from the previous system — diagnostics grid, key-tell callout, serif spectrum, anatomy diagram all keep their prior structure, restyled into this system's mono/display vocabulary rather than rebuilt.

### Anatomy Diagram (signature component, extended)
The dashed-leader-line language that previously lived only inside this one component (cap line / mean line / baseline / x-height) is now the whole system's structural idiom, not a one-off — the redesign's central move was recognizing this component already was the pinned reference's grammar and building outward from it rather than in.

### Timeline (signature component)
Era bands lost their nine distinct historical hues in favor of two alternating near-monochrome ink tints (`rgba(28,26,21,.05)` / `.1`) — the old multi-color backdrop was decorative under this system's near-monochrome discipline; boundary information survives fully in the inline label and hover tooltip, just not in hue. Gridlines are now genuinely dashed (`rule-dashed`), and classification bars keep their `sealing-wax` fill and pin marker unchanged.

## Do's and Don'ts

### Do:
- **Do** set every classification name and heading in Anton, uppercase, at large scale — this is the system's one repeated gesture, and it should stay the loudest thing on any screen.
- **Do** set anything measured (an index, a date, a diagnostic, a dimension) in JetBrains Mono — a number in Inter reads as prose, not data.
- **Do** separate every surface with a border or a tone shift, never a shadow.
- **Do** keep Sealing Wax to tags, bars, and measurement marks — the Small Mark Rule survived the redesign intact.

### Don't:
- **Don't** reintroduce a shadow anywhere, however soft — this system's entire elevation model depends on lines and tone doing that job instead.
- **Don't** round a corner. `border-radius: 0` is absolute, no exceptions — including SVG geometry (`rx`/`ry`).
- **Don't** bring back a warm-toned neutral. Paper, panel, and every ink step are genuinely near-white/near-black/near-gray now; a beige creeping back in is the old world reasserting itself.
- **Don't** ship a font whose classification lineage is wrong for the sake of a better-looking specimen — this constraint predates and survives the redesign untouched (see PRODUCT.md); the live "Aa Gg Qy" specimens still render in each classification's own verified typeface, underneath the new Anton display name, not replaced by it.
