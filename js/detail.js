const DIAGNOSTIC_LABELS = {
  contrast: "Contrast",
  axis: "Stress axis",
  serif: "Serif shape",
};

// Venetian/Garalde/Transitional proportions traced from a reference
// slider (Humanist -> Garalde -> Transitional -> Didone -> Slab) showing
// one stem+serif silhouette per style: as the style progresses, the
// straight stem section gets longer and the flare curve gets shorter and
// less wide, but doesn't disappear until Modern. Modern and Slab are NOT
// flared like the oldstyle trio — the wide trumpet-bell bracket is
// specifically an oldstyle trait. Didone serifs are unbracketed hairlines
// (sharp 90 degree join, thick stem, thin flat foot, modest width) and
// slab serifs are unbracketed blocks (sharp join, foot nearly as thick as
// the stem, modest width) — both far more restrained/blocky than the
// oldstyle flare, per Wikipedia's Didone and slab-serif descriptions.
const SERIF_SPECTRUM = [
  { id: "venetian", label: "Venetian", stemW: 32, serifW: 100, serifH: 9, curveH: 65 },
  { id: "garalde", label: "Garalde", stemW: 32, serifW: 96, serifH: 11, curveH: 62 },
  { id: "transitional", label: "Transitional", stemW: 28, serifW: 80, serifH: 8, curveH: 34 },
  { id: "modern", label: "Modern", stemW: 42, serifW: 64, serifH: 3, curveH: 0 },
  { id: "slab", label: "Slab", stemW: 34, serifW: 54, serifH: 30, curveH: 0 },
];

function serifShapePath({ stemW, serifW, serifH, curveH }) {
  const cx = 60;
  const top = 12;
  const footY = 148;
  const footTopY = footY - serifH;
  const curveStartY = footTopY - curveH;
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
      <div class="serif-spectrum-item ${isCurrent ? "is-current" : ""}">
        <svg class="serif-spectrum-svg" viewBox="0 0 120 160" aria-hidden="true">
          <path d="${serifShapePath(s)}" />
        </svg>
        <span class="serif-spectrum-label">${s.label}</span>
      </div>
    `;
  }).join("");
  return `
    <div class="serif-spectrum">
      <div class="serif-spectrum-heading">Serif shape, oldstyle to slab</div>
      <div class="serif-spectrum-row">${items}</div>
    </div>
  `;
}

function initDetail(overlayRoot, panelRoot) {
  function close() {
    overlayRoot.classList.remove("is-open");
    overlayRoot.setAttribute("aria-hidden", "true");
    panelRoot.innerHTML = "";
    removeExistingLens();
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
