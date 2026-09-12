const NODES = {
  start: {
    question: "What's the broad structure of the letterforms?",
    hint: "Start with the biggest visual split you can see.",
    options: [
      { label: "Has serifs", desc: "Small finishing strokes at the ends of the main stems.", next: "serif-contrast" },
      { label: "No serifs (sans)", desc: "Clean stroke ends, nothing finishing them off.", next: "sans-construction" },
      { label: "Broken, angular, medieval-looking", desc: "Dense and gothic, drawn with a broad pen.", next: "blackletter" },
      { label: "Looks like handwriting", desc: "Connected or flowing strokes, like a signature.", next: "script" },
      { label: "Looks carved or chiseled in stone", desc: "Small flared wedges, a monumental feel.", next: "glyphic" },
      { label: "Extremely decorative or novelty", desc: "Built to grab attention, not for reading paragraphs.", next: "display" },
    ],
  },
  "serif-contrast": {
    question: "How much contrast is there between thick and thin strokes?",
    hint: "Look at a lowercase ‘o’ — compare its sides to its top and bottom.",
    options: [
      { label: "None to very low", desc: "Strokes stay close to one even weight.", value: { contrast: "low" }, next: "serif-axis" },
      { label: "Medium", desc: "A noticeable but not extreme difference.", value: { contrast: "medium" }, next: "serif-axis" },
      { label: "High / dramatic", desc: "Very thick stems next to hairline-thin strokes.", value: { contrast: "high" }, next: "serif-axis" },
    ],
  },
  "serif-axis": {
    question: "Which way does the stress lean?",
    hint: "On a lowercase ‘o’, find the two thinnest points and imagine a line through them.",
    options: [
      { label: "Strongly diagonal", desc: "As if drawn with a broad pen tilted hard left.", value: { axis: "oblique-strong" }, next: "serif-shape" },
      { label: "Slightly diagonal", desc: "A gentler lean, not fully vertical.", value: { axis: "oblique-moderate" }, next: "serif-shape" },
      { label: "Perfectly vertical", desc: "The thin points sit directly at top and bottom.", value: { axis: "vertical" }, next: "serif-shape" },
    ],
  },
  "serif-shape": {
    question: "What do the serifs themselves look like?",
    hint: "Zoom in on where a stem meets its serif.",
    options: [
      { label: "Thick, squared-off slabs", desc: "Nearly as heavy as the stem, barely tapering.", value: { serif: "slab" }, next: "serif-result" },
      { label: "Smooth, curved bracket", desc: "Eases gradually from stem into serif.", value: { serif: "bracketed-robust" }, next: "serif-result" },
      { label: "Sharp, narrow bracket", desc: "A thinner, more precise curve than ‘smooth’.", value: { serif: "bracketed-sharp" }, next: "serif-result" },
      { label: "No bracket — hairline", desc: "Serif meets the stem at a sharp, unblended angle.", value: { serif: "unbracketed-hairline" }, next: "serif-result" },
    ],
  },
  "sans-construction": {
    question: "How do the letters seem to be built?",
    hint: "Think about where the design's underlying logic comes from.",
    options: [
      { label: "Slightly irregular, a bit quirky", desc: "19th-century poster feel; not perfectly systematic.", value: { sans: "grotesque" }, next: "sans-result" },
      { label: "Very neutral and uniform", desc: "Tight, engineered, mid-century corporate feel.", value: { sans: "neo-grotesque" }, next: "sans-result" },
      { label: "Built from simple geometric shapes", desc: "Near-perfect circles and triangles; single-story ‘a’.", value: { sans: "geometric" }, next: "sans-result" },
      { label: "Calligraphic, open, warm", desc: "Feels like a serif face with the serifs removed.", value: { sans: "humanist-sans" }, next: "sans-result" },
    ],
  },
};

const DIRECT_RESULTS = {
  blackletter: "blackletter",
  script: "script",
  glyphic: "glyphic",
  display: "display",
};

// A small visual cue per quiz option, so each choice can be read at a
// glance instead of purely from its label. Two kinds are used:
// - A live font sample (reusing the app's own classification fontStacks)
//   wherever an option already corresponds to one real classification -
//   the same "show the real thing" approach the rest of the app uses,
//   not an invented icon language.
// - A small parametric SVG for the two questions that aren't about a
//   whole classification but a single visual property of one glyph
//   (stroke contrast, stress axis, serif shape) - contrast/axis reuse one
//   generator (a ring whose thin axis rotates and narrows), serif shape
//   reuses serifShapePath()/SERIF_VB_W/SERIF_VB_H, already defined in
//   detail.js for the serif-shape spectrum shown there.
const QUIZ_CUE_AXIS_DEGREES = { "oblique-strong": 34, "oblique-moderate": 20, vertical: 0 };
const QUIZ_CUE_CONTRAST_VALUES = { low: 0, medium: 2, high: 3 };
// Real classifications from SERIF_SPECTRUM (detail.js, shown in Explore's
// detail modal) stand in for each quiz option, rather than one-off
// presets invented just for this question - venetian and garalde share
// the same "bracketed-robust" diagnostic, so either represents that
// option; venetian is used since it's the first oldstyle in the array.
const QUIZ_CUE_SERIF_SHAPE_IDS = {
  slab: "slab",
  "bracketed-robust": "venetian",
  "bracketed-sharp": "transitional",
  "unbracketed-hairline": "modern",
};
const QUIZ_CUE_START_IDS = {
  "serif-contrast": "garalde",
  "sans-construction": "neo-grotesque",
  blackletter: "blackletter",
  script: "script",
  glyphic: "glyphic",
  display: "display",
};

// The same sample word Explore/the detail modal shows for this
// classification (its name's first word - deriveAnatomyWord, from
// anatomy.js), not a generic "Ag" placeholder.
function quizFontCueHTML(item) {
  if (!item) return "";
  return `<span class="quiz-cue-font" style="font-family:${item.fontStack};" aria-hidden="true">${escapeHtml(deriveAnatomyWord(item.name))}</span>`;
}

// A ring (outer circle minus an inner ellipse) standing in for an "O".
// With no contrast the inner ellipse is a circle too, so the ring reads
// as an even, monoline stroke. As contrast increases, the inner ellipse
// stretches along the stress axis - narrowing the ring there (thin) while
// widening it 90° away (thick) - then the whole ellipse rotates to the
// given stress angle. Two questions (contrast, then axis) share this one
// generator, each fixing the other's value to isolate what it's asking.
//
// Rotation is negated to match anatomy.js's own stress-axis convention
// (see its stressSVG: positive axisDeg there plots the line from
// upper-left to lower-right, i.e. "tilted left" at the top) - plain
// SVG rotate() turns the other way (positive = top tilts right), so
// without the negation every oblique option pointed the wrong way.
function quizContrastAxisSVG(contrastValue, axisDeg) {
  const size = 60;
  const c = size / 2;
  const outerR = size * 0.37;
  const base = size * 0.12;
  const thick = base + contrastValue * (size * 0.06);
  const thin = Math.max(size * 0.012, base - contrastValue * (size * 0.038));
  const innerRy = outerR - thin;
  const innerRx = outerR - thick;
  return `
    <svg viewBox="0 0 ${size} ${size}" class="quiz-cue-svg" aria-hidden="true">
      <circle cx="${c}" cy="${c}" r="${outerR}" class="quiz-cue-ring-outer" />
      <ellipse cx="${c}" cy="${c}" rx="${innerRx}" ry="${innerRy}" transform="rotate(${-axisDeg} ${c} ${c})" class="quiz-cue-ring-inner" />
    </svg>
  `;
}

function quizSerifShapeSVG(serifKey) {
  const id = QUIZ_CUE_SERIF_SHAPE_IDS[serifKey];
  const spec = id && SERIF_SPECTRUM.find((s) => s.id === id);
  if (!spec) return "";
  return `
    <svg viewBox="${serifSpectrumViewBox(spec)}" class="quiz-cue-serif-svg" aria-hidden="true">
      <path d="${spec.path || serifShapePath(spec)}" />
    </svg>
  `;
}

function quizOptionCueHTML(nodeId, opt) {
  if (nodeId === "start") {
    const id = QUIZ_CUE_START_IDS[opt.next];
    return quizFontCueHTML(id && getById(id));
  }
  if (nodeId === "serif-contrast") {
    return quizContrastAxisSVG(QUIZ_CUE_CONTRAST_VALUES[opt.value.contrast], 0);
  }
  if (nodeId === "serif-axis") {
    return quizContrastAxisSVG(2, QUIZ_CUE_AXIS_DEGREES[opt.value.axis]);
  }
  if (nodeId === "serif-shape") {
    return quizSerifShapeSVG(opt.value.serif);
  }
  if (nodeId === "sans-construction") {
    return quizFontCueHTML(getById(opt.value.sans));
  }
  return "";
}

function resolveSerif({ contrast, axis, serif }) {
  if (serif === "slab") return "slab";
  if (serif === "unbracketed-hairline") return "modern";
  if (axis === "oblique-strong" && contrast === "low") return "venetian";
  if (axis === "oblique-strong" || axis === "oblique-moderate") return "garalde";
  if (axis === "vertical" && contrast === "high") return "modern";
  return "transitional";
}

function initIdentify(root, onOpenDetail) {
  let path = []; // { nodeId, answer }
  let answers = {};

  function currentNodeId() {
    if (path.length === 0) return "start";
    return path[path.length - 1].nextNode;
  }

  function choose(nodeId, option) {
    if (option.value) answers = { ...answers, ...option.value };
    path.push({ nodeId, label: option.label, nextNode: option.next });
    render();
  }

  function back() {
    path.pop();
    render();
  }

  function restart() {
    path = [];
    answers = {};
    render();
  }

  function render() {
    const nodeId = currentNodeId();

    if (nodeId === "serif-result") {
      renderResult(resolveSerif(answers));
      return;
    }
    if (nodeId === "sans-result") {
      renderResult(answers.sans);
      return;
    }
    if (DIRECT_RESULTS[nodeId]) {
      renderResult(DIRECT_RESULTS[nodeId]);
      return;
    }

    const node = NODES[nodeId];
    renderQuestion(nodeId, node);
  }

  function progressDots() {
    const total = 4;
    const done = Math.min(path.length, total);
    return Array.from({ length: total })
      .map((_, i) => `<div class="quiz-progress-dot ${i < done ? "is-done" : ""}"></div>`)
      .join("");
  }

  function renderQuestion(nodeId, node) {
    root.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">${progressDots()}</div>
        <h3 class="quiz-question">${node.question}</h3>
        <p class="quiz-hint">${node.hint}</p>
        <div class="quiz-options">
          ${node.options
            .map(
              (opt, i) => `
            <button class="quiz-option" data-index="${i}">
              <span class="quiz-option-cue">${quizOptionCueHTML(nodeId, opt)}</span>
              <span class="quiz-option-text">
                <span class="quiz-option-label">${opt.label}</span>
                <span class="quiz-option-desc">${opt.desc}</span>
              </span>
            </button>`
            )
            .join("")}
        </div>
        <div class="quiz-nav">
          <button class="quiz-back" ${path.length === 0 ? "disabled style='visibility:hidden'" : ""}>&larr; Back</button>
          <button class="quiz-restart">Start over</button>
        </div>
      </div>
    `;

    root.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const opt = node.options[Number(btn.dataset.index)];
        choose(nodeId, opt);
      });
    });
    root.querySelector(".quiz-back")?.addEventListener("click", back);
    root.querySelector(".quiz-restart")?.addEventListener("click", restart);
  }

  function renderResult(id) {
    const item = getById(id);
    if (!item) {
      root.innerHTML = `<p>Couldn't resolve a classification — <button class="quiz-restart">try again</button>.</p>`;
      root.querySelector(".quiz-restart")?.addEventListener("click", restart);
      return;
    }
    const trail = path.map((p) => p.label).join(" &rsaquo; ");

    root.innerHTML = `
      <div class="quiz-card quiz-result">
        <div class="quiz-progress">${progressDots()}</div>
        <div class="quiz-result-label">Likely classification</div>
        <h3 class="quiz-result-name">${item.name}</h3>
        <div class="quiz-result-specimen">${renderSpecimenHTML(item, "quizResult")}</div>
        <div class="quiz-trail">Your path: <span>${trail}</span></div>
        ${item.diagnostics ? `<div class="tell-box"><strong>Key tell</strong>${item.diagnostics.tell}</div>` : ""}
        <p class="detail-description">${item.description}</p>
        <p class="key-typefaces"><b>Reference typefaces:</b> ${item.keyTypefaces.join(", ")}</p>
        <button class="quiz-view-full">View full diagnostic &rarr;</button>
        <div class="quiz-nav">
          <button class="quiz-back">&larr; Back</button>
          <button class="quiz-restart">Start over</button>
        </div>
      </div>
    `;
    root.querySelector(".quiz-back")?.addEventListener("click", back);
    root.querySelector(".quiz-restart")?.addEventListener("click", restart);
    root.querySelector(".quiz-view-full")?.addEventListener("click", () => onOpenDetail?.(id));
  }

  render();
}
