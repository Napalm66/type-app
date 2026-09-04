// Type classification reference data.
// Font stacks use freely-licensed Google Fonts as the closest visual analogs
// to historical specimens — not the original metal-type designs themselves.

const CLASSIFICATIONS = [
  {
    id: "blackletter",
    branch: "blackletter",
    name: "Blackletter",
    era: "c. 1150 – 1500",
    timelineStart: 1150,
    timelineEnd: 1500,
    tagline: "The angular hand of medieval scribes, cut into the first metal type.",
    description:
      "Blackletter (or Gothic) scripts grew out of northern European manuscript hands. Letters are dense, angular, and vertical, with dramatic contrast built from a broad-nib pen held at a steep angle. Gutenberg's 42-line Bible was set in a Textura blackletter. It splintered into regional sub-styles before Roman letterforms took over most of Europe.",
    closesBecause: "Roman letterforms displaced blackletter as the dominant book type across most of Europe by 1500.",
    subStyles: [
      { name: "Textura", note: "Most rigid and vertical; dense 'woven' texture, sharp diamond feet." },
      { name: "Rotunda", note: "Rounder, southern-European variant; softer curves than Textura." },
      { name: "Schwabacher", note: "German cursive-influenced hand, looser and more flowing." },
      { name: "Fraktur", note: "Later, highly decorative German standard; broken, fractured curves." },
    ],
    visualCharacteristics: [
      { label: "Terminals", text: "The ends of strokes are often sharp and may include flourishes." },
      { label: "Serifs", text: "Terminals may or may not have serifs." },
      { label: "Stress", text: "Usually oblique." },
      { label: "Contrast", text: "Often there is high contrast between thick and thin strokes." },
      { label: "Set width", text: "Gothic styles often appear narrow, Celtic styles often appear wide." },
      { label: "Positive/Negative space", text: "Closely spaced letters with small counterforms give an overall dark appearance." },
    ],
    additionalFeatures: [
      "Based on handwriting styles of Gothic (German) and Celtic (Irish) medieval scribes",
      "Highly decorative",
      "Heavy vertical stems cause a strong vertical presence",
    ],
    keyTypefaces: ["Gutenberg's Textura", "Fraktur", "Cloister Black", "Old English"],
    fontStack: "'UnifrakturMaguntia', cursive",
    googleFont: "UnifrakturMaguntia",
    specimenSize: "2.4rem",
  },
  {
    id: "venetian",
    branch: "serif",
    name: "Venetian Oldstyle",
    era: "c. 1470 – 1500",
    timelineStart: 1470,
    timelineEnd: 1500,
    tagline: "Humanist type at its origin — a printed echo of the pen.",
    description:
      "The earliest Roman printing types, cut in Venice by Nicolas Jenson and others, translated the humanist scribal hand almost directly into metal. Contrast is very low, the axis of stress is strongly oblique (as if drawn with a broad pen tilted to the left), and the lowercase 'e' has a slanted, sometimes diagonal crossbar — the clearest tell distinguishing Venetian from later Garalde types.",
    closesBecause: "Superseded by the Garalde style pioneered by Aldus Manutius and Claude Garamond, which begins almost exactly where this one ends.",
    diagnostics: {
      contrast: "low",
      axis: "oblique-strong",
      serif: "bracketed-robust",
      tell: "Some Venetian typefaces have a slanted lowercase 'e'; very low stroke contrast.",
    },
    visualCharacteristics: [
      { label: "Terminals", text: "The ends of strokes may be softly pointed, rounded, angled, or may end in a teardrop or ball shape." },
      { label: "Serifs", text: "Usually bracketed, and may be uneven and/or slightly concave and rounded." },
      { label: "Stress", text: "Usually oblique." },
      { label: "Contrast", text: "There is a low contrast between thick and thin strokes." },
      { label: "X-height", text: "Generally medium in relation to the cap height." },
      { label: "Set width", text: "Characters tend to be moderate to wide." },
      { label: "Positive/Negative space", text: "Increased spacing and counters give a lighter overall appearance than Blackletters." },
    ],
    additionalFeatures: [
      "Based on handwriting styles of Italian medieval scribes",
      "Characters tend to have organic, rounded shapes and medium-to-heavy calligraphic strokes",
      "Lowercase \"e\" has a slanted crossbar",
    ],
    keyTypefaces: ["Jenson", "Centaur", "Verona", "Golden Type"],
    // Coelacanth (self-hosted, see fonts/OFL-Coelacanth.md) is a free
    // direct revival of Bruce Rogers' Centaur — a genuine Jenson/Venetian
    // lineage typeface, unlike Cormorant Garamond (which is Garalde, i.e.
    // technically the wrong classification for this card).
    fontStack: "'Coelacanth', 'Cormorant Garamond', 'EB Garamond', serif",
    specimenSize: "3rem",
  },
  {
    id: "garalde",
    branch: "serif",
    name: "Garalde Oldstyle",
    era: "c. 1495 – 1700",
    timelineStart: 1495,
    timelineEnd: 1700,
    tagline: "The Aldine-Garamond tradition — the workhorse of Western printing.",
    description:
      "Named for Aldus Manutius and Claude Garamond, Garalde types refined the Venetian model: contrast is slightly higher, the axis is still oblique but less extreme, and the crossbar of the lowercase 'e' returns to horizontal. Garalde oldstyles dominated book printing for over two centuries, through the higher-contrast 'Dutch taste' types (Van Dijck, Kis/Janson) that carried the tradition into the 1600s, and remain a byword for warmth and readability at text size.",
    closesBecause: "Gave way to the Transitional style inaugurated by the Romain du Roi in 1702.",
    diagnostics: {
      contrast: "low-medium",
      axis: "oblique-moderate",
      serif: "bracketed-robust",
      tell: "Horizontal 'e' crossbar (unlike Venetian); small aperture, moderate oblique stress.",
    },
    keyTypefaces: ["Garamond", "Bembo", "Caslon", "Janson"],
    fontStack: "'EB Garamond', serif",
    googleFont: "EB Garamond:wght@500",
    specimenSize: "3rem",
  },
  {
    id: "transitional",
    branch: "serif",
    name: "Transitional",
    era: "c. 1700 – 1790",
    timelineStart: 1700,
    timelineEnd: 1790,
    tagline: "The pivot point — pen-drawn warmth meeting ruler-drawn precision.",
    description:
      "Transitional types, epitomized by John Baskerville, sit between oldstyle and modern. The axis of stress straightens toward vertical, contrast increases noticeably, and serifs are more sharply bracketed. Advances in paper and printing let punchcutters render finer detail than the Garalde era allowed. Many later 'modern-revival' text faces (including most Times New Roman-style faces) are technically Transitional.",
    closesBecause: "Bodoni and Didot's Modern (Didone) style takes over exactly as this one closes.",
    diagnostics: {
      contrast: "medium",
      axis: "near-vertical",
      serif: "bracketed-sharp",
      tell: "Higher contrast than Garalde, but serifs still bracketed (not hairline) and axis close to vertical.",
    },
    keyTypefaces: ["Baskerville", "Times New Roman", "Georgia", "Mrs Eaves"],
    // "Times New Roman" leads by name — genuine, if the visitor's device
    // has it installed (no redistribution involved, just a CSS reference).
    // Tinos, a free SIL-OFL metric-compatible match for Times New Roman
    // (same brief as Arimo for Helvetica/Arial), is self-hosted right
    // behind it — so any visitor without Times New Roman installed
    // (many Android/Linux setups) still gets the same look instead of
    // silently falling back to a generic serif. Libre Baskerville (also
    // a loaded web font) is the fallback if Tinos ever fails to load.
    fontStack: "'Times New Roman', 'Tinos', 'Libre Baskerville', 'Liberation Serif', serif",
    googleFont: "Libre Baskerville",
    specimenSize: "2.8rem",
  },
  {
    id: "modern",
    branch: "serif",
    name: "Modern (Didone)",
    era: "c. 1790 – 1820",
    timelineStart: 1790,
    timelineEnd: 1820,
    tagline: "Maximum contrast, ruled precision, and hairline drama.",
    description:
      "Named for Firmin Didot and Giambattista Bodoni, Didone types push contrast to its extreme: thick vertical stems meet hairline-thin serifs and horizontals, the axis is perfectly vertical, and serifs lose their brackets entirely. The effect is crisp, geometric, and coolly elegant — closer to a ruled drawing than a pen stroke.",
    closesBecause: "Marks the end of Bodoni's active career and the rise of slab serifs and grotesques for advertising.",
    diagnostics: {
      contrast: "high",
      axis: "vertical",
      serif: "unbracketed-hairline",
      tell: "Unbracketed hairline serifs; extreme thick/thin contrast; perfectly vertical stress.",
    },
    keyTypefaces: ["Bodoni", "Didot", "Walbaum", "Bodoni Moda"],
    // Playfair Display (previously used here) is explicitly not a direct
    // Bodoni/Didot revival — its own designer describes it as synthesizing
    // Baskerville (Transitional), Didot, Bodoni, and Scotch Roman together,
    // which blurs exactly the boundary this card exists to draw. Bodoni
    // Moda is a genuine, direct Bodoni revival (Owen Earl), with real
    // optical sizes, on Google Fonts.
    fontStack: "'Bodoni Moda', serif",
    googleFont: "Bodoni Moda:wght@700",
    specimenSize: "3rem",
  },
  {
    id: "slab",
    branch: "serif",
    name: "Slab Serif (Egyptian)",
    era: "1815 – 1934",
    timelineStart: 1815,
    timelineEnd: 1934,
    tagline: "Serifs as thick as the stems — built to shout from a poster.",
    description:
      "Slab serifs emerged for advertising and display, where oldstyle and modern faces disappeared at a distance. Serifs become heavy, squared-off slabs with little or no bracketing, and contrast drops back to low. Later 20th-century 'geometric slabs' (Rockwell) and 'clarendons' (bracketed slabs with more warmth) both fall under this umbrella.",
    closesBecause: "Closes at Rockwell (1934), the last major 20th-century geometric-slab revival cited as part of this classification.",
    diagnostics: {
      contrast: "low",
      axis: "vertical",
      serif: "square-slab",
      tell: "Thick, squared-off serifs roughly as heavy as the stems; minimal or heavy bracketing.",
    },
    keyTypefaces: ["Clarendon", "Rockwell", "Courier", "Kameron"],
    // Kameron (Vernon Adams) is explicitly a reworking of classic Slab
    // Serif/Egyptian forms blending geometric and Clarendon influences —
    // a closer match to this card than Roboto Slab, which is a screen-
    // optimized companion to Roboto rather than a period-form revival.
    fontStack: "'Kameron', serif",
    googleFont: "Kameron:wght@600",
    specimenSize: "2.8rem",
  },
  {
    id: "grotesque",
    branch: "sans",
    name: "Grotesque Sans",
    era: "c. 1815 – 1900",
    timelineStart: 1815,
    timelineEnd: 1900,
    tagline: "The first sans serifs — blunt, quirky, and built for the poster.",
    description:
      "The earliest sans serifs (originally called 'grotesque' because contemporaries found letters without serifs ugly) have slightly irregular proportions, a squarish bowl structure, and a bit of stroke contrast inherited from their serif ancestors. Akzidenz-Grotesk, cut in 1898, became the direct ancestor of Helvetica and the whole neo-grotesque movement.",
    closesBecause: "Superseded by the mid-century Swiss regularization into Neo-Grotesque.",
    diagnostics: {
      contrast: "low",
      axis: "vertical",
      serif: "none",
      tell: "Slightly irregular widths, squarish curves, a hint of stroke contrast — less 'engineered' than neo-grotesques.",
    },
    keyTypefaces: ["Akzidenz-Grotesk", "Franklin Gothic", "News Gothic"],
    // Libre Franklin (Impallari Type) is an explicit open-source
    // revival of Franklin Gothic — this card's own key typeface —
    // unlike Archivo, an original 2012 design in the genre but not a
    // revival of anything specific. Swapped to lead.
    fontStack: "'Libre Franklin', 'Archivo', sans-serif",
    googleFont: "Libre Franklin:wght@700",
    specimenSize: "2.8rem",
  },
  {
    id: "neo-grotesque",
    branch: "sans",
    name: "Neo-Grotesque",
    era: "c. 1950 – 1970",
    timelineStart: 1950,
    timelineEnd: 1970,
    tagline: "The corporate default — refined, neutral, endlessly copied.",
    description:
      "Mid-century Swiss designers regularized the grotesque: strokes became more uniform, contrast dropped further toward zero, and apertures tightened. Helvetica and Univers are the defining faces of this style — deliberately 'neutral' letterforms meant to disappear into the message.",
    closesBecause: "Marks the end of the core Swiss International Style wave that produced Helvetica and Univers.",
    diagnostics: {
      contrast: "none",
      axis: "vertical",
      serif: "none",
      tell: "Tight apertures, very uniform stroke width, closed-off terminals (e.g. Helvetica's 'C' and 'S').",
    },
    keyTypefaces: ["Helvetica", "Univers", "Arial", "San Francisco"],
    fontStack: "'Arimo', Arial, sans-serif",
    googleFont: "Arimo:wght@700",
    specimenSize: "2.8rem",
  },
  {
    id: "geometric",
    branch: "sans",
    name: "Geometric Sans",
    era: "c. 1925 – 1970",
    timelineStart: 1925,
    timelineEnd: 1970,
    tagline: "Compass-and-ruler letters, straight from the Bauhaus.",
    description:
      "Geometric sans serifs build letters from simple, near-mathematical shapes — true circles for bowls, perfect verticals and horizontals. Futura, drawn by Paul Renner, is the archetype: the lowercase 'o' is nearly a perfect circle, and the 'a' and 'g' are typically single-story.",
    closesBecause: "Closes at Avant Garde (1970), the last major mid-century revival of Futura's geometric approach.",
    diagnostics: {
      contrast: "none",
      axis: "vertical",
      serif: "none",
      tell: "Near-circular bowls, single-story 'a' and 'g', very consistent, mechanical proportions.",
    },
    keyTypefaces: ["Futura", "Century Gothic", "Avant Garde", "Kabel"],
    // Jost was designed as an explicit homage to Paul Renner (Futura's
    // designer) — originally named "Renner*" before release — capturing
    // Futura's geometric proportions directly. Poppins is an original
    // 2015 design in the genre, but its own foundry describes it as
    // deliberately not evoking Futura's retro feel.
    fontStack: "'Jost', 'Poppins', sans-serif",
    googleFont: "Jost:wght@600",
    specimenSize: "2.8rem",
  },
  {
    id: "humanist-sans",
    branch: "sans",
    name: "Humanist Sans",
    era: "1916 – 1976",
    timelineStart: 1916,
    timelineEnd: 1976,
    tagline: "Sans serif with a calligrapher's hand still visible underneath.",
    description:
      "Humanist sans serifs keep proportions and some stroke modulation inherited from Roman inscriptional and oldstyle serif letterforms — the most 'readable' and warmest of the sans genres. Apertures are open, and the two-story 'a' and 'g' are common, unlike geometric sans.",
    closesBecause: "Closes at Frutiger (1976), which revived the Johnston/Gill Sans lineage as a legibility-driven signage genre.",
    diagnostics: {
      contrast: "low",
      axis: "slightly-oblique",
      serif: "none",
      tell: "Open apertures, some stroke modulation, often a two-story 'g' — feels closer to a serif face without the serifs.",
    },
    keyTypefaces: ["Gill Sans", "Frutiger", "Optima", "Open Sans"],
    // Open Sans is unambiguously classified as humanist by its own
    // designer (Steve Matteson) and design brief — "open apertures,
    // wide forms" match this card's own diagnostic tell directly.
    // Source Sans 3 is based on Franklin Gothic/News Gothic, a more
    // grotesque-leaning lineage described as mixed Grotesque/Humanist.
    fontStack: "'Open Sans', 'Source Sans 3', sans-serif",
    googleFont: "Open Sans:wght@600",
    specimenSize: "2.8rem",
  },
  {
    id: "glyphic",
    branch: "glyphic",
    name: "Glyphic / Latin",
    era: "c. 1900 – 1940",
    timelineStart: 1900,
    timelineEnd: 1940,
    tagline: "Letters chiseled in stone, not drawn with a pen.",
    description:
      "Glyphic (or 'Latin') faces evoke carved or inscribed letters rather than pen or brush strokes — small triangular flared serifs instead of bracketed ones, and a monumental, static feel. Roman inscriptional capitals (as on Trajan's Column) are the archetype.",
    closesBecause: "Closes at Albertus (1932–1940), the last major typeface of its formative wave.",
    diagnostics: {
      contrast: "medium",
      axis: "vertical",
      serif: "flared-wedge",
      tell: "Small triangular/flared serifs that taper directly out of the stroke, no true bracket curve.",
    },
    keyTypefaces: ["Trajan", "Albertus", "Copperplate Gothic", "Post Antiqua"],
    fontStack: "'Cinzel', serif",
    googleFont: "Cinzel:wght@600",
    specimenSize: "2.4rem",
  },
  {
    id: "script",
    branch: "script",
    name: "Script",
    era: "c. 1700 – 1965",
    timelineStart: 1700,
    timelineEnd: 1965,
    tagline: "Type that imitates the connected stroke of handwriting.",
    description:
      "Script faces imitate handwriting, from formal engraved copperplate scripts (used for invitations and certificates) to casual brush and marker scripts. Letters often connect or nearly connect, mimicking a single continuous pen or brush stroke.",
    closesBecause: "Closes as brush and casual script popularity waned with the rise of the International Typographic Style.",
    subStyles: [
      { name: "Formal / Copperplate", note: "Based on engraved calligraphy; fine hairlines, high contrast, often all-connected." },
      { name: "Casual", note: "Looser, based on brush or marker lettering; less rigid connection between letters." },
    ],
    keyTypefaces: ["Snell Roundhand", "Shelley Script", "Brush Script"],
    fontStack: "'Tangerine', 'Sacramento', cursive",
    googleFont: "Tangerine:wght@700",
    specimenSize: "4rem",
  },
  {
    id: "display",
    branch: "display",
    name: "Display / Decorative",
    era: "1803 – 2000",
    timelineStart: 1803,
    timelineEnd: 2000,
    tagline: "Type designed to be looked at, not read in paragraphs.",
    description:
      "Display faces prioritize impact and personality over extended readability — fat faces, wood-type Western faces, grunge and novelty faces all live here. They frequently exaggerate a trait from another classification (extreme contrast, extreme weight, decorative ornament) past the point of legibility at text size.",
    closesBecause: "Closes at the 1990s grunge wave, matching the Postmodernism/Punk/Grunge era.",
    keyTypefaces: ["Fat Face", "Cooper Black", "Bungee", "Circus/Western faces"],
    fontStack: "'Bungee', cursive",
    googleFont: "Bungee",
    specimenSize: "2.4rem",
  },
];

const BRANCH_LABELS = {
  blackletter: "Blackletter",
  serif: "Serif",
  sans: "Sans Serif",
  glyphic: "Glyphic / Latin",
  script: "Script",
  display: "Display / Decorative",
};

function getById(id) {
  return CLASSIFICATIONS.find((c) => c.id === id);
}

function googleFontsHref() {
  const families = CLASSIFICATIONS.flatMap((c) => [c.googleFont, c.anatomyGoogleFont].filter(Boolean))
    .map((f) => "family=" + f)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

const TIMELINE_DOMAIN_START = 1100;
const TIMELINE_DOMAIN_END = new Date().getFullYear();

function formatTimelineYear(year) {
  if (year === null) return "present";
  return String(year);
}
