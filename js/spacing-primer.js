// Interactive teaching section on horizontal/vertical spacing, living
// inside the Anatomy tab alongside the letterform-anatomy glossary
// (extends that tab's existing terminology-reference role rather than
// adding a whole new view). Two small reusable wiring helpers drive
// six otherwise-identical control cards - a slider for continuous CSS
// properties (tracking, leading, baseline shift), a real switch for
// binary ones (kerning, indent, paragraph spacing) - rather than six
// hand-rolled listeners.

function spacingWireSlider({ input, readout, format, onInput }) {
  const update = () => {
    const value = parseFloat(input.value);
    readout.textContent = format(value);
    onInput(value);
  };
  input.addEventListener("input", update);
  update(); // sync specimen + readout to the input's starting value
}

function spacingWireToggle({ button, readout, labelOn, labelOff, onToggle }) {
  const setState = (on) => {
    button.setAttribute("aria-checked", String(on));
    readout.textContent = on ? labelOn : labelOff;
    onToggle(on);
  };
  let on = button.getAttribute("aria-checked") === "true";
  button.addEventListener("click", () => {
    on = !on;
    setState(on);
  });
  setState(on); // sync specimen + readout to the button's starting aria-checked
}

function initSpacingPrimer(root) {
  root.innerHTML = `
    <div class="spacing-primer">

      <div class="spacing-group">
        <div class="spacing-group-heading">
          <svg class="spacing-group-icon" viewBox="0 0 20 12" aria-hidden="true">
            <line x1="1" y1="6" x2="19" y2="6" />
            <line x1="1" y1="2" x2="1" y2="10" />
            <line x1="19" y1="2" x2="19" y2="10" />
          </svg>
          Horizontal spacing
        </div>

        <div class="spacing-card-grid">

          <div class="spacing-card">
            <h3 class="spacing-card-title">Kerning</h3>
            <p class="spacing-card-def">Kerning adjusts the space between one specific letter pair — like A/V, T/o, or W/a — where their natural shapes would otherwise leave an uneven gap. It works pair by pair, not evenly across a whole word like tracking does.</p>
            <div class="spacing-specimen-wrap">
              <span class="spacing-specimen spacing-specimen--large" id="spacing-specimen-kerning">AV</span>
            </div>
            <div class="spacing-control">
              <div class="spacing-control-row">
                <label class="spacing-control-label" for="spacing-slider-kerning">Kerning</label>
                <span class="spacing-readout" id="spacing-readout-kerning">-0.05em</span>
              </div>
              <input type="range" class="spacing-slider" id="spacing-slider-kerning"
                min="-0.15" max="0.15" step="0.01" value="-0.05"
                aria-describedby="spacing-readout-kerning" />
            </div>
          </div>

          <div class="spacing-card">
            <h3 class="spacing-card-title">Tracking</h3>
            <p class="spacing-card-def">Tracking adds or removes a uniform amount of space across an entire run of letters, loosening or tightening a whole word or line rather than any one pair. It's most often applied to full capitals, where the extra air keeps letters from crowding.</p>
            <div class="spacing-specimen-wrap">
              <span class="spacing-specimen spacing-specimen--large" id="spacing-specimen-tracking">WIDE OPEN</span>
            </div>
            <div class="spacing-control">
              <div class="spacing-control-row">
                <label class="spacing-control-label" for="spacing-slider-tracking">Tracking</label>
                <span class="spacing-readout" id="spacing-readout-tracking">+0.00em</span>
              </div>
              <input type="range" class="spacing-slider" id="spacing-slider-tracking"
                min="-0.05" max="0.3" step="0.01" value="0"
                aria-describedby="spacing-readout-tracking" />
            </div>
          </div>

          <div class="spacing-card">
            <h3 class="spacing-card-title">Indent / Tab</h3>
            <p class="spacing-card-def">A tab indent pushes a single line in from the margin, without adding any space above it — the same mark a grocery list uses to show a note belongs to the item above it, not a new entry of its own.</p>
            <p class="spacing-card-hint">Compare with Paragraph Breaks below — most typography uses one convention or the other, not both.</p>
            <div class="spacing-specimen-wrap">
              <ul class="spacing-specimen spacing-list" id="spacing-specimen-indent">
                <li class="spacing-list-item">Milk</li>
                <li class="spacing-list-item">Eggs</li>
                <li class="spacing-list-item">Bread</li>
                <li class="spacing-list-item" id="spacing-indent-target">— wholemeal, if they have it</li>
                <li class="spacing-list-item">Butter</li>
              </ul>
            </div>
            <div class="spacing-control">
              <div class="spacing-control-row">
                <span class="spacing-control-label" id="spacing-label-indent">Indent</span>
                <span class="spacing-readout" id="spacing-readout-indent">ON</span>
              </div>
              <button type="button" class="spacing-toggle" id="spacing-toggle-indent"
                role="switch" aria-checked="true" aria-labelledby="spacing-label-indent">
                <span class="spacing-toggle-track"><span class="spacing-toggle-thumb"></span></span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div class="spacing-group">
        <div class="spacing-group-heading">
          <svg class="spacing-group-icon" viewBox="0 0 12 20" aria-hidden="true">
            <line x1="6" y1="1" x2="6" y2="19" />
            <line x1="2" y1="1" x2="10" y2="1" />
            <line x1="2" y1="19" x2="10" y2="19" />
          </svg>
          Vertical spacing
        </div>

        <div class="spacing-card-grid">

          <div class="spacing-card">
            <h3 class="spacing-card-title">Leading</h3>
            <p class="spacing-card-def">Leading is the vertical distance between the baselines of consecutive lines, named for the strips of lead metal compositors once inserted between lines of type. Set too tight, lines crowd the reader's eye; set too loose, each line reads like its own island.</p>
            <div class="spacing-specimen-wrap">
              <p class="spacing-specimen spacing-specimen--paragraph" id="spacing-specimen-leading" style="line-height:1.5;">Typeset a paragraph too tight, and its lines start to crowd the reader's eye. Set it too loose, and each line reads like its own island, and the paragraph loses its shape.</p>
            </div>
            <div class="spacing-control">
              <div class="spacing-control-row">
                <label class="spacing-control-label" for="spacing-slider-leading">Leading</label>
                <span class="spacing-readout" id="spacing-readout-leading">1.50</span>
              </div>
              <input type="range" class="spacing-slider" id="spacing-slider-leading"
                min="1.0" max="2.5" step="0.05" value="1.5"
                aria-describedby="spacing-readout-leading" />
            </div>
          </div>

          <div class="spacing-card">
            <h3 class="spacing-card-title">Baseline shift</h3>
            <p class="spacing-card-def">Baseline shift moves a piece of text up or down relative to the invisible line the rest of its line rests on, without changing its type size — the mechanism behind superscripts, subscripts, and footnote markers.</p>
            <div class="spacing-specimen-wrap">
              <p class="spacing-specimen spacing-specimen--paragraph" id="spacing-specimen-baseline">The chemical formula for water is H<span class="spacing-baseline-target" id="spacing-baseline-target">2</span>O — moving that figure off the baseline is what makes it read as a subscript.</p>
            </div>
            <div class="spacing-control">
              <div class="spacing-control-row">
                <label class="spacing-control-label" for="spacing-slider-baseline">Baseline shift</label>
                <span class="spacing-readout" id="spacing-readout-baseline">0.00em</span>
              </div>
              <input type="range" class="spacing-slider" id="spacing-slider-baseline"
                min="-0.5" max="0.5" step="0.05" value="0"
                aria-describedby="spacing-readout-baseline" />
            </div>
          </div>

          <div class="spacing-card">
            <h3 class="spacing-card-title">Paragraph breaks</h3>
            <p class="spacing-card-def">Paragraph spacing marks a new paragraph by inserting vertical space between blocks of text instead of indenting the first line — the convention most web and app text uses today, in place of print's traditional indent.</p>
            <p class="spacing-card-hint">Compare with Indent / Tab above — the other common convention for marking a new paragraph.</p>
            <div class="spacing-specimen-wrap">
              <div class="spacing-specimen spacing-paragraphs" id="spacing-specimen-parabreak">
                <p class="spacing-para">A paragraph break signals a shift in thought, a place for the reader's eye to rest before the next idea begins.</p>
                <p class="spacing-para" id="spacing-parabreak-target">Paragraph spacing marks that shift by opening a gap above the new paragraph, without indenting its first line.</p>
              </div>
            </div>
            <div class="spacing-control">
              <div class="spacing-control-row">
                <span class="spacing-control-label" id="spacing-label-parabreak">Paragraph spacing</span>
                <span class="spacing-readout" id="spacing-readout-parabreak">ON</span>
              </div>
              <button type="button" class="spacing-toggle" id="spacing-toggle-parabreak"
                role="switch" aria-checked="true" aria-labelledby="spacing-label-parabreak">
                <span class="spacing-toggle-track"><span class="spacing-toggle-thumb"></span></span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  // A two-letter specimen adjusted directly via letter-spacing, the
  // same mechanism Tracking uses below - the difference is scope, not
  // mechanism: kerning corrects one specific pair, tracking spreads a
  // uniform adjustment across a whole run of letters. Using the real
  // letter-spacing property (rather than the font-kerning property, whose
  // effect depends on both the font's own kerning table and the
  // browser's support for it) also guarantees a reliably visible result
  // regardless of environment.
  spacingWireSlider({
    input: root.querySelector("#spacing-slider-kerning"),
    readout: root.querySelector("#spacing-readout-kerning"),
    format: (v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}em`,
    onInput: (v) => {
      root.querySelector("#spacing-specimen-kerning").style.letterSpacing = `${v}em`;
    },
  });

  spacingWireSlider({
    input: root.querySelector("#spacing-slider-tracking"),
    readout: root.querySelector("#spacing-readout-tracking"),
    format: (v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}em`,
    onInput: (v) => {
      root.querySelector("#spacing-specimen-tracking").style.letterSpacing = `${v}em`;
    },
  });

  spacingWireToggle({
    button: root.querySelector("#spacing-toggle-indent"),
    readout: root.querySelector("#spacing-readout-indent"),
    labelOn: "ON",
    labelOff: "OFF",
    onToggle: (on) => {
      root.querySelector("#spacing-indent-target").style.textIndent = on ? "1.5em" : "0";
    },
  });

  spacingWireSlider({
    input: root.querySelector("#spacing-slider-leading"),
    readout: root.querySelector("#spacing-readout-leading"),
    format: (v) => v.toFixed(2),
    onInput: (v) => {
      root.querySelector("#spacing-specimen-leading").style.lineHeight = String(v);
    },
  });

  // Slider follows typographic convention (positive = up), so the CSS
  // translateY (positive = down) gets the sign flipped.
  spacingWireSlider({
    input: root.querySelector("#spacing-slider-baseline"),
    readout: root.querySelector("#spacing-readout-baseline"),
    format: (v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}em`,
    onInput: (v) => {
      root.querySelector("#spacing-baseline-target").style.transform = `translateY(${(-v).toFixed(2)}em)`;
    },
  });

  spacingWireToggle({
    button: root.querySelector("#spacing-toggle-parabreak"),
    readout: root.querySelector("#spacing-readout-parabreak"),
    labelOn: "ON",
    labelOff: "OFF",
    onToggle: (on) => {
      root.querySelector("#spacing-parabreak-target").style.marginTop = on ? "1em" : "0";
    },
  });
}
