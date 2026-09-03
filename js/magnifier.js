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
  //
  // Once open, a new touch doesn't snap the lens to that touch point —
  // it stays put until the finger actually moves, then tracks the
  // finger's movement (delta), preserving whatever offset existed
  // between the touch and the lens when the finger came down.
  const TAP_MOVE_THRESHOLD = 8;
  let isOpen = false;
  let wasOpenAtGestureStart = false;
  let touchMoved = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let anchorX = 0;
  let anchorY = 0;
  let lensX = 0;
  let lensY = 0;

  wrapEl.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      wasOpenAtGestureStart = isOpen;
      touchMoved = false;
      dragStartX = touch.clientX;
      dragStartY = touch.clientY;
      anchorX = lensX;
      anchorY = lensY;

      if (!isOpen) {
        isOpen = true;
        lens.classList.add("is-visible");
        moveLens(touch.clientX, touch.clientY);
        lensX = touch.clientX;
        lensY = touch.clientY;
        anchorX = lensX;
        anchorY = lensY;
      }
      e.preventDefault();
    },
    { passive: false }
  );
  wrapEl.addEventListener(
    "touchmove",
    (e) => {
      if (!isOpen) return;
      const touch = e.touches[0];
      if (!touch) return;
      const dx = touch.clientX - dragStartX;
      const dy = touch.clientY - dragStartY;
      if (!touchMoved && Math.hypot(dx, dy) > TAP_MOVE_THRESHOLD) touchMoved = true;
      if (touchMoved) {
        lensX = anchorX + dx;
        lensY = anchorY + dy;
        // Touch capture keeps firing on wrapEl even once the finger has
        // moved off it, so the lens has to be closed explicitly once its
        // center leaves the diagram's own box — it isn't clamped to the
        // edge, it just disappears.
        const rect = wrapEl.getBoundingClientRect();
        if (lensX < rect.left || lensX > rect.right || lensY < rect.top || lensY > rect.bottom) {
          isOpen = false;
          lens.classList.remove("is-visible");
        } else {
          moveLens(lensX, lensY);
        }
      }
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
