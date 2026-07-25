export type ProviderId = "chatgpt" | "claude";

export interface Provider {
  id: ProviderId;
  label: string;
  build: (payload: string) => string;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ada-blog-seven.vercel.app";

export const DEFAULT_PROVIDER: ProviderId = "chatgpt";
export const DEFAULT_PROMPT = "Summarize this for me";
export const MAX_PROMPT_LENGTH = 1000;

export const PROVIDERS: Record<ProviderId, Provider> = {
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
  return typeof value === "string" && value in PROVIDERS;
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
): string {
  const text = (prompt.trim() || DEFAULT_PROMPT).slice(0, MAX_PROMPT_LENGTH);
  return PROVIDERS[providerId].build(
    encodeURIComponent(`${text}\n\n${articleUrl}`),
  );
}
