function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initPractice(root) {
  const TOTAL = CLASSIFICATIONS.length;

  let deck = [];
  let score = { correct: 0, total: 0 };
  let streak = 0;
  let bestStreak = 0;
  let current = null; // { item, options, answered, selectedId }

  function newRound() {
    deck = shuffle(CLASSIFICATIONS.map((c) => c.id));
    score = { correct: 0, total: 0 };
    streak = 0;
    nextQuestion();
  }

  function nextQuestion() {
    if (deck.length === 0) {
      current = null;
      renderSummary();
      return;
    }
    const correctId = deck.shift();
    const item = getById(correctId);
    const distractorPool = CLASSIFICATIONS.filter((c) => c.id !== correctId);
    const distractors = shuffle(distractorPool).slice(0, 3);
    const options = shuffle([item, ...distractors]);
    current = { item, options, answered: false, selectedId: null };
    renderQuestion();
  }

  function choose(id) {
    if (current.answered) return;
    current.answered = true;
    current.selectedId = id;
    score.total += 1;
    if (id === current.item.id) {
      score.correct += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
    } else {
      streak = 0;
    }
    renderQuestion();
  }

  function explanationFor(item) {
    if (item.diagnostics && item.diagnostics.tell) return item.diagnostics.tell;
    return item.description.split(". ")[0] + ".";
  }

  function renderQuestion() {
    const posInRound = score.total + (current.answered ? 0 : 1);

    const optionsHTML = current.options
      .map((opt) => {
        let cls = "practice-option";
        if (current.answered) {
          if (opt.id === current.item.id) cls += " is-correct";
          else if (opt.id === current.selectedId) cls += " is-incorrect";
          else cls += " is-disabled";
        }
        return `<button class="${cls}" data-id="${opt.id}" ${current.answered ? "disabled" : ""}>${opt.name}</button>`;
      })
      .join("");

    const feedbackHTML = current.answered
      ? `
      <div class="practice-feedback ${current.selectedId === current.item.id ? "is-correct" : "is-incorrect"}">
        <div class="practice-feedback-label">${current.selectedId === current.item.id ? "Correct" : `Not quite — it's ${current.item.name}`}</div>
        <p class="practice-feedback-text">${explanationFor(current.item)}</p>
      </div>
      <button class="practice-next">${deck.length === 0 ? "See results" : "Next"} &rarr;</button>
    `
      : "";

    root.innerHTML = `
      <div class="quiz-card practice-card">
        <div class="practice-meta">
          <span class="practice-progress-text">Question ${posInRound} of ${TOTAL}</span>
          <span class="practice-score">Score ${score.correct}/${score.total}${streak > 1 ? ` &middot; streak ${streak}` : ""}</span>
        </div>
        <div class="practice-specimen">${renderSpecimenHTML(current.item, "quizResult")}</div>
        <p class="practice-hint">Which classification is this?</p>
        <div class="practice-options">${optionsHTML}</div>
        ${feedbackHTML}
      </div>
    `;

    root.querySelectorAll(".practice-option").forEach((btn) => {
      btn.addEventListener("click", () => choose(btn.dataset.id));
    });
    root.querySelector(".practice-next")?.addEventListener("click", nextQuestion);
  }

  function renderSummary() {
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    root.innerHTML = `
      <div class="quiz-card practice-card practice-summary">
        <div class="practice-summary-label">Round complete</div>
        <div class="practice-summary-score">${score.correct} / ${score.total}</div>
        <p class="practice-summary-detail">${pct}% correct &middot; best streak ${bestStreak}</p>
        <button class="practice-next" id="practice-again">Play again &rarr;</button>
      </div>
    `;
    root.querySelector("#practice-again").addEventListener("click", newRound);
  }

  newRound();
}
