import fs from "fs";
import matter from "gray-matter";
import { CONTENT_DIR, getMarkdownFiles } from "./posts";
import { slugifyHeading } from "./format";

export interface Story {
  /** Slug of the post the story appears in */
  slug: string[];
  /** Anchor id of the story's heading within the post */
  id: string;
  title: string;
  /** External link if the story heading links out */
  url?: string;
  date: string;
  /** Plain text of the story block, for matching and snippets */
  text: string;
}

function stripMarkdownText(md: string): string {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_`#]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A story is an h3 block: its heading line plus everything up to the next
 * h1/h2/h3. Anchor ids must match rehypeStoryAnchors in posts.ts: h3s only,
 * in document order, with -1, -2, … suffixes for duplicate titles.
 */
function extractStories(body: string, slug: string[], date: string): Story[] {
  const stories: Story[] = [];
  const counts = new Map<string, number>();
  let current: { heading: string; lines: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const heading = current.heading.replace(/<[^>]+>/g, "").trim();
    // Headings are usually a single markdown link. Split on the outermost
    // "](" so titles with nested brackets or urls with parens parse the same
    // way remark renders them.
    let rawTitle = heading;
    let url: string | undefined;
    if (heading.startsWith("[") && heading.endsWith(")")) {
      const sep = heading.lastIndexOf("](");
      if (sep > 0) {
        rawTitle = heading.slice(1, sep);
        url = heading.slice(sep + 2, -1);
      }
    }
    // Gentler than stripMarkdownText: "1. Foo" here is a numbered heading,
    // not a list item, and must survive so anchors match the rendered text.
    const title = rawTitle.replace(/[*_`]+/g, "").replace(/\s+/g, " ").trim();
    const text = stripMarkdownText(current.lines.join("\n"));
    current = null;
    if (!title) return;

    const base = slugifyHeading(title);
    const n = counts.get(base) ?? 0;
    counts.set(base, n + 1);
    stories.push({
      slug,
      id: n === 0 ? base : `${base}-${n}`,
      title,
      url,
      date,
      text,
    });
  };

  for (const line of body.split("\n")) {
    const h3 = line.match(/^###\s+(.*)/);
    if (h3) {
      flush();
      current = { heading: h3[1], lines: [] };
      continue;
    }
    if (/^#{1,2}\s/.test(line)) {
      flush();
      continue;
    }
    current?.lines.push(line);
  }
  flush();
  return stories;
}

function buildSearchIndex(): Story[] {
  const stories = getMarkdownFiles(CONTENT_DIR).flatMap(
    ({ filePath, slug }) => {
      const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
      const date = data.date
        ? data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : String(data.date)
        : "";
      return extractStories(content, slug, date);
    },
  );
  return stories.sort((a, b) => (a.date > b.date ? -1 : 1));
}

let cachedIndex: Story[] | null = null;

export function getSearchIndex(): Story[] {
  // Same caching rule as getAllPosts: production only.
  if (process.env.NODE_ENV === "production") {
    return (cachedIndex ??= buildSearchIndex());
  }
  return buildSearchIndex();
}
