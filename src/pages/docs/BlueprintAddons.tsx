import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Repository = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number | null;
  forks_count: number | null;
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

const initialRepositories: Repository[] = addonNames.map((name) => ({
  name,
  html_url: `https://github.com/EuphoriaTheme/${name}`,
  description: null,
  language: null,
  stargazers_count: null,
  forks_count: null,
  pushed_at: "",
}));

export function BlueprintAddons() {
  const [repositories, setRepositories] = useState(initialRepositories);
  useEffect(() => {
    let active = true;
    for (const initial of initialRepositories) {
      void axios
        .get<Repository>(
          `https://api.github.com/repos/EuphoriaTheme/${initial.name}`,
          {
            timeout: 5000,
            headers: { Accept: "application/vnd.github+json" },
          },
        )
        .then(({ data }) => {
          if (active)
            setRepositories((previous) =>
              previous.map((repository) =>
                repository.name === initial.name
                  ? { ...data, name: initial.name, html_url: initial.html_url }
                  : repository,
              ),
            );
        })
        .catch(() => {
          /* Repository and release links remain available. */
        });
    }
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <article className="panel">
        <h2>Blueprint Addons</h2>
        <p>
          Repository overview for EuphoriaTheme addons typically used with
          Blueprint and the Euphoria panel ecosystem.
        </p>
        <div className="callout">
          <p>
            Cards include live GitHub metadata: stars, forks, and language. Use
            repository and release links for installation artifacts and source
            updates.
          </p>
        </div>
      </article>
      <article className="panel">
        <h2>Addon Repositories</h2>
        <div className="doc-list">
          {repositories.map((repository) => (
            <div className="doc-item" key={repository.html_url}>
              <h3>{repository.name}</h3>
              <div className="doc-meta">
                <span>{repository.language ?? "Unknown"}</span>
                <span>
                  {repository.stargazers_count?.toLocaleString() ??
                    "Unavailable"}{" "}
                  stars
                </span>
                <span>
                  {repository.forks_count?.toLocaleString() ?? "Unavailable"}{" "}
                  forks
                </span>
              </div>
              {repository.description && <p>{repository.description}</p>}
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
    </>
  );
}
