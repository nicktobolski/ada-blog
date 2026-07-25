export type BuiltinProviderId = "chatgpt" | "claude";
export type ProviderId = BuiltinProviderId | "custom";

export interface Provider {
  id: BuiltinProviderId;
  label: string;
  build: (payload: string) => string;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ada-blog-seven.vercel.app";

export const DEFAULT_PROVIDER: BuiltinProviderId = "chatgpt";
export const DEFAULT_PROMPT = "Summarize this for me";
export const MAX_PROMPT_LENGTH = 1000;

export const PROVIDERS: Record<BuiltinProviderId, Provider> = {
  chatgpt: {
    id: "chatgpt",
    label: "ChatGPT",
    // hints=search makes ChatGPT fetch the URL instead of answering from memory
    build: (payload) => `https://chatgpt.com/?q=${payload}&hints=search`,
  },
  claude: {
    id: "claude",
    label: "Claude",
    // Known limitation (2026-07-25): logged-out claude.ai drops the q param
    // at its login redirect, so the prompt only survives for signed-in
    // readers. Kept by owner request; see issue #4.
    build: (payload) => `https://claude.ai/new?q=${payload}`,
  },
};

export function isProviderId(value: unknown): value is ProviderId {
  return typeof value === "string" && (value === "custom" || value in PROVIDERS);
}

// Example shown to readers configuring a custom provider: the base URL up to
// and including the query parameter the payload should be appended to.
export const CUSTOM_URL_EXAMPLE = "https://www.perplexity.ai/search?q=";

export function isValidCustomUrl(value: string): boolean {
  return /^https?:\/\/\S+$/.test(value.trim());
}

export function postUrl(slug: string[]): string {
  return `${SITE_URL}/posts/${slug.map(encodeURIComponent).join("/")}`;
}

// Normalization lives here, not in the component, so it also covers prompts
// restored from localStorage that predate a change to the cap.
export function buildChatUrl(
  providerId: ProviderId,
  prompt: string,
  articleUrl: string,
  customUrl = "",
): string {
  const text = (prompt.trim() || DEFAULT_PROMPT).slice(0, MAX_PROMPT_LENGTH);
  const payload = encodeURIComponent(`${text}\n\n${articleUrl}`);
  if (providerId === "custom") {
    // A custom provider whose URL is missing or malformed falls back to the
    // default provider so the story links always lead somewhere useful.
    const base = customUrl.trim();
    if (isValidCustomUrl(base)) return `${base}${payload}`;
    return PROVIDERS[DEFAULT_PROVIDER].build(payload);
  }
  return PROVIDERS[providerId].build(payload);
}
