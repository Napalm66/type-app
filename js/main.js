document.getElementById("specimen-fonts").setAttribute("href", googleFontsHref());

const detail = initDetail(
  document.getElementById("detail-overlay"),
  document.getElementById("detail-panel")
);

initExplore({
  filterRoot: document.getElementById("branch-filters"),
  gridRoot: document.getElementById("card-grid"),
  specimenInputRoot: document.getElementById("specimen-tool-root"),
  onOpenDetail: (id) => detail.open(id),
});

initIdentify(document.getElementById("identify-root"), (id) => detail.open(id));
initTimeline(document.getElementById("timeline-root"), (id) => detail.open(id));
initCompare(document.getElementById("compare-root"));

// tab switching
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
    document.getElementById(`view-${tab.dataset.view}`).classList.add("is-active");
  });
});
