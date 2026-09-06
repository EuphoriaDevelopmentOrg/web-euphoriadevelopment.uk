import { useEffect } from "react";
import { Link } from "react-router-dom";

export function StreamLink() {
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
            <Link className="active" to="/docs/community/streamlink">
              StreamLink
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
              <Link className="active" to="/docs/community/streamlink">
                StreamLink
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
              <Link to="/docs/community/endstone-plugins">
                Endstone Plugins
              </Link>
            </nav>
          </aside>
          <div className="docs-content panel-grid">
            <article className="panel">
              <h2>Overview</h2>
              <p>
                <strong>StreamLink</strong> is a cross-platform Xbox streaming
                client scaffold with a shared Nuxt 4 application core and native
                wrappers for desktop and mobile.
              </p>
              <div className="callout">
                <p>
                  Repository:{" "}
                  <a
                    href="https://github.com/EuphoriaDevelopmentOrg/StreamLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/EuphoriaDevelopmentOrg/StreamLink
                  </a>
                </p>
              </div>
              <div className="doc-actions">
                <a
                  className="text-link"
                  href="https://github.com/EuphoriaDevelopmentOrg/StreamLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
                <Link className="text-link" to="/docs/community/web-apps">
                  Back to Web Apps
                </Link>
              </div>
            </article>
            <article className="panel">
              <h2>Stack and Layout</h2>
              <ul>
                <li>
                  <strong>Core app:</strong> Nuxt 4, Nitro, TypeScript, Tailwind
                  CSS, Pinia
                </li>
                <li>
                  <strong>Security and PWA:</strong> nuxt-security,
                  @vite-pwa/nuxt
                </li>
                <li>
                  <strong>Data and auth:</strong> Drizzle ORM with local SQLite
                  (@libsql/client), better-auth
                </li>
                <li>
                  <strong>Desktop:</strong> Tauri v2 wrapper in{" "}
                  <code>apps/desktop</code>
                </li>
                <li>
                  <strong>Mobile:</strong> Capacitor wrapper in{" "}
                  <code>apps/mobile</code>
                </li>
                <li>
                  <strong>Shared app core:</strong> <code>apps/web</code>
                </li>
              </ul>
            </article>
            <article className="panel">
              <h2>Quick Start</h2>
              <p>Use this flow for first local startup:</p>
              <pre>
                <code>{`pnpm install\npnpm --filter @streamlink/web db:migrate\npnpm dev\npnpm desktop:dev\npnpm mobile:sync`}</code>
              </pre>
              <div className="callout">
                <p>
                  On Windows, reopen the terminal after installing Rust, Java,
                  or Android tooling so updated PATH and JAVA_HOME values are
                  loaded.
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Environment</h2>
              <p>
                Copy <code>apps/web/.env.example</code> to{" "}
                <code>apps/web/.env</code> and set values before production use.
              </p>
              <ul>
                <li>
                  <code>DATABASE_URL</code>: defaults to{" "}
                  <code>file:./.data/streamlink.sqlite</code>
                </li>
                <li>
                  <code>XBOX_CLIENT_ID</code>, <code>XBOX_REDIRECT_URI</code>,
                  and optional <code>XBOX_CLIENT_SECRET</code> for browser OAuth
                  mode
                </li>
                <li>
                  <code>XBOX_XSTS_RELYING_PARTY</code>: optional advanced
                  setting, default <code>http://xboxlive.com</code>
                </li>
                <li>
                  <code>XBOX_STREAM_SESSION_ENDPOINT</code>: optional custom
                  stream-session broker endpoint
                </li>
              </ul>
            </article>
            <article className="panel">
              <h2>Native Build and Run</h2>
              <h3>Desktop (Windows/Linux)</h3>
              <ul>
                <li>
                  Dev runtime: <code>pnpm desktop:dev</code>
                </li>
                <li>
                  Release build: <code>pnpm desktop:build</code>
                </li>
              </ul>
              <h3>Android</h3>
              <ul>
                <li>
                  Sync assets: <code>pnpm mobile:sync</code>
                </li>
                <li>
                  Build debug APK: <code>pnpm mobile:build:android</code>
                </li>
                <li>
                  Run: <code>pnpm mobile:run:android</code>
                </li>
                <li>
                  Open Android Studio: <code>pnpm mobile:open:android</code>
                </li>
              </ul>
              <p>
                APK:{" "}
                <code>
                  apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk
                </code>
              </p>
              <h3>iOS</h3>
              <p>
                Wrapper generation is supported; full build and run require
                macOS and Xcode.
              </p>
            </article>
            <article className="panel">
              <h2>Integration Routes</h2>
              <ul>
                <li>
                  <code>/api/auth/*</code> Better Auth routes
                </li>
                <li>
                  <code>GET /api/integrations/xbox/link/callback</code> OAuth
                  callback
                </li>
                <li>
                  <code>POST /api/integrations/xbox/link/device/start</code>{" "}
                  device-code start
                </li>
                <li>
                  <code>POST /api/integrations/xbox/link/device/complete</code>{" "}
                  device-code completion
                </li>
              </ul>
            </article>
            <article className="panel">
              <h2>Troubleshooting</h2>
              <ul>
                <li>
                  <strong>Desktop build fails:</strong> confirm Rust is in PATH.
                </li>
                <li>
                  <strong>Android tasks fail:</strong> verify Android SDK, Java,
                  and accepted licenses.
                </li>
                <li>
                  <strong>Auth flow issues:</strong> check redirect URI and
                  Better Auth base URL.
                </li>
                <li>
                  <strong>Database errors:</strong> confirm{" "}
                  <code>DATABASE_URL</code> is writable.
                </li>
              </ul>
              <div className="callout">
                <p>
                  Media transport and player handling are still pending for
                  complete end-to-end video playback.
                </p>
              </div>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/community/web-apps">
                  ← Web Apps
                </Link>
                <Link className="text-link" to="/docs/community/crafatar-api">
                  Crafatar API →
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
