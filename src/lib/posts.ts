import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

// Digest posts embed raw <img style="width: 100%"> tags, which stretch small
// images (favicons, status icons) far past their natural resolution. Drop only
// the width declaration — other inline styles (e.g. the height/display rules
// on heading icons) are intentional — so images render at natural size, capped
// at the column width by the global img { max-width: 100% } rule.
function rehypeNaturalImageSize() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (node.tagName === "img" && node.properties?.style) {
        const cleaned = String(node.properties.style)
          .split(";")
          .map((decl) => decl.trim())
          .filter((decl) => decl && !/^width\s*:/i.test(decl))
          .join("; ");
        if (cleaned) node.properties.style = cleaned;
        else delete node.properties.style;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

// Collapsible sections range from three bullet points to thousands of pixels of
// comment thread. One fixed duration would either crawl through the short ones
// or rocket through the long ones, so estimate each section's rendered height
// here and stamp a duration onto the element for the CSS to read. Estimating at
// build time (rather than measuring in the browser) keeps the page free of
// runtime JS and also covers sections opened by find-in-page or a #fragment,
// which a click handler could never catch. The cost is that the estimate is
// viewport-independent: a narrow phone wraps taller than assumed and lands
// somewhat short. The clamp keeps that error to a few tens of milliseconds.
const COLLAPSE_MIN_MS = 220;
const COLLAPSE_MAX_MS = 520;
// Calibrated against real rendered heights measured in the browser across 259
// sections spanning 96px to 8000px; the estimate lands within 0.82x-1.03x of
// actual at the 10th/90th percentile.
const CHARS_PER_LINE = 90;
const LINE_PX = 31;
const BLOCK_GAP_PX = 18;
const IMG_PX = 133;
const BLOCK_TAGS = new Set([
  "p", "li", "blockquote", "pre", "hr", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
]);

function estimateContentHeight(details: HastNode): number {
  let chars = 0;
  let blocks = 0;
  let images = 0;
  const measure = (node: HastNode) => {
    if (node.tagName === "summary") return; // the label sits outside ::details-content
    if (node.type === "text") chars += node.value?.length ?? 0;
    if (node.tagName && BLOCK_TAGS.has(node.tagName)) blocks += 1;
    if (node.tagName === "img") images += 1;
    node.children?.forEach(measure);
  };
  details.children?.forEach(measure);
  return (chars / CHARS_PER_LINE) * LINE_PX + blocks * BLOCK_GAP_PX + images * IMG_PX;
}

function rehypeCollapsibleDuration() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (node.tagName === "details") {
        // Square root, not linear: travel distance should lengthen the glide but
        // far less than proportionally, or a tall thread would crawl. Gives
        // ~235ms for a few bullet points, ~300ms for a typical section and
        // ~410ms for a long comment thread. The durations are set by how much
        // of the travel lands in a single frame, not by feel: at 60fps a 200ms
        // animation is only 13 frames, so a section that moves 500px of page
        // has to spend longer or the first frame alone is a visible jump.
        const height = estimateContentHeight(node);
        const ms = Math.min(
          COLLAPSE_MAX_MS,
          Math.max(COLLAPSE_MIN_MS, Math.round(170 + 6.5 * Math.sqrt(height))),
        );
        const existing = node.properties?.style ? `${node.properties.style}; ` : "";
        node.properties = { ...node.properties, style: `${existing}--details-ms: ${ms}ms` };
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

export interface PostMeta {
  slug: string[];
  title: string;
  date: string;
  tags: string[];
  summary: string;
  [key: string]: unknown;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function getMarkdownFiles(
  dir: string,
  basePath: string[] = [],
): { filePath: string; slug: string[] }[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results: { filePath: string; slug: string[] }[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      results.push(
        ...getMarkdownFiles(path.join(dir, entry.name), [
          ...basePath,
          entry.name,
        ]),
      );
    } else if (entry.name.endsWith(".md")) {
      const slugPart = entry.name.replace(/\.md$/, "");
      results.push({
        filePath: path.join(dir, entry.name),
        slug: [...basePath, slugPart],
      });
    }
  }

  return results;
}

function parsePost(filePath: string, slug: string[]): PostMeta {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(content);
  return {
    ...data,
    slug,
    title: data.title || slug[slug.length - 1],
    date: data.date
      ? data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date)
      : "",
    tags: data.tags || [],
    summary: data.summary || "",
  };
}

function loadAllPosts(): PostMeta[] {
  const files = getMarkdownFiles(CONTENT_DIR);
  const posts = files.map(({ filePath, slug }) => parsePost(filePath, slug));
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

let cachedPosts: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  // Cache only in production builds: content can't change mid-build, but in
  // dev the module state outlives file edits and would serve stale posts.
  if (process.env.NODE_ENV === "production") {
    return (cachedPosts ??= loadAllPosts());
  }
  return loadAllPosts();
}

export const POSTS_PER_PAGE = 20;

export function paginatePosts(
  posts: PostMeta[],
  page: number,
): { posts: PostMeta[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  return { posts: posts.slice(start, start + POSTS_PER_PAGE), totalPages };
}

export function getPostsByCategory(category: string[]): PostMeta[] {
  return getAllPosts().filter((post) =>
    category.every((seg, i) => post.slug[i] === seg),
  );
}

export async function getPost(slug: string[]): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, ...slug) + ".md";
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawBody } = matter(raw);

  // Strip the leading h1 -- the page template already renders the title
  const markdownBody = rawBody.replace(/^\s*#\s+.+\n*/, "");

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeNaturalImageSize)
    .use(rehypeCollapsibleDuration)
    .use(rehypeStringify)
    .process(markdownBody);

  return {
    ...data,
    slug,
    title: data.title || slug[slug.length - 1],
    date: data.date
      ? data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : String(data.date)
      : "",
    tags: data.tags || [],
    summary: data.summary || "",
    contentHtml: String(result),
  };
}

export function getAllSlugs(): string[][] {
  return getMarkdownFiles(CONTENT_DIR).map((f) => f.slug);
}

/**
 * Returns unique directory-level paths that contain posts.
 * e.g. for a post at ai-digest/daily/2026-03-12, returns
 * [["ai-digest"], ["ai-digest", "daily"]].
 */
export function getCategoryPaths(): string[][] {
  const files = getMarkdownFiles(CONTENT_DIR);
  const seen = new Set<string>();
  const categories: string[][] = [];

  for (const { slug } of files) {
    for (let i = 1; i < slug.length; i++) {
      const key = slug.slice(0, i).join("/");
      if (!seen.has(key)) {
        seen.add(key);
        categories.push(slug.slice(0, i));
      }
    }
  }

  return categories;
}

export function isCategory(slug: string[]): boolean {
  const dirPath = path.join(CONTENT_DIR, ...slug);
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}
