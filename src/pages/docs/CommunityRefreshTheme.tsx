import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Repository = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
};

export function CommunityRefreshTheme() {
  const [repository, setRepository] = useState<Repository | null | undefined>(
    undefined,
  );

  useEffect(() => {
    document.body.classList.add("docs-page");
    void axios
      .get<Repository>(
        "https://api.github.com/repos/EuphoriaTheme/Refresh-Theme",
        {
          headers: { Accept: "application/vnd.github+json" },
        },
      )
      .then(({ data }) => setRepository(data))
      .catch(() => setRepository(null));
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
            <Link className="active" to="/docs/community/refresh-theme">
              Refresh Theme
            </Link>
            <Link to="/">Main Site</Link>
          </nav>
        </div>
      </header>
      <main className="docs-shell">
        <section className="docs-layout">
          <aside className="docs-sidebar">
            <h2>Community</h2>
            <nav>
              <Link to="/docs/community/web-apps">Web Apps</Link>
              <Link to="/docs/community/streamlink">StreamLink</Link>
              <Link to="/docs/community/euphoria-licensing">
                Euphoria Licensing
              </Link>
              <Link to="/docs/community/crafatar-api">Crafatar API</Link>
              <Link to="/docs/community/crafatar-setup">Crafatar Setup</Link>
              <Link to="/docs/community/nitrocraft-api">NitroCraft API</Link>
              <Link to="/docs/community/nitrocraft-setup">
                NitroCraft Setup
              </Link>
              <Link to="/docs/community/blueprint-addons">
                Blueprint Addons
              </Link>
              <Link className="active" to="/docs/community/refresh-theme">
                Refresh Theme
              </Link>
              <Link to="/docs/community/endstone-plugins">
                Endstone Plugins
              </Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Refresh Theme (GitHub)</h2>
              <p>
                This page tracks the <code>EuphoriaTheme/Refresh-Theme</code>{" "}
                repository with live metadata and release links.
              </p>
              <div className="callout">
                <p>
                  For panel usage steps, see{" "}
                  <Link to="/docs/setup/refresh-theme">
                    Refresh Theme Setup
                  </Link>
                  .
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Repository Snapshot</h2>
              <div className="doc-list">
                {repository === undefined && (
                  <div className="doc-item">
                    <h3>Loading Refresh Theme repository…</h3>
                    <div className="doc-meta">
                      <span>Fetching from GitHub</span>
                    </div>
                  </div>
                )}
                {repository && (
                  <div className="doc-item">
                    <h3>{repository.name}</h3>
                    <div className="doc-meta">
                      <span>{repository.language ?? "Unknown"}</span>
                      <span>
                        {repository.stargazers_count.toLocaleString()} stars
                      </span>
                      <span>
                        {repository.forks_count.toLocaleString()} forks
                      </span>
                      <span>
                        {repository.open_issues_count.toLocaleString()} open
                        issues
                      </span>
                    </div>
                    <p>
                      {repository.description ?? "No description provided."}
                    </p>
                    <div className="doc-actions">
                      <a
                        className="text-link"
                        href={repository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repository
                      </a>
                      <a
                        className="text-link"
                        href={`${repository.html_url}/releases`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Releases
                      </a>
                      <a
                        className="text-link"
                        href={`${repository.html_url}/issues`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Issues
                      </a>
                    </div>
                  </div>
                )}
                {repository === null && (
                  <div className="doc-item">
                    <h3>Unable to load Refresh Theme repository right now.</h3>
                    <div className="doc-meta">
                      <span>GitHub API unavailable or rate limited</span>
                    </div>
                    <div className="doc-actions">
                      <a
                        className="text-link"
                        href="https://github.com/EuphoriaTheme/Refresh-Theme"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Repository
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link
                  className="text-link"
                  to="/docs/community/blueprint-addons"
                >
                  ← Blueprint Addons
                </Link>
                <Link
                  className="text-link"
                  to="/docs/community/endstone-plugins"
                >
                  Endstone Plugins →
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
