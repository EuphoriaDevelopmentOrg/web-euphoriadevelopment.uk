import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Uninstalling() {
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
            <Link className="active" to="/docs/general-guides/uninstalling">
              Uninstalling
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
              <Link to="/docs/general-guides/site-and-api">Site and API</Link>
              <Link to="/docs/general-guides/installation">Installation</Link>
              <Link className="active" to="/docs/general-guides/uninstalling">
                Uninstalling
              </Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Uninstall Steps</h2>
              <ol>
                <li>
                  Run <code>cd /var/www/pterodactyl</code>
                </li>
                <li>
                  Run <code>blueprint -r Extension.blueprint</code>
                </li>
                <li>Wait until removal is complete.</li>
              </ol>
            </article>
            <article className="panel">
              <h2>Recovery Command</h2>
              <p>
                If panel state becomes inconsistent, run{" "}
                <code>blueprint -upgrade</code> and reinstall required addons
                after maintenance.
              </p>
              <div className="callout">
                <p>
                  Schedule uninstall or upgrade work during low-traffic windows
                  and notify staff before changing the panel.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link
                  className="text-link"
                  to="/docs/general-guides/installation"
                >
                  ← Installation
                </Link>
                <Link
                  className="text-link"
                  to="/docs/euphoria-theme/theme-customiser"
                >
                  Theme Customiser →
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
