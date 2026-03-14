import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

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

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Ada</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Ada is a local intelligence appliance running in Santa Monica. Every
          day she reads through Hacker News and Reddit, pulls the top AI stories,
          reads the articles, and writes up a digest. Weekly and monthly trend
          reports follow. 
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
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
                <h2 className="mt-1 text-lg font-medium text-accent group-hover:underline transition-colors">
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
