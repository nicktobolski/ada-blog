export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function tagLabel(slug: string[]): string {
  const category = slug.length >= 2 ? slug.slice(0, -1).join(" / ") : "";
  return category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
