import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getCategoryPaths,
  getPost,
  getPostsByCategory,
  isCategory,
} from "@/lib/posts";

interface Params {
  slug: string[];
}

export async function generateStaticParams(): Promise<Params[]> {
  const postSlugs = getAllSlugs().map((slug) => ({ slug }));
  const categorySlugs = getCategoryPaths().map((slug) => ({ slug }));
  return [...postSlugs, ...categorySlugs];
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (isCategory(slug)) {
    const label = slug
      .join(" / ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { title: label };
  }

  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function tagLabel(slug: string[]): string {
  const category = slug.length >= 2 ? slug.slice(0, -1).join(" / ") : "";
  return category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function CategoryPage({ slug }: { slug: string[] }) {
  const posts = getPostsByCategory(slug);
  const label = slug
    .join(" / ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{label}</h1>
        <p className="mt-2 text-muted">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
      </section>

      {posts.length === 0 ? (
        <p className="text-muted">No posts in this category yet.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug.join("/")} className="group">
              <Link
                href={`/posts/${post.slug.join("/")}`}
                className="block rounded-lg border border-transparent px-1 py-1 -mx-1 transition-colors hover:border-border"
              >
                <div className="flex items-baseline gap-3">
                  <time className="shrink-0 text-sm text-muted tabular-nums">
                    {formatDate(post.date)}
                  </time>
                  <span className="text-xs uppercase tracking-wider text-muted/70">
                    {tagLabel(post.slug)}
                  </span>
                </div>
                <h2 className="mt-1 text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

async function PostPage({ slug }: { slug: string[] }) {
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="mb-8 border-b border-border pb-6">
        <div className="flex items-baseline gap-2 text-sm text-muted tabular-nums">
          <time>{formatDate(post.date)}</time>
          {post.generated ? (
            <span>· {String(post.generated)}</span>
          ) : null}
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted hover:bg-foreground/10 hover:text-foreground transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>
      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline prose-a:hover:underline prose-table:text-sm"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <footer className="mt-10 pt-4 text-sm text-muted flex items-center justify-between">
        <Link href="/" className="hover:text-foreground transition-colors">&larr; Home</Link>
        <span>
          Created by{" "}
          <a href="https://nick.tobol.ski" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
            tobo
          </a>
        </span>
      </footer>
    </article>
  );
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (isCategory(slug)) {
    return <CategoryPage slug={slug} />;
  }

  return <PostPage slug={slug} />;
}
