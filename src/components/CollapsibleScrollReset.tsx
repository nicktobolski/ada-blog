"use client";

import { useEffect } from "react";

export default function CollapsibleScrollReset() {
  useEffect(() => {
    function onToggle(e: Event) {
      const details = e.target as HTMLElement;
      if (details.tagName !== "DETAILS" || (details as HTMLDetailsElement).open) return;
      // Collapsing a section you've scrolled deep into can strand the viewport
      // in unrelated content below; bring the collapsed summary back into view.
      if (details.getBoundingClientRect().top < 0) {
        details.scrollIntoView({ block: "start" });
      }
    }
    document.addEventListener("toggle", onToggle, true);
    return () => document.removeEventListener("toggle", onToggle, true);
  }, []);
  return null;
}
