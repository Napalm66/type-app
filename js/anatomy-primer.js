const ANATOMY_PRIMER_GLOSSARY = [
  { label: "Cap height / baseline", text: "The height of capital letters, measured from the baseline they sit on up to the cap line." },
  { label: "X-height", text: "The height of lowercase letters without ascenders or descenders — x, a, o, e — measured against the cap height." },
  { label: "Ascender / Descender", text: "Strokes that rise above the mean line (as in b, d, h) or fall below the baseline (as in g, p, y)." },
  { label: "Stress", text: "The angle of the thinnest points around a curved stroke, like inside an “o”. Vertical stress reads as engineered; oblique stress reads as handwritten." },
  { label: "Contrast", text: "The difference in weight between a letterform's thick and thin strokes." },
  { label: "Terminals", text: "Where a stroke ends without connecting to another stroke — the tip of a lowercase t or a, for example." },
  { label: "Serif structure", text: "Bracketed serifs curve into the stem, unbracketed serifs meet it sharply, slab serifs are thick and square — some letterforms have no serif at all." },
  { label: "Set width", text: "How wide or narrow characters sit relative to their height." },
  { label: "Counters", text: "The enclosed or partially enclosed space inside a letterform, like inside an o or e — more open counters read lighter overall." },
];

function initAnatomyPrimer(root) {
  root.innerHTML = `
    <div class="anatomy-primer">
      <div class="anatomy-primer-card">
        <div class="anatomy-primer-image-wrap">
          <img
            class="anatomy-primer-image"
            src="images/anatomy_r5-01.svg"
            alt="Labeled diagram of letterform anatomy: stem, bowl, counter, ascender, descender, serif, bracket, terminal, x-height, cap height, and related terms."
          />
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
  const img = wrap.querySelector("img");

  function attach() {
    attachMagnifier(wrap, img);
  }

  if (img.complete) attach();
  else img.addEventListener("load", attach, { once: true });

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
