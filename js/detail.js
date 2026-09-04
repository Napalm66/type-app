const DIAGNOSTIC_LABELS = {
  contrast: "Contrast",
  axis: "Stress axis",
  serif: "Serif shape",
};

// Venetian, Garalde, and Transitional are exact user-supplied SVG traces
// (Venetian_Sherlyn.svg, garalde_serif_accurate.svg, Transitional_Sherlyn.svg),
// each kept in its own native viewBox rather than rescaled into a shared
// one — rescaling by hand is exactly what produced the earlier inaccurate
// guesses, so each path's own coordinates are used verbatim and the SVG
// element just scales/centers that viewBox into the icon box normally.
// Modern and Slab have no exact trace yet, so they stay parametric,
// calibrated off Garalde's real proportions: unbracketed (zero curve,
// per their sourced descriptions) with a much narrower flare than the
// oldstyle trio, since the wide trumpet bracket is specifically an
// oldstyle trait.
const SERIF_SPECTRUM = [
  {
    id: "venetian",
    label: "Venetian",
    viewBox: "400 40 860 520",
    path: "M 704,59 C 779,59 860,59 940,60 C 940,126 940,195 941,263 C 942,327 944,365 955,390 C 966,417 986,431 1020,443 C 1066,459 1128,468 1190,473 C 1207,474 1223,475 1238,476 C 1235,490 1232,505 1228,519 C 1224,536 1218,545 1202,546 C 1113,541 1016,539 916,538 C 763,535 611,539 460,541 C 442,541 433,535 430,520 L 421,469 C 484,465 547,458 601,449 C 647,442 670,430 682,404 C 696,373 697,323 699,266 C 701,197 702,126 704,59 Z",
  },
  {
    id: "garalde",
    label: "Garalde",
    viewBox: "0 0 973 631",
    path: "M 0.00,530.00 L 6.00,617.00 L 11.00,624.00 L 24.00,630.00 L 91.00,629.00 L 127.00,626.00 L 166.00,626.00 L 175.00,624.00 L 219.00,624.00 L 229.00,622.00 L 243.00,623.00 L 438.00,618.00 L 649.00,618.00 L 675.00,620.00 L 778.00,620.00 L 788.00,622.00 L 831.00,622.00 L 836.00,624.00 L 859.00,623.00 L 912.00,627.00 L 931.00,626.00 L 940.00,628.00 L 959.00,624.00 L 967.00,616.00 L 972.00,550.00 L 971.00,525.00 L 967.00,520.00 L 957.00,516.00 L 933.00,516.00 L 928.00,514.00 L 923.00,516.00 L 896.00,516.00 L 890.00,514.00 L 882.00,514.00 L 877.00,516.00 L 841.00,516.00 L 836.00,514.00 L 829.00,516.00 L 810.00,516.00 L 805.00,514.00 L 798.00,516.00 L 780.00,514.00 L 763.00,516.00 L 753.00,514.00 L 723.00,514.00 L 704.00,509.00 L 689.00,502.00 L 678.00,494.00 L 663.00,477.00 L 663.00,474.00 L 655.00,462.00 L 649.00,445.00 L 642.00,403.00 L 646.00,5.00 L 638.00,1.00 L 627.00,1.00 L 622.00,3.00 L 614.00,1.00 L 576.00,1.00 L 570.00,3.00 L 565.00,1.00 L 518.00,2.00 L 514.00,0.00 L 510.00,2.00 L 503.00,0.00 L 495.00,2.00 L 489.00,0.00 L 484.00,2.00 L 480.00,0.00 L 462.00,0.00 L 457.00,2.00 L 451.00,0.00 L 346.00,0.00 L 339.00,2.00 L 337.00,4.00 L 336.00,55.00 L 338.00,72.00 L 337.00,93.00 L 341.00,220.00 L 340.00,284.00 L 342.00,373.00 L 340.00,448.00 L 338.00,450.00 L 336.00,463.00 L 324.00,481.00 L 305.00,498.00 L 290.00,506.00 L 263.00,514.00 L 248.00,516.00 L 216.00,515.00 L 198.00,517.00 L 14.00,517.00 L 6.00,520.00 L 2.00,524.00 Z",
  },
  {
    id: "transitional",
    label: "Transitional",
    viewBox: "340 65 830 510",
    path: "M 638,84 C 718,84.5 799,85 879,86 C 878.5,169 877.5,253 878,330 C 878.5,387 883,427 899,454 C 920,489 967,501 1038,506 C 1075,508.5 1113,508.5 1149,508 L 1146,558 C 1010,556.5 878,555.5 756,555.5 C 625,555.5 493,555.5 362,556 L 361,507 C 405,507.5 451,507.5 493,505 C 555,502 594,492 615,467 C 633,444 638,402 640,344 C 641,258 639.5,171 638,84 Z",
  },
  { id: "modern", label: "Modern", stemW: 340, serifW: 720, serifH: 25, curveH: 0 },
  { id: "slab", label: "Slab", stemW: 300, serifW: 680, serifH: 280, curveH: 0 },
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

function serifSpectrumViewBox(s) {
  return s.viewBox || `0 0 ${SERIF_VB_W} ${SERIF_VB_H}`;
}

function serifSpectrumHTML(currentId) {
  if (!SERIF_SPECTRUM.some((s) => s.id === currentId)) return "";
  const items = SERIF_SPECTRUM.map((s) => {
    const isCurrent = s.id === currentId;
    return `
      <div class="serif-spectrum-item ${isCurrent ? "is-current" : ""}" data-serif-id="${s.id}">
        <svg class="serif-spectrum-svg" viewBox="${serifSpectrumViewBox(s)}" aria-hidden="true">
          <path d="${s.path || serifShapePath(s)}" />
        </svg>
        <span class="serif-spectrum-label">${s.label}</span>
      </div>
    `;
  }).join("");
  return `
    <div class="serif-spectrum">
      <div class="serif-spectrum-heading">Serif shape, oldstyle to slab <span class="serif-spectrum-hint">tap or hover a shape to zoom in</span></div>
      <div class="serif-spectrum-row">${items}</div>
    </div>
  `;
}

let serifSpectrumOutsideTouchHandler = null;

function attachSerifSpectrumZoom(panelRoot) {
  const row = panelRoot.querySelector(".serif-spectrum-row");
  if (serifSpectrumOutsideTouchHandler) {
    document.removeEventListener("touchstart", serifSpectrumOutsideTouchHandler);
    serifSpectrumOutsideTouchHandler = null;
  }
  if (!row) return;

  document.querySelectorAll(".serif-spectrum-zoom").forEach((el) => el.remove());
  const zoom = document.createElement("div");
  zoom.className = "serif-spectrum-zoom";
  document.body.appendChild(zoom);

  let openItem = null;

  function showZoom(item) {
    const spec = SERIF_SPECTRUM.find((s) => s.id === item.dataset.serifId);
    if (!spec) return;
    openItem = item;
    zoom.innerHTML = `
      <svg viewBox="${serifSpectrumViewBox(spec)}"><path d="${spec.path || serifShapePath(spec)}" /></svg>
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
  }

  function hideZoom() {
    openItem = null;
    zoom.classList.remove("is-visible");
  }

  row.querySelectorAll(".serif-spectrum-item").forEach((item) => {
    item.addEventListener("mouseenter", () => showZoom(item));
    item.addEventListener("mouseleave", () => hideZoom());

    // Mobile: tap an item to open/close its zoom (hover doesn't exist on
    // touch), matching the tap-to-toggle pattern used by the anatomy lens.
    item.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        if (openItem === item) hideZoom();
        else showZoom(item);
      },
      { passive: false }
    );
  });

  serifSpectrumOutsideTouchHandler = (e) => {
    if (openItem && !row.contains(e.target)) hideZoom();
  };
  document.addEventListener("touchstart", serifSpectrumOutsideTouchHandler);
}

function initDetail(overlayRoot, panelRoot) {
  function close() {
    overlayRoot.classList.remove("is-open");
    overlayRoot.setAttribute("aria-hidden", "true");
    panelRoot.innerHTML = "";
    removeExistingLens();
    document.querySelectorAll(".serif-spectrum-zoom").forEach((el) => el.remove());
    if (serifSpectrumOutsideTouchHandler) {
      document.removeEventListener("touchstart", serifSpectrumOutsideTouchHandler);
      serifSpectrumOutsideTouchHandler = null;
    }
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

    const visualCharacteristicsHTML = item.visualCharacteristics
      ? `<div class="visual-characteristics">
          <div class="visual-characteristics-heading">Visual Characteristics</div>
          <ul class="visual-characteristics-list">
            ${item.visualCharacteristics.map((v) => `<li><b>${v.label}:</b> ${v.text}</li>`).join("")}
          </ul>
        </div>`
      : "";

    const additionalFeaturesHTML = item.additionalFeatures
      ? `<div class="additional-features">
          <div class="additional-features-heading">Additional features</div>
          <ul class="additional-features-list">
            ${item.additionalFeatures.map((f) => `<li>${f}</li>`).join("")}
          </ul>
        </div>`
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
      <div class="anatomy-heading">Anatomy <span class="anatomy-hint">tap or hover the diagram to zoom in</span></div>
      <div class="anatomy-loading" id="anatomy-slot">Measuring glyph metrics…</div>
      ${visualCharacteristicsHTML}
      ${additionalFeaturesHTML}
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
