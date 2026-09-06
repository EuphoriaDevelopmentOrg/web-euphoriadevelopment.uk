import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Translations() {
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
            <Link className="active" to="/docs/setup/translations">
              Translations
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
              <Link to="/docs/setup/refresh-theme">Refresh Theme</Link>
              <Link to="/docs/setup/mc-logs">MC Logs</Link>
              <Link to="/docs/setup/server-backgrounds">
                Server Backgrounds
              </Link>
              <Link className="active" to="/docs/setup/translations">
                Translations
              </Link>
              <Link to="/docs/setup/resource-alerts">Resource Alerts</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Translation Setup</h2>
              <ol>
                <li>
                  Open Blueprint Extensions and choose{" "}
                  <strong>Translations</strong>.
                </li>
                <li>Select the default panel language.</li>
                <li>Enable the desired language set.</li>
              </ol>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-009.jpg"
                  alt="Translations setup example"
                />
              </figure>
            </article>
            <article className="panel">
              <h2>Rollout Recommendation</h2>
              <p>
                Enable one locale at a time, verify major pages—login,
                dashboard, and server view—then continue the rollout.
              </p>
              <div className="mini-meta">
                <span>Stage by locale</span>
                <span>Validate critical pages first</span>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/setup/server-backgrounds">
                  ← Server Backgrounds
                </Link>
                <Link className="text-link" to="/docs/setup/resource-alerts">
                  Resource Alerts →
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
