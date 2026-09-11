const MAX_COMPARE = 2;

// Ordinal/degree readings derived from each classification's existing
// `diagnostics` strings — not new content. AXIS_DEGREES reuses the exact
// same angles anatomy.js already draws the stress line at (AXIS_ANGLES),
// so "stress" here matches what the anatomy diagram shows for the same
// classification. CONTRAST_SCALE and SERIF_BRACKET_SCALE are ordinal
// readings of the existing contrast/serif categories — there's no prior
// numeric version of those two to match against.
const COMPARE_CONTRAST_SCALE = { none: 0, low: 1, "low-medium": 1.5, medium: 2, high: 3 };
const COMPARE_AXIS_DEGREES = { vertical: 0, "near-vertical": 8, "slightly-oblique": 12, "oblique-moderate": 20, "oblique-strong": 34 };
const COMPARE_SERIF_BRACKET_SCALE = {
  "bracketed-robust": 3,
  "square-slab": 2.5,
  "bracketed-sharp": 2,
  "flared-wedge": 1.5,
  "unbracketed-hairline": 0.5,
  none: 0,
};
const COMPARE_RADAR_AXES = [
  { key: "contrast", label: "Contrast", scale: COMPARE_CONTRAST_SCALE, max: 3 },
  { key: "axis", label: "Stress", scale: COMPARE_AXIS_DEGREES, max: 34 },
  { key: "serif", label: "Serif Bracket", scale: COMPARE_SERIF_BRACKET_SCALE, max: 3 },
];

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

  function renderDiffSlider(a, b) {
    const word = "Typography";
    return `
      <div class="compare-diff">
        <div class="compare-diff-heading">Specimen overlay</div>
        <div class="compare-diff-wrap" id="compare-diff-wrap">
          <div class="compare-diff-label compare-diff-label--a">${a.name}</div>
          <div class="compare-diff-label compare-diff-label--b">${b.name}</div>
          <div class="compare-diff-layer" id="compare-diff-a" style="font-family:${a.fontStack};">${word}</div>
          <div class="compare-diff-layer compare-diff-layer--b" id="compare-diff-b" style="font-family:${b.fontStack};">${word}</div>
          <div class="compare-diff-handle" id="compare-diff-handle"></div>
        </div>
      </div>
    `;
  }

  function radarPoint(cx, cy, r, value, max, i, count) {
    const dist = (Math.max(0, Math.min(value, max)) / max) * r;
    const ang = (Math.PI * 2 * i) / count - Math.PI / 2;
    return [cx + dist * Math.cos(ang), cy + dist * Math.sin(ang)];
  }

  function shapeFor(item, cx, cy, r) {
    return COMPARE_RADAR_AXES.map((axis, i) => {
      const value = axis.scale[item.diagnostics[axis.key]] ?? 0;
      return radarPoint(cx, cy, r, value, axis.max, i, COMPARE_RADAR_AXES.length);
    });
  }

  function renderRadar(a, b) {
    if (!a.diagnostics || !b.diagnostics) {
      return `
        <div class="compare-radar">
          <div class="compare-diff-heading">Diagnostic radar</div>
          <p class="compare-radar-unavailable">No structured diagnostics recorded for ${!a.diagnostics ? a.name : b.name} — radar comparison isn't available for this pair.</p>
        </div>
      `;
    }
    // r is 25% bigger than the original 88 — cx/cy/viewBox grew to keep
    // the labels clear of the larger shape, and the SVG's own CSS
    // max-width grew by the same ratio as the viewBox so the *rendered*
    // scale (px per viewBox unit) is unchanged — meaning font-size (fixed
    // in viewBox units) renders at its original size while the geometry,
    // scaled up in viewBox units, ends up genuinely 25% bigger on screen.
    const cx = 225;
    const cy = 170;
    const r = 110;
    const ptsA = shapeFor(a, cx, cy, r);
    const ptsB = shapeFor(b, cx, cy, r);

    const rings = [0.33, 0.66, 1]
      .map((f) => {
        const pts = COMPARE_RADAR_AXES.map((_, i) => radarPoint(cx, cy, r, f, 1, i, COMPARE_RADAR_AXES.length).join(",")).join(" ");
        return `<polygon points="${pts}" class="compare-radar-ring"/>`;
      })
      .join("");

    const axesSVG = COMPARE_RADAR_AXES.map((axis, i) => {
      const [x, y] = radarPoint(cx, cy, r, 1, 1, i, COMPARE_RADAR_AXES.length);
      const [lx, ly] = radarPoint(cx, cy, r, 1.34, 1, i, COMPARE_RADAR_AXES.length);
      // Centering every label on its own point works for the top axis, but
      // the bottom-left/bottom-right labels are long enough that a
      // center-anchored string reaches back in over the chart shape.
      // Anchoring each away from the chart's own center — end/left for a
      // point left of center, start/right for one to the right — makes the
      // text grow outward instead, so it clears the shape regardless of
      // label length.
      const anchor = lx < cx - 4 ? "end" : lx > cx + 4 ? "start" : "middle";
      return `
        <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="compare-radar-ring"/>
        <text x="${lx}" y="${ly}" text-anchor="${anchor}" class="compare-radar-axis-label">${axis.label}</text>
      `;
    }).join("");

    return `
      <div class="compare-radar">
        <div class="compare-diff-heading">Diagnostic radar</div>
        <div class="compare-radar-row">
          <svg viewBox="0 0 415 270" class="compare-radar-svg">
            ${rings}
            ${axesSVG}
            <polygon points="${ptsA.map((p) => p.join(",")).join(" ")}" class="compare-radar-shape compare-radar-shape--a"/>
            <polygon points="${ptsB.map((p) => p.join(",")).join(" ")}" class="compare-radar-shape compare-radar-shape--b"/>
          </svg>
          <div class="compare-radar-legend">
            <div class="compare-radar-legend-item compare-radar-legend-item--a">${a.name}</div>
            <div class="compare-radar-legend-item compare-radar-legend-item--b">${b.name}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderColumns() {
    if (selected.length === 0) {
      return `<p class="compare-empty">Pick a classification above to start comparing.</p>`;
    }

    const items = selected.map((id) => CLASSIFICATIONS.find((c) => c.id === id));

    const grid = `
      <div class="compare-grid">
        ${items
          .map(
            (item) => `
            <div class="compare-col">
              <div class="compare-col-name">${item.name}</div>
              <div class="compare-col-specimen">${renderSpecimenHTML(item, "compare")}</div>
              <p class="spec-row-tagline">${item.tagline}</p>
            </div>`
          )
          .join("")}
      </div>
    `;

    if (items.length < 2) return grid;

    const [a, b] = items;
    return grid + renderDiffSlider(a, b) + renderRadar(a, b);
  }

  function attachDiffSlider() {
    const wrap = root.querySelector("#compare-diff-wrap");
    if (!wrap) return;
    const handle = root.querySelector("#compare-diff-handle");
    const layerA = root.querySelector("#compare-diff-a");
    const layerB = root.querySelector("#compare-diff-b");

    function setSplit(clientX) {
      const rect = wrap.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      handle.style.left = pct + "%";
      layerB.style.clipPath = `inset(0 0 0 ${pct}%)`;
      // Layer A isn't clipped away past the handle — it stays put so the
      // handle can be dragged back — but at full opacity there it was
      // rendering underneath layer B's differently-shaped letters and the
      // two mixed into an illegible tangle. Masking A down to 70% opacity
      // past the handle keeps it clearly visible as a "ghost" without
      // fighting B for attention there.
      const mask = `linear-gradient(to right, black 0%, black ${pct}%, rgba(0,0,0,0.7) ${pct}%, rgba(0,0,0,0.7) 100%)`;
      layerA.style.maskImage = mask;
      layerA.style.webkitMaskImage = mask;
    }

    // setPointerCapture keeps move/up events targeting wrap even once the
    // pointer leaves its bounds during a fast drag — no window-level
    // listeners needed, so nothing to clean up when render() rebuilds this
    // element from scratch on the next selection change.
    wrap.addEventListener("pointerdown", (e) => {
      wrap.setPointerCapture(e.pointerId);
      setSplit(e.clientX);
    });
    wrap.addEventListener("pointermove", (e) => {
      if (e.buttons) setSplit(e.clientX);
    });

    // Apply the initial 50/50 split's mask immediately — otherwise layer A
    // renders at full opacity everywhere until the visitor's first drag.
    const rect = wrap.getBoundingClientRect();
    setSplit(rect.left + rect.width / 2);
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
    attachDiffSlider();
  }

  render();
}
