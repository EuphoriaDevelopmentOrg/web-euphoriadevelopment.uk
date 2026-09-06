import { useEffect } from "react";
import { Link } from "react-router-dom";

export function ServerBackgrounds() {
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
            <Link className="active" to="/docs/setup/server-backgrounds">
              Server Backgrounds
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
              <Link className="active" to="/docs/setup/server-backgrounds">
                Server Backgrounds
              </Link>
              <Link to="/docs/setup/translations">Translations</Link>
              <Link to="/docs/setup/resource-alerts">Resource Alerts</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Setup Steps</h2>
              <ol>
                <li>Open Blueprint Extensions.</li>
                <li>
                  Select <strong>Server Backgrounds</strong>.
                </li>
                <li>Assign images by server egg or server UUID.</li>
                <li>Adjust opacity for text readability.</li>
              </ol>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-004.png"
                  alt="Server backgrounds setup example"
                />
              </figure>
            </article>
            <article className="panel">
              <h2>Image Sources</h2>
              <p>
                Use your own hosted assets or default packs from Euphoria
                resource pages.
              </p>
              <div className="callout">
                <p>
                  Prefer compressed web images to reduce panel load time and
                  visual jank on slower connections.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/setup/mc-logs">
                  ← MC Logs
                </Link>
                <Link className="text-link" to="/docs/setup/translations">
                  Translations →
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
