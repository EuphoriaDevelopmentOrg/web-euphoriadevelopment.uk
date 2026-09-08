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
    Partial<Record<keyof typeof repositories, RepoMeta>>
  >({});
  const [metadataUnavailable, setMetadataUnavailable] = useState(false);

  useEffect(() => {
    document.body.classList.add("docs-page");
    void Promise.all(
      Object.entries(repositories).map(async ([key, repository]) => {
        const { data: repo } = await axios.get<{
          forks_count?: number;
          stargazers_count?: number;
          language?: string | null;
        }>(`https://api.github.com/repos/${repository}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        return [
          key,
          {
            forks: repo.forks_count ?? 0,
            stars: repo.stargazers_count ?? 0,
            language: repo.language ?? null,
          },
        ] as const;
      }),
    )
      .then((entries) => setMetadata(Object.fromEntries(entries)))
      .catch(() => setMetadataUnavailable(true));

    return () => document.body.classList.remove("docs-page");
  }, []);

  const meta = (key: keyof typeof repositories) => {
    const repository = metadata[key];
    if (metadataUnavailable) return <span>Metadata unavailable right now</span>;
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
    <div>
      <header className="docs-topbar">
        <div className="docs-topbar-inner">
          <Link className="docs-brand" to="/docs">
            <img src="/images/euphoria.png" alt="Euphoria Development" />
            <span>Euphoria Development Docs</span>
          </Link>
          <nav className="docs-nav">
            <Link to="/docs">Home</Link>
            <Link className="active" to="/docs/community/web-apps">
              Web Apps
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
              <Link className="active" to="/docs/community/web-apps">
                Web Apps
              </Link>
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
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Web Applications</h2>
              <p>
                This page tracks the web apps and tools currently listed on the
                main site.
              </p>
              <div className="callout">
                <p>
                  Projects may be paid or open-source. Crafatar has moved to
                  NitroCraft. Open-source entries below show live GitHub
                  metadata.
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
                  <p>
                    Open-source fork of Haste, a pastebin written for Node.js.
                  </p>
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
                    Crafatar has moved to NitroCraft. Use NitroCraft for
                    Minecraft profile assets and renders.
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
                    <Link
                      className="text-link"
                      to="/docs/community/nitrocraft-api"
                    >
                      NitroCraft API Docs
                    </Link>
                    <Link
                      className="text-link"
                      to="/docs/community/nitrocraft-setup"
                    >
                      NitroCraft Setup Guide
                    </Link>
                  </div>
                </div>
                <div className="doc-item">
                  <h3>NitroCraft</h3>
                  <div className="doc-meta">{meta("nitroCraft")}</div>
                  <p>
                    Full remake built on Nitro Server for high-performance
                    avatar and render delivery.
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
                    <Link
                      className="text-link"
                      to="/docs/community/nitrocraft-api"
                    >
                      API Docs
                    </Link>
                    <Link
                      className="text-link"
                      to="/docs/community/nitrocraft-setup"
                    >
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
