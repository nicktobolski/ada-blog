import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";

interface Params {
  tag: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  return { title: `#${tag}` };
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

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">#{tag}</h1>
        <p className="mt-2 text-muted">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </section>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug.join("/")} className="group">
            <Link
              href={`/posts/${post.slug.join("/")}`}
              className="block rounded-lg border border-transparent px-1 py-1 -mx-1 text-accent visited:text-accent-visited transition-colors hover:border-border"
            >
              <div className="flex items-baseline gap-3">
                <time className="shrink-0 text-sm text-muted tabular-nums">
                  {formatDate(post.date)}
                </time>
                <span className="text-xs uppercase tracking-wider text-muted/70">
                  {tagLabel(post.slug)}
                </span>
              </div>
              <h2 className="mt-1 text-lg font-medium group-hover:underline transition-colors">
                {post.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
