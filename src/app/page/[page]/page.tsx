import { notFound } from "next/navigation";
import { getAllPosts, paginatePosts, POSTS_PER_PAGE } from "@/lib/posts";
import PostList from "@/components/PostList";
import Pagination from "@/components/Pagination";

// Page 1 lives at "/"; anything not emitted below (including /page/1) 404s.
export const dynamicParams = false;

interface Params {
  page: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const totalPages = Math.ceil(getAllPosts().length / POSTS_PER_PAGE);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  return { title: `Page ${page}` };
}

export default async function PaginatedIndex({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const { posts, totalPages } = paginatePosts(getAllPosts(), pageNum);
  if (pageNum > totalPages) notFound();

  return (
    <div>
      <PostList posts={posts} showSummary />
      <Pagination currentPage={pageNum} totalPages={totalPages} />
    </div>
  );
}
