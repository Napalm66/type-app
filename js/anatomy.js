const ANATOMY_MAX_FONT_SIZE = 108;
const ANATOMY_MIN_FONT_SIZE = 48;
const ANATOMY_REF_GAP = 24;
const ANATOMY_TARGET_WIDTH = 536;
const ANATOMY_PAD_LEFT = 132;
const ANATOMY_PAD_RIGHT = 40;
const ANATOMY_EXTRA = 40;

let anatomyCanvasCtx = null;
function getAnatomyCtx() {
  if (!anatomyCanvasCtx) {
    const canvas = document.createElement("canvas");
    anatomyCanvasCtx = canvas.getContext("2d");
  }
  return anatomyCanvasCtx;
}

function deriveAnatomyWord(name) {
  const match = name.match(/^[^\s(/]+/);
  return match ? match[0] : name;
}

async function measureGlyphMetrics(item, fontSizePx, word, fontStack) {
  const fontSpec = `${fontSizePx}px ${fontStack}`;
  try {
    await document.fonts.load(fontSpec, word + "Hxyo");
  } catch (e) {
    // font loading API not fully supported / font already available — continue anyway
  }

  const ctx = getAnatomyCtx();
  ctx.font = fontSpec;
  ctx.textBaseline = "alphabetic";

  const H = ctx.measureText("H");
  const x = ctx.measureText("x");
  const y = ctx.measureText("y");
  const o = ctx.measureText("o");
  const wordMetrics = ctx.measureText(word);

  return {
    capHeight: H.actualBoundingBoxAscent || fontSizePx * 0.7,
    xHeight: x.actualBoundingBoxAscent || fontSizePx * 0.5,
    descender: y.actualBoundingBoxDescent || fontSizePx * 0.2,
    oWidth: o.width,
    wordWidth: wordMetrics.width,
  };
}

const AXIS_ANGLES = {
  "oblique-strong": 34,
  "oblique-moderate": 20,
  "near-vertical": 8,
  vertical: 0,
  "slightly-oblique": 12,
};

const SERIF_DESCRIPTIONS = {
  "bracketed-robust": "Bracketed serif — the curve eases smoothly into the stem.",
  "bracketed-sharp": "Bracketed serif — a thinner, more precise curve than robust brackets.",
  "unbracketed-hairline": "Hairline serif — meets the stem at a sharp, unblended angle.",
  "square-slab": "Slab serif — thick, squared-off, with minimal or no bracket.",
  "flared-wedge": "Flared serif — tapers directly out of the stroke, no true bracket.",
  none: "No serif — a clean, unadorned stroke terminal.",
};

const BRANCH_FALLBACK_SERIF_NOTE = {
  blackletter: "Broken, angular strokes with diamond-shaped feet — not a classic bracketed serif.",
  script: "Strokes connect directly into the next letter — no fixed serif to speak of.",
  display: "Construction varies widely by design — often an exaggerated trait, not a standard serif.",
};

function serifNote(item) {
  if (item.diagnostics && item.diagnostics.serif) {
    return SERIF_DESCRIPTIONS[item.diagnostics.serif] || "";
  }
  return BRANCH_FALLBACK_SERIF_NOTE[item.branch] || "";
}

const ANATOMY_FIXED_CHROME = ANATOMY_PAD_LEFT + ANATOMY_REF_GAP + ANATOMY_PAD_RIGHT + ANATOMY_EXTRA;

function contentWidthFor(metrics) {
  return ANATOMY_PAD_LEFT + metrics.wordWidth + ANATOMY_REF_GAP + metrics.oWidth + ANATOMY_PAD_RIGHT + ANATOMY_EXTRA;
}

async function buildAnatomyHTML(item) {
  const word = deriveAnatomyWord(item.name);
  const anatomyFontStack = item.anatomyFontStack || item.fontStack;

  let fontSizePx = ANATOMY_MAX_FONT_SIZE;
  let metrics = await measureGlyphMetrics(item, fontSizePx, word, anatomyFontStack);
  const variablePart = metrics.wordWidth + metrics.oWidth;
  const targetVariablePart = ANATOMY_TARGET_WIDTH - ANATOMY_FIXED_CHROME;

  if (variablePart > targetVariablePart) {
    const scale = targetVariablePart / variablePart;
    fontSizePx = Math.max(ANATOMY_MIN_FONT_SIZE, Math.round(fontSizePx * scale));
    metrics = await measureGlyphMetrics(item, fontSizePx, word, anatomyFontStack);
  }

  const padTop = Math.max(34, Math.round(fontSizePx * 0.34));
  const padLeft = ANATOMY_PAD_LEFT;
  const padRight = ANATOMY_PAD_RIGHT;
  const padBottom = 30;

  const baselineY = padTop + metrics.capHeight;
  const capLineY = padTop;
  const meanLineY = baselineY - metrics.xHeight;
  const descLineY = baselineY + metrics.descender;

  const refOX = padLeft + metrics.wordWidth + ANATOMY_REF_GAP;
  const svgWidth = Math.max(contentWidthFor(metrics), 360);
  const lineX1 = padLeft - 14;
  const lineX2 = svgWidth - padRight + 14;

  const guides = [
    { y: capLineY, label: "CAP LINE" },
    { y: meanLineY, label: "MEAN LINE" },
    { y: baselineY, label: "BASELINE" },
    { y: descLineY, label: "DESCENDER LINE" },
  ];

  const MIN_LABEL_SPACING = 11;
  let prevLabelY = -Infinity;
  const guidesWithLabelY = guides.map((g) => {
    const labelY = Math.max(g.y, prevLabelY + MIN_LABEL_SPACING);
    prevLabelY = labelY;
    return { ...g, labelY };
  });

  const svgHeight = Math.max(descLineY, prevLabelY) + padBottom;

  const guideSVG = guidesWithLabelY
    .map((g) => {
      const needsLeader = Math.abs(g.labelY - g.y) > 0.5;
      const leaderSVG = needsLeader
        ? `<line x1="${padLeft - 20}" y1="${g.labelY}" x2="${padLeft - 6}" y2="${g.y}" class="anatomy-leader" />`
        : "";
      return `
      <line x1="${lineX1}" y1="${g.y}" x2="${lineX2}" y2="${g.y}" class="anatomy-guide" />
      ${leaderSVG}
      <text x="${padLeft - 22}" y="${g.labelY}" class="anatomy-guide-label" text-anchor="end" dominant-baseline="middle">${g.label}</text>
    `;
    })
    .join("");

  const xHeightPct = Math.round((metrics.xHeight / metrics.capHeight) * 100);

  // Measurement arrow between the mean line (x-height) and baseline,
  // just left of the specimen word — shows what the x-height % is
  // actually measuring, not just stating it as a number below.
  const xHeightArrowX = padLeft - 7;
  const xHeightArrowMidY = (meanLineY + baselineY) / 2;
  const xHeightLabelX = xHeightArrowX - 9;
  const xHeightArrowSVG = `
    <line x1="${xHeightArrowX}" y1="${meanLineY}" x2="${xHeightArrowX}" y2="${baselineY}" class="anatomy-xheight-arrow" />
    <line x1="${xHeightArrowX - 4}" y1="${meanLineY}" x2="${xHeightArrowX + 4}" y2="${meanLineY}" class="anatomy-xheight-arrow" />
    <line x1="${xHeightArrowX - 4}" y1="${baselineY}" x2="${xHeightArrowX + 4}" y2="${baselineY}" class="anatomy-xheight-arrow" />
    <text x="${xHeightLabelX}" y="${xHeightArrowMidY}" class="anatomy-xheight-label" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 ${xHeightLabelX} ${xHeightArrowMidY})">X-HEIGHT</text>
  `;

  // stress axis, illustrated on a small reference "o" beside the main word
  const axisDeg = item.diagnostics ? AXIS_ANGLES[item.diagnostics.axis] : null;
  let stressSVG = "";
  let refOSVG = "";
  if (axisDeg !== null && axisDeg !== undefined) {
    const oCenterX = refOX + metrics.oWidth / 2;
    const oCenterY = (baselineY + meanLineY) / 2;
    const halfLen = ((baselineY - meanLineY) / 2) * 1.45;
    const rad = (axisDeg * Math.PI) / 180;
    const x1 = oCenterX - halfLen * Math.sin(rad);
    const y1 = oCenterY - halfLen * Math.cos(rad);
    const x2 = oCenterX + halfLen * Math.sin(rad);
    const y2 = oCenterY + halfLen * Math.cos(rad);

    refOSVG = `<text x="${refOX}" y="${baselineY}" class="anatomy-ref-glyph" style="font-family:${anatomyFontStack}; font-size:${fontSizePx}px;">o</text>`;
    stressSVG = `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="anatomy-stress" />
      <circle cx="${x1}" cy="${y1}" r="2.5" class="anatomy-stress-dot" />
      <circle cx="${x2}" cy="${y2}" r="2.5" class="anatomy-stress-dot" />
      <text x="${oCenterX}" y="${capLineY - 18}" class="anatomy-stress-label" text-anchor="middle">STRESS ≈ ${axisDeg}°</text>
      <text x="${oCenterX}" y="${capLineY - 6}" class="anatomy-ref-caption" text-anchor="middle">(reference glyph)</text>
    `;
  }

  const textSVG = `<text x="${padLeft}" y="${baselineY}" class="anatomy-specimen-text" style="font-family:${anatomyFontStack}; font-size:${fontSizePx}px;">${escapeHtml(word)}</text>`;

  const note = serifNote(item);

  return `
    <div class="anatomy-block">
      <div class="anatomy-svg-wrap">
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="${svgHeight}" role="img" aria-label="Anatomy diagram for ${item.name}">
          ${guideSVG}
          ${xHeightArrowSVG}
          ${refOSVG}
          ${stressSVG}
          ${textSVG}
        </svg>
      </div>
      <div class="anatomy-facts">
        <div class="anatomy-fact">
          <span class="anatomy-fact-label">x-height</span>
          <span class="anatomy-fact-value">≈ ${xHeightPct}% of cap height</span>
        </div>
        ${note ? `<div class="anatomy-fact anatomy-fact--wide">
          <span class="anatomy-fact-label">Serif structure</span>
          <span class="anatomy-fact-value">${note}</span>
        </div>` : ""}
      </div>
    </div>
  `;
}
