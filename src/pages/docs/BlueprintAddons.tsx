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
};

const addonNames = [
  "Player-Listing",
  "Refresh-Theme",
  "MC-Logs",
  "Server-Backgrounds",
  "Translations",
  "Resource-Alerts",
  "Console-Logs",
  "Laravel-Logs",
  "Resource-Manager",
  "blueprint-translations",
];

export function BlueprintAddons() {
  const [repositories, setRepositories] = useState<Repository[] | null>(null);

  useEffect(() => {
    document.body.classList.add("docs-page");
    void Promise.all(
      addonNames.map(async (name) => {
        const { data } = await axios.get<Repository>(
          `https://api.github.com/repos/EuphoriaTheme/${name}`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        return data;
      }),
    )
      .then((results) =>
        setRepositories(
          results
            .filter(
              (repository): repository is Repository => repository !== null,
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
            <Link className="active" to="/docs/community/blueprint-addons">
              Blueprint Addons
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
              <Link className="active" to="/docs/community/blueprint-addons">
                Blueprint Addons
              </Link>
              <Link to="/docs/community/refresh-theme">Refresh Theme</Link>
              <Link to="/docs/community/endstone-plugins">
                Endstone Plugins
              </Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Blueprint Addons</h2>
              <p>
                Repository overview for EuphoriaTheme addons typically used with
                Blueprint and the Euphoria panel ecosystem.
              </p>
              <div className="callout">
                <p>
                  Cards include live GitHub metadata: stars, forks, and
                  language. Use repository and release links for installation
                  artifacts and source updates.
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Addon Repositories</h2>
              <div className="doc-list">
                {repositories === null && (
                  <div className="doc-item">
                    <h3>Loading addon repositories…</h3>
                    <div className="doc-meta">
                      <span>Fetching from GitHub</span>
                    </div>
                  </div>
                )}
                {repositories?.map((repository) => (
                  <div className="doc-item" key={repository.html_url}>
                    <h3>{repository.name}</h3>
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
                    <h3>Unable to load addon repositories right now.</h3>
                    <div className="doc-meta">
                      <span>GitHub API unavailable or rate limited</span>
                    </div>
                    <div className="doc-actions">
                      <a
                        className="text-link"
                        href="https://github.com/orgs/EuphoriaTheme/repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open EuphoriaTheme Repositories
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/community/web-apps">
                  ← Web Apps
                </Link>
                <Link className="text-link" to="/docs/community/refresh-theme">
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
