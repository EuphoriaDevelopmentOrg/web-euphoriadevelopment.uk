"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "fumadocs-core/link";

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
    <div className="not-prose my-6 flex flex-col gap-6">
      <div className="border-fd-border bg-fd-card rounded-xl border p-6 shadow-sm">
        <h3 className="text-fd-foreground text-lg font-semibold">
          Refresh Theme (GitHub)
        </h3>
        <p className="text-fd-muted-foreground mt-2 text-sm">
          This page tracks the <code>EuphoriaTheme/Refresh-Theme</code>{" "}
          repository with live metadata and release links.
        </p>
        <div className="border-fd-primary/30 bg-fd-primary/10 text-fd-foreground mt-4 rounded-lg border p-3 text-sm">
          For panel usage steps, see{" "}
          <Link
            className="text-fd-primary font-medium underline"
            href="/docs/setup/refresh-theme"
          >
            Refresh Theme Setup
          </Link>
          .
        </div>
      </div>

      <div className="border-fd-border bg-fd-card rounded-xl border p-6">
        <h3 className="text-fd-foreground text-base font-semibold">
          Repository Snapshot
        </h3>

        {repository === undefined && (
          <div className="border-fd-border mt-4 rounded-lg border p-4">
            <h4 className="text-fd-foreground font-medium">
              Loading Refresh Theme repository…
            </h4>
            <p className="text-fd-muted-foreground mt-1 text-xs">
              Fetching from GitHub
            </p>
          </div>
        )}

        {repository && (
          <div className="border-fd-border mt-4 rounded-lg border p-5">
            <h4 className="text-fd-foreground text-base font-semibold">
              {repository.name}
            </h4>
            <div className="text-fd-muted-foreground mt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                {repository.language ?? "Unknown"}
              </span>
              <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                {repository.stargazers_count.toLocaleString()} stars
              </span>
              <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                {repository.forks_count.toLocaleString()} forks
              </span>
              <span className="bg-fd-secondary rounded-md px-2 py-0.5">
                {repository.open_issues_count.toLocaleString()} open issues
              </span>
            </div>
            <p className="text-fd-muted-foreground mt-3 text-sm">
              {repository.description ?? "No description provided."}
            </p>
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
              <a
                className="text-fd-primary font-medium hover:underline"
                href={`${repository.html_url}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues ↗
              </a>
            </div>
          </div>
        )}

        {repository === null && (
          <div className="border-fd-border mt-4 rounded-lg border p-4">
            <h4 className="text-fd-foreground font-medium">
              Unable to load Refresh Theme repository right now.
            </h4>
            <p className="text-fd-muted-foreground mt-1 text-xs">
              GitHub API unavailable or rate limited
            </p>
            <div className="mt-3">
              <a
                className="text-fd-primary text-sm font-medium hover:underline"
                href="https://github.com/EuphoriaTheme/Refresh-Theme"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Repository ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
