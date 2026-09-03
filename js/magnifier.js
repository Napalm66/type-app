const MAGNIFIER_SIZE = 170;
const MAGNIFIER_ZOOM = 2.8;

function removeExistingLens() {
  document.querySelectorAll(".anatomy-lens").forEach((el) => el.remove());
}

function attachMagnifier(wrapEl, svgEl) {
  removeExistingLens();
  if (!wrapEl || !svgEl) return;

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

  // Mobile: tap once to open (centered on that tap), drag with a
  // continuous touch to reposition, tap once more (a touch that doesn't
  // move) to close. A drag never closes the lens; only a stationary tap
  // on an already-open lens does.
  const TAP_MOVE_THRESHOLD = 8;
  let isOpen = false;
  let wasOpenAtGestureStart = false;
  let touchMoved = false;
  let dragStartX = 0;
  let dragStartY = 0;

  wrapEl.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      wasOpenAtGestureStart = isOpen;
      touchMoved = false;
      dragStartX = touch.clientX;
      dragStartY = touch.clientY;

      if (!isOpen) {
        isOpen = true;
        lens.classList.add("is-visible");
      }
      moveLens(touch.clientX, touch.clientY);
      e.preventDefault();
    },
    { passive: false }
  );
  wrapEl.addEventListener(
    "touchmove",
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (!touchMoved) {
        const dx = touch.clientX - dragStartX;
        const dy = touch.clientY - dragStartY;
        if (Math.hypot(dx, dy) > TAP_MOVE_THRESHOLD) touchMoved = true;
      }
      if (touchMoved) moveLens(touch.clientX, touch.clientY);
      e.preventDefault();
    },
    { passive: false }
  );
  wrapEl.addEventListener("touchend", () => {
    if (!touchMoved && wasOpenAtGestureStart) {
      isOpen = false;
      lens.classList.remove("is-visible");
    }
  });
}
