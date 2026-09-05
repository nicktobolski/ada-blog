// Measures the intrinsic size of every image referenced by the digests and
// records it in image-sizes.json, so the markdown pipeline can stamp width and
// height onto each <img> and the browser can reserve the right box before the
// image arrives. Without this the page reflows as each image lands.
//
// Runs before `next build` rather than inside it: Next generates pages across
// ~23 worker processes, and having each of them fetch and write a shared cache
// would mean network round-trips per worker and a write race over the file.
//
// The cache is committed, so a cold build only looks up images it has not seen.
// Network problems are never fatal -- an image we cannot measure is simply left
// as it is today.
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CACHE_FILE = path.join(process.cwd(), "image-sizes.json");
const CONCURRENCY = 20;
const TIMEOUT_MS = 15000;
// Enough for the header of any format we care about; avoids pulling whole
// images when the server honours Range.
const HEAD_BYTES = 65536;

function collectUrls(dir, out = new Set()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectUrls(full, out);
    else if (entry.name.endsWith(".md")) {
      const body = fs.readFileSync(full, "utf8");
      for (const tag of body.match(/<img [^>]*>/g) ?? []) {
        const src = /src="([^"]*)"/.exec(tag);
        if (src) out.add(src[1].replace(/&amp;/g, "&"));
      }
    }
  }
  return out;
}

async function measure(url) {
  // A src that isn't absolute resolves against this blog's own domain, where it
  // will never exist. No point asking the network.
  if (!/^https?:\/\//.test(url)) return { dead: true };
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0", range: `bytes=0-${HEAD_BYTES - 1}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    // Only a definite "this is not here" is worth baking in; anything else may
    // be hotlink protection or a hiccup that a real browser would get past.
    if (res.status === 404 || res.status === 410) return { dead: true };
    if (!res.ok && res.status !== 206) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const { width, height } = imageSize(buf);
    return width && height ? { w: width, h: height } : null;
  } catch {
    return null; // unknown -- leave the tag alone and try again next build
  }
}

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) return;
  const cache = fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"))
    : {};
  const urls = [...collectUrls(CONTENT_DIR)];
  const missing = urls.filter((u) => !(u in cache));
  if (missing.length === 0) {
    console.log(`image-sizes: ${urls.length} images, all cached`);
    return;
  }

  const started = Date.now();
  let cursor = 0;
  let measured = 0;
  let dead = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, missing.length) }, async () => {
      while (cursor < missing.length) {
        const url = missing[cursor++];
        const result = await measure(url);
        if (result === null) continue; // don't cache "unknown"
        cache[url] = result;
        if (result.dead) dead++;
        else measured++;
      }
    }),
  );

  // Sorted so the committed file diffs cleanly as content is added.
  const sorted = Object.fromEntries(Object.keys(cache).sort().map((k) => [k, cache[k]]));
  fs.writeFileSync(CACHE_FILE, JSON.stringify(sorted, null, 1) + "\n");
  console.log(
    `image-sizes: ${urls.length} images, looked up ${missing.length} ` +
      `(${measured} measured, ${dead} gone, ${missing.length - measured - dead} unresolved) ` +
      `in ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
}

main().catch((err) => {
  // Never fail the build over this; pages just keep today's behaviour.
  console.warn(`image-sizes: skipped (${err.message})`);
});
