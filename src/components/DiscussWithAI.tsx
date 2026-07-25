"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  DEFAULT_PROMPT,
  DEFAULT_PROVIDER,
  MAX_PROMPT_LENGTH,
  PROVIDERS,
  buildChatUrl,
  isProviderId,
} from "@/lib/ai-links";

/**
 * A localStorage-backed store for useSyncExternalStore. Server snapshot is
 * null (the default wins), so server HTML matches the first client render.
 * The in-memory fallback keeps the controls usable when localStorage throws
 * (e.g. Safari private mode).
 */
function createPrefStore(key: string) {
  let listeners: Array<() => void> = [];
  let memory: string | null = null;
  return {
    subscribe(listener: () => void) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    get(): string | null {
      try {
        return localStorage.getItem(key) ?? memory;
      } catch {
        return memory;
      }
    },
    getServer(): string | null {
      return null;
    },
    set(value: string | null) {
      memory = value;
      try {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      } catch {}
      listeners.forEach((l) => l());
    },
  };
}

const providerStore = createPrefStore("ada:ai-provider");
const promptStore = createPrefStore("ada:ai-prompt");

/**
 * Preferences for the per-story "Ask AI" links that rehypeDiscussLinks bakes
 * into the article HTML. Those links ship with default hrefs so they work
 * without JS; this component rewrites them whenever the reader's stored
 * provider or prompt differs.
 */
export default function DiscussWithAI() {
  const storedProvider = useSyncExternalStore(
    providerStore.subscribe,
    providerStore.get,
    providerStore.getServer,
  );
  const provider = isProviderId(storedProvider)
    ? storedProvider
    : DEFAULT_PROVIDER;

  const storedPrompt = useSyncExternalStore(
    promptStore.subscribe,
    promptStore.get,
    promptStore.getServer,
  );
  const prompt = storedPrompt ?? DEFAULT_PROMPT;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keep every story link's href in sync with the current preferences.
  useEffect(() => {
    document
      .querySelectorAll<HTMLAnchorElement>("a[data-article-url]")
      .forEach((a) => {
        const url = a.dataset.articleUrl;
        if (url) a.href = buildChatUrl(provider, prompt, url);
      });
  }, [provider, prompt]);

  // Auto-grow the textarea to fit its content.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [prompt]);

  // Only non-default prompts persist, so a future change to DEFAULT_PROMPT
  // isn't shadowed by a stale stored copy of the old default.
  const updatePrompt = (value: string) => {
    promptStore.set(value === DEFAULT_PROMPT ? null : value);
  };

  return (
    <aside className="mt-10 border-t border-border pt-6 text-sm">
      <h2 className="font-medium text-foreground">Discuss with AI</h2>
      <p className="mt-1 text-muted">
        Each story&apos;s <span className="text-accent">Ask AI</span> link
        opens{" "}
        <label htmlFor="discuss-provider" className="sr-only">
          AI provider
        </label>
        <span className="relative inline-block">
          <select
            id="discuss-provider"
            value={provider}
            onChange={(e) => {
              if (isProviderId(e.target.value)) {
                providerStore.set(e.target.value);
              }
            }}
            className="cursor-pointer appearance-none bg-transparent pr-4 text-foreground underline decoration-border underline-offset-4 hover:decoration-muted focus:outline-none focus:decoration-muted"
          >
            {Object.values(PROVIDERS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-xs text-muted"
          >
            ▾
          </span>
        </span>{" "}
        with the article&apos;s link and this prompt:
      </p>
      <label htmlFor="discuss-prompt" className="sr-only">
        Prompt to send with each article link
      </label>
      <textarea
        ref={textareaRef}
        id="discuss-prompt"
        rows={1}
        value={prompt}
        maxLength={MAX_PROMPT_LENGTH}
        onChange={(e) => updatePrompt(e.target.value)}
        onBlur={(e) => {
          if (!e.target.value.trim()) updatePrompt(DEFAULT_PROMPT);
        }}
        className="mt-3 block w-full resize-none overflow-hidden rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-muted"
      />
      {prompt !== DEFAULT_PROMPT && (
        <button
          type="button"
          onClick={() => updatePrompt(DEFAULT_PROMPT)}
          className="mt-2 text-xs text-muted underline hover:text-foreground focus:outline-none focus-visible:text-foreground"
        >
          reset
        </button>
      )}
    </aside>
  );
}
