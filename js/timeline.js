function initTimeline(root, onOpenDetail) {
  const domainStart = TIMELINE_DOMAIN_START;
  const domainEnd = TIMELINE_DOMAIN_END;
  const span = domainEnd - domainStart;
  const MIN_WIDTH_PCT = 1.4;

  // Broader art-historical backdrop the classifications emerged against.
  // Trimmed to this chart's domain (1450–present) — Romanesque and Gothic
  // precede it entirely, same reasoning as why Blackletter's own bar starts
  // at Gutenberg's press rather than 12th-century manuscript hands.
  const ART_PERIODS = [
    { name: "Renaissance", start: 1450, end: 1600, color: "rgba(138, 155, 110, 0.3)" },
    { name: "Baroque", start: 1600, end: 1700, color: "rgba(176, 120, 79, 0.3)" },
    { name: "Classicism →", start: 1700, end: domainEnd, color: "rgba(91, 114, 144, 0.3)" },
  ];

  function pct(year) {
    return ((year - domainStart) / span) * 100;
  }

  function eraBandHTML() {
    const segments = ART_PERIODS.map((era) => {
      const left = pct(era.start);
      const width = pct(era.end) - left;
      return `
        <div class="timeline-era-segment" style="left:${left}%; width:${width}%; background:${era.color};">
          <span class="timeline-era-label">${era.name}</span>
        </div>
      `;
    }).join("");
    return `<div class="timeline-era-band">${segments}</div>`;
  }

  function buildMarks() {
    const marks = [];
    for (let y = 1450; y < domainEnd; y += 50) marks.push(y);
    marks.push(domainEnd);
    return marks;
  }

  const LABEL_FIT_THRESHOLD_PCT = 11;

  function rowHTML(item) {
    const start = Math.max(item.timelineStart, domainStart);
    const end = item.timelineEnd === null ? domainEnd : item.timelineEnd;
    const left = pct(start);
    const rawWidth = pct(end) - left;
    const width = Math.max(rawWidth, MIN_WIDTH_PCT);
    const ongoing = item.timelineEnd === null;
    const yearLabel = ongoing
      ? `${item.timelineStart} – present`
      : `${item.timelineStart} – ${item.timelineEnd}`;
    const labelFits = width >= LABEL_FIT_THRESHOLD_PCT;

    return `
      <div class="timeline-row">
        <div class="timeline-row-label">
          <span class="timeline-row-name">${item.name}</span>
          <span class="branch-tag branch-tag--sm">${BRANCH_LABELS[item.branch]}</span>
        </div>
        <div class="timeline-track">
          <button class="timeline-bar ${ongoing ? "is-ongoing" : ""} ${labelFits ? "" : "is-narrow"}" data-id="${item.id}"
            style="left:${left}%; width:${width}%;" title="${item.name}: ${yearLabel}">
            ${labelFits ? `<span class="timeline-bar-label">${yearLabel}</span>` : ""}
          </button>
          ${labelFits ? "" : `<span class="timeline-bar-label-outside" style="left:calc(${left}% + ${width}% + 6px)">${yearLabel}</span>`}
        </div>
      </div>
    `;
  }

  function render() {
    const marks = buildMarks();
    root.innerHTML = `
      <div class="timeline-wrap">
        <div class="timeline-inner">
          ${eraBandHTML()}
          <div class="timeline-scale">
            <div class="timeline-scale-labels">
              ${marks
                .map(
                  (y) =>
                    `<span class="timeline-scale-mark" style="left:${pct(y)}%">${y === domainEnd ? "Today" : y}</span>`
                )
                .join("")}
            </div>
            <div class="timeline-scale-grid">
              ${marks.map((y) => `<span class="timeline-gridline" style="left:${pct(y)}%"></span>`).join("")}
            </div>
          </div>
          <div class="timeline-rows">
            ${CLASSIFICATIONS.map(rowHTML).join("")}
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll(".timeline-bar").forEach((bar) => {
      bar.addEventListener("click", () => onOpenDetail(bar.dataset.id));
    });
  }

  render();
}
