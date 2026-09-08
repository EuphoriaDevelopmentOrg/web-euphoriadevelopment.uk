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
    void axios
      .get<Repository>(
        "https://api.github.com/repos/EuphoriaTheme/Refresh-Theme",
        {
          timeout: 5000,
          headers: { Accept: "application/vnd.github+json" },
        },
      )
      .then(({ data }) => setRepository(data))
      .catch(() => setRepository(null));
  }, []);

  return (
    <>
      <article className="panel">
        <h2>Refresh Theme (GitHub)</h2>
        <p>
          This page tracks the <code>EuphoriaTheme/Refresh-Theme</code>{" "}
          repository with live metadata and release links.
        </p>
        <div className="callout">
          <p>
            For panel usage steps, see{" "}
            <Link to="/docs/setup/refresh-theme">Refresh Theme Setup</Link>.
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
                <span>{repository.forks_count.toLocaleString()} forks</span>
                <span>
                  {repository.open_issues_count.toLocaleString()} open issues
                </span>
              </div>
              <p>{repository.description ?? "No description provided."}</p>
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
          <Link className="text-link" to="/docs/community/blueprint-addons">
            ← Blueprint Addons
          </Link>
          <Link className="text-link" to="/docs">
            Back to Docs Home →
          </Link>
        </div>
      </article>
    </>
  );
}
