// Guess-the-classification game, flipped from name-recall to visual
// recognition: the round names a target classification as plain text,
// and four big square tiles show each candidate's example - a real photo
// once one's supplied (js/data.js: examples[].image), otherwise the
// prompt describing what visual detail to look for (and what to go
// photograph). Either way it's unlabeled until answering, so picking
// correctly takes actually recognizing the look, not reading a name.
// Each classification carries two examples so repeat rounds don't always
// show the same prompt/photo. Names reveal only after answering,
// alongside the target's key tell to learn from.
//
// Distractors are picked to make the guess genuinely test knowledge, not
// just "does this look nothing alike": same-branch classifications (the
// ones actually easy to confuse - Venetian/Garalde/Transitional/Modern/
// Slab, or Grotesque/Neo-Grotesque/Geometric/Humanist) are preferred
// before falling back to any other classification. Blackletter, Glyphic,
// Script, and Display have no branch siblings, so their rounds always
// pull unrelated distractors - which is fine, since those four are
// meant to be immediately recognizable by silhouette alone.
function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildChoices(item) {
  const sameBranch = shuffle(CLASSIFICATIONS.filter((c) => c.id !== item.id && c.branch === item.branch));
  const others = shuffle(CLASSIFICATIONS.filter((c) => c.id !== item.id && c.branch !== item.branch));
  const distractors = [...sameBranch, ...others].slice(0, 3);
  return shuffle([item, ...distractors]);
}

function initIdentify(root, onOpenDetail) {
  let deck = shuffle(CLASSIFICATIONS.map((c) => c.id));
  let deckIndex = 0;
  let score = 0;
  let roundsPlayed = 0;
  let roundItem = null; // the named target classification
  let roundChoices = []; // 4 candidates, shuffled, includes the target
  let roundExamples = {}; // candidate id -> the example {prompt, image} picked for this round
  let selectedId = null;

  function startRound() {
    if (deckIndex >= deck.length) {
      deck = shuffle(CLASSIFICATIONS.map((c) => c.id));
      deckIndex = 0;
    }
    roundItem = getById(deck[deckIndex]);
    roundChoices = buildChoices(roundItem);
    // Each classification carries two examples (js/data.js) - a different
    // one is picked at random per round so the same classification's
    // square doesn't always show the same prompt/photo on repeat rounds.
    roundExamples = {};
    roundChoices.forEach((c) => {
      const list = c.examples && c.examples.length ? c.examples : [{ prompt: "", image: null }];
      roundExamples[c.id] = list[Math.floor(Math.random() * list.length)];
    });
    selectedId = null;
    render();
  }

  function choose(id) {
    if (selectedId) return; // already answered this round
    selectedId = id;
    roundsPlayed++;
    if (id === roundItem.id) score++;
    render();
  }

  function next() {
    deckIndex++;
    startRound();
  }

  function restart() {
    deck = shuffle(CLASSIFICATIONS.map((c) => c.id));
    deckIndex = 0;
    score = 0;
    roundsPlayed = 0;
    startRound();
  }

  // Shows the round's chosen example for this candidate: a real photo
  // once one exists (image on that example in js/data.js), or - until
  // then - the prompt text describing what to look for (and what to go
  // photograph), never the classification's own name.
  function quizChoiceImageHTML(c) {
    const example = roundExamples[c.id] || {};
    const bg = example.image ? ` style="background-image:url('${example.image}')"` : "";
    const prompt = !example.image && example.prompt ? `<span class="quiz-game-choice-prompt">${example.prompt}</span>` : "";
    return `<span class="quiz-game-choice-image"${bg}>${prompt}</span>`;
  }

  function renderChoices() {
    return `
      <div class="quiz-game-choices">
        ${roundChoices
          .map((c) => {
            let state = "";
            if (selectedId) {
              if (c.id === roundItem.id) state = "is-correct";
              else if (c.id === selectedId) state = "is-incorrect";
            }
            return `
              <button class="quiz-game-choice ${state}" data-id="${c.id}" ${selectedId ? "disabled" : ""}>
                ${quizChoiceImageHTML(c)}
                ${selectedId ? `<span class="quiz-game-choice-name">${c.name}</span>` : ""}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderFeedback() {
    const correct = selectedId === roundItem.id;
    return `
      <div class="quiz-game-feedback ${correct ? "is-correct" : "is-incorrect"}">
        <div class="quiz-game-feedback-label">${correct ? "Correct" : "Not quite"}</div>
        ${
          roundItem.diagnostics
            ? `<div class="tell-box"><strong>Key tell</strong>${roundItem.diagnostics.tell}</div>`
            : `<p class="quiz-game-tagline">${roundItem.tagline}</p>`
        }
        <div class="quiz-nav">
          <button class="quiz-view-full-inline">View full diagnostic &rarr;</button>
          <button class="quiz-game-next">Next &rarr;</button>
        </div>
      </div>
    `;
  }

  function render() {
    root.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-score-bar">
          <span class="quiz-score">Score <strong>${score}</strong> / ${roundsPlayed}</span>
          <button class="quiz-restart">Restart</button>
        </div>
        <p class="quiz-game-prompt">Which one is <strong>${roundItem.name}</strong>?</p>
        ${renderChoices()}
        ${selectedId ? renderFeedback() : ""}
      </div>
    `;

    root.querySelector(".quiz-restart").addEventListener("click", restart);
    root.querySelectorAll(".quiz-game-choice").forEach((btn) => {
      btn.addEventListener("click", () => choose(btn.dataset.id));
    });
    root.querySelector(".quiz-game-next")?.addEventListener("click", next);
    root.querySelector(".quiz-view-full-inline")?.addEventListener("click", () => onOpenDetail?.(roundItem.id));
  }

  startRound();
}
