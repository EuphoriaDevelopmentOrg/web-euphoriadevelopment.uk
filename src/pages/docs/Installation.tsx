import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Installation() {
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
            <Link className="active" to="/docs/general-guides/installation">
              Installation
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
              <Link className="active" to="/docs/general-guides/installation">
                Installation
              </Link>
              <Link to="/docs/general-guides/uninstalling">Uninstalling</Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Requirements</h2>
              <ul>
                <li>Working Pterodactyl installation</li>
                <li>Blueprint Framework installed</li>
                <li>Purchased Euphoria resource file</li>
              </ul>
            </article>
            <article className="panel">
              <h2>Install Commands</h2>
              <ol>
                <li>
                  Move the resource file to the panel root:{" "}
                  <code>/var/www/pterodactyl</code>
                </li>
                <li>
                  Run <code>cd /var/www/pterodactyl</code>
                </li>
                <li>
                  Run <code>blueprint -i Extension.blueprint</code>
                </li>
                <li>Wait for installation to finish.</li>
              </ol>
              <p>
                Example:{" "}
                <code>
                  mv /home/username/Extension.blueprint /var/www/pterodactyl
                </code>
              </p>
            </article>
            <article className="panel">
              <div className="callout">
                <p>
                  Keep a backup or snapshot before installing on a production
                  panel so you can roll back quickly.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link
                  className="text-link"
                  to="/docs/general-guides/site-and-api"
                >
                  ← Site and API
                </Link>
                <Link
                  className="text-link"
                  to="/docs/general-guides/uninstalling"
                >
                  Uninstalling →
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
