---
name: verify
description: How to build, run, and drive this blog in a headless browser to verify UI changes end-to-end.
---

# Verifying ada-blog changes

Static Next.js blog; the surface is rendered pages in a browser.

## Build & serve

```bash
npm run build                      # also validates all pages generate
(npm start -- -p 3111 > /tmp/ada-blog-server.log 2>&1 &)
curl -s -o /dev/null -w '%{http_code}' http://localhost:3111/   # expect 200
```

Use a non-default port (e.g. 3111) to avoid clashing with a running dev server.

## Drive with a headless browser

No Playwright package in the repo, but browser binaries are cached at
`~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome`. Install
`playwright-core` (no browser download) in a temp dir and point
`chromium.launch({ executablePath })` at the cached binary:

```js
import { chromium } from "playwright-core";
const exe = `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`;
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
// dark mode: newPage({ colorScheme: "dark" }) — theme flips via prefers-color-scheme
```

## Flows worth driving

- A long digest post with many `<details>` collapsibles:
  `/posts/ai-digest/daily/2026-07-04` (50 sections). Find long content with
  `grep -c '<details>' content/ai-digest/daily/*.md`.
- Index pagination: `/`, `/page/2`.
- Tag and category listings: `/tags/ai-digest`, `/posts/ai-digest`.

## Gotchas

- Post HTML is injected via `dangerouslySetInnerHTML`; interactive behavior
  comes from native elements + CSS in `src/app/globals.css` and the
  `CollapsibleScrollReset` client component (global `toggle` capture listener).
- Collapsibles are raw `<details>` HTML in the markdown itself; blank lines
  inside them are load-bearing for markdown parsing.
- Pre-existing lint failure: `react/no-unescaped-entities` for the apostrophe
  in "Ada's Blog" in `src/app/layout.tsx` — not caused by your change.
