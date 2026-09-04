---
name: Type Classified
description: A field guide to type classification, for people who read type like weather.
colors:
  paper: "#e6e6e6"
  panel: "#ffffff"
  ink: "#161616"
  ink-soft: "#474745"
  ink-faint: "#606060"
  rule-solid: "#cfcfcf"
  rule-dashed: "rgba(22, 22, 22, 0.22)"
  sealing-wax: "#c22400"
  accent-tint: "color-mix(in srgb, #c22400 12%, #ffffff)"
  focus-ring: "#161616"
typography:
  display:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.4rem, 11vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.88
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

Every classification name is set in a single oversized condensed grotesque, uppercase, carrying the page the way a poster's headline carries a spread — the brand lockup itself runs large enough to anchor the whole first viewport, not just introduce it. Everything measured — indices, era dates, diagnostic labels, dimension callouts — is set in a monospace, because a number in a monospace face reads as data, not as prose. The one color note is a bright sealing-wax red, held to tags, bars, and small marks; nothing else about the palette carries color. Corners are square throughout and nothing casts a shadow — separation between surfaces comes from a rule line or a change in tone, never blur.

**Key Characteristics:**
- Genuinely neutral light grey ground (not a warm off-white), near-black ink, white raised panels
- One condensed display face (Anton) carries every name and headline, always uppercase, at a deliberately large scale
- A monospace face marks anything measured: indices, dates, dimensions, tags
- Dashed rules are structural, not decorative — they mark a grid, a leader line, a boundary
- Square corners everywhere; separation comes from a rule or a tone change, never a shadow
- One bright accent color marks small things — tags (with a light tint fill so they read clearly), bars, the active tab, measurement call-outs — never a large fill

## Colors

A neutral grey-and-ink system with one bright accent, used sparingly but with enough presence (a tint fill on tags, the active tab's rule) that it doesn't disappear the way a purely line-only accent can.

### Primary
- **Sealing Wax** (`#c22400` light / `#ff5a33` dark): branch tags (text + border + a light `accent-tint` fill for legibility), the timeline's classification bars and era pins, the "key tell" callout's left rule, the active tab's rule. Brightened and re-saturated from the redesign's first pass specifically so it reads at a glance rather than needing a second look — still never a large background fill.

### Neutral
- **Paper** (`#e6e6e6` light / `#161616` dark): page background — a genuinely neutral light grey, not an off-white or a warm cream.
- **Panel** (`#ffffff` light / `#242424` dark): any surface that sits above the page — the detail modal, quiz card, row hover state, filter chips, tooltips, popovers. Filter chips in particular carry a solid Panel fill at rest (not transparent) specifically so each one reads as a distinct white rectangle against the grey page, rather than blending into it.
- **Ink** (`#161616` light / `#f2f2f0` dark): primary text, headings, borders on floating surfaces (modal, quiz card, filter chips, tooltips), focus rings.
- **Ink Soft** (`#474745` light / `#c2c2bf` dark): secondary text — descriptions, taglines.
- **Ink Faint** (`#606060` light / `#b0b0ad` dark): tertiary text and structural marks — indices, era dates, dashed grid rules, inactive tab labels.
- **Rule Solid** (`#cfcfcf` light / `#3a3a38` dark): ordinary hairline dividers between rows and sections.
- **Rule Dashed** (`rgba(22,22,22,.22)` light / `rgba(242,242,240,.2)` dark): the timeline's gridlines — the one place the dashed-rule motif survives as an actual stroke rather than a border style.

### Named Rules
**The Small Mark Rule.** Sealing Wax never fills a surface larger than a tag, a 2px border, or a bar on the timeline — a tag's light `accent-tint` background is a tint, not a fill, and stays inside this rule.

**The No-Warm-Neutral Rule.** No neutral in this system carries a warm cast in either direction — paper, panel, ink, and rule are all genuinely neutral grey, black, or white. A prior draft's paper (`#efece6`) still had a faint warm bias; this pass corrected it to true grey (`#e6e6e6`) at the user's explicit request.

## Typography

**Display Font:** Anton (with Arial Narrow, sans-serif fallback)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)
**Mono Font:** JetBrains Mono (with Space Mono, monospace fallback)

**Character:** One oversized condensed grotesque carries every name and heading, always uppercase, the way a poster's headline or a portfolio's client list does — against a plain Inter for running prose and a JetBrains Mono for anything measured. There is no serif anywhere in the interface; the previous world's Fraunces is gone entirely, not merely demoted.

### Hierarchy
- **Display** (400, `clamp(3.4rem, 11vw, 7rem)`, 0.88 line-height, uppercase): the site brand only. Sized deliberately large — at the user's explicit request after the first pass read too modest — so the brand lockup functions as the first viewport's actual headline, not a polite introduction above it.
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
- **Active:** the rule turns solid `sealing-wax` (2px, was `ink`), the label turns `ink` and bold.
- **Focus:** `2px focus-ring` outline, `2px` offset.

### Header Graphic (signature component)
A faint, decorative inline SVG (`.site-header-graphic`) fills the header behind the brand lockup and tabs, absolutely positioned inside `.site-header .wrap` (`inset: 0`) so it starts at the header's top edge and ends exactly at the tabs' bottom rule — never bleeding into the page content below. It extends the anatomy diagram's own dimension-line vocabulary into the one place the app had no imagery at all: four dashed guide lines (cap line / mean line / baseline / descender line) with mono labels at the left edge, a large ghost glyph ("Ag", stroke-only outline at ~7% opacity, generic Georgia serif rather than the site's own Anton — it represents an abstract "any specimen," not the brand voice), and one `sealing-wax` x-height dimension arrow with its mono label, positioned in the open space beside the tagline. `preserveAspectRatio="none"` (stretch-to-fill, not crop) — a `slice` value cropped the top guide line off at some viewport ratios, which stretch never does, and the ghost glyph is abstract enough that mild non-uniform scaling is invisible. Brand row and tabs both carry `position: relative; z-index: 1` so they paint above the graphic; the graphic itself is `pointer-events: none` and hidden below 640px width, where the header has no open space left for it.

### Chips (filters, branch tags)
- **Filter chip:** solid `panel` (white) background, `1px ink` border, square corners, JetBrains Mono uppercase text — given a solid fill rather than transparent specifically so each chip reads as a distinct element against the grey `paper` page instead of nearly disappearing into it. Hover turns the border and text `sealing-wax`.
- **Active filter chip:** inverts to `ink` background / `paper` text — unchanged behavior from the previous system, just square instead of pill-shaped now.
- **Branch tag:** JetBrains Mono, `sealing-wax` text and border over a light `accent-tint` fill (`color-mix(sealing-wax 12%, panel)`) — revised from a fully transparent outline after the first pass read as too faint to "tell apart" at a glance; the tint gives it real presence while staying well inside the Small Mark Rule.

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
