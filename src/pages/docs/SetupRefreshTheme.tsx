import { useEffect } from "react";
import { Link } from "react-router-dom";

export function SetupRefreshTheme() {
  useEffect(() => {
    document.body.classList.add("docs-page");
    return () => document.body.classList.remove("docs-page");
  }, []);

  return (
    <div>
      <header className="docs-topbar">
        <div className="docs-topbar-inner">
          <Link className="docs-brand" to="/docs">
            <img src="/images/euphoria.png" alt="Euphoria Development" />
            <span>Euphoria Development Docs</span>
          </Link>
          <nav className="docs-nav">
            <Link to="/docs">Home</Link>
            <Link className="active" to="/docs/setup/refresh-theme">
              Refresh Theme
            </Link>
            <Link to="/">Main Site</Link>
          </nav>
        </div>
      </header>
      <main className="docs-shell">
        <section className="docs-layout">
          <aside className="docs-sidebar">
            <h2>Setup</h2>
            <nav>
              <Link to="/docs/setup/player-listing">Player Listing</Link>
              <Link className="active" to="/docs/setup/refresh-theme">
                Refresh Theme
              </Link>
              <Link to="/docs/setup/mc-logs">MC Logs</Link>
              <Link to="/docs/setup/server-backgrounds">
                Server Backgrounds
              </Link>
              <Link to="/docs/setup/translations">Translations</Link>
              <Link to="/docs/setup/resource-alerts">Resource Alerts</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Refresh Workflow</h2>
              <ol>
                <li>Open Blueprint Extensions.</li>
                <li>
                  Select <strong>Refresh Theme</strong>.
                </li>
                <li>Apply updated settings, such as primary color.</li>
                <li>Reload the panel and verify visual changes.</li>
              </ol>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-010.png"
                  alt="Refresh theme page example"
                />
              </figure>
            </article>
            <article className="panel">
              <h2>If Changes Don&apos;t Show</h2>
              <ul>
                <li>Purge Cloudflare or edge cache.</li>
                <li>Clear browser cache and hard refresh.</li>
                <li>Wait for cache propagation if the CDN is still stale.</li>
              </ul>
              <div className="callout">
                <p>
                  Most “theme not updating” reports are cache-related, not
                  installation failures.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/setup/player-listing">
                  ← Player Listing
                </Link>
                <Link className="text-link" to="/docs/setup/mc-logs">
                  MC Logs →
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <footer className="docs-footer">
        <div className="docs-footer-inner">
          <span>© Euphoria Development</span>
          <nav>
            <Link to="/docs">Docs Home</Link>
            <Link to="/legal/terms-and-conditions">Site Terms</Link>
            <Link to="/legal/privacy-policy">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
