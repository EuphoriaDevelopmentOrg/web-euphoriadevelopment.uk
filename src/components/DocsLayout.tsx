"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { docGroups, findPage, legalPages, normalizePath } from "../site-pages";

function DocsNavLink({
  href,
  children,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname || "/");
  const targetPath = normalizePath(href);
  const isActive = exact
    ? currentPath === targetPath
    : currentPath === targetPath;

  return (
    <Link
      href={href}
      className={isActive ? "active" : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function DocsLayout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const path = normalizePath(pathname || "/docs");
  const isHome = path === "/docs";
  const page = findPage(path);
  const group = docGroups.find((group) =>
    group.pages.some((page) => page.path === path),
  );

  useEffect(() => {
    document.body.classList.add("docs-page");
    return () => document.body.classList.remove("docs-page");
  }, []);

  return (
    <div className="docs-frame">
      <a href="#docs-content" className="docs-skip-link">
        Skip to content
      </a>
      <header className="docs-topbar">
        <div className="docs-topbar-inner">
          <Link className="docs-brand" href="/docs">
            <img src="/images/euphoria.png" alt="Euphoria Development" />
            <span>Euphoria Development Docs</span>
          </Link>
          <nav className="docs-nav" aria-label="Documentation top navigation">
            <DocsNavLink href="/docs" exact>
              Home
            </DocsNavLink>
            <Link href="/">Main Site</Link>
            <a
              href="https://euphoria-development.gitbook.io/euphoria-development"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original GitBook
            </a>
            <a
              href="https://discord.euphoriadevelopment.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support Discord
            </a>
          </nav>
        </div>
      </header>
      <main className="docs-shell">
        {isHome && (
          <section className="docs-hero">
            <p className="docs-eyebrow">Euphoria Development</p>
            <h1>Documentation</h1>
            <p>
              Documentation for our themes, addons, setup options, and legal
              terms.
            </p>
            <div className="docs-hero-actions">
              <Link
                className="docs-button"
                href="/docs/general-guides/licensing"
              >
                Start with Licensing
              </Link>
              <Link className="docs-button ghost" href="/">
                Back to Main Website
              </Link>
            </div>
          </section>
        )}
        <section className="docs-layout">
          <aside className="docs-sidebar">
            <h2>{group?.title ?? "Browse docs"}</h2>
            <nav aria-label="Documentation sidebar">
              {group ? (
                <>
                  {group.pages.map((page) => (
                    <DocsNavLink key={page.path} href={page.path} exact>
                      {page.title}
                    </DocsNavLink>
                  ))}
                  {group.id === "legal-and-terms" &&
                    legalPages.map((page) => (
                      <Link key={page.path} href={page.path}>
                        {page.title}
                      </Link>
                    ))}
                  <Link href="/docs">Browse all documentation</Link>
                </>
              ) : (
                docGroups.map((group) => (
                  <a key={group.id} href={`#${group.id}`}>
                    {group.title}
                  </a>
                ))
              )}
            </nav>
          </aside>
          <div
            id="docs-content"
            className="docs-content panel-grid"
            tabIndex={-1}
          >
            {!isHome && <h1 className="docs-page-title">{page.title}</h1>}
            {children}
          </div>
        </section>
      </main>
      <footer className="docs-footer">
        <div className="docs-footer-inner">
          <span>© Euphoria Development</span>
          <nav aria-label="Documentation footer">
            <Link href="/docs">Docs Home</Link>
            {legalPages.map((page) => (
              <Link key={page.path} href={page.path}>
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
