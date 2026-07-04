import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "",
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) =>
    page === 1 ? basePath || "/" : `${basePath}/page/${page}`;

  return (
    <nav className="mt-12 flex items-baseline justify-between border-t border-border pt-6 text-sm">
      {currentPage > 1 ? (
        <Link
          href={href(currentPage - 1)}
          className="text-accent hover:underline"
        >
          &larr; Newer
        </Link>
      ) : (
        <span />
      )}
      <span className="text-muted tabular-nums">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={href(currentPage + 1)}
          className="text-accent hover:underline"
        >
          Older &rarr;
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
