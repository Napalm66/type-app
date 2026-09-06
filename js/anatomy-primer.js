const ANATOMY_PRIMER_GLOSSARY = [
  { label: "Ascent Line", text: "The guideline marking the highest point ascenders reach, above the cap line." },
  { label: "Cap Line", text: "The guideline marking the top of capital letters and ascenders." },
  { label: "x-height", text: "The height of lowercase letters without ascenders or descenders — x, a, o, e — measured from the baseline to the mean line." },
  { label: "Baseline", text: "The invisible line letters rest on; descenders drop below it." },
  { label: "Main Stroke / Stem", text: "The primary straight or near-straight stroke that carries a letter's structure." },
  { label: "Bar or Crossbar", text: "The horizontal stroke that connects two strokes or closes a counter, as in A, H, or e." },
  { label: "Crossbar", text: "The horizontal stroke that crosses a vertical stem, as in the middle of t or f." },
  { label: "Cap Height", text: "The height of capital letters, measured from the baseline to the cap line." },
  { label: "Ascender", text: "The part of a lowercase letter that rises above the mean line, as in b, d, h, k, or t." },
  { label: "Flag / Terminal", text: "A small, angular projection at the top of a stroke, as on the ascender of f or the top of the numeral 5." },
  { label: "Shoulder", text: "The curved stroke that arcs down from a stem, as in h, m, n, or R." },
  { label: "Bowl", text: "The curved stroke that encloses a counter, as in b, d, p, R, or Q." },
  { label: "Leg", text: "The diagonal stroke extending downward from a letter's stem, as in R or K." },
  { label: "Juncture", text: "The point where two strokes meet or cross, as where R's leg meets its bowl." },
  { label: "Bracket", text: "The curved transition between a serif and the stroke it joins." },
  { label: "Eye “e”", text: "The enclosed counter at the top of a lowercase e." },
  { label: "Spur", text: "The small projection at the base of some letters, as at the foot of G or the bowl of a." },
  { label: "Bowl / Counter", text: "The enclosed curved chamber of a rounded letter together with the open space it encloses, as in a." },
  { label: "Finial", text: "The tapered or curved stroke ending on a letter that isn't a serif, as at the tail of a." },
  { label: "Serif", text: "The small stroke finishing off the end of a letter's main stroke." },
  { label: "Terminal / Tail", text: "The tapered, curving end of a stroke, as the descender of y." },
  { label: "Descender", text: "The part of a letter that falls below the baseline, as in g, j, p, q, or y." },
  { label: "Tail", text: "The descending diagonal stroke that distinguishes a letter, as on Q." },
  { label: "Descent Line", text: "The guideline marking how far descenders extend below the baseline." },
  { label: "Arc of Stem", text: "The curved portion of a stem as it transitions into a shoulder or bowl, as in m." },
  { label: "Aperture", text: "The partial opening of a curved stroke, as the gap in c, e, or the top of m's arches." },
  { label: "Counter", text: "The enclosed or partially enclosed space inside a letterform, as inside o or g." },
  { label: "Link", text: "The stroke connecting the upper bowl to the lower loop in a two-story g." },
  { label: "Loop", text: "The lower bowl of a two-story g, hanging below the baseline." },
  { label: "Ear", text: "The small stroke projecting from the top-right of a lowercase g." },
  { label: "Arm", text: "The horizontal or upward-angled stroke that's attached at only one end, as in E, K, or v's opening." },
  { label: "Main Stroke", text: "The primary diagonal stroke forming the body of a letter, as in v." },
  { label: "Flag", text: "The small horizontal projection at the top of a numeral, as on 5." },
  { label: "Overshoot", text: "The slight amount a rounded or pointed letter extends past the baseline or cap line, so it looks optically aligned with flat-bottomed letters." },
  { label: "Apex", text: "The point at the top of a letter where two diagonal strokes meet, as in A or G's flag." },
  { label: "Swash", text: "The decorative, extended flourish replacing a terminal, common in italic or script letters." },
  { label: "Axis", text: "The angle implied by the thin points of a curved stroke, as in an italic s." },
];

async function initAnatomyPrimer(root) {
  root.innerHTML = `
    <div class="anatomy-primer">
      <div class="anatomy-primer-card">
        <div class="anatomy-primer-image-wrap" role="img" aria-label="Labeled diagram of letterform anatomy: stem, bowl, counter, ascender, descender, serif, bracket, terminal, x-height, cap height, and related terms.">
          <div class="anatomy-loading">Loading diagram…</div>
        </div>
      </div>
      <div class="anatomy-primer-glossary">
        <div class="visual-characteristics-heading">Reading the diagram</div>
        <ul class="visual-characteristics-list">
          ${ANATOMY_PRIMER_GLOSSARY.map((g) => `<li><b>${g.label}:</b> ${g.text}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  const wrap = root.querySelector(".anatomy-primer-image-wrap");

  // Inlining the raw SVG markup (rather than referencing it via <img src>)
  // is what keeps the magnifier lens sharp: attachMagnifier clones whatever
  // element it's given, and a cloned <img> is just the browser's already-
  // rasterized bitmap at its displayed size — scaling that 2.8x blurs small
  // labels. Cloned inline <svg> stays true vector at any zoom.
  const svgText = await fetch("images/anatomy_r7.svg").then((r) => r.text());
  wrap.innerHTML = svgText;
  const svg = wrap.querySelector("svg");
  svg.classList.add("anatomy-primer-image");

  function attach() {
    attachMagnifier(wrap, svg);
  }
  attach();

  // detail.close() fires on every tab switch (to dismiss any open
  // classification detail) and unconditionally nukes every .anatomy-lens
  // in the page, including this one — it doesn't distinguish whose lens
  // it is. Re-attach whenever this tab is clicked so the lens comes back.
  // Deferred via setTimeout so it runs after every other click listener on
  // the same tab button (including main.js's detail.close() call) rather
  // than depending on which listener happened to be registered first.
  const tab = document.querySelector('.tab[data-view="anatomy"]');
  tab?.addEventListener("click", () => setTimeout(attach, 0));
}
