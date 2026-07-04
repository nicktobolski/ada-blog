import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getCategoryPaths,
  getPost,
  getPostsByCategory,
  isCategory,
} from "@/lib/posts";
import { formatDate } from "@/lib/format";
import PostList from "@/components/PostList";

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
        <PostList posts={posts} />
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
