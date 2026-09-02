function initTimeline(root, onOpenDetail) {
  const domainStart = TIMELINE_DOMAIN_START;
  const domainEnd = TIMELINE_DOMAIN_END;
  const span = domainEnd - domainStart;

  // Broader art-historical backdrop the classifications emerged against,
  // boundaries measured pixel-for-pixel off the reference deck's own
  // timeline slide (century-tick calibrated). Romanesque precedes this
  // chart's domain (1150–present) entirely, so it's left out — same
  // reasoning as why the domain starts at Blackletter's own earliest year
  // rather than further back.
  const ART_PERIODS = [
    { name: "Gothic", start: 1150, end: 1400, color: "rgba(139, 58, 58, 0.3)" },
    { name: "Renaissance", start: 1400, end: 1550, color: "rgba(138, 155, 110, 0.3)" },
    { name: "Baroque", start: 1550, end: 1650, color: "rgba(176, 120, 79, 0.3)" },
    { name: "Classicism →", start: 1650, end: domainEnd, color: "rgba(91, 114, 144, 0.3)" },
  ];

  // Everything — ruler, era band, and every bar — is drawn in this single
  // SVG's coordinate space via x(year), so nothing can drift out of sync
  // with anything else the way separately-positioned HTML elements could.
  const LABEL_WIDTH = 180;
  const CHART_WIDTH = 760;
  const ROW_HEIGHT = 32;
  const HEADER_HEIGHT = 62;
  const TOP_PAD = 8;
  const BOTTOM_PAD = 8;
  const MIN_BAR_PX = 10;

  const svgWidth = LABEL_WIDTH + CHART_WIDTH;
  const svgHeight = HEADER_HEIGHT + CLASSIFICATIONS.length * ROW_HEIGHT + TOP_PAD + BOTTOM_PAD;

  function x(year) {
    return LABEL_WIDTH + ((year - domainStart) / span) * CHART_WIDTH;
  }

  let measureCtx = null;
  function textWidth(text, font) {
    if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
    measureCtx.font = font;
    return measureCtx.measureText(text).width;
  }

  function buildMarks() {
    const marks = [];
    for (let y = domainStart; y < domainEnd; y += 100) marks.push(y);
    marks.push(domainEnd);
    return marks;
  }

  function eraBandSVG(topY) {
    return ART_PERIODS.map((era) => {
      const left = x(era.start);
      const width = x(era.end) - left;
      const labelFits = textWidth(era.name, "700 9px Inter, sans-serif") + 10 <= width;
      return `
        <g>
          <rect x="${left}" y="${topY}" width="${width}" height="22" fill="${era.color}" />
          ${labelFits ? `<text x="${left + width / 2}" y="${topY + 14}" class="tl-era-label" text-anchor="middle">${era.name.toUpperCase()}</text>` : ""}
        </g>
      `;
    }).join("");
  }

  function rulerSVG(topY) {
    const marks = buildMarks();
    return marks
      .map((y) => {
        const xPos = x(y);
        const label = y === domainEnd ? "Today" : String(y);
        return `
        <line x1="${xPos}" y1="${topY}" x2="${xPos}" y2="${svgHeight - BOTTOM_PAD}" class="tl-gridline" />
        <text x="${xPos}" y="${topY - 6}" class="tl-mark-label" text-anchor="middle">${label}</text>
      `;
      })
      .join("");
  }

  function rowSVG(item, index) {
    const rowY = HEADER_HEIGHT + TOP_PAD + index * ROW_HEIGHT;
    const rowCenter = rowY + ROW_HEIGHT / 2;

    const start = Math.max(item.timelineStart, domainStart);
    const end = item.timelineEnd === null ? domainEnd : item.timelineEnd;
    const barX = x(start);
    const rawWidth = x(end) - barX;
    const barWidth = Math.max(rawWidth, MIN_BAR_PX);
    const ongoing = item.timelineEnd === null;
    const yearLabel = ongoing ? `${item.timelineStart} – present` : `${item.timelineStart} – ${item.timelineEnd}`;

    const labelFont = "700 10px Inter, sans-serif";
    const labelW = textWidth(yearLabel, labelFont);
    const fitsInside = labelW + 14 <= barWidth;

    const barY = rowCenter - 9;
    const barH = 18;
    const fill = ongoing ? "url(#tlOngoingFade)" : "var(--accent)";

    const branchLabel = BRANCH_LABELS[item.branch];
    const branchFont = "700 8px Inter, sans-serif";
    const branchTextW = textWidth(branchLabel, branchFont);
    const branchPillW = branchTextW + 12;

    return `
      <g class="tl-row">
        <text x="4" y="${rowCenter - 3}" class="tl-row-name">${item.name}</text>
        <rect x="4" y="${rowCenter + 2}" width="${branchPillW}" height="13" rx="6.5" class="tl-branch-pill" />
        <text x="${4 + branchPillW / 2}" y="${rowCenter + 11}" class="tl-branch-label" text-anchor="middle">${branchLabel.toUpperCase()}</text>

        <rect class="tl-bar ${ongoing ? "is-ongoing" : ""}" data-id="${item.id}"
          x="${barX}" y="${barY}" width="${barWidth}" height="${barH}" rx="4" fill="${fill}">
          <title>${item.name}: ${yearLabel}</title>
        </rect>
        ${
          fitsInside
            ? `<text x="${barX + 7}" y="${rowCenter + 3.5}" class="tl-bar-label-inside" pointer-events="none">${yearLabel}</text>`
            : `<text x="${barX + barWidth + 6}" y="${rowCenter + 3.5}" class="tl-bar-label-outside" pointer-events="none">${yearLabel}</text>`
        }
      </g>
    `;
  }

  function render() {
    const eraTop = TOP_PAD;
    const rulerTop = eraTop + 22 + 18;

    root.innerHTML = `
      <div class="timeline-wrap">
        <svg class="timeline-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}" role="img" aria-label="Timeline of type classifications">
          <defs>
            <linearGradient id="tlOngoingFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" style="stop-color:var(--accent); stop-opacity:1" />
              <stop offset="70%" style="stop-color:var(--accent); stop-opacity:1" />
              <stop offset="100%" style="stop-color:var(--accent); stop-opacity:0.35" />
            </linearGradient>
          </defs>

          <line x1="${LABEL_WIDTH}" y1="0" x2="${LABEL_WIDTH}" y2="${svgHeight}" class="tl-divider" />

          ${eraBandSVG(eraTop)}
          ${rulerSVG(rulerTop)}

          ${CLASSIFICATIONS.map(rowSVG).join("")}
        </svg>
      </div>
    `;

    const svg = root.querySelector(".timeline-svg");
    svg.addEventListener("click", (e) => {
      const bar = e.target.closest("[data-id]");
      if (bar) onOpenDetail(bar.dataset.id);
    });
  }

  render();
}
