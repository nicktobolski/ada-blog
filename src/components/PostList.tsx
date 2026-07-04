import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate, tagLabel } from "@/lib/format";

export default function PostList({
  posts,
  showSummary = false,
}: {
  posts: PostMeta[];
  showSummary?: boolean;
}) {
  return (
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
            {showSummary && post.summary && (
              <p className="mt-1 text-sm text-muted line-clamp-3">
                {post.summary}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
