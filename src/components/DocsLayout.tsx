import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { docGroups, findPage, legalPages, normalizePath } from "../site-pages";

export function DocsLayout() {
  const { pathname } = useLocation();
  const path = normalizePath(pathname);
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
          <Link className="docs-brand" to="/docs">
            <img src="/images/euphoria.png" alt="Euphoria Development" />
            <span>Euphoria Development Docs</span>
          </Link>
          <nav className="docs-nav" aria-label="Documentation top navigation">
            <NavLink to="/docs" end>
              Home
            </NavLink>
            <Link to="/">Main Site</Link>
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
              <Link className="docs-button" to="/docs/general-guides/licensing">
                Start with Licensing
              </Link>
              <Link className="docs-button ghost" to="/">
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
                    <NavLink key={page.path} to={page.path}>
                      {page.title}
                    </NavLink>
                  ))}
                  {group.id === "legal-and-terms" &&
                    legalPages.map((page) => (
                      <Link key={page.path} to={page.path}>
                        {page.title}
                      </Link>
                    ))}
                  <Link to="/docs">Browse all documentation</Link>
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
            <Outlet />
          </div>
        </section>
      </main>
      <footer className="docs-footer">
        <div className="docs-footer-inner">
          <span>© Euphoria Development</span>
          <nav aria-label="Documentation footer">
            <Link to="/docs">Docs Home</Link>
            {legalPages.map((page) => (
              <Link key={page.path} to={page.path}>
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
