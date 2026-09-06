import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PlayerListing() {
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
            <Link className="active" to="/docs/setup/player-listing">
              Player Listing
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
              <Link className="active" to="/docs/setup/player-listing">
                Player Listing
              </Link>
              <Link to="/docs/setup/refresh-theme">Refresh Theme</Link>
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
              <h2>Before You Start</h2>
              <ul>
                <li>Use the hosted Game API, or self-host your own API.</li>
                <li>Confirm the API endpoint is reachable from the panel.</li>
                <li>Open a game server and navigate to its Players section.</li>
              </ul>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-011.png"
                  alt="Player listing page example"
                />
              </figure>
            </article>
            <article className="panel">
              <h2>Page Controls</h2>
              <ul>
                <li>
                  <strong>Refresh</strong>: run a new API query
                </li>
                <li>
                  <strong>Select Game</strong>: pick a game profile
                </li>
                <li>
                  <strong>Custom Query Port</strong>: override the server query
                  port
                </li>
                <li>
                  <strong>Save Port</strong>: persist a custom port
                </li>
                <li>
                  <strong>Reset to Default</strong>: clear the override
                </li>
              </ul>
            </article>
            <article className="panel">
              <div className="callout">
                <p>
                  If no players are shown, verify the query port and check
                  firewall rules for game-server query traffic.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/game-api/setup-guide">
                  ← Setup Guide
                </Link>
                <Link className="text-link" to="/docs/setup/refresh-theme">
                  Refresh Theme →
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
