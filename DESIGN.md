---
name: Type Classified
description: A field guide to type classification. For people who read type like weather.
colors:
  paper: "#f0ede5"
  panel: "#ffffff"
  ink: "#004643"
  ink-soft: "#2e5c59"
  ink-faint: "#4d6a67"
  rule-solid: "#d3dbd8"
  rule-dashed: "rgba(0, 70, 67, 0.22)"
  sealing-wax: "#bc3a14"
  focus-ring: "#004643"
  # Fixed, not theme-swapped — see Layout's hero-photo note.
  hero-ink: "#f5f2ea"
typography:
  display:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(4.4rem, 14vw, 9rem)"
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
  # Self-hosted, per-classification specimen faces (see fonts/OFL-*):
  # Venetian Oldstyle and Transitional render their live "Aa Gg Qy" in
  # their own verified period-accurate typeface rather than the system's
  # three roles above. This is intentional and expected to keep growing as
  # more classifications get a dedicated specimen font — it is a deliberate
  # exception to the one-voice type system, not a drift from it.
  specimen:
    fontFamily: "Coelacanth, Tinos"
  # The three roles above are single representative sizes; in practice each
  # has grown a small supporting range as new components were added over
  # time without that range ever being written back here. `scale` enumerates
  # every additional step actually in use so the design-system checker can
  # tell a real (if informal) ramp from an arbitrary one-off value. Named by
  # which role's family they extend and roughly where they sit in that
  # role's range (Xs < Sm < Md < Lg < Xl), not by which single component
  # first introduced them — several components typically share a step.
  scale:
    monoXs: "0.62rem" # smallest mono captions (serif-spectrum label, anatomy fact label)
    monoSm: "0.64rem" # diagnostic label
    monoMd: "0.68rem" # row index/era, tell-box label, section-heading labels, tooltip strong
    monoLg: "0.72rem" # detail era, zoom label, quiz result label/trail
    monoXl: "0.78rem" # quiz trail (wide), timeline tooltip years
    monoXxl: "1.2rem" # detail-panel close glyph
    bodyXs: "0.8rem" # anatomy loading state
    bodySm: "0.82rem" # row tagline, anatomy fact value
    bodyMd: "0.83rem" # quiz option description
    bodyLg: "0.85rem" # brand sub, key typefaces, sub-styles, visual characteristics
    bodyXl: "0.88rem" # diagnostic value
    bodyXxl: "0.9rem" # quiz hint, compare-empty state
    bodyXxxl: "0.92rem" # custom-specimen text input
    bodyXxxxl: "0.95rem" # quiz option label
    headingSm: "1.3rem" # compare column name
    titleFluidMinA: "1.6rem" # spec-row name / view-intro h2, smaller fluid endpoint
    titleFluidMaxA: "2.5rem" # spec-row name, larger fluid endpoint
    titleFluidMinB: "2rem" # detail/quiz-result name, smaller fluid endpoint
    titleFluidMaxB: "2.6rem" # detail/quiz-result name, larger fluid endpoint
    titleFluidMaxC: "1.8rem" # quiz question, larger fluid endpoint
    brandEyebrowMax: "3.9rem" # "Type" eyebrow line above "Classified", larger fluid endpoint
    diagramXs: "7px" # anatomy x-height arrow label
    diagramSm: "7.5px" # timeline branch label
    diagramMd: "8px" # anatomy reference-glyph caption
    diagramLg: "9px" # anatomy guide/stress labels, timeline era label base size
    diagramXl: "10px" # timeline mark/bar labels
    diagramXxl: "11.5px" # timeline row-label name (HTML, not SVG, but same micro scale)
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

Every classification name is set in a single oversized condensed grotesque, uppercase, carrying the page the way a poster's headline carries a spread — the brand lockup itself runs large enough to anchor the whole first viewport, not just introduce it. Everything measured — indices, era dates, diagnostic labels, dimension callouts — is set in a monospace, because a number in a monospace face reads as data, not as prose. The dominant color is now a deep pine teal (replacing the earlier near-black ink entirely), with a coral-orange kept as a small third note — the tab labels' whole word runs in that coral, at reduced opacity when inactive, full opacity when active, rather than switching between neutral and accent colors. Corners are square throughout and nothing casts a shadow — separation between surfaces comes from a rule line or a change in tone, never blur.

**Key Characteristics:**
- Cream ground in light mode, deep pine teal in dark mode — the two colors literally swap roles between themes, mirroring the reference's own two panels
- One condensed display face (Anton) carries every name and headline, always uppercase, at a deliberately large scale; section headings carry extra letter-spacing (`0.025em`) for legibility at that tightness
- A monospace face marks anything measured: indices, dates, dimensions, tags
- Dashed rules are structural, not decorative — they mark a grid, a leader line, a boundary
- Square corners everywhere; separation comes from a rule or a tone change, never a shadow
- Coral-orange marks small things and every tab label at all times — a marker square on every tag, bars, measurement call-outs, and all four tab labels (findability over restraint, per explicit request); only the active tab's underline distinguishes selection

## Colors

A teal-and-cream system with a coral-orange accent kept as a small third note — the redesign's third palette move. Reference: a "muzudesigns" font/color pairing card (deep pine teal `#004643` + cream `#f0ede5`, a genuinely two-tone pairing with no third color at all). Presented with the choice of going fully two-tone or keeping a small accent, the user chose to keep the coral: **"a dash of orange is good."**

### Primary
- **Sealing Wax** (`#bc3a14` light / `#ffb27f` dark): a small marker square before every branch tag, the timeline's classification bars and era pins, the "key tell" callout's left rule, and — per explicit request — every tab label's text color at all times (opacity, not color, differentiates its inactive/active states). The dark-mode value moved from `#f2743f` to a lighter `#ffb27f` specifically because the dark paper is no longer near-black — it's now a mid-toned teal (`#004643`), so the accent needed to lift further to clear 4.5:1 as text on both the teal paper (6.09:1) and the teal panel `#0a5852` (4.71:1).

### Neutral
- **Paper** (`#f0ede5` light / `#004643` dark): page background — cream in light mode, the reference's own deep pine teal in dark mode. Light and dark mode now literally swap the reference's two colors, the same way its own two panels do.
- **Panel** (`#ffffff` light / `#0a5852` dark): any surface that sits above the page — the detail modal, quiz card, row hover state, filter chips, tooltips, popovers.
- **Ink** (`#004643` light / `#f0ede5` dark): primary text, headings, borders on floating surfaces (modal, quiz card, filter chips, tooltips), focus rings. Deep pine teal replaces the previous near-black entirely — this is no longer a neutral-ink system.
- **Ink Soft** (`#2e5c59` light / `#cddbd8` dark): secondary text — descriptions, taglines.
- **Ink Faint** (`#4d6a67` light / `#a8c2bf` dark): tertiary text and structural marks — indices, era dates, dashed grid rules, inactive tab labels.
- **Rule Solid** (`#d3dbd8` light / `#146b64` dark): ordinary hairline dividers between rows and sections.
- **Rule Dashed** (`rgba(0,70,67,.22)` light / `rgba(240,237,229,.2)` dark): the timeline's gridlines — the one place the dashed-rule motif survives as an actual stroke rather than a border style.

### Named Rules
**The Small Mark Rule.** Sealing Wax never fills a surface larger than a 7px marker square, a 2px border, or a bar on the timeline. A branch tag's own text stays `ink-soft`, not accent — the color lives in the marker, not the label. Tab labels are the one standing exception: all four run in accent color at all times (a findability call, not a drift) — the rule still holds everywhere Sealing Wax would otherwise be a *fill*, which tab-label text never is.

**The Teal-and-Cream Rule.** The system's neutrals are no longer neutral at all — every "ink" step is a shade of deep pine teal, every "paper" step a shade of cream (or, in dark mode, the teal and cream swap roles entirely, mirroring the reference's own two panels). This is the palette's third distinct direction this session (neutral grey → warm cream/near-black → teal/cream); if it moves a fourth time, make the choice deliberately rather than drifting again.

## Typography

**Display Font:** Anton (with Arial Narrow, sans-serif fallback)
**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)
**Mono Font:** JetBrains Mono (with Space Mono, monospace fallback)

**Character:** One oversized condensed grotesque carries every name and heading, always uppercase, the way a poster's headline or a portfolio's client list does — against a plain Inter for running prose and a JetBrains Mono for anything measured. There is no serif anywhere in the interface; the previous world's Fraunces is gone entirely, not merely demoted.

### Hierarchy
- **Display** (400, `clamp(4.4rem, 14vw, 9rem)`, 0.88 line-height, uppercase): the site brand's "Classified" line only. Sized deliberately large — at the user's explicit request, twice now (first to make the brand read as the viewport's actual headline, then again to grow "Classified" further) — so it's the loudest thing on the page. "Type" sits above it as a smaller eyebrow (`clamp(2.1rem, 6vw, 3.9rem)`, same face/weight/case) rather than matching size — an asymmetric two-line lockup instead of one uniform brand size, also per explicit request (sized up 50% from its first pass after the initial eyebrow read too small next to "Classified").
- **Title** (400, `clamp(1.4rem, 4vw, 2.1rem)` up to `clamp(2rem, 6vw, 2.6rem)` depending on context, 1.0–1.05 line-height, uppercase): every classification name — the Explore row, the detail panel, the quiz result — plus section intros and the quiz question. This single oversized-condensed-uppercase treatment is the system's most repeated move; four fluid variants exist for different heading levels (row name, detail/quiz-result name, section intro, quiz question — endpoints enumerated in the `typography.scale` frontmatter as `titleFluidMin/MaxA/B/C`), not a single fixed size. Section-intro headings (`view-intro h2`, e.g. "Explore the Classifications") carry `0.025em` letter-spacing and `1.05` line-height — Anton's native tracking is tight enough that a multi-word running phrase (unlike a single classification name) read as cramped without it.
- **Body** (400, `0.8rem`–`1rem`, 1.5 line-height): running prose — descriptions, taglines, quiz hints, diagnostic/tell-box copy. `1rem` is the representative size (used for the main description paragraph); the rest of the range is the natural spread of secondary copy (captions, hints, list items) that's grown across components — enumerated as `bodyXs`–`bodyXxxxl` in `typography.scale`, all Inter.
- **Mono** (700, `0.62rem`–`1.2rem`, 1.3 line-height, `0.03em`–`0.06em` tracking, usually uppercase): the system's other workhorse — row indices, era dates, diagnostic labels, branch tags, footer credits, timeline marks, the detail panel's close glyph. `0.7rem` is the representative size; the full step range is enumerated as `monoXs`–`monoXxl` in `typography.scale`. Where the old system's "Whisper Label" was small Inter, this system's equivalent is monospace: it reads as data being cited, not prose being introduced.
- **Diagram micro-scale** (7px–11.5px, mono, uncommon-case only): caption text baked directly into the anatomy and timeline SVGs (guide lines, stress angle, x-height arrow, era/bar labels) plus the timeline's HTML row-label name. Deliberately outside the rem-based UI scale above — these sizes are computed relative to a rendered glyph's own measured metrics, not chosen from the type system, and only ever appear as tiny annotations on a diagram, never as UI copy. Enumerated as `diagramXs`–`diagramXxl` in `typography.scale`.
- **Specimen exception** — a classification's live "Aa Gg Qy" (and its anatomy diagram) render in that classification's *own* verified period-accurate typeface when one is self-hosted (Coelacanth for Venetian Oldstyle, Tinos for Transitional; see `typography.specimen` and `PRODUCT.md`), not in Display/Title/Body/Mono. This is deliberate and expected to keep growing — classification lineage accuracy outranks the one-voice type system for this one piece of content.

### Named Rules
**The One Voice, One Data Rule.** Anton names things; Inter explains things; JetBrains Mono measures things. No role ever borrows another's job — body copy never goes condensed-uppercase, and a measurement is never set in anything but mono.

## Layout

Unchanged from the previous system at the structural level: a single centered column, `max-width: 1120px` (widened slightly from `1080px`), fluid `clamp()`-based padding, no hard breakpoint grid. The header's tab bar went through two moves: the original pre-redesign horizontal underline bar first became a row of rotated, vertical labels riding dashed rules (`writing-mode: vertical-rl`), directly translating the pinned poster reference's own navigation device — then, later in the same project, reverted back to a horizontal underline bar per explicit request (see Tabs, under Components) — the poster-grid reading was judged not worth keeping once tried live.

Explore's card grid became a numbered list: each classification is a full-width row (index, oversized name, live specimen, tagline, era, branch tag) separated by hairline rules, rather than a grid of bordered cards. Compare's columns lost their individual card borders in favor of a single shared 1px rule grid (a `background`-and-`gap` trick, not per-cell borders) — reads as one ruled table, not three adjacent cards.

The page background (`body`) carries a faint 28px graph-paper grid (`--paper-grid`, an `ink`/`cream`-derived rgba at 5% alpha, swapping with the theme like `--rule` does) instead of a flat `paper` color, added at the user's request for "texture... to make it newspaper feel." Chosen over a literal newsprint grain or a halftone dot screen (both previewed) specifically because a grid reads as this system's own structural-line language extended to the whole page, not a borrowed print effect — it's the same idea as the dashed timeline/anatomy rules, just ambient rather than functional.

The header itself (`.site-header`) now carries a full-bleed photograph — a black-and-white portrait of a type designer at their desk, user-supplied — under a teal wash (the same rgba the timeline's Romanesque era band opens on) fading to `paper` at the bottom, with the brand lockup, tagline, and tab nav sitting on top in a fixed cream (`--hero-ink`, not theme-swapped, since the photo doesn't theme-swap either). Three previewed options (a teal duotone, a straight-grayscale dark scrim, and a contained side panel) were narrowed to the duotone per explicit request. The photo, wash, and fade are all sized to `.site-header`'s own content-driven height (not a fixed aspect-ratio box) specifically so the tagline/tab-nav — which stack taller on narrow viewports as the brand wraps — never spill past the tinted area onto plain paper still carrying the light on-photo text color; the photo crops from `background-position: center top` so its own top (where the subject's face sits) is never the part sacrificed to a short container.

## Elevation & Depth

No shadows anywhere — this is a hard departure from the previous system, which used a soft ambient shadow on hover and floating surfaces. Every surface in this system separates from its neighbor with a rule line (`rule-solid`) or a tone shift (`paper` → `panel`), never blur. Floating surfaces (the detail modal, the quiz card, tooltips, the serif-spectrum zoom popover) get a solid 1px `ink` border instead of a shadow — a page in a measured document doesn't cast light, it's outlined.

### Named Rules
**The Line, Not Light Rule.** No `box-shadow` appears anywhere in this system. A surface separates from the page behind it with a border or a tone change; if neither reads clearly enough, the surface's content or size is wrong, not its shadow.

## Shapes

Every corner in the system is square — `border-radius: 0` everywhere, with no exceptions; the timeline bars' old `rx="4"` rounding was flattened to `rx="0"` in this pass specifically to hold that line. Structure comes from rule lines: solid hairlines divide ordinary content, dashed lines mark the timeline's year grid and the header's tab rail. Borders, not radius or shadow, are this system's entire form language.

## Components

### Hero (site header photo)
- **Style:** a full-bleed black-and-white photo (a type designer at their desk) under a fixed teal wash (`rgba(0, 70, 67, 0.6)`, matching the timeline's own Romanesque-era rgba) fading to `paper` by the header's bottom edge. Brand lockup, tagline, and tab nav sit on top in `hero-ink` — a fixed cream that does not swap with light/dark mode, since neither the photo nor its wash do.
- **Sizing:** the photo, wash, and fade are backgrounds on `.site-header` itself, sized to the header's real (content-driven) height — not a fixed aspect-ratio box — so the fade always lands exactly at the text content's own bottom edge regardless of how tall that content stacks at a given viewport width. `background-position: center top` keeps the photo's own top (the subject's face) intact when a short/compact layout crops the bottom of the frame; `min-height: 13vw` keeps that top slice from getting too thin. `.hero-text`'s `padding-top: 15%` pulls the brand lockup up so "Classified" overlaps the subject's forearm/wrist — a deliberate contact, not an accident, per explicit request ("the word 'classified' can touch the wrist of the man").
- **Narrow-viewport override:** at `max-width: 1000px`, `.hero-text` gets `padding-top: 21%` instead of the desktop 15%. Root cause: "Type" and "Classified" scale via two independent `clamp()` curves with different `vw` coefficients, so a single width-relative `padding-top` only clears the subject's chin at the widths where both curves happen to be flat (narrow phones, both pinned to their min; wide desktop, both scaling together) — the wide middle band (roughly 640–1000px, where one curve is still climbing and the other effectively isn't) is exactly where "Classified" lands lowest relative to its own text block and covers his chin/mouth instead of his wrist. First tried as a `640px` mobile-only fix, which left phones-in-landscape/small-tablet widths still broken — confirmed by testing across the actual range (700px/900px/1000px/1100px) rather than assuming the 640px phone breakpoint was the whole story.
- **History:** three treatments were previewed (teal duotone / straight-grayscale dark scrim / a contained side panel, not full-bleed) and narrowed to the duotone per explicit request; the brand lockup was then pushed down and shrunk (~18%) after the first pass placed "Classified" directly over the subject's face — the opposite instruction from where this ended up, once the user had seen it built and decided a small deliberate overlap read better than full clearance. The photo itself was swapped/retuned three times after that: a taller 1600:1067 crop first, then a wider 1774:887 (2:1) crop specifically to make "the top part not too tall" (`min-height`/`.hero-text` padding 26vw/34% → 20vw/26%), then that crop trimmed a further 53px off its own top (20vw/26% → 19vw/24%), then finally the text itself pulled up further still, past "just clearing his hand" into "touching his wrist" (19vw/24% → 13vw/15%) — two comp options (a smaller and a larger shift) were previewed before this final size was picked.

### Tabs (header navigation)
- **Style:** a conventional horizontal underline-tab bar now, not the poster-reference's rotated vertical rule — reverted per explicit request ("vertical orange line make horizontal and place under the tab that is in action"). Each label reads normally (no `writing-mode`/rotation); a `2px` `border-bottom` (transparent at rest, `sealing-wax` when active) sits directly on the tab, overlapping `.tabs`'s own `1px rule-solid` baseline via a `-1px` margin so the active underline reads as a bolder colored segment of that shared line.
- **Color:** all four labels are `sealing-wax` colored at all times, once again — this rule has now moved three times. First always-accent/opacity-differentiated; then reverted to neutral-`ink-faint`-until-active per "highlight only the tab when active"; then reverted again to always-accent per "should be in orange else people might miss the buttons" (a findability concern — a muted inactive label read as disabled/non-interactive to the user). The underline alone now carries the active/inactive distinction (accent when active, transparent otherwise; hover previews it at low opacity) — label color no longer varies by state at all, active only gains `font-weight: 700`.
- **Focus:** `2px focus-ring` outline, `2px` offset.

### Chips (filters, branch tags)
- **Filter chip:** solid `panel` (white) background, `1px ink` border, square corners, JetBrains Mono uppercase text — given a solid fill rather than transparent specifically so each chip reads as a distinct element against the grey `paper` page instead of nearly disappearing into it. Hover turns the border and text `sealing-wax`.
- **Active filter chip:** inverts to `ink` background / `paper` text — unchanged behavior from the previous system, just square instead of pill-shaped now.
- **Branch tag:** a 7px `sealing-wax` marker square (`::before`) beside plain `ink-soft` JetBrains Mono text — no box, no border, no fill. Went through two earlier revisions: a transparent outline (too faint to "tell apart"), then a bordered box with an `accent-tint` fill ("looks like a slob" — too heavy, read as a UI badge rather than an annotation). The marker-square treatment settled on a small, legible color cue without turning the tag into a button.

### Rows (Explore list)
- **Style:** a full-width flex row — mono index, then the classification's oversized Anton name with its live specimen and tagline beneath, then era date and branch tag at the trailing edge. Separated by `1px rule-solid` hairlines, no card border, no radius.
- **Hover/Focus:** background shifts from `paper` to `panel` — the entire row highlights, the way a finger running down a ledger would.

### Footer (colophon)
- **Style:** a fixed dark-teal (`#004643`) block with reversed cream text (`hero-ink`) — not theme-swapped, at explicit request ("the lowest table can have a dark green table with text in reverse white"), so it reads as a deliberately dark closing panel in both light and dark mode rather than following `ink`/`paper`'s usual swap. No border: the tone-shift from `paper` is itself the separator (The Line, Not Light Rule). In dark mode this block happens to match the page's own `paper` teal almost exactly, so the "reversed panel" read recedes there — an accepted consequence of keeping the color fixed rather than theme-relative.

### Panels (detail modal, quiz card)
- **Style:** `panel` background, `1px solid ink` border (not `rule-solid` — floating surfaces get the stronger, higher-contrast border since they're not sitting flush with the page), square corners, no shadow.
- **Internal rhythm:** unchanged from the previous system — diagnostics grid, key-tell callout, serif spectrum, anatomy diagram all keep their prior structure, restyled into this system's mono/display vocabulary rather than rebuilt.

### Anatomy Diagram (signature component, extended)
The dashed-leader-line language that previously lived only inside this one component (cap line / mean line / baseline / x-height) is now the whole system's structural idiom, not a one-off — the redesign's central move was recognizing this component already was the pinned reference's grammar and building outward from it rather than in.

### Timeline (signature component)
Era bands now walk a deliberate chronological color arc rather than sitting near-monochrome: Romanesque opens at the app's own ink teal and the arc lands on Digital & Variable Age in the app's own accent coral, so hue narrates "then" to "now" using the brand's own two colors, not an arbitrary rainbow. This is framed as chart/data-encoding color (legitimate categorical variation), distinct from UI-chrome accent use, which stays restrained. Gridlines are genuinely dashed (`rule-dashed`), and classification bars keep their accent fill and pin marker.

Three data-driven refinements layer on top of the static chart:
- **Duration-scaled era labels** — an era band's inline label size is sqrt-scaled to how long that era actually lasted (26–300 years maps to 8–13px), so Gothic's label reads visibly larger than Digital & Variable Age's. Type size carries a real chart value here, not decoration for its own sake.
- **Bar draw-in** — classification bars animate from zero to their true width the first time the Timeline tab is opened (not on every tab switch), via a CSS class scaling the bar to `scaleX(0)` from its own left edge (`transform-box: fill-box`) that's removed on that first open so the transition sweeps the bar in. `transform`, not `width`, keeps this compositor-only instead of triggering layout on every frame. This is the chart's one authored focal entrance (animate.md), staggered slightly per row. Skipped entirely — no shortened version — under `prefers-reduced-motion`, since a bar sweep has no non-motion equivalent.
- **Row ↔ bar hover sync** — hovering a row label in the left column highlights that row's bar in the chart and dims the rest (and the reverse: hovering a bar highlights its row label), making the label-to-chart relationship legible without a click.

## Do's and Don'ts

### Do:
- **Do** set every classification name and heading in Anton, uppercase, at large scale — this is the system's one repeated gesture, and it should stay the loudest thing on any screen.
- **Do** set anything measured (an index, a date, a diagnostic, a dimension) in JetBrains Mono — a number in Inter reads as prose, not data.
- **Do** separate every surface with a border or a tone shift, never a shadow.
- **Do** keep Sealing Wax to tags, bars, and measurement marks — the Small Mark Rule survived the redesign intact.

### Don't:
- **Don't** reintroduce a shadow anywhere, however soft — this system's entire elevation model depends on lines and tone doing that job instead.
- **Don't** round a corner. `border-radius: 0` is absolute, no exceptions — including SVG geometry (`rx`/`ry`).
- **Don't** drift the neutrals' warmth without a deliberate decision — this palette has already moved from warm-but-uncommitted to neutral-grey to warm-cream across three passes; the next change should be a decision, not another wobble.
- **Don't** ship a font whose classification lineage is wrong for the sake of a better-looking specimen — this constraint predates and survives the redesign untouched (see PRODUCT.md); the live "Aa Gg Qy" specimens still render in each classification's own verified typeface, underneath the new Anton display name, not replaced by it.
