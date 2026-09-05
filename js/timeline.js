function initTimeline(root, onOpenDetail) {
  const domainStart = TIMELINE_DOMAIN_START;
  const domainEnd = TIMELINE_DOMAIN_END;

  // On a touch device there's no hover, so a tap is the only signal
  // available — used to reveal the quick-info tooltip (matching what a
  // mouse hover shows) rather than jumping straight to the full detail
  // view, which a visitor hasn't asked for yet by a single tap.
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  // Broader art-historical backdrop the classifications emerged against.
  // Each period's onset year marks where its band starts and the prior
  // one ends (their canonical ranges actually overlap by decades, since
  // style transitions are gradual, not cutoffs — using onset years keeps
  // the bands sequential and non-overlapping for this chart). The
  // 1900-1910 stretch between Romanticism and Modernism used to be left
  // as an honest gap, but it's Art Nouveau's own well-documented span
  // (c. 1890-1910) — filled in as its own band rather than stretching a
  // neighbor to cover it. Digital & Variable Age's end is domainEnd
  // itself (today), so it always reaches the chart's right edge rather
  // than needing a hardcoded year that goes stale.
  //
  // Each band is a tint/shade of the app's own ink color rather than a
  // different hue per era — `alpha` is the band's position on that ramp,
  // chronologically deepening from a pale tint (Romanesque) to a rich,
  // near-full-strength shade (Digital & Variable Age). Read from the
  // live --ink custom property (not a hardcoded hex) so the whole ramp
  // follows the app's own light/dark theme automatically.
  const ART_PERIODS = [
    {
      name: "Romanesque",
      start: 1000,
      end: 1150,
      alpha: 0.16,
      description: "Pre-printing press era. Marked by Carolingian minuscule and rounded, thick manuscript lettering.",
    },
    {
      name: "Gothic",
      start: 1150,
      end: 1450,
      alpha: 0.22,
      description: "Heavy, dark, and condensed manuscript lettering. Evolves into Blackletter (Textura), the typeface Gutenberg used for the first printing press in 1450.",
    },
    {
      name: "Renaissance",
      start: 1450,
      end: 1600,
      alpha: 0.28,
      description: "The birth of Roman type (Humanist and Old Style/Garalde). Features lighter, highly legible letterforms inspired by classical Roman inscriptions and Italian handwriting.",
    },
    {
      name: "Baroque",
      start: 1600,
      end: 1750,
      alpha: 0.34,
      description: "Transitional type. Features higher contrast between thick and thin strokes, more vertical axes, and sharper serifs (e.g., Baskerville, Caslon).",
    },
    {
      name: "Classicism",
      start: 1750,
      end: 1815,
      alpha: 0.40,
      description: "Modern type (Didone). Characterized by extreme contrast between hair-thin and thick lines, vertical stress, and unbracketed, flat serifs (e.g., Bodoni, Didot).",
    },
    {
      name: "Romanticism",
      start: 1815,
      end: 1900,
      alpha: 0.46,
      description: "The Industrial Revolution demands attention-grabbing type. Slab Serifs (Egyptians), Sans-Serifs (Grotesques), and heavily ornamented, decorative display fonts emerge for advertising.",
    },
    {
      name: "Art Nouveau",
      start: 1900,
      end: 1910,
      alpha: 0.50,
      description: "A reaction against Victorian industrial excess, drawing on organic, flowing forms from nature. Typefaces like Eckmann and Auriol blur the line between lettering and illustration — whiplash curves, floral motifs, and stylized terminals define the era's display faces.",
    },
    {
      name: "Modernism",
      tooltipName: "Modernism (Bauhaus & Swiss)",
      start: 1910,
      end: 1970,
      alpha: 0.54,
      description: "The era of “form follows function.” Strips away ornament in favour of geometric and Neo-Grotesque sans-serifs (like Helvetica and Univers). Focuses on strict grids, asymmetry, and high legibility.",
    },
    {
      name: "Postmodernism",
      tooltipName: "Postmodernism / Punk / Grunge",
      start: 1970,
      end: 2000,
      alpha: 0.58,
      description: "A rebellion against rigid modernist rules. Characters are distorted, layered, and chaotic. Photocomposition and early digital tools allow for experimental, “deconstructed” type.",
    },
    {
      name: "Digital & Variable Age",
      start: 2000,
      end: domainEnd,
      alpha: 0.64,
      description: "Maximized flexibility for screens. Marked by the rise of Variable Fonts (where one font file holds endless weight and width variations), responsive typography, and minimalist web-safe type design.",
    },
  ];

  const TEAL_RGB = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--ink"));
  function eraColor(era) {
    return `rgba(${TEAL_RGB}, ${era.alpha})`;
  }
  function hexToRgb(hex) {
    const h = hex.trim().replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  // Presentation-only metadata (which lane a classification's lineage
  // box sits in, and whether it's a standalone genre with no documented
  // predecessor/successor) — layered on top of CLASSIFICATIONS rather
  // than stored in data.js, since it's purely about how this chart draws
  // the genealogy, not a fact about the classification itself.
  const LANE_MAP = {
    blackletter: { lane: 0, standalone: true },
    // Venetian and Garalde genuinely overlap (Venetian runs to 1500,
    // Garalde starts 1495) — separate lanes so that 5-year overlap
    // renders as a proper branch connector instead of forcing the two
    // boxes flush against each other in a single shared lane.
    venetian: { lane: 1 },
    garalde: { lane: 2 },
    transitional: { lane: 2 },
    modern: { lane: 2 },
    slab: { lane: 3 },
    grotesque: { lane: 4 },
    "neo-grotesque": { lane: 4 },
    geometric: { lane: 5 },
    "humanist-sans": { lane: 6 },
    glyphic: { lane: 7, standalone: true },
    script: { lane: 8, standalone: true },
    display: { lane: 9, standalone: true },
  };

  // Lineage connections derived from each classification's own
  // closesBecause field in data.js (kept here, not there, for the same
  // reason as LANE_MAP — this is a chart concern, not a data fact).
  const EDGES = [
    ["venetian", "garalde"], ["garalde", "transitional"], ["transitional", "modern"],
    ["modern", "slab"], ["modern", "grotesque"],
    ["grotesque", "neo-grotesque"], ["grotesque", "geometric"], ["grotesque", "humanist-sans"],
  ];

  const NODES = CLASSIFICATIONS.map((c) => ({
    id: c.id,
    name: c.name,
    start: c.timelineStart,
    end: c.timelineEnd === null ? domainEnd : c.timelineEnd,
    description: c.description,
    closesBecause: c.closesBecause,
    lane: LANE_MAP[c.id].lane,
    standalone: Boolean(LANE_MAP[c.id].standalone),
  }));

  const CHART_WIDTH = 1700;
  const LANE_HEIGHT = 56;
  const ERA_BAND_TOP_PAD = 30;
  const PAD_BOTTOM = 20, PAD_LEFT = 8, PAD_RIGHT = 8;

  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
  const laneCount = Math.max(...NODES.map((n) => n.lane)) + 1;
  const chartTop = ERA_BAND_TOP_PAD;
  const lanesTop = chartTop + 26;
  const svgHeight = lanesTop + laneCount * LANE_HEIGHT + PAD_BOTTOM;
  const innerWidth = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;

  const laneGroups = {};
  NODES.forEach((n) => { (laneGroups[n.lane] = laneGroups[n.lane] || []).push(n); });

  let measureCtx = null;
  function textWidth(text, font) {
    if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
    measureCtx.font = font;
    return measureCtx.measureText(text).width;
  }

  // Each era's true chronological span, clamped to the chart's domain.
  const eraSpans = ART_PERIODS.map((era) => ({
    era,
    start: Math.max(era.start, domainStart),
    end: Math.min(era.end, domainEnd),
  }));
  eraSpans.forEach((e) => { e.duration = e.end - e.start; });

  // Returns { widths, lefts, scale(year), eraLeftFor(year) }. Every era
  // always gets an equal share of the width, regardless of real
  // duration — a clean, uniform layout where no era visually dominates
  // the others. This is a deliberate, permanent choice: showing true
  // relative duration would mean either a distorted layout or a
  // misleading year ruler, neither of which is worth it here — each
  // node already carries its own start-end years as text.
  function computeLayout() {
    const widths = eraSpans.map(() => innerWidth / eraSpans.length);
    const lefts = [];
    let cursor = PAD_LEFT;
    widths.forEach((w) => { lefts.push(cursor); cursor += w; });

    function findEraIndex(year) {
      const clamped = Math.min(Math.max(year, domainStart), domainEnd);
      let i = eraSpans.findIndex((e) => clamped >= e.start && clamped <= e.end);
      if (i === -1) i = clamped < eraSpans[0].start ? 0 : eraSpans.length - 1;
      return i;
    }
    function scale(year) {
      const clamped = Math.min(Math.max(year, domainStart), domainEnd);
      const i = findEraIndex(clamped);
      const e = eraSpans[i];
      const t = e.duration === 0 ? 0 : (clamped - e.start) / e.duration;
      return lefts[i] + t * widths[i];
    }
    // The left edge of the era column a given year falls in — a hard
    // floor so a node's minimum-width padding can never make its box
    // start inside the *previous* era's column, no matter how little
    // true date-driven room the node has in its own era.
    function eraLeftFor(year) {
      return lefts[findEraIndex(year)];
    }
    return { widths, lefts, scale, eraLeftFor };
  }

  function laneY(lane) {
    return lanesTop + lane * LANE_HEIGHT + LANE_HEIGHT / 2;
  }

  // Every node's name renders at full size, on one line where it fits.
  // A name that doesn't fit its natural date-driven width wraps onto a
  // second line (same idea as era-band labels) rather than shrinking the
  // font or widening the box. Only a name with no space or hyphen to
  // break on (so it can't wrap) falls back to widening the box for one
  // line.
  const NAME_FONT_MAX = 11;
  const NAME_PAD = 16;
  const GAP = 3;
  const NODE_HEIGHT_1LINE = 30;
  const NODE_HEIGHT_2LINE = 42;

  // Wraps at the space or hyphen closest to the midpoint (hyphen stays
  // attached to the first line, e.g. "NEO-" / "GROTESQUE"). Returns
  // [text] unchanged if there's nowhere to break.
  function wrapNodeName(text) {
    const points = [];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") points.push(i);
      else if (text[i] === "-") points.push(i + 1);
    }
    if (points.length === 0) return [text];
    const font = `700 ${NAME_FONT_MAX}px Anton, sans-serif`;
    let best = [text], bestDiff = Infinity;
    points.forEach((i) => {
      const line1 = text.slice(0, i).trim();
      const line2 = text.slice(i).trim();
      const diff = Math.abs(textWidth(line1, font) - textWidth(line2, font));
      if (diff < bestDiff) { bestDiff = diff; best = [line1, line2]; }
    });
    return best;
  }

  function layoutLane(nodes, scale, eraLeftFor) {
    let prevRight = -Infinity;
    nodes.sort((a, b) => a.start - b.start).forEach((n) => {
      const naturalLeft = scale(n.start);
      const rawWidth = scale(n.end) - naturalLeft;
      const font = `700 ${NAME_FONT_MAX}px Anton, sans-serif`;
      const upper = n.name.toUpperCase();
      const singleLineWidth = textWidth(upper, font) + NAME_PAD;

      // No arbitrary minimum box width here — each box is sized to
      // whatever its (possibly two-line) label actually needs, nothing
      // more. A flat minimum (e.g. "always at least 90px") sounds like a
      // reasonable legibility floor, but it silently overshoots a short
      // node's true end date further than the label ever required.
      if (singleLineWidth <= rawWidth) {
        n.nameLines = [upper];
        n.boxWidth = rawWidth;
      } else {
        const lines = wrapNodeName(upper);
        if (lines.length === 2) {
          const linesWidth = Math.max(textWidth(lines[0], font), textWidth(lines[1], font)) + NAME_PAD;
          n.nameLines = lines;
          n.boxWidth = Math.max(rawWidth, linesWidth);
        } else {
          n.nameLines = [upper];
          n.boxWidth = Math.max(rawWidth, singleLineWidth);
        }
      }
      n.boxHeight = n.nameLines.length === 2 ? NODE_HEIGHT_2LINE : NODE_HEIGHT_1LINE;

      // Whatever padding the box needs beyond its true date-driven span
      // is anchored to the node's true END date, extending backward
      // (earlier) rather than forward — so a node's right edge lands
      // exactly on its real end year and lines up with any sibling in
      // another lane that closes at the same year. That backward
      // extension is capped at the era column the node's true start
      // falls in, though — a short node early in a narrow era can need
      // more backward padding than its own era has room for, and
      // letting it spill into the previous era's column would be
      // historically wrong.
      const naturalRight = naturalLeft + rawWidth;
      const idealLeft = Math.max(naturalRight - n.boxWidth, eraLeftFor(n.start));
      n.boxLeft = Math.max(idealLeft, prevRight + GAP);
      prevRight = n.boxLeft + n.boxWidth;
    });
  }

  // Splits `text` into at most two lines that fit `maxWidth`, breaking at
  // the space closest to the midpoint. Returns [line] if it already fits.
  // (Used for era-band labels only — node names use wrapNodeName above.)
  function wrapTwoLines(text, font, maxWidth) {
    if (textWidth(text, font) <= maxWidth) return [text];
    const words = text.split(" ");
    if (words.length < 2) return [text];
    let bestSplit = 1;
    let bestDiff = Infinity;
    for (let i = 1; i < words.length; i++) {
      const line1 = words.slice(0, i).join(" ");
      const line2 = words.slice(i).join(" ");
      const diff = Math.abs(textWidth(line1, font) - textWidth(line2, font));
      if (diff < bestDiff) { bestDiff = diff; bestSplit = i; }
    }
    return [words.slice(0, bestSplit).join(" "), words.slice(bestSplit).join(" ")];
  }

  // Deterministic PRNG seeded from a string (era name) — same era always
  // produces the same strip composition, stable across re-renders.
  function seededRandom(seedStr) {
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    return function () {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  // Target width for one vertical strip — an era column this wide or
  // narrower gets a single strip; wider columns split into more, always
  // equal width within that era.
  const STRIP_TARGET_WIDTH = 130;
  const STRIP_GAP = 3;

  // Real supplied photos, keyed by era name. Eras not listed here still
  // fall back to the tone/icon placeholder until photos are supplied.
  // One photo per era for now: with era bands permanently equal-width
  // (STRIP_TARGET_WIDTH=130 against a ~168px column), only a single
  // strip ever renders, so only the first photo is ever visible —
  // additional photos here would just be unused dead weight until era
  // bands can grow wide enough to show more than one strip.
  const ERA_PHOTOS = {
    Romanesque: ["images/eras/era-romanesque-1.jpg"],
    Gothic: ["images/eras/era-gothic-1.jpg"],
  };

  // A generic "image placeholder" glyph: a frame with a mountain + sun,
  // the universal stand-in icon — clearly not final art, just a marker
  // for where a real black-and-white era photo will be dropped in.
  function stripIcon(cx, cy, size) {
    const h = size, w = size * 1.3;
    const x0 = cx - w / 2, y0 = cy - h / 2;
    return `
      <circle cx="${x0 + w * 0.28}" cy="${y0 + h * 0.32}" r="${h * 0.09}" class="tl-lg-strip-icon" />
      <path d="M ${x0} ${y0 + h * 0.82} L ${x0 + w * 0.32} ${y0 + h * 0.48} L ${x0 + w * 0.55} ${y0 + h * 0.68} L ${x0 + w * 0.75} ${y0 + h * 0.4} L ${x0 + w} ${y0 + h * 0.82}" class="tl-lg-strip-icon" />
    `;
  }

  // One vertical strip. If the era has real photos supplied, renders the
  // photo cropped to fill via <image preserveAspectRatio="xMidYMid slice">,
  // faded to transparent toward the base via a luminance mask. Otherwise
  // falls back to a solid placeholder tone with the same fade.
  function stripSVG(era, eraIndex, stripIndex, x, y, w, h, activeColor) {
    const fadeId = `tl-lg-strip-fade-${eraIndex}-${stripIndex}`;
    const photos = ERA_PHOTOS[era.name];

    if (photos && photos.length) {
      const src = photos[stripIndex % photos.length];
      const maskId = `tl-lg-strip-mask-${eraIndex}-${stripIndex}`;
      return `
        <defs>
          <linearGradient id="${fadeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </linearGradient>
          <mask id="${maskId}">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${fadeId})" />
          </mask>
        </defs>
        <image x="${x}" y="${y}" width="${w}" height="${h}" href="${src}"
          preserveAspectRatio="xMidYMid slice" mask="url(#${maskId})" />
      `;
    }

    const rand = seededRandom(era.name + "-" + stripIndex);
    const tone = rand();
    const color = tone < 0.4 ? "var(--panel)" : tone < 0.75 ? "var(--paper)" : activeColor;
    const showIcon = w > 40 && h > 140;
    return `
      <defs>
        <linearGradient id="${fadeId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="1" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${fadeId})" />
      ${showIcon ? stripIcon(x + w / 2, y + h * 0.3, Math.min(w, h) * 0.28) : ""}
    `;
  }

  // Splits the era band's full-height column into N equal-width vertical
  // strips — one strip if the column is narrow, more the wider it gets.
  function mosaicSVG(era, eraIndex, x, y, w, h, activeColor) {
    const n = Math.max(1, Math.round(w / STRIP_TARGET_WIDTH));
    const stripW = w / n;
    let out = "";
    for (let i = 0; i < n; i++) {
      const sx = x + i * stripW + STRIP_GAP / 2;
      const sw = stripW - STRIP_GAP;
      if (sw <= 0) continue;
      out += stripSVG(era, eraIndex, i, sx, y, sw, h, activeColor);
    }
    return out;
  }

  function eraBandSVG(era, i, left, width) {
    const bandBottom = svgHeight - PAD_BOTTOM;
    const bandHeight = bandBottom - chartTop;
    const nameFont = "700 10px 'JetBrains Mono', monospace";
    const label = era.name.toUpperCase();
    const lines = wrapTwoLines(label, nameFont, width - 8);
    const labelSVG = lines.map((line, li) => `<text x="${left + width / 2}" y="${chartTop + 12 + li * 11}" class="tl-era-label" font-size="10" text-anchor="middle">${line}</text>`).join("");

    const fillColor = eraColor(era);
    const headerHeight = 26;
    const mosaicTop = chartTop + headerHeight;
    const mosaic = width > 40 ? mosaicSVG(era, i, left, mosaicTop, width, bandBottom - mosaicTop, fillColor) : "";

    // The tooltip-triggering hover target is just the header strip (name
    // + a transparent hit area matching it), not the whole full-height
    // band — hovering the photo below shouldn't pop up the era
    // description, only the header a visitor would actually read it as
    // a label for.
    return `
      <g class="tl-lg-era-band" data-era-index="${i}">
        <rect x="${left}" y="${chartTop}" width="${width}" height="${bandHeight}" fill="${fillColor}" class="tl-lg-era-band-fill" />
        ${mosaic}
        <g class="tl-lg-era-header" data-era-index="${i}">
          <rect x="${left}" y="${chartTop}" width="${width}" height="${headerHeight}" fill="transparent" />
          ${labelSVG}
        </g>
        <line x1="${left}" y1="${chartTop}" x2="${left}" y2="${bandBottom}" class="tl-lg-era-sep" />
      </g>
    `;
  }

  function nodeSVG(n) {
    const left = n.boxLeft, width = n.boxWidth, height = n.boxHeight;
    const cy = laneY(n.lane);
    const top = cy - height / 2;
    const cx = left + width / 2;
    const firstLineY = top + 13;
    const nameSVG = n.nameLines.map((line, i) =>
      `<text x="${cx}" y="${firstLineY + i * 11}" class="tl-lg-node-name" font-size="${NAME_FONT_MAX}" text-anchor="middle">${line}</text>`
    ).join("");
    const eraY = firstLineY + (n.nameLines.length - 1) * 11 + 13;
    return `
      <g class="tl-lg-node" data-id="${n.id}">
        <rect x="${left}" y="${top}" width="${width}" height="${height}" class="tl-lg-node-box ${n.standalone ? "is-standalone" : ""}" />
        ${nameSVG}
        <text x="${cx}" y="${eraY}" class="tl-lg-node-era" font-size="8" text-anchor="middle">${n.start}–${n.end === domainEnd ? "present" : n.end}</text>
      </g>
    `;
  }

  function connectorSVG(parentId, childId) {
    const p = byId[parentId], c = byId[childId];
    const px = p.boxLeft + p.boxWidth, py = laneY(p.lane);
    const cx = c.boxLeft, cy = laneY(c.lane);
    if (p.lane === c.lane) {
      return `<path d="M ${px} ${py} L ${cx} ${cy}" class="tl-lg-connector" /><circle cx="${px}" cy="${py}" r="2.5" class="tl-lg-connector-dot" />`;
    }
    const midX = px + 14;
    return `
      <path d="M ${px} ${py} L ${midX} ${py} L ${midX} ${cy} L ${cx} ${cy}" class="tl-lg-connector" />
      <circle cx="${px}" cy="${py}" r="2.5" class="tl-lg-connector-dot" />
    `;
  }

  async function render() {
    // The fit/wrap decisions below depend on canvas text measurement
    // being accurate — wait for the Inter/Anton/JetBrains Mono webfonts
    // before measuring anything, rather than risk baking in wrong
    // widths from whatever font happened to be available at load time.
    try {
      await document.fonts.ready;
    } catch (e) {
      // font loading API unavailable — proceed with best-effort metrics
    }

    const { widths, lefts, scale, eraLeftFor } = computeLayout();
    Object.values(laneGroups).forEach((nodes) => layoutLane(nodes, scale, eraLeftFor));

    const eraBandsSVG = eraSpans.map((e, i) =>
      eraBandSVG(e.era, i, lefts[i], widths[i])
    ).join("");

    root.innerHTML = `
      <div class="tl-lg-chart-wrap">
        <svg id="tl-lg-svg" class="tl-lg-svg" viewBox="0 0 ${CHART_WIDTH} ${svgHeight}" width="${CHART_WIDTH}" height="${svgHeight}" role="img" aria-label="Lineage tree of type classifications">
          ${eraBandsSVG}
          ${EDGES.map((e) => connectorSVG(e[0], e[1])).join("")}
          ${NODES.map(nodeSVG).join("")}
        </svg>
      </div>
    `;

    const svg = root.querySelector(".tl-lg-svg");
    svg.addEventListener("click", (e) => {
      const node = e.target.closest("[data-id]");
      // On touch, a tap is handled by the node's own listener in
      // attachTooltips (reveal the tooltip) instead — see isTouchDevice.
      if (node && !isTouchDevice) onOpenDetail(node.dataset.id);
    });

    attachTooltips(svg);
  }

  // Rollover tooltips — era bands show the era's own description;
  // classification nodes show their description plus why that
  // classification closes. One shared floating tooltip element,
  // positioned above/below the hovered element (flipping below if
  // there's no room above). Reuses the same tooltip element/classes the
  // old Gantt-style Timeline used.
  function attachTooltips(svg) {
    document.querySelectorAll(".tl-era-tooltip").forEach((el) => el.remove());
    const tooltip = document.createElement("div");
    tooltip.className = "tl-era-tooltip";
    document.body.appendChild(tooltip);

    // Classification nodes are small boxes, so anchoring the tooltip to
    // the node's own rect (flipping above/below if there's no room)
    // works well.
    function placeAtRect(target, html) {
      tooltip.classList.remove("tl-era-tooltip--era");
      tooltip.innerHTML = html;
      const rect = target.getBoundingClientRect();
      tooltip.classList.add("is-visible");
      const ttRect = tooltip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - ttRect.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));
      let top = rect.top - ttRect.height - 10;
      if (top < 8) top = rect.bottom + 10;
      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    }

    // Era bands run the full chart height, so anchoring to the band's
    // own (very tall) rect would place the tooltip miles from wherever
    // the cursor actually is — it worked fine when era bands were a
    // thin strip in the old bar chart, but not now. Follow the cursor
    // instead, same as the old chart already did for its bars.
    function placeNearCursor(x, y, html) {
      tooltip.classList.add("tl-era-tooltip--era");
      tooltip.innerHTML = html;
      tooltip.classList.add("is-visible");
      const ttRect = tooltip.getBoundingClientRect();
      const offset = 16;
      let left = Math.min(x + offset, window.innerWidth - ttRect.width - 8);
      let top = Math.min(y + offset, window.innerHeight - ttRect.height - 8);
      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    }

    svg.querySelectorAll(".tl-lg-era-header").forEach((group) => {
      const era = ART_PERIODS[Number(group.dataset.eraIndex)];
      if (!era) return;
      const html = `<strong>${era.tooltipName || era.name}</strong>${era.description}`;
      const key = `era-${group.dataset.eraIndex}`;

      if (isTouchDevice) {
        // Same tap-to-toggle as classification nodes below — there's no
        // hover on touch, so this is the only way to reach the era
        // tooltip at all.
        group.addEventListener("click", (e) => {
          e.stopPropagation();
          const alreadyOpen = tooltip.classList.contains("is-visible") && tooltip.dataset.forId === key;
          if (alreadyOpen) {
            tooltip.classList.remove("is-visible");
          } else {
            placeAtRect(group, html);
            tooltip.classList.add("tl-era-tooltip--era");
            tooltip.dataset.forId = key;
          }
        });
      } else {
        group.addEventListener("mouseenter", (e) => placeNearCursor(e.clientX, e.clientY, html));
        group.addEventListener("mousemove", (e) => placeNearCursor(e.clientX, e.clientY, html));
        group.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
      }
    });

    svg.querySelectorAll(".tl-lg-node").forEach((group) => {
      const n = byId[group.dataset.id];
      if (!n) return;
      const yearLabel = `${n.start} – ${n.end === domainEnd ? "present" : n.end}`;
      const closesHTML = n.closesBecause
        ? `<div class="tl-tooltip-closes"><b>Ends because:</b> ${n.closesBecause}</div>`
        : "";
      const html = `<strong>${n.name}</strong><div class="tl-tooltip-years">${yearLabel}</div>${n.description || ""}${closesHTML}`;

      if (isTouchDevice) {
        // No hover to reveal this on touch — a tap shows the same
        // tooltip a mouse hover would, and taps again to dismiss it,
        // rather than jumping straight to the full detail view.
        group.addEventListener("click", (e) => {
          e.stopPropagation();
          const alreadyOpen = tooltip.classList.contains("is-visible") && tooltip.dataset.forId === n.id;
          if (alreadyOpen) {
            tooltip.classList.remove("is-visible");
          } else {
            placeAtRect(group, html);
            tooltip.dataset.forId = n.id;
          }
        });
      } else {
        group.addEventListener("mouseenter", () => placeAtRect(group, html));
        group.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
      }
    });

    if (isTouchDevice) {
      // Tapping empty chart space (not a node) dismisses whatever
      // tooltip is open.
      svg.addEventListener("click", (e) => {
        if (!e.target.closest("[data-id]")) tooltip.classList.remove("is-visible");
      });
    }
  }

  render();
}
