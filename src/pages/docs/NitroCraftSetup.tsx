import { useEffect } from "react";
import { Link } from "react-router-dom";

export function NitroCraftSetup() {
  useEffect(() => {
    document.body.classList.add("docs-page");
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
            <Link className="active" to="/docs/community/nitrocraft-setup">
              NitroCraft Setup
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
              <Link to="/docs/community/euphoria-licensing">
                Euphoria Licensing
              </Link>
              <Link to="/docs/community/crafatar-api">Crafatar API</Link>
              <Link to="/docs/community/crafatar-setup">Crafatar Setup</Link>
              <Link to="/docs/community/nitrocraft-api">NitroCraft API</Link>
              <Link className="active" to="/docs/community/nitrocraft-setup">
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
              <h2>Deployment Options</h2>
              <ul>
                <li>
                  <strong>Hosted:</strong> use{" "}
                  <code>https://nitrocraft.uk</code> directly.
                </li>
                <li>
                  <strong>Self-hosted:</strong> use pnpm workflows, Docker
                  Compose, or your own orchestration.
                </li>
              </ul>
              <div className="callout">
                <p>
                  For route and parameter details, see{" "}
                  <Link to="/docs/community/nitrocraft-api">
                    NitroCraft API Docs
                  </Link>
                  .
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Local Development</h2>
              <p>Recommended local workflow:</p>
              <pre>
                <code>{`corepack enable\nnvm use\npnpm install\npnpm dev`}</code>
              </pre>
              <p>Additional scripts:</p>
              <pre>
                <code>{`pnpm test\npnpm lint`}</code>
              </pre>
            </article>
            <article className="panel">
              <h2>Build and Run Production Output</h2>
              <pre>
                <code>{`pnpm build\npnpm start`}</code>
              </pre>
              <p>
                This runs the built Nitro output for production-style testing.
              </p>
            </article>
            <article className="panel">
              <h2>Docker Quick Start</h2>
              <pre>
                <code>{`cp .env.example .env\ndocker compose up -d`}</code>
              </pre>
              <p>
                Follow logs with <code>docker compose logs -f</code>.
              </p>
              <div className="callout">
                <p>
                  Render endpoints require native <code>canvas</code>{" "}
                  dependencies in the runtime image or environment.
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Key Environment Values</h2>
              <ul>
                <li>
                  <code>CACHE_BACKEND</code>: <code>redis</code>,{" "}
                  <code>memory</code>, or <code>none</code>
                </li>
                <li>
                  <code>REDIS_URL</code>: Redis connection string
                </li>
                <li>
                  <code>SESSIONS_RATE_LIMIT</code>: outbound Mojang-session
                  request limit
                </li>
                <li>
                  <code>REQUESTS_RATE_LIMIT</code> and related options: inbound
                  limiting
                </li>
                <li>
                  <code>STATUS_ALLOW_PRIVATE_TARGETS</code>: private-target
                  probing
                </li>
                <li>
                  <code>STATUS_BROWSER_*</code>: browser probe limits, timeouts,
                  and feeds
                </li>
                <li>
                  <code>PORT</code>, <code>BIND</code>,{" "}
                  <code>EXTERNAL_URL</code>: runtime networking
                </li>
                <li>
                  <code>CORS_ORIGIN</code>: browser integration policy
                </li>
                <li>
                  <code>RETENTION_*</code>: cleanup retention and interval
                  controls
                </li>
              </ul>
            </article>
            <article className="panel">
              <h2>Pterodactyl and Release Automation</h2>
              <ul>
                <li>
                  Pterodactyl{" "}
                  <a
                    href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft/blob/main/pterodactyl%20egg/egg-nitrocraft.json"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    egg-nitrocraft.json
                  </a>
                </li>
                <li>
                  Docker Hub workflow:{" "}
                  <code>.github/workflows/docker-publish.yml</code>
                </li>
                <li>
                  Release workflow:{" "}
                  <code>.github/workflows/build-release.yml</code>
                </li>
              </ul>
              <p>
                The Docker Hub workflow supports branch pushes, semantic tags,
                schedules, and manual dispatch.
              </p>
            </article>
            <article className="panel">
              <h2>Reverse Proxy Example (NGINX)</h2>
              <pre>
                <code>{`server {\n  listen 443 ssl http2;\n  server_name nitrocraft.example.com;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Forwarded-Proto $scheme;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  }\n}`}</code>
              </pre>
            </article>
            <article className="panel">
              <h2>Validation and Troubleshooting</h2>
              <pre>
                <code>{`curl -fsS https://nitrocraft.example.com/docs\ncurl -fsS https://nitrocraft.example.com/metrics\ncurl -fsS "https://nitrocraft.example.com/status/server?address=example.org&edition=auto"`}</code>
              </pre>
              <ul>
                <li>
                  For render failures, verify native <code>canvas</code>{" "}
                  dependencies.
                </li>
                <li>
                  For unexpected status-probe failures, check{" "}
                  <code>STATUS_ALLOW_PRIVATE_TARGETS</code> and rate limits.
                </li>
                <li>
                  For blocked browser calls, verify <code>CORS_ORIGIN</code> and
                  proxy headers.
                </li>
                <li>
                  When Redis is unavailable, switch to memory backend and review
                  fallback persistence.
                </li>
              </ul>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/community/nitrocraft-api">
                  ← NitroCraft API
                </Link>
                <Link
                  className="text-link"
                  to="/docs/community/blueprint-addons"
                >
                  Blueprint Addons →
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
