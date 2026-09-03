function initTimeline(root, onOpenDetail) {
  const domainStart = TIMELINE_DOMAIN_START;
  const domainEnd = TIMELINE_DOMAIN_END;
  const span = domainEnd - domainStart;

  // Broader art-historical backdrop the classifications emerged against.
  // Each period's onset year marks where its band starts and the prior
  // one ends (their canonical ranges actually overlap by decades, since
  // style transitions are gradual, not cutoffs — using onset years keeps
  // the bands sequential and non-overlapping for this chart). Consecutive
  // periods aren't always contiguous either — Romanticism ends at 1900 and
  // Modernism doesn't begin until 1910, so that decade is left as an
  // honest gap rather than stretched to fit. Digital & Variable Age's end
  // is domainEnd itself (today), so it always reaches the chart's right
  // edge rather than needing a hardcoded year that goes stale.
  const ART_PERIODS = [
    {
      name: "Romanesque",
      start: 1000,
      end: 1150,
      color: "rgba(150, 130, 90, 0.3)",
      description: "Pre-printing press era. Marked by Carolingian minuscule and rounded, thick manuscript lettering.",
    },
    {
      name: "Gothic",
      start: 1150,
      end: 1450,
      color: "rgba(139, 58, 58, 0.3)",
      description: "Heavy, dark, and condensed manuscript lettering. Evolves into Blackletter (Textura), the typeface Gutenberg used for the first printing press in 1450.",
    },
    {
      name: "Renaissance",
      start: 1450,
      end: 1600,
      color: "rgba(138, 155, 110, 0.3)",
      description: "The birth of Roman type (Humanist and Old Style/Garalde). Features lighter, highly legible letterforms inspired by classical Roman inscriptions and Italian handwriting.",
    },
    {
      name: "Baroque",
      start: 1600,
      end: 1750,
      color: "rgba(176, 120, 79, 0.3)",
      description: "Transitional type. Features higher contrast between thick and thin strokes, more vertical axes, and sharper serifs (e.g., Baskerville, Caslon).",
    },
    {
      name: "Classicism",
      start: 1750,
      end: 1815,
      color: "rgba(91, 114, 144, 0.3)",
      description: "Modern type (Didone). Characterized by extreme contrast between hair-thin and thick lines, vertical stress, and unbracketed, flat serifs (e.g., Bodoni, Didot).",
    },
    {
      name: "Romanticism",
      start: 1815,
      end: 1900,
      color: "rgba(130, 90, 122, 0.3)",
      description: "The Industrial Revolution demands attention-grabbing type. Slab Serifs (Egyptians), Sans-Serifs (Grotesques), and heavily ornamented, decorative display fonts emerge for advertising.",
    },
    {
      name: "Modernism",
      tooltipName: "Modernism (Bauhaus & Swiss)",
      start: 1910,
      end: 1970,
      color: "rgba(90, 100, 110, 0.3)",
      description: "The era of “form follows function.” Strips away ornament in favour of geometric and Neo-Grotesque sans-serifs (like Helvetica and Univers). Focuses on strict grids, asymmetry, and high legibility.",
    },
    {
      name: "Postmodernism",
      tooltipName: "Postmodernism / Punk / Grunge",
      start: 1970,
      end: 2000,
      color: "rgba(160, 80, 100, 0.3)",
      description: "A rebellion against rigid modernist rules. Characters are distorted, layered, and chaotic. Photocomposition and early digital tools allow for experimental, “deconstructed” type.",
    },
    {
      name: "Digital & Variable Age",
      start: 2000,
      end: domainEnd,
      color: "rgba(80, 120, 130, 0.3)",
      description: "Maximized flexibility for screens. Marked by the rise of Variable Fonts (where one font file holds endless weight and width variations), responsive typography, and minimalist web-safe type design.",
    },
  ];

  // The row-label column is a separate, non-scrolling HTML panel (a plain
  // flex sibling of the scrollable chart, not a "position: sticky" hack —
  // SVG children don't participate in sticky positioning the way HTML
  // block elements do). The chart's own SVG coordinate space now starts
  // at x=0 instead of being offset by a label column drawn inside it.
  const CHART_WIDTH = 4300;
  const ROW_HEIGHT = 32;
  const HEADER_HEIGHT = 62;
  const TOP_PAD = 8;
  const BOTTOM_PAD = 8;
  const MIN_BAR_PX = 10;

  const svgWidth = CHART_WIDTH;
  const svgHeight = HEADER_HEIGHT + CLASSIFICATIONS.length * ROW_HEIGHT + TOP_PAD + BOTTOM_PAD;

  function x(year) {
    return ((year - domainStart) / span) * CHART_WIDTH;
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

    // "Today" is whatever the current year happens to be, so the gap to the
    // previous regular 100-year mark is arbitrary — it can land close enough
    // that the two labels' text overlaps (e.g. "2000" and "Today" when
    // domainEnd is 2026, only 26 years apart against a 100-year rhythm).
    // Drop the second-to-last mark if there isn't room for both.
    const MIN_LABEL_GAP_PX = 45;
    const pxPerYear = CHART_WIDTH / span;
    if (marks.length >= 2) {
      const gapYears = marks[marks.length - 1] - marks[marks.length - 2];
      if (gapYears * pxPerYear < MIN_LABEL_GAP_PX) {
        marks.splice(marks.length - 2, 1);
      }
    }
    return marks;
  }

  function eraBandSVG(topY) {
    const font = "700 9px Inter, sans-serif";
    let prevLabelRight = -Infinity;

    return ART_PERIODS.map((era, i) => {
      // Romanesque starts before the chart's domain (1000 vs. domainStart
      // 1100) — clamp to the left edge instead of rendering off-canvas.
      const left = x(Math.max(era.start, domainStart));
      const width = x(era.end) - left;
      const label = era.name.toUpperCase();
      const labelW = textWidth(label, font);
      const nextBoundary = i < ART_PERIODS.length - 1 ? x(ART_PERIODS[i + 1].start) : svgWidth;

      // A narrow segment (e.g. Classicism) can't fit its
      // label centered. Try left-aligning it starting inside the segment —
      // but only if that doesn't run into the previous segment's label
      // (which may itself have spilled rightward) or past this segment's
      // own right boundary. If neither placement fits, skip the inline
      // label entirely rather than let two labels overlap; the tooltip
      // still carries the full name and description on hover.
      const fitsCentered = labelW + 10 <= width;
      let labelSVG = "";
      if (fitsCentered) {
        const textX = left + width / 2;
        labelSVG = `<text x="${textX}" y="${topY + 14}" class="tl-era-label" text-anchor="middle">${label}</text>`;
        prevLabelRight = textX + labelW / 2;
      } else {
        const textX = Math.max(left + 4, prevLabelRight + 10);
        if (textX + labelW <= nextBoundary - 4) {
          labelSVG = `<text x="${textX}" y="${topY + 14}" class="tl-era-label" text-anchor="start">${label}</text>`;
          prevLabelRight = textX + labelW;
        }
      }

      return `
        <g class="tl-era-group" data-era-index="${i}">
          <rect x="${left}" y="${topY}" width="${width}" height="22" fill="${era.color}" />
          ${labelSVG}
        </g>
      `;
    }).join("");
  }

  function rulerSVG(topY) {
    const marks = buildMarks();
    return marks
      .map((y, i) => {
        const xPos = x(y);
        const label = y === domainEnd ? "Today" : String(y);
        // First/last marks sit right at the chart's edges — a centered
        // label there would have half its text clipped by the SVG bounds,
        // which is exactly what was cutting "Today" off. Anchor those two
        // outward from the edge instead; every mark in between stays centered.
        const anchor = i === 0 ? "start" : i === marks.length - 1 ? "end" : "middle";
        const labelX = anchor === "start" ? xPos + 3 : anchor === "end" ? xPos - 3 : xPos;
        return `
        <line x1="${xPos}" y1="${topY}" x2="${xPos}" y2="${svgHeight - BOTTOM_PAD}" class="tl-gridline" />
        <text x="${labelX}" y="${topY - 6}" class="tl-mark-label" text-anchor="${anchor}">${label}</text>
      `;
      })
      .join("");
  }

  function rowSVG(item, index) {
    const rowY = HEADER_HEIGHT + TOP_PAD + index * ROW_HEIGHT;
    const rowCenter = rowY + ROW_HEIGHT / 2;

    const start = Math.max(item.timelineStart, domainStart);
    const end = item.timelineEnd === null ? domainEnd : item.timelineEnd;
    const trueStartX = x(start);
    const trueWidth = x(end) - trueStartX;
    // A very short span (e.g. Geometric Sans, 5 years) can round to a
    // sliver under the minimum clickable/visible width. Pad it out
    // symmetrically around its true midpoint rather than anchoring the
    // padding at the start, so the bar doesn't visually overshoot its
    // real end date.
    let barX = trueStartX;
    let barWidth = trueWidth;
    if (trueWidth < MIN_BAR_PX) {
      const mid = trueStartX + trueWidth / 2;
      barX = mid - MIN_BAR_PX / 2;
      barWidth = MIN_BAR_PX;
    }

    const ongoing = item.timelineEnd === null;
    const yearLabel = ongoing ? `${item.timelineStart} – present` : `${item.timelineStart} – ${item.timelineEnd}`;

    const labelFont = "700 10px Inter, sans-serif";
    const labelW = textWidth(yearLabel, labelFont);
    const fitsInside = labelW + 14 <= barWidth;

    const barY = rowCenter - 9;
    const barH = 18;
    const fill = ongoing ? "url(#tlOngoingFade)" : "var(--accent)";

    const rightEdge = barX + barWidth;
    const fitsOutsideRight = rightEdge + 8 + labelW <= svgWidth - 4;
    const chartLeftEdge = 6;

    let labelSVG;
    let pinSVG = "";
    if (fitsInside) {
      labelSVG = `<text x="${barX + 7}" y="${rowCenter + 3.5}" class="tl-bar-label-inside" pointer-events="none">${yearLabel}</text>`;
    } else if (fitsOutsideRight) {
      const pinX = rightEdge + 4;
      pinSVG = `<circle cx="${pinX}" cy="${rowCenter}" r="1.8" class="tl-bar-pin" />`;
      labelSVG = `<text x="${pinX + 4}" y="${rowCenter + 3.5}" class="tl-bar-label-outside" pointer-events="none">${yearLabel}</text>`;
    } else {
      // Not enough room to the right (e.g. bars clustered near the chart's
      // own right edge) — flip the label to the left of the bar instead of
      // letting it run off the edge and get clipped.
      const pinX = Math.max(barX - 4, chartLeftEdge + labelW);
      pinSVG = `<circle cx="${pinX}" cy="${rowCenter}" r="1.8" class="tl-bar-pin" />`;
      labelSVG = `<text x="${pinX - 4}" y="${rowCenter + 3.5}" class="tl-bar-label-outside" text-anchor="end" pointer-events="none">${yearLabel}</text>`;
    }

    return `
      <g class="tl-row">
        <rect class="tl-bar ${ongoing ? "is-ongoing" : ""}" data-id="${item.id}"
          x="${barX}" y="${barY}" width="${barWidth}" height="${barH}" rx="4" fill="${fill}">
          <title>${item.name}: ${yearLabel}</title>
        </rect>
        ${pinSVG}
        ${labelSVG}
      </g>
    `;
  }

  function labelColHTML() {
    const rows = CLASSIFICATIONS.map((item) => {
      const branchLabel = BRANCH_LABELS[item.branch];
      return `
        <button class="timeline-label-row" data-id="${item.id}">
          <span class="timeline-label-name">${item.name}</span>
          <span class="timeline-label-branch">${branchLabel.toUpperCase()}</span>
        </button>
      `;
    }).join("");
    return `
      <div class="timeline-label-col">
        <div class="timeline-label-header" style="height:${HEADER_HEIGHT + TOP_PAD}px"></div>
        ${rows}
      </div>
    `;
  }

  async function render() {
    // All the fit/collision decisions above depend on canvas text
    // measurement being accurate. If the Inter webfont hasn't finished
    // loading yet, ctx.font silently falls back to a system font with
    // different (usually wider) character widths — measured the actual
    // gap once: ~3.4px on "DIGITAL & VARIABLE AGE", which was exactly
    // enough to flip a borderline fit check to false. Wait for fonts
    // before measuring anything, rather than risk baking in wrong widths
    // from whatever font happened to be available at load time.
    try {
      await document.fonts.ready;
    } catch (e) {
      // font loading API unavailable — proceed with best-effort metrics
    }

    const eraTop = TOP_PAD;
    const rulerTop = eraTop + 22 + 18;

    root.innerHTML = `
      <div class="timeline-frozen-wrap">
        ${labelColHTML()}
        <div class="timeline-scroll-area">
          <svg class="timeline-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}" role="img" aria-label="Timeline of type classifications">
            <defs>
              <linearGradient id="tlOngoingFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" style="stop-color:var(--accent); stop-opacity:1" />
                <stop offset="70%" style="stop-color:var(--accent); stop-opacity:1" />
                <stop offset="100%" style="stop-color:var(--accent); stop-opacity:0.35" />
              </linearGradient>
            </defs>

            ${eraBandSVG(eraTop)}
            ${rulerSVG(rulerTop)}

            ${CLASSIFICATIONS.map(rowSVG).join("")}
          </svg>
        </div>
      </div>
    `;

    const svg = root.querySelector(".timeline-svg");
    svg.addEventListener("click", (e) => {
      const bar = e.target.closest("[data-id]");
      if (bar) onOpenDetail(bar.dataset.id);
    });

    root.querySelectorAll(".timeline-label-row").forEach((rowBtn) => {
      rowBtn.addEventListener("click", () => onOpenDetail(rowBtn.dataset.id));
    });

    attachEraTooltips(svg);
  }

  function attachEraTooltips(svg) {
    document.querySelectorAll(".tl-era-tooltip").forEach((el) => el.remove());

    const tooltip = document.createElement("div");
    tooltip.className = "tl-era-tooltip";
    document.body.appendChild(tooltip);

    function place(target) {
      const era = ART_PERIODS[Number(target.dataset.eraIndex)];
      if (!era) return;
      tooltip.innerHTML = `<strong>${era.tooltipName || era.name}</strong>${era.description}`;

      const rect = target.getBoundingClientRect();
      tooltip.classList.add("is-visible");
      // Measure after making it visible (but still 0 height/width won't
      // matter — offsetWidth/Height are read after content + class are set).
      const ttRect = tooltip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - ttRect.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));
      let top = rect.top - ttRect.height - 10;
      let arrowBelow = false;
      if (top < 8) {
        top = rect.bottom + 10;
        arrowBelow = true;
      }
      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
      tooltip.classList.toggle("arrow-top", arrowBelow);
      tooltip.classList.toggle("arrow-bottom", !arrowBelow);
      tooltip.style.setProperty("--arrow-x", rect.left + rect.width / 2 - left + "px");
    }

    svg.querySelectorAll(".tl-era-group").forEach((group) => {
      group.addEventListener("mouseenter", () => place(group));
      group.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
    });
  }

  render();
}
