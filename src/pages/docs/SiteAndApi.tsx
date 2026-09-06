import { useEffect } from "react";
import { Link } from "react-router-dom";

export function SiteAndApi() {
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
            <Link className="active" to="/docs/general-guides/site-and-api">
              Site and API
            </Link>
            <Link to="/">Main Site</Link>
          </nav>
        </div>
      </header>
      <main className="docs-shell">
        <section className="docs-layout">
          <aside className="docs-sidebar">
            <h2>General Guides</h2>
            <nav>
              <Link to="/docs/general-guides/licensing">Licensing</Link>
              <Link to="/docs/general-guides/licensed-resources">
                Licensed Resources
              </Link>
              <Link className="active" to="/docs/general-guides/site-and-api">
                Site and API
              </Link>
              <Link to="/docs/general-guides/installation">Installation</Link>
              <Link to="/docs/general-guides/uninstalling">Uninstalling</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>How the API Is Used</h2>
              <p>
                Euphoria API powers panel/theme integrations such as player
                listing, game data lookups, and protected resource workflows.
              </p>
              <p>
                Some protected requests include your license key as
                authorization context.
              </p>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-007.png"
                  alt="Site and API configuration example"
                />
                <figcaption>
                  Example API configuration view from the original docs.
                </figcaption>
              </figure>
            </article>
            <article className="panel">
              <h2>Troubleshooting Order</h2>
              <ol>
                <li>Confirm license activation is valid.</li>
                <li>Check API URL and panel origin/domain.</li>
                <li>Verify proxy + CORS configuration.</li>
                <li>Retest from browser and server logs.</li>
              </ol>
              <div className="mini-meta">
                <span>Auth issues</span>
                <span>CORS issues</span>
                <span>Proxy issues</span>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link
                  className="text-link"
                  to="/docs/general-guides/licensed-resources"
                >
                  ← Licensed Resources
                </Link>
                <Link
                  className="text-link"
                  to="/docs/general-guides/installation"
                >
                  Installation →
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
