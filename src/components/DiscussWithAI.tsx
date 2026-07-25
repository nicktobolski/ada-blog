"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  CUSTOM_URL_EXAMPLE,
  DEFAULT_PROMPT,
  DEFAULT_PROVIDER,
  MAX_PROMPT_LENGTH,
  PROVIDERS,
  buildChatUrl,
  isProviderId,
  isValidCustomUrl,
  type ProviderId,
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
const customUrlStore = createPrefStore("ada:ai-custom-url");

/**
 * Settings for the per-story "Ask AI" links that rehypeDiscussLinks bakes
 * into the article HTML: a gear button in the post header that opens a modal
 * with the prompt and provider preferences. The links ship with default
 * hrefs so they work without JS; this component rewrites them whenever the
 * reader's stored provider or prompt differs.
 */
export default function DiscussWithAI() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

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

  const storedCustomUrl = useSyncExternalStore(
    customUrlStore.subscribe,
    customUrlStore.get,
    customUrlStore.getServer,
  );
  const customUrl = storedCustomUrl ?? "";

  // Edits are drafts local to the modal; only Save commits them to the
  // stores (and thus to localStorage and the story links). Closing any
  // other way discards them — the draft is re-seeded on every open.
  const [draftPrompt, setDraftPrompt] = useState(DEFAULT_PROMPT);
  const [draftProvider, setDraftProvider] = useState<ProviderId>(DEFAULT_PROVIDER);
  const [draftCustomUrl, setDraftCustomUrl] = useState("");

  // Keep every story link's href in sync with the current preferences. This
  // component lives in the persistent layout, so it must also re-run after
  // client-side navigation swaps in a new article — hence the pathname dep.
  useEffect(() => {
    document
      .querySelectorAll<HTMLAnchorElement>("a[data-article-url]")
      .forEach((a) => {
        const url = a.dataset.articleUrl;
        if (url) a.href = buildChatUrl(provider, prompt, url, customUrl);
      });
  }, [provider, prompt, customUrl, pathname]);

  // Auto-grow the textarea to fit its content. A closed dialog is
  // display:none, so this must also run when the dialog opens.
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };
  useEffect(resizeTextarea, [draftPrompt]);

  const openDialog = () => {
    setDraftPrompt(prompt);
    setDraftProvider(provider);
    setDraftCustomUrl(customUrl);
    dialogRef.current?.showModal();
    // The draft renders after this handler; measure once it has.
    requestAnimationFrame(resizeTextarea);
  };

  const customUrlInvalid =
    draftProvider === "custom" && !isValidCustomUrl(draftCustomUrl);

  const save = () => {
    if (customUrlInvalid) return;
    // An all-whitespace prompt saves as the default rather than nothing.
    // Only non-default prompts persist, so a future change to DEFAULT_PROMPT
    // isn't shadowed by a stale stored copy of the old default.
    const value = draftPrompt.trim() ? draftPrompt : DEFAULT_PROMPT;
    promptStore.set(value === DEFAULT_PROMPT ? null : value);
    providerStore.set(draftProvider);
    customUrlStore.set(draftCustomUrl.trim() || null);
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Ask AI settings"
        title="Ask AI settings"
        onClick={openDialog}
        className="self-center text-muted transition-colors hover:text-foreground"
      >
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          // Only clicks on the backdrop hit the dialog element itself.
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        className="m-auto w-full max-w-md rounded-xl border border-border bg-background p-0 text-sm text-foreground shadow-lg backdrop:bg-black/40"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Discuss with AI</h2>
            <button
              type="button"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
              className="text-muted transition-colors hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <p className="mt-3 text-muted">
            Each story&apos;s <span className="underline">Ask AI</span> link
            opens{" "}
            <label htmlFor="discuss-provider" className="sr-only">
              AI provider
            </label>
            <span className="relative inline-block">
              <select
                id="discuss-provider"
                value={draftProvider}
                onChange={(e) => {
                  if (isProviderId(e.target.value)) {
                    setDraftProvider(e.target.value);
                  }
                }}
                className="cursor-pointer appearance-none rounded-md border border-border bg-background py-0.5 pl-2 pr-6 text-foreground hover:border-muted focus:outline-none focus:border-muted"
              >
                {Object.values(PROVIDERS).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
                <option value="custom">Custom</option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs text-muted"
              >
                ▾
              </span>
            </span>{" "}
            with the article&apos;s link and this prompt:
          </p>
          {draftProvider === "custom" && (
            <div className="mt-3">
              <label htmlFor="discuss-custom-url" className="text-muted">
                Chat URL
              </label>
              <input
                id="discuss-custom-url"
                type="url"
                value={draftCustomUrl}
                placeholder={CUSTOM_URL_EXAMPLE}
                onChange={(e) => setDraftCustomUrl(e.target.value)}
                aria-invalid={customUrlInvalid}
                aria-describedby="discuss-custom-url-help"
                className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-muted"
              />
              <p id="discuss-custom-url-help" className="mt-1 text-xs text-muted">
                Base URL up to and including the query parameter — the prompt
                and article link are appended, URL-encoded. For example,{" "}
                <code>{CUSTOM_URL_EXAMPLE}</code> becomes{" "}
                <code>{CUSTOM_URL_EXAMPLE}Summarize%20this…</code>
              </p>
            </div>
          )}
          <label htmlFor="discuss-prompt" className="sr-only">
            Prompt to send with each article link
          </label>
          <textarea
            ref={textareaRef}
            id="discuss-prompt"
            rows={1}
            value={draftPrompt}
            maxLength={MAX_PROMPT_LENGTH}
            onChange={(e) => setDraftPrompt(e.target.value)}
            className="mt-3 block w-full resize-none overflow-hidden rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-muted"
          />
          <div className="mt-4 flex items-center justify-between">
            <span>
              {draftPrompt !== DEFAULT_PROMPT && (
                <button
                  type="button"
                  onClick={() => setDraftPrompt(DEFAULT_PROMPT)}
                  className="text-xs text-muted underline hover:text-foreground focus:outline-none focus-visible:text-foreground"
                >
                  reset
                </button>
              )}
            </span>
            <button
              type="button"
              onClick={save}
              disabled={customUrlInvalid}
              title={
                customUrlInvalid
                  ? "Enter a chat URL starting with https://"
                  : undefined
              }
              className="rounded-md bg-accent px-3 py-1 font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
