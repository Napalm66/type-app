function initExplore({ filterRoot, gridRoot, onOpenDetail, specimenInputRoot }) {
  let activeBranch = "all";

  function renderSpecimenInput() {
    specimenInputRoot.innerHTML = `
      <div class="specimen-tool">
        <label class="specimen-tool-label" for="specimen-text-input">Try your own text</label>
        <div class="specimen-tool-row">
          <input id="specimen-text-input" class="specimen-tool-input" type="text"
            placeholder="Type or paste a word, name, or short phrase…"
            value="${getCustomSpecimenText().replace(/"/g, "&quot;")}" />
          <button class="specimen-tool-clear" ${getCustomSpecimenText() ? "" : "hidden"}>Clear</button>
        </div>
      </div>
    `;

    const input = specimenInputRoot.querySelector(".specimen-tool-input");
    const clearBtn = specimenInputRoot.querySelector(".specimen-tool-clear");

    let debounceTimer;
    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setCustomSpecimenText(input.value);
        clearBtn.hidden = !getCustomSpecimenText();
        renderGrid();
      }, 150);
    });

    clearBtn.addEventListener("click", () => {
      setCustomSpecimenText("");
      input.value = "";
      clearBtn.hidden = true;
      renderGrid();
      input.focus();
    });
  }

  function renderFilters() {
    const branches = ["all", ...Object.keys(BRANCH_LABELS)];
    filterRoot.innerHTML = branches
      .map((b) => {
        const label = b === "all" ? "All" : BRANCH_LABELS[b];
        return `<button class="filter-chip ${b === activeBranch ? "is-active" : ""}" data-branch="${b}">${label}</button>`;
      })
      .join("");

    filterRoot.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeBranch = btn.dataset.branch;
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const items =
      activeBranch === "all"
        ? CLASSIFICATIONS
        : CLASSIFICATIONS.filter((c) => c.branch === activeBranch);

    gridRoot.innerHTML = items
      .map(
        (item, i) => `
      <button class="spec-row" data-id="${item.id}">
        <span class="spec-row-index">${String(i + 1).padStart(2, "0")}</span>
        <span class="spec-row-main">
          <span class="spec-row-name">${item.name}</span>
          <span class="spec-row-specimen">${renderSpecimenHTML(item, "row")}</span>
          <span class="spec-row-tagline">${item.tagline}</span>
        </span>
        <span class="spec-row-meta">
          <span class="spec-row-era">${item.era}</span>
          <span class="branch-tag">${BRANCH_LABELS[item.branch]}</span>
        </span>
      </button>
    `
      )
      .join("");

    gridRoot.querySelectorAll(".spec-row").forEach((row) => {
      row.addEventListener("click", () => onOpenDetail(row.dataset.id));
    });
  }

  renderSpecimenInput();
  renderFilters();
  renderGrid();
}
