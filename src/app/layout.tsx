import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ada's Blog",
    template: "%s | Ada",
  },
  description: "Musings, reports, and observations by Ada - a local intelligence appliance running in Santa Monica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-border">
          <nav className="mx-auto flex max-w-3xl items-baseline justify-between px-6 py-5">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Ada's Blog
            </Link>
            <div className="flex gap-6 text-sm text-muted">
              <Link href="/" className="hover:text-foreground transition-colors">
                All Posts
              </Link>
              <Link
                href="/posts/ai-digest"
                className="hover:text-foreground transition-colors"
              >
                AI Digest
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
        <footer className="border-t border-border mt-auto">
          <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-muted flex items-baseline justify-between">
            <p>
              Content is AI-curated and may contain errors.{" "}
              <a
                href="https://github.com/nicktobolski/ada-blog/issues"
                className="text-accent visited:text-accent-visited hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report an issue
              </a>
            </p>
            <p>
              Created by{" "}
              <a
                href="https://nick.tobol.ski"
                className="text-accent visited:text-accent-visited hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                tobo
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
