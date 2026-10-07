"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "fumadocs-core/link";
import { euphoriaLicensing, freePaste, paidPaste } from "@/utils/web-apps";

type RepoMeta = { forks: number; stars: number; language: string | null };

const repositories = {
  paste: freePaste.repository,
  nitroCraft: "EuphoriaDevelopmentOrg/NitroCraft",
} as const;

export function WebApps() {
  const [metadata, setMetadata] = useState<
    Partial<Record<keyof typeof repositories, RepoMeta | null>>
  >({});

  useEffect(() => {
    let active = true;
    for (const [key, repository] of Object.entries(repositories)) {
      void axios
        .get<{
          forks_count?: number;
          stargazers_count?: number;
          language?: string | null;
        }>(`https://api.github.com/repos/${repository}`, {
          timeout: 5000,
          headers: { Accept: "application/vnd.github+json" },
        })
        .then(({ data: repo }) => {
          if (active)
            setMetadata((previous) => ({
              ...previous,
              [key]: {
                forks: repo.forks_count ?? 0,
                stars: repo.stargazers_count ?? 0,
                language: repo.language ?? null,
              },
            }));
        })
        .catch(() => {
          if (active) setMetadata((previous) => ({ ...previous, [key]: null }));
        });
    }
    return () => {
      active = false;
    };
  }, []);

  const meta = (key: keyof typeof repositories) => {
    const repository = metadata[key];
    if (repository === null) return <span>Metadata unavailable right now</span>;
    return (
      <>
        <span>
          Forks: {repository ? repository.forks.toLocaleString() : "…"}
        </span>
        <span>
          Stars: {repository ? repository.stars.toLocaleString() : "…"}
        </span>
        <span>Language: {repository?.language ?? "…"}</span>
      </>
    );
  };

  return (
    <div className="not-prose my-6 flex flex-col gap-6">
      <div className="border-fd-border bg-fd-card rounded-xl border p-6 shadow-sm">
        <h3 className="text-fd-foreground text-lg font-semibold">
          Web Applications
        </h3>
        <p className="text-fd-muted-foreground mt-2 text-sm">
          This page tracks the web apps and tools currently listed on the main
          site.
        </p>
        <div className="border-fd-primary/30 bg-fd-primary/10 text-fd-foreground mt-4 rounded-lg border p-3 text-sm">
          Projects may be paid or open-source. Crafatar has moved to NitroCraft.
          Open-source entries below show live GitHub metadata.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="border-fd-border bg-fd-card rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-fd-foreground font-semibold">
              {paidPaste.name}
            </h4>
            <div className="flex gap-2 text-xs">
              <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-0.5">
                Paid
              </span>
              <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-0.5">
                Paste Platform
              </span>
            </div>
          </div>
          <div className="border-fd-border mt-4 flex flex-wrap gap-3 border-t pt-3 text-sm">
            {paidPaste.links.map(({ label, href }) => (
              <a
                key={href}
                className="text-fd-primary font-medium hover:underline"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="border-fd-border bg-fd-card rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-fd-foreground font-semibold">
              {freePaste.name}
            </h4>
            <div className="flex gap-2 text-xs">
              <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-0.5">
                Free
              </span>
            </div>
          </div>
          <div className="text-fd-muted-foreground mt-2 flex flex-wrap gap-2 text-xs">
            {meta("paste")}
          </div>
          <p className="text-fd-muted-foreground mt-3 text-sm">
            Open-source fork of Haste, a pastebin written for Node.js.
          </p>
          <div className="border-fd-border mt-4 flex flex-wrap gap-3 border-t pt-3 text-sm">
            <a
              className="text-fd-primary font-medium hover:underline"
              href={`https://github.com/${freePaste.repository}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub ↗
            </a>
            {freePaste.links.map(({ label, href }) => (
              <a
                key={href}
                className="text-fd-primary font-medium hover:underline"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="border-fd-border bg-fd-card rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-fd-foreground font-semibold">
              Euphoria Licensing
            </h4>
            <div className="flex gap-2 text-xs">
              <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-0.5">
                Proprietary
              </span>
              <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-0.5">
                Self-Hosted
              </span>
            </div>
          </div>
          <p className="text-fd-muted-foreground mt-3 text-sm">
            License operations web application for product validation,
            distribution controls, and admin management.
          </p>
          <div className="border-fd-border mt-4 flex flex-wrap gap-3 border-t pt-3 text-sm">
            {euphoriaLicensing.links.map(({ label, href }) => (
              <a
                key={href}
                className="text-fd-primary font-medium hover:underline"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} ↗
              </a>
            ))}
            <Link
              className="text-fd-primary font-medium hover:underline"
              href="/docs/community/euphoria-licensing"
            >
              Deployment Docs →
            </Link>
          </div>
        </div>

        <div className="border-fd-border bg-fd-card rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-fd-foreground font-semibold">Crafatar</h4>
            <div className="flex gap-2 text-xs">
              <span className="bg-fd-secondary text-fd-muted-foreground rounded-md px-2 py-0.5">
                Moved to NitroCraft
              </span>
            </div>
          </div>
          <p className="text-fd-muted-foreground mt-3 text-sm">
            Crafatar has moved to NitroCraft. Use NitroCraft for Minecraft
            profile assets and renders.
          </p>
          <div className="border-fd-border mt-4 flex flex-wrap gap-3 border-t pt-3 text-sm">
            <a
              className="text-fd-primary font-medium hover:underline"
              href="https://nitrocraft.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open NitroCraft ↗
            </a>
            <Link
              className="text-fd-primary font-medium hover:underline"
              href="/docs/community/nitrocraft-api"
            >
              NitroCraft API Docs →
            </Link>
            <Link
              className="text-fd-primary font-medium hover:underline"
              href="/docs/community/nitrocraft-setup"
            >
              NitroCraft Setup Guide →
            </Link>
          </div>
        </div>

        <div className="border-fd-border bg-fd-card rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-fd-foreground font-semibold">NitroCraft</h4>
            <div className="text-fd-muted-foreground flex gap-2 text-xs">
              {meta("nitroCraft")}
            </div>
          </div>
          <p className="text-fd-muted-foreground mt-3 text-sm">
            Full remake built on Nitro Server for high-performance avatar and
            render delivery.
          </p>
          <div className="border-fd-border mt-4 flex flex-wrap gap-3 border-t pt-3 text-sm">
            <a
              className="text-fd-primary font-medium hover:underline"
              href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub ↗
            </a>
            <a
              className="text-fd-primary font-medium hover:underline"
              href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              Releases ↗
            </a>
            <Link
              className="text-fd-primary font-medium hover:underline"
              href="/docs/community/nitrocraft-api"
            >
              API Docs →
            </Link>
            <Link
              className="text-fd-primary font-medium hover:underline"
              href="/docs/community/nitrocraft-setup"
            >
              Setup Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
