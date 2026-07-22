"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { formatDate, tagLabel } from "@/lib/format";
import type { Story } from "@/lib/search";

const MAX_RESULTS = 50;
const MIN_QUERY_LENGTH = 2;

type IndexedStory = Story & { titleLower: string; textLower: string };

function Snippet({ story, query }: { story: IndexedStory; query: string }) {
  const idx = story.textLower.indexOf(query);
  if (idx === -1) {
    return (
      <p className="mt-1 text-sm text-muted line-clamp-2">
        {story.text.slice(0, 240)}
      </p>
    );
  }
  const start = Math.max(0, idx - 60);
  const end = Math.min(story.text.length, idx + query.length + 140);
  return (
    <p className="mt-1 text-sm text-muted line-clamp-2">
      {start > 0 && "…"}
      {story.text.slice(start, idx)}
      <mark className="rounded-sm bg-accent/20 text-foreground">
        {story.text.slice(idx, idx + query.length)}
      </mark>
      {story.text.slice(idx + query.length, end)}
      {end < story.text.length && "…"}
    </p>
  );
}

export default function Search() {
  const [index, setIndex] = useState<IndexedStory[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const fetchStarted = useRef(false);

  // The index is ~700 KB gzipped, so don't fetch it on page load — only when
  // the visitor commits by typing (or retries after a failure).
  const loadIndex = useCallback(() => {
    if (fetchStarted.current) return;
    fetchStarted.current = true;
    setFailed(false);
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((stories: Story[]) => {
        setIndex(
          stories.map((s) => ({
            ...s,
            titleLower: s.title.toLowerCase(),
            textLower: s.text.toLowerCase(),
          })),
        );
      })
      .catch(() => {
        fetchStarted.current = false;
        setFailed(true);
      });
  }, []);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!index || q.length < MIN_QUERY_LENGTH) return null;
    return index.filter(
      (s) => s.titleLower.includes(q) || s.textLower.includes(q),
    );
  }, [index, q]);

  let status: string;
  if (failed) {
    status = "Couldn't load the search index. Type to retry.";
  } else if (!index) {
    status = q ? "Loading search index…" : "Type to search stories.";
  } else if (matches === null) {
    status = `${index.length} stories indexed. Type at least ${MIN_QUERY_LENGTH} characters to search.`;
  } else if (matches.length === 0) {
    status = "No matching stories.";
  } else {
    status =
      `${matches.length} matching stor${matches.length === 1 ? "y" : "ies"}` +
      (matches.length > MAX_RESULTS ? `, showing first ${MAX_RESULTS}` : "");
  }

  return (
    <div>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.trim()) loadIndex();
        }}
        placeholder="Search stories…"
        aria-label="Search stories"
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:outline-none focus:border-muted"
      />
      <p className="mt-3 text-sm text-muted" role="status">
        {status}
      </p>

      {matches && matches.length > 0 && (
        <ul className="mt-8 space-y-8">
          {matches.slice(0, MAX_RESULTS).map((story) => (
            <li key={`${story.slug.join("/")}#${story.id}`} className="group">
              <Link
                href={`/posts/${story.slug.join("/")}#${story.id}`}
                className="block rounded-lg border border-transparent px-1 py-1 -mx-1 text-accent visited:text-accent-visited transition-colors hover:border-border"
              >
                <div className="flex items-baseline gap-3">
                  <time className="shrink-0 text-sm text-muted tabular-nums">
                    {formatDate(story.date)}
                  </time>
                  <span className="text-xs uppercase tracking-wider text-muted/70">
                    {tagLabel(story.slug)}
                  </span>
                </div>
                <h2 className="mt-1 text-lg font-medium group-hover:underline transition-colors">
                  {story.title}
                </h2>
                <Snippet story={story} query={q} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
