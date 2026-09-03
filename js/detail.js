const DIAGNOSTIC_LABELS = {
  contrast: "Contrast",
  axis: "Stress axis",
  serif: "Serif shape",
};

// Shared coordinate space matches the user-supplied exact SVG trace for
// Garalde (garalde_serif_accurate.svg, viewBox 0 0 973 631) so that path
// can be used verbatim, at full fidelity, with no rescaling. Garalde's
// exact geometry is the calibration anchor for the rest of the row: its
// stem stays straight for ~87% of the stem+curve zone before bracketing
// (not ~50% as earlier guesses assumed), and its foot band is ~17% of
// the total height (not ~8%). The other four are built parametrically
// off that same anchor: Venetian gets more curve than Garalde (still
// majority-straight), Transitional gets less, and Modern/Slab drop the
// curve entirely — unbracketed per their sourced descriptions — with a
// much narrower flare than the oldstyle trio, since the wide trumpet
// bracket is specifically an oldstyle trait.
const SERIF_SPECTRUM = [
  { id: "venetian", label: "Venetian", stemW: 310, serifW: 950, serifH: 110, curveH: 215, straightH: 300 },
  {
    id: "garalde",
    label: "Garalde",
    path: "M 0.00,530.00 L 6.00,617.00 L 11.00,624.00 L 24.00,630.00 L 91.00,629.00 L 127.00,626.00 L 166.00,626.00 L 175.00,624.00 L 219.00,624.00 L 229.00,622.00 L 243.00,623.00 L 438.00,618.00 L 649.00,618.00 L 675.00,620.00 L 778.00,620.00 L 788.00,622.00 L 831.00,622.00 L 836.00,624.00 L 859.00,623.00 L 912.00,627.00 L 931.00,626.00 L 940.00,628.00 L 959.00,624.00 L 967.00,616.00 L 972.00,550.00 L 971.00,525.00 L 967.00,520.00 L 957.00,516.00 L 933.00,516.00 L 928.00,514.00 L 923.00,516.00 L 896.00,516.00 L 890.00,514.00 L 882.00,514.00 L 877.00,516.00 L 841.00,516.00 L 836.00,514.00 L 829.00,516.00 L 810.00,516.00 L 805.00,514.00 L 798.00,516.00 L 780.00,514.00 L 763.00,516.00 L 753.00,514.00 L 723.00,514.00 L 704.00,509.00 L 689.00,502.00 L 678.00,494.00 L 663.00,477.00 L 663.00,474.00 L 655.00,462.00 L 649.00,445.00 L 642.00,403.00 L 646.00,5.00 L 638.00,1.00 L 627.00,1.00 L 622.00,3.00 L 614.00,1.00 L 576.00,1.00 L 570.00,3.00 L 565.00,1.00 L 518.00,2.00 L 514.00,0.00 L 510.00,2.00 L 503.00,0.00 L 495.00,2.00 L 489.00,0.00 L 484.00,2.00 L 480.00,0.00 L 462.00,0.00 L 457.00,2.00 L 451.00,0.00 L 346.00,0.00 L 339.00,2.00 L 337.00,4.00 L 336.00,55.00 L 338.00,72.00 L 337.00,93.00 L 341.00,220.00 L 340.00,284.00 L 342.00,373.00 L 340.00,448.00 L 338.00,450.00 L 336.00,463.00 L 324.00,481.00 L 305.00,498.00 L 290.00,506.00 L 263.00,514.00 L 248.00,516.00 L 216.00,515.00 L 198.00,517.00 L 14.00,517.00 L 6.00,520.00 L 2.00,524.00 Z",
  },
  { id: "transitional", label: "Transitional", stemW: 290, serifW: 850, serifH: 90, curveH: 30, straightH: 500 },
  { id: "modern", label: "Modern", stemW: 340, serifW: 500, serifH: 25, curveH: 0 },
  { id: "slab", label: "Slab", stemW: 300, serifW: 460, serifH: 280, curveH: 0 },
];

const SERIF_VB_W = 973;
const SERIF_VB_H = 631;

function serifShapePath({ stemW, serifW, serifH, curveH, straightH }) {
  const cx = SERIF_VB_W / 2;
  const top = 0;
  const footY = SERIF_VB_H;
  const footTopY = footY - serifH;
  const curveStartY = top + straightH;
  const stemHalf = stemW / 2;
  const serifHalf = serifW / 2;

  if (curveH <= 0) {
    return `M ${cx - stemHalf} ${top} L ${cx - stemHalf} ${footTopY} L ${cx - serifHalf} ${footTopY} L ${cx - serifHalf} ${footY} L ${cx + serifHalf} ${footY} L ${cx + serifHalf} ${footTopY} L ${cx + stemHalf} ${footTopY} L ${cx + stemHalf} ${top} Z`;
  }
  return `M ${cx - stemHalf} ${top}
    L ${cx - stemHalf} ${curveStartY}
    C ${cx - stemHalf} ${footTopY}, ${cx - serifHalf} ${curveStartY}, ${cx - serifHalf} ${footTopY}
    L ${cx - serifHalf} ${footY}
    L ${cx + serifHalf} ${footY}
    L ${cx + serifHalf} ${footTopY}
    C ${cx + serifHalf} ${curveStartY}, ${cx + stemHalf} ${footTopY}, ${cx + stemHalf} ${curveStartY}
    L ${cx + stemHalf} ${top}
    Z`;
}

function serifSpectrumHTML(currentId) {
  if (!SERIF_SPECTRUM.some((s) => s.id === currentId)) return "";
  const items = SERIF_SPECTRUM.map((s) => {
    const isCurrent = s.id === currentId;
    return `
      <div class="serif-spectrum-item ${isCurrent ? "is-current" : ""}" data-serif-id="${s.id}">
        <svg class="serif-spectrum-svg" viewBox="0 0 ${SERIF_VB_W} ${SERIF_VB_H}" aria-hidden="true">
          <path d="${s.path || serifShapePath(s)}" />
        </svg>
        <span class="serif-spectrum-label">${s.label}</span>
      </div>
    `;
  }).join("");
  return `
    <div class="serif-spectrum">
      <div class="serif-spectrum-heading">Serif shape, oldstyle to slab <span class="serif-spectrum-hint">hover a shape to zoom in</span></div>
      <div class="serif-spectrum-row">${items}</div>
    </div>
  `;
}

function attachSerifSpectrumZoom(panelRoot) {
  const row = panelRoot.querySelector(".serif-spectrum-row");
  if (!row) return;

  document.querySelectorAll(".serif-spectrum-zoom").forEach((el) => el.remove());
  const zoom = document.createElement("div");
  zoom.className = "serif-spectrum-zoom";
  document.body.appendChild(zoom);

  row.querySelectorAll(".serif-spectrum-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const spec = SERIF_SPECTRUM.find((s) => s.id === item.dataset.serifId);
      if (!spec) return;
      zoom.innerHTML = `
        <svg viewBox="0 0 ${SERIF_VB_W} ${SERIF_VB_H}"><path d="${spec.path || serifShapePath(spec)}" /></svg>
        <div class="serif-spectrum-zoom-label">${spec.label}</div>
      `;
      const rect = item.getBoundingClientRect();
      zoom.classList.add("is-visible");
      const zRect = zoom.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - zRect.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - zRect.width - 8));
      let top = rect.top - zRect.height - 12;
      if (top < 8) top = rect.bottom + 12;
      zoom.style.left = left + "px";
      zoom.style.top = top + "px";
    });
    item.addEventListener("mouseleave", () => zoom.classList.remove("is-visible"));
  });
}

function initDetail(overlayRoot, panelRoot) {
  function close() {
    overlayRoot.classList.remove("is-open");
    overlayRoot.setAttribute("aria-hidden", "true");
    panelRoot.innerHTML = "";
    removeExistingLens();
    document.querySelectorAll(".serif-spectrum-zoom").forEach((el) => el.remove());
  }

  async function open(id) {
    const item = getById(id);
    if (!item) return;

    const diagnosticsHTML = item.diagnostics
      ? `<div class="diagnostics-grid">
          ${Object.entries(item.diagnostics)
            .filter(([k]) => k !== "tell")
            .map(
              ([k, v]) => `
              <div class="diagnostic">
                <div class="diagnostic-label">${DIAGNOSTIC_LABELS[k] || k}</div>
                <div class="diagnostic-value">${v}</div>
              </div>`
            )
            .join("")}
        </div>`
      : "";

    const tellHTML = item.diagnostics
      ? `<div class="tell-box"><strong>Key tell</strong>${item.diagnostics.tell}</div>`
      : "";

    const subStylesHTML = item.subStyles
      ? `<ul class="substyle-list">
          ${item.subStyles.map((s) => `<li><b>${s.name}</b> — ${s.note}</li>`).join("")}
        </ul>`
      : "";

    panelRoot.innerHTML = `
      <button class="detail-close" aria-label="Close">&times;</button>
      <div class="detail-era">${item.era}</div>
      <h3 class="detail-name">${item.name}</h3>
      <div class="detail-specimen">${renderSpecimenHTML(item, "detail")}</div>
      <p class="detail-description">${item.description}</p>
      ${diagnosticsHTML}
      ${tellHTML}
      ${serifSpectrumHTML(item.id)}
      ${subStylesHTML}
      <p class="key-typefaces"><b>Reference typefaces:</b> ${item.keyTypefaces.join(", ")}</p>
      <div class="anatomy-heading">Anatomy <span class="anatomy-hint">hover the diagram to zoom in</span></div>
      <div class="anatomy-loading" id="anatomy-slot">Measuring glyph metrics…</div>
    `;

    panelRoot.querySelector(".detail-close").addEventListener("click", close);
    overlayRoot.classList.add("is-open");
    overlayRoot.setAttribute("aria-hidden", "false");
    attachSerifSpectrumZoom(panelRoot);

    const slot = panelRoot.querySelector("#anatomy-slot");
    const html = await buildAnatomyHTML(item);
    if (slot && document.contains(slot)) {
      slot.outerHTML = html;
      const wrap = panelRoot.querySelector(".anatomy-svg-wrap");
      const svg = wrap ? wrap.querySelector("svg") : null;
      attachMagnifier(wrap, svg);
    }
  }

  overlayRoot.addEventListener("click", (e) => {
    if (e.target === overlayRoot) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return { open, close };
}
