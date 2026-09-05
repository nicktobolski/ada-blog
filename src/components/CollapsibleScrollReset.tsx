"use client";

import { useEffect } from "react";

export default function CollapsibleScrollReset() {
  useEffect(() => {
    // Runs before the browser's default toggle action, so it can still affect
    // how the collapse animates. Collapsing a section you've scrolled past the
    // top of has to yank the viewport back (see onToggle) while the shrinking
    // document drags the scroll position along with it -- gliding through that
    // reads as a lurch, so mark this one collapse instant.
    function onClick(e: MouseEvent) {
      const summary = (e.target as HTMLElement | null)?.closest?.("summary");
      const details = summary?.closest("details");
      if (!details?.open) return;
      if (details.getBoundingClientRect().top < 0) {
        details.dataset.instant = "";
      }
    }

    function onToggle(e: Event) {
      const details = e.target as HTMLElement;
      if (details.tagName !== "DETAILS") return;
      if ((details as HTMLDetailsElement).open) {
        delete details.dataset.instant;
        return;
      }
      // Collapsing a section you've scrolled deep into can strand the viewport
      // in unrelated content below; bring the collapsed summary back into view.
      if (details.getBoundingClientRect().top < 0) {
        details.scrollIntoView({ block: "start" });
      }
      // Cleared after the collapse so the next expand animates normally.
      requestAnimationFrame(() => delete details.dataset.instant);
    }

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);
  return null;
}
