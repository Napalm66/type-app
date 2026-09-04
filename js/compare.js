const MAX_COMPARE = 3;

function initCompare(root) {
  let selected = [];

  function renderPicker() {
    const atCap = selected.length >= MAX_COMPARE;
    return `
      <div class="compare-picker">
        ${CLASSIFICATIONS.map((c) => {
          const isSelected = selected.includes(c.id);
          const disabled = atCap && !isSelected;
          return `
          <button class="filter-chip ${isSelected ? "is-active" : ""}" data-id="${c.id}"
            ${disabled ? `disabled title="Deselect one to compare a different classification"` : ""}>
            ${c.name}
          </button>`;
        }).join("")}
      </div>
    `;
  }

  function renderColumns() {
    if (selected.length === 0) {
      return `<p class="compare-empty">Pick a classification above to start comparing.</p>`;
    }
    return `
      <div class="compare-grid">
        ${selected
          .map((id) => {
            const item = CLASSIFICATIONS.find((c) => c.id === id);
            return `
            <div class="compare-col">
              <div class="compare-col-name">${item.name}</div>
              <div class="compare-col-specimen">${renderSpecimenHTML(item, "compare")}</div>
              <p class="spec-row-tagline">${item.tagline}</p>
              ${
                item.diagnostics
                  ? `<div class="diagnostics-grid">
                      <div class="diagnostic"><div class="diagnostic-label">Contrast</div><div class="diagnostic-value">${item.diagnostics.contrast}</div></div>
                      <div class="diagnostic"><div class="diagnostic-label">Axis</div><div class="diagnostic-value">${item.diagnostics.axis}</div></div>
                      <div class="diagnostic"><div class="diagnostic-label">Serif</div><div class="diagnostic-value">${item.diagnostics.serif}</div></div>
                    </div>`
                  : ""
              }
            </div>`;
          })
          .join("")}
      </div>
    `;
  }

  function render() {
    root.innerHTML = renderPicker() + renderColumns();
    root.querySelectorAll(".compare-picker .filter-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (selected.includes(id)) {
          selected = selected.filter((s) => s !== id);
        } else if (selected.length < MAX_COMPARE) {
          selected = [...selected, id];
        }
        render();
      });
    });
  }

  render();
}
