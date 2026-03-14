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

export interface PostMeta {
  slug: string[];
  title: string;
  date: string;
  tags: string[];
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
  };
}

export function getAllPosts(): PostMeta[] {
  const files = getMarkdownFiles(CONTENT_DIR);
  const posts = files.map(({ filePath, slug }) => parsePost(filePath, slug));
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
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
  const { data, content: markdownBody } = matter(raw);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
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
