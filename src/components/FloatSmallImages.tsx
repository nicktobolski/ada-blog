"use client";

import { useEffect } from "react";

// Wide enough for avatars and favicons, narrow enough that the remaining
// column width still fits comfortable text lines.
const MAX_FLOAT_WIDTH = 320;

/**
 * Floats genuinely small post images to the left so text wraps around them.
 * Natural image size is only known client-side after load, so this tags
 * qualifying images with a class styled in globals.css. Inline heading icons
 * and near-column-width images are left alone.
 */
export default function FloatSmallImages() {
  useEffect(() => {
    const imgs = document.querySelectorAll<HTMLImageElement>(".prose img");
    const cleanups: (() => void)[] = [];

    imgs.forEach((img) => {
      const apply = () => {
        if (
          img.naturalWidth > 0 &&
          img.naturalWidth <= MAX_FLOAT_WIDTH &&
          getComputedStyle(img).display !== "inline" &&
          !img.closest("h1, h2, h3, h4, summary")
        ) {
          img.classList.add("float-img");
        }
      };
      if (img.complete) {
        apply();
      } else {
        img.addEventListener("load", apply, { once: true });
        cleanups.push(() => img.removeEventListener("load", apply));
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
  return null;
}
