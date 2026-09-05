"use client";

import { useEffect } from "react";

const COLLAPSE_EASE = [0, 0, 0.58, 1] as const; // must match --ease-details
const EXIT_RATIO = 0.85; // must match the collapse duration in globals.css

// Newton's method against the curve's x polynomial -- enough to keep the scroll
// visually in step with the CSS collapse rather than drifting against it.
function ease(x: number) {
  const [x1, y1, x2, y2] = COLLAPSE_EASE;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  let t = x;
  for (let i = 0; i < 5; i++) {
    const slope = (3 * ax * t + 2 * bx) * t + cx;
    if (!slope) break;
    t -= (((ax * t + bx) * t + cx) * t - x) / slope;
  }
  return ((ay * t + by) * t + cy) * t;
}

const maxScroll = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

export default function CollapsibleScrollReset() {
  useEffect(() => {
    let stop: (() => void) | null = null;

    function glideTo(target: number, ms: number) {
      const start = window.scrollY;
      const t0 = performance.now();
      let raf = 0;
      const cancel = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("wheel", cancel);
        window.removeEventListener("touchstart", cancel);
        window.removeEventListener("keydown", cancel);
        stop = null;
      };
      const tick = () => {
        const p = Math.min(1, (performance.now() - t0) / ms);
        // The document is getting shorter underneath us as the section
        // collapses, so re-clamp every frame -- otherwise the browser's own
        // clamp yanks the position out from under the animation.
        window.scrollTo(0, Math.min(start + (target - start) * ease(p), maxScroll()));
        if (p < 1) raf = requestAnimationFrame(tick);
        else cancel();
      };
      // Any real scroll input wins; don't fight the reader for the viewport.
      window.addEventListener("wheel", cancel, { passive: true, once: true });
      window.addEventListener("touchstart", cancel, { passive: true, once: true });
      window.addEventListener("keydown", cancel, { once: true });
      raf = requestAnimationFrame(tick);
      return cancel;
    }

    // Runs before the browser's default toggle, so the section is still open
    // and can be measured.
    function onClick(e: MouseEvent) {
      const summary = (e.target as HTMLElement | null)?.closest?.("summary");
      if (!summary) return;
      const details = summary.closest("details");
      if (!details?.open) return;

      const top = details.getBoundingClientRect().top;
      if (top >= 0) return; // start of the section is already on screen

      details.dataset.gliding = "";
      // How much shorter the document is about to get.
      const shrink =
        details.getBoundingClientRect().height - summary.getBoundingClientRect().height;
      // Put the summary at the top of the viewport if the collapsed document is
      // still tall enough to allow it; aiming past that just gets clamped.
      const target = Math.max(0, Math.min(window.scrollY + top, maxScroll() - shrink));

      stop?.();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Nothing to stay in step with -- the collapse is instant too.
        requestAnimationFrame(() => window.scrollTo(0, target));
        return;
      }
      const collapseMs =
        (parseFloat(getComputedStyle(details).getPropertyValue("--details-ms")) || 220) *
        EXIT_RATIO;
      // Short hops stay in step with the collapse. Coming back from several
      // screens deep needs longer or it reads as a teleport rather than a
      // scroll -- but never so long that it feels like it's dragging.
      const distance = Math.abs(window.scrollY - target);
      const scrollMs = Math.min(650, Math.max(collapseMs, 240 + Math.sqrt(distance) * 4));
      stop = glideTo(target, scrollMs);
    }

    function onToggle(e: Event) {
      const details = e.target as HTMLElement;
      if (details.tagName !== "DETAILS") return;
      if ((details as HTMLDetailsElement).open) return;
      if (details.dataset.gliding !== undefined) {
        delete details.dataset.gliding;
        return;
      }
      // Collapsed by something other than a click on the summary, so the glide
      // above never ran. Fall back to putting the summary back in view.
      if (details.getBoundingClientRect().top < 0) {
        details.scrollIntoView({ block: "start" });
      }
    }

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      stop?.();
    };
  }, []);
  return null;
}
