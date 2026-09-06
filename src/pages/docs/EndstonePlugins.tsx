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
  pushed_at: string;
  archived: boolean;
  fork: boolean;
};

export function EndstonePlugins() {
  const [repositories, setRepositories] = useState<Repository[] | null>(null);

  useEffect(() => {
    document.body.classList.add("docs-page");
    void axios
      .get<Repository[]>(
        "https://api.github.com/orgs/EuphoriaDevelopmentOrg/repos?per_page=100&sort=updated",
        { headers: { Accept: "application/vnd.github+json" } },
      )
      .then(({ data: results }) =>
        setRepositories(
          results
            .filter(
              (repository) =>
                !repository.archived &&
                !repository.fork &&
                /-endstone$/i.test(repository.name),
            )
            .sort(
              (a, b) =>
                new Date(b.pushed_at).getTime() -
                new Date(a.pushed_at).getTime(),
            ),
        ),
      )
      .catch(() => setRepositories([]));
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
            <Link className="active" to="/docs/community/endstone-plugins">
              Endstone Plugins
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
              <Link to="/docs/community/refresh-theme">Refresh Theme</Link>
              <Link className="active" to="/docs/community/endstone-plugins">
                Endstone Plugins
              </Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Endstone Plugins</h2>
              <p>
                Live repository list from{" "}
                <a
                  href="https://github.com/EuphoriaDevelopmentOrg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EuphoriaDevelopmentOrg
                </a>
                . Repositories ending in <code>-endstone</code> are included.
              </p>
              <div className="callout">
                <p>
                  If GitHub API is rate-limited, use the fallback button to
                  browse all Endstone repositories directly.
                </p>
              </div>
              <div className="doc-actions">
                <a
                  className="text-link"
                  href="https://github.com/EuphoriaDevelopmentOrg?tab=repositories&q=Endstone"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse All Endstone Repos
                </a>
              </div>
            </article>
            <article className="panel">
              <h2>Plugin Repositories</h2>
              <div className="doc-list">
                {repositories === null && (
                  <div className="doc-item">
                    <h3>Loading plugins…</h3>
                    <div className="doc-meta">
                      <span>Fetching from GitHub</span>
                    </div>
                  </div>
                )}
                {repositories?.map((repository) => (
                  <div className="doc-item" key={repository.html_url}>
                    <h3>{repository.name.replace(/-endstone$/i, "")}</h3>
                    <div className="doc-meta">
                      <span>{repository.language ?? "Unknown"}</span>
                      <span>
                        {repository.stargazers_count.toLocaleString()} stars
                      </span>
                      <span>
                        {repository.forks_count.toLocaleString()} forks
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
                    </div>
                  </div>
                ))}
                {repositories?.length === 0 && (
                  <div className="doc-item">
                    <h3>Unable to load plugins right now.</h3>
                    <div className="doc-meta">
                      <span>
                        GitHub API unavailable, rate limited, or no repositories
                        found.
                      </span>
                    </div>
                    <div className="doc-actions">
                      <a
                        className="text-link"
                        href="https://github.com/EuphoriaDevelopmentOrg?tab=repositories&q=Endstone"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open GitHub Repository List
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/community/refresh-theme">
                  ← Refresh Theme
                </Link>
                <Link className="text-link" to="/docs">
                  Back to Docs Home →
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
