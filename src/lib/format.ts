export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Anchor id for a story heading. Used both when rendering post HTML and
 * when building the search index, so the two always agree.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function tagLabel(slug: string[]): string {
  const category = slug.length >= 2 ? slug.slice(0, -1).join(" / ") : "";
  return category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
