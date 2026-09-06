const MAGNIFIER_SIZE = 170;
const MAGNIFIER_ZOOM = 2.8;

function removeExistingLens() {
  document.querySelectorAll(".anatomy-lens").forEach((el) => el.remove());
}

function attachMagnifier(wrapEl, svgEl) {
  removeExistingLens();
  if (!wrapEl || !svgEl) return;

  // Touch devices already have native pinch-to-zoom, and the lens's own
  // touchstart handler used preventDefault() to implement tap-to-open,
  // which fought that native gesture. Skip the custom lens entirely there.
  //
  // any-hover/any-pointer, not hover/pointer: on a hybrid touchscreen +
  // mouse laptop, plain hover/pointer track whichever input was used most
  // recently — touch the screen once and hover/pointer report none/coarse
  // even with a mouse sitting right there. any-hover/any-pointer ask "does
  // ANY attached input support this", which is the actual capability
  // question we want, independent of what was last touched.
  if (window.matchMedia("(any-hover: none) and (any-pointer: coarse)").matches) return;

  const lens = document.createElement("div");
  lens.className = "anatomy-lens";
  lens.style.width = MAGNIFIER_SIZE + "px";
  lens.style.height = MAGNIFIER_SIZE + "px";

  const inner = document.createElement("div");
  inner.className = "anatomy-lens-inner";
  const clone = svgEl.cloneNode(true);
  const svgRect = svgEl.getBoundingClientRect();
  clone.style.width = svgRect.width + "px";
  clone.style.height = svgRect.height + "px";
  inner.appendChild(clone);
  lens.appendChild(inner);
  document.body.appendChild(lens);

  const half = MAGNIFIER_SIZE / 2;

  function moveLens(clientX, clientY) {
    const rect = wrapEl.getBoundingClientRect();
    const x = clientX - rect.left + wrapEl.scrollLeft;
    const y = clientY - rect.top + wrapEl.scrollTop;

    lens.style.left = clientX - half + "px";
    lens.style.top = clientY - half + "px";

    inner.style.transformOrigin = "0 0";
    inner.style.transform = `translate(${half - MAGNIFIER_ZOOM * x}px, ${half - MAGNIFIER_ZOOM * y}px) scale(${MAGNIFIER_ZOOM})`;
  }

  wrapEl.addEventListener("mouseenter", () => {
    lens.classList.add("is-visible");
  });
  wrapEl.addEventListener("mouseleave", () => {
    lens.classList.remove("is-visible");
  });
  wrapEl.addEventListener("mousemove", (e) => {
    moveLens(e.clientX, e.clientY);
  });
}
