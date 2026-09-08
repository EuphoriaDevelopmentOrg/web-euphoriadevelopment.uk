import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { euphoriaLicensing, freePaste, paidPaste } from "../../utils/web-apps";

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
    <>
      <article className="panel">
        <h2>Web Applications</h2>
        <p>
          This page tracks the web apps and tools currently listed on the main
          site.
        </p>
        <div className="callout">
          <p>
            Projects may be paid or open-source. Crafatar has moved to
            NitroCraft. Open-source entries below show live GitHub metadata.
          </p>
        </div>
      </article>
      <article className="panel">
        <h2>Available Apps</h2>
        <div className="doc-list">
          <div className="doc-item">
            <h3>{paidPaste.name}</h3>
            <div className="doc-meta">
              <span>Paid</span>
              <span>Paste Platform</span>
            </div>
            <div className="doc-actions">
              {paidPaste.links.map(({ label, href }) => (
                <a
                  key={href}
                  className="text-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="doc-item">
            <h3>{freePaste.name}</h3>
            <div className="doc-meta">
              <span>Free</span>
              {meta("paste")}
            </div>
            <p>Open-source fork of Haste, a pastebin written for Node.js.</p>
            <div className="doc-actions">
              <a
                className="text-link"
                href={`https://github.com/${freePaste.repository}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              {freePaste.links.map(({ label, href }) => (
                <a
                  key={href}
                  className="text-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="doc-item">
            <h3>Euphoria Licensing</h3>
            <div className="doc-meta">
              <span>Proprietary</span>
              <span>Self-Hosted</span>
            </div>
            <p>
              License operations web application for product validation,
              distribution controls, and admin management.
            </p>
            <div className="doc-actions">
              {euphoriaLicensing.links.map(({ label, href }) => (
                <a
                  key={href}
                  className="text-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
              <Link
                className="text-link"
                to="/docs/community/euphoria-licensing"
              >
                Deployment Docs
              </Link>
            </div>
          </div>
          <div className="doc-item">
            <h3>Crafatar</h3>
            <div className="doc-meta">
              <span>Moved to NitroCraft</span>
            </div>
            <p>
              Crafatar has moved to NitroCraft. Use NitroCraft for Minecraft
              profile assets and renders.
            </p>
            <div className="doc-actions">
              <a
                className="text-link"
                href="https://nitrocraft.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open NitroCraft
              </a>
              <Link className="text-link" to="/docs/community/nitrocraft-api">
                NitroCraft API Docs
              </Link>
              <Link className="text-link" to="/docs/community/nitrocraft-setup">
                NitroCraft Setup Guide
              </Link>
            </div>
          </div>
          <div className="doc-item">
            <h3>NitroCraft</h3>
            <div className="doc-meta">{meta("nitroCraft")}</div>
            <p>
              Full remake built on Nitro Server for high-performance avatar and
              render delivery.
            </p>
            <div className="doc-actions">
              <a
                className="text-link"
                href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <a
                className="text-link"
                href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Releases
              </a>
              <Link className="text-link" to="/docs/community/nitrocraft-api">
                API Docs
              </Link>
              <Link className="text-link" to="/docs/community/nitrocraft-setup">
                Setup Guide
              </Link>
            </div>
          </div>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link
            className="text-link"
            to="/docs/legal-and-terms/terms-and-conditions"
          >
            ← Terms &amp; Conditions
          </Link>
          <Link className="text-link" to="/docs/community/nitrocraft-api">
            NitroCraft API →
          </Link>
        </div>
      </article>
    </>
  );
}
