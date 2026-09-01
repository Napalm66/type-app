const DIAGNOSTIC_LABELS = {
  contrast: "Contrast",
  axis: "Stress axis",
  serif: "Serif shape",
};

function initDetail(overlayRoot, panelRoot) {
  function close() {
    overlayRoot.classList.remove("is-open");
    overlayRoot.setAttribute("aria-hidden", "true");
    panelRoot.innerHTML = "";
  }

  function open(id) {
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
      <div class="detail-specimen">${renderSpecimenHTML(item)}</div>
      <p class="detail-description">${item.description}</p>
      ${diagnosticsHTML}
      ${tellHTML}
      ${subStylesHTML}
      <p class="key-typefaces"><b>Reference typefaces:</b> ${item.keyTypefaces.join(", ")}</p>
    `;

    panelRoot.querySelector(".detail-close").addEventListener("click", close);
    overlayRoot.classList.add("is-open");
    overlayRoot.setAttribute("aria-hidden", "false");
  }

  overlayRoot.addEventListener("click", (e) => {
    if (e.target === overlayRoot) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return { open, close };
}
