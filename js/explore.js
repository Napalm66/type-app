function initExplore({ filterRoot, gridRoot, onOpenDetail }) {
  let activeBranch = "all";

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
        (item) => `
      <button class="spec-card" data-id="${item.id}">
        <div class="spec-card-meta">
          <span class="spec-card-name">${item.name}</span>
          <span class="spec-card-era">${item.era}</span>
        </div>
        <div class="spec-card-specimen">${renderSpecimenHTML(item)}</div>
        <p class="spec-card-tagline">${item.tagline}</p>
        <span class="branch-tag">${BRANCH_LABELS[item.branch]}</span>
      </button>
    `
      )
      .join("");

    gridRoot.querySelectorAll(".spec-card").forEach((card) => {
      card.addEventListener("click", () => onOpenDetail(card.dataset.id));
    });
  }

  renderFilters();
  renderGrid();
}
