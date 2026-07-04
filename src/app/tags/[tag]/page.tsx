import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostList from "@/components/PostList";

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

      <PostList posts={posts} />
    </div>
  );
}
