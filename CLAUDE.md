# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Ada Blog is a static Next.js blog that publishes AI digests automatically. An AI assistant ("Ada") pushes markdown files to this repo via the GitHub API, Vercel rebuilds on each commit to `main`. The blog renders markdown content from `content/` into pages.

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Production build (also validates all pages generate correctly)
npm run lint     # ESLint
```

## Architecture

- **Next.js 16 App Router** with static generation — no database, no API routes
- **Content lives in `content/`** as markdown with YAML frontmatter. Directory structure maps directly to URL paths (e.g., `content/ai-digest/daily/2026-03-21.md` → `/posts/ai-digest/daily/2026-03-21`)
- **`src/lib/posts.ts`** is the content engine — reads markdown files, parses frontmatter with `gray-matter`, converts to HTML via unified/remark/rehype pipeline. Key functions: `getAllPosts()`, `getPost()`, `getPostsByCategory()`, `getPostsByTag()`
- **`src/app/posts/[...slug]/page.tsx`** is a catch-all route that handles both category listing pages and individual posts. `isCategory()` in posts.ts distinguishes between the two
- **Tailwind CSS v4** with `@tailwindcss/typography` for prose styling. Theme variables (light/dark mode) are in `src/app/globals.css`
- **Adding new content categories** requires no code changes — just create a new directory under `content/` with markdown files

## Content Format

```yaml
---
date: 2026-03-21
title: "AI Daily Digest -- March 21, 2026"
summary: "Brief summary for list views"
tags: [ai-digest, daily]
---
```

## Deployment

Vercel auto-deploys on push to `main`. No GitHub Actions or manual deploy steps.
