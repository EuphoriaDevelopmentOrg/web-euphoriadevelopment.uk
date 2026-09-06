import { useEffect } from "react";
import { Link } from "react-router-dom";

export function McLogs() {
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
            <Link className="active" to="/docs/setup/mc-logs">
              MC Logs
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
              <Link className="active" to="/docs/setup/mc-logs">
                MC Logs
              </Link>
              <Link to="/docs/setup/server-backgrounds">
                Server Backgrounds
              </Link>
              <Link to="/docs/setup/translations">Translations</Link>
              <Link to="/docs/setup/resource-alerts">Resource Alerts</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>MC Logs Flow</h2>
              <ol>
                <li>Open a Minecraft server in the panel.</li>
                <li>
                  Open the server sub-navigation and select{" "}
                  <strong>MC Logs</strong>.
                </li>
                <li>Review, upload, or share logs for diagnostics.</li>
              </ol>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-006.jpg"
                  alt="MC Logs page example"
                />
              </figure>
            </article>
            <article className="panel">
              <h2>Best Use Cases</h2>
              <ul>
                <li>Startup crash investigation</li>
                <li>Plugin exception triage</li>
                <li>Runtime error history for support tickets</li>
              </ul>
              <div className="mini-meta">
                <span>Faster support triage</span>
                <span>Shareable diagnostics</span>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/setup/refresh-theme">
                  ← Refresh Theme
                </Link>
                <Link className="text-link" to="/docs/setup/server-backgrounds">
                  Server Backgrounds →
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
