import { useEffect } from "react";
import { Link } from "react-router-dom";

export function LicensedResources() {
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
            <Link
              className="active"
              to="/docs/general-guides/licensed-resources"
            >
              Licensed Resources
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
              <Link
                className="active"
                to="/docs/general-guides/licensed-resources"
              >
                Licensed Resources
              </Link>
              <Link to="/docs/general-guides/site-and-api">Site and API</Link>
              <Link to="/docs/general-guides/installation">Installation</Link>
              <Link to="/docs/general-guides/uninstalling">Uninstalling</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Licensed Products</h2>
              <p>
                These products require valid license activation before protected
                features become available.
              </p>
              <ul>
                <li>Euphoria Theme</li>
                <li>Euphoria Paste (Paid Version)</li>
                <li>
                  <Link to="/docs/community/euphoria-licensing">
                    Euphoria Licensing
                  </Link>
                </li>
              </ul>
            </article>
            <article className="panel">
              <h2>What Happens Without Activation</h2>
              <p>
                If a key is missing or invalid, licensed modules may stay
                disabled and API requests to protected endpoints may fail.
              </p>
              <div className="callout">
                <p>
                  Always complete licensing first before troubleshooting
                  panel/API setup.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/general-guides/licensing">
                  ← Licensing
                </Link>
                <Link
                  className="text-link"
                  to="/docs/general-guides/site-and-api"
                >
                  Site and API →
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
