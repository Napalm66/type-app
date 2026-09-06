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
initAnatomyPrimer(document.getElementById("anatomy-primer-root"));
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

    // Any open detail modal or Timeline tooltip belongs to the section
    // just left — on mobile there's no hover to dismiss it implicitly,
    // so it would otherwise stay floating on screen over whichever
    // section the visitor switches to.
    detail.close();
    document.querySelector(".tl-era-tooltip")?.classList.remove("is-visible");
    document.querySelector(".anatomy-lens")?.classList.remove("is-visible");
  });
});

// The Timeline tooltip and detail modal are both position:fixed, placed
// relative to the viewport at the moment they open — if the page (or the
// timeline chart's own horizontally-scrolling wrapper) then scrolls,
// they'd stay put while the node/era they're anchored to moves out from
// under them. Close them on scroll rather than leave them floating in
// the wrong spot.
//
// Scoped to the Timeline section only — elsewhere (e.g. Explore) a long
// detail panel is meant to be scrollable without the act of scrolling
// closing it.
//
// "scroll" doesn't bubble, so a listener on window's bubble phase would
// only ever see the page's own scroll, not the chart wrapper's internal
// horizontal scroll. Capture-phase listeners fire on the way down to the
// target regardless of bubbling, so listening on window with capture:true
// catches both.
window.addEventListener(
  "scroll",
  () => {
    if (!document.getElementById("view-timeline").classList.contains("is-active")) return;
    detail.close();
    document.querySelector(".tl-era-tooltip")?.classList.remove("is-visible");
  },
  { passive: true, capture: true }
);

// TEMPORARY DEBUG — remove once the magnifier-detection issue is diagnosed.
// Shows the exact media-query values this browser reports, right on the
// page, so this can be read without opening DevTools.
(function () {
  const box = document.createElement("div");
  box.style.cssText =
    "position:fixed;bottom:8px;right:8px;z-index:99999;background:#000;color:#0f0;" +
    "font:11px/1.5 monospace;padding:8px 10px;border-radius:4px;max-width:90vw;white-space:pre;";
  box.textContent =
    "DEBUG\n" +
    "hover:none = " + window.matchMedia("(hover: none)").matches + "\n" +
    "pointer:coarse = " + window.matchMedia("(pointer: coarse)").matches + "\n" +
    "any-hover:none = " + window.matchMedia("(any-hover: none)").matches + "\n" +
    "any-pointer:coarse = " + window.matchMedia("(any-pointer: coarse)").matches + "\n" +
    "new combined = " + window.matchMedia("(any-hover: none) and (any-pointer: coarse)").matches + "\n" +
    "UA = " + navigator.userAgent;
  document.body.appendChild(box);
})();
