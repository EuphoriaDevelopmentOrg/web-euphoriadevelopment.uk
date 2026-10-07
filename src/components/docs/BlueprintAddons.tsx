"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="not-prose my-6 flex flex-col gap-6">
      <div className="border-fd-border bg-fd-card rounded-xl border p-6 shadow-sm">
        <h3 className="text-fd-foreground text-lg font-semibold">
          Blueprint Addons
        </h3>
        <p className="text-fd-muted-foreground mt-2 text-sm">
          Repository overview for EuphoriaTheme addons typically used with
          Blueprint and the Euphoria panel ecosystem.
        </p>
        <div className="border-fd-primary/30 bg-fd-primary/10 text-fd-foreground mt-4 rounded-lg border p-3 text-sm">
          Cards include live GitHub metadata: stars, forks, and language. Use
          repository and release links for installation artifacts and source
          updates.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {repositories.map((repository) => (
          <div
            key={repository.html_url}
            className="border-fd-border bg-fd-card hover:border-fd-primary/50 flex flex-col justify-between rounded-xl border p-5 transition-colors"
          >
            <div>
              <h4 className="text-fd-foreground font-semibold">
                {repository.name}
              </h4>
              <div className="text-fd-muted-foreground mt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                  {repository.language ?? "Unknown"}
                </span>
                <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                  {repository.stargazers_count?.toLocaleString() ??
                    "Unavailable"}{" "}
                  stars
                </span>
                <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                  {repository.forks_count?.toLocaleString() ?? "Unavailable"}{" "}
                  forks
                </span>
              </div>
              {repository.description && (
                <p className="text-fd-muted-foreground mt-3 text-sm">
                  {repository.description}
                </p>
              )}
            </div>
            <div className="border-fd-border mt-4 flex gap-3 border-t pt-3 text-sm">
              <a
                className="text-fd-primary font-medium hover:underline"
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repository ↗
              </a>
              <a
                className="text-fd-primary font-medium hover:underline"
                href={`${repository.html_url}/releases`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Releases ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
