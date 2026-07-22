import { getSearchIndex } from "@/lib/search";

// Rendered once at build time and served as a static asset.
export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchIndex());
}
