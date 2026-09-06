import { useEffect } from "react";
import { Link } from "react-router-dom";

export function ResourceAlerts() {
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
            <Link className="active" to="/docs/setup/resource-alerts">
              Resource Alerts
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
              <Link to="/docs/setup/translations">Translations</Link>
              <Link className="active" to="/docs/setup/resource-alerts">
                Resource Alerts
              </Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Alert Configuration</h2>
              <ol>
                <li>
                  Open Blueprint Extensions and select{" "}
                  <strong>Resource Alerts</strong>.
                </li>
                <li>Set CPU, memory, and disk alert thresholds.</li>
                <li>Configure an action-button URL for incident response.</li>
              </ol>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-008.png"
                  alt="Resource alerts setup example"
                />
              </figure>
            </article>
            <article className="panel">
              <h2>Tuning Strategy</h2>
              <p>
                Start with broader thresholds to prevent noisy alerts, then
                tighten them as real load patterns become clear.
              </p>
              <div className="callout">
                <p>
                  Too-aggressive limits can create alert fatigue and reduce
                  response quality during real incidents.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/setup/translations">
                  ← Translations
                </Link>
                <Link
                  className="text-link"
                  to="/docs/legal-and-terms/terms-and-conditions"
                >
                  Terms &amp; Conditions →
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
