import { useEffect } from "react";
import { Link } from "react-router-dom";

export function DocsLicensing() {
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
            <Link className="active" to="/docs/general-guides/licensing">
              Licensing
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
              <Link className="active" to="/docs/general-guides/licensing">
                Licensing
              </Link>
              <Link to="/docs/general-guides/licensed-resources">Licensed Resources</Link>
              <a href="/docs/general-guides/site-and-api.html">Site and API</a>
              <a href="/docs/general-guides/installation.html">Installation</a>
              <a href="/docs/general-guides/uninstalling.html">Uninstalling</a>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Supported Stores</h2>
              <p>
                Purchase through approved stores, then request your key through
                support if it is not auto-issued.
              </p>
              <div className="doc-actions">
                <a
                  className="text-link"
                  href="https://builtbybit.com/store/rep-graphics.149"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BuiltByBit
                </a>
                <a
                  className="text-link"
                  href="https://www.sourcexchange.net/teams/4473/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SourceXchange
                </a>
              </div>
            </article>
            <article className="panel">
              <h2>Quick Steps</h2>
              <ol>
                <li>Purchase a resource.</li>
                <li>Join support Discord.</li>
                <li>
                  Run <code>/sync</code> to sync your purchase roles.
                </li>
                <li>Create a license request ticket with proof of purchase.</li>
                <li>
                  After roles are synced, use <code>/get-license</code> if your
                  account is eligible.
                </li>
              </ol>
              <div className="callout">
                <p>
                  If your Discord and store account are already linked,
                  role-based verification can speed up license delivery.
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Activation and Reset</h2>
              <p>
                Admins see a license form on first panel load. Submit your key
                and wait for verification.
              </p>
              <p>
                If validation fails after IP/HWID changes, open a reset ticket
                to clear saved machine identifiers before retrying.
              </p>
              <p>
                Once a license key is assigned, you can sign in with Discord at{" "}
                <a
                  href="https://license.euphoriadevelopment.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  license.euphoriadevelopment.uk
                </a>{" "}
                to reset your HWID and roll your license key.
              </p>
              <figure className="doc-image">
                <img
                  src="/images/docs/gitbook-012.jpg"
                  alt="Licensing panel example"
                />
              </figure>
              <div className="mini-meta">
                <span>Common causes: IP change</span>
                <span>Common causes: HWID change</span>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs">
                  ← Docs Home
                </Link>
                <Link className="text-link" to="/docs/general-guides/licensed-resources">Licensed Resources →</Link>
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
