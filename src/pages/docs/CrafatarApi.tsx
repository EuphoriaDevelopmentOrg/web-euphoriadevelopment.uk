import { useEffect } from "react";
import { Link } from "react-router-dom";

export function CrafatarApi() {
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
            <Link className="active" to="/docs/community/crafatar-api">
              Crafatar API
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
              <Link className="active" to="/docs/community/crafatar-api">
                Crafatar API
              </Link>
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
              <h2>API Overview</h2>
              <p>
                Crafatar serves Minecraft avatars, skins, capes, and renders as
                PNG images using UUID-based routes.
              </p>
              <p>
                Hosted base URL:{" "}
                <code>https://crafatar.euphoriadevelopment.uk</code>
              </p>
              <p>
                Supported methods: <code>GET</code> and <code>HEAD</code>.
              </p>
              <div className="callout">
                <p>
                  Only UUIDs are supported; usernames are rejected. For a full
                  rewrite, see{" "}
                  <a
                    href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NitroCraft
                  </a>
                  .
                </p>
              </div>
              <div className="doc-actions">
                <a
                  className="text-link"
                  href="https://crafatar.euphoriadevelopment.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Crafatar
                </a>
                <a
                  className="text-link"
                  href="https://github.com/EuphoriaTheme/crafatar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Repository
                </a>
              </div>
            </article>
            <article className="panel">
              <h2>Endpoints</h2>
              <ul>
                <li>
                  <strong>Avatar:</strong> <code>/avatars/{"{uuid}"}</code> —{" "}
                  <code>size</code>, <code>overlay</code>/<code>helm</code>,{" "}
                  <code>default</code>
                </li>
                <li>
                  <strong>Head render:</strong>{" "}
                  <code>/renders/head/{"{uuid}"}</code> — <code>scale</code>,{" "}
                  <code>overlay</code>/<code>helm</code>, <code>default</code>
                </li>
                <li>
                  <strong>Body render:</strong>{" "}
                  <code>/renders/body/{"{uuid}"}</code> — <code>scale</code>,{" "}
                  <code>overlay</code>/<code>helm</code>, <code>default</code>
                </li>
                <li>
                  <strong>Skin:</strong> <code>/skins/{"{uuid}"}</code> —{" "}
                  <code>default</code>
                </li>
                <li>
                  <strong>Cape:</strong> <code>/capes/{"{uuid}"}</code> —{" "}
                  <code>default</code>
                </li>
              </ul>
              <p>
                Append <code>.png</code> to IDs if wanted; output remains PNG.
              </p>
              <pre>
                <code>{`GET https://crafatar.euphoriadevelopment.uk/avatars/069a79f444e94726a5befca90e38aaf5?size=128\nGET https://crafatar.euphoriadevelopment.uk/renders/head/069a79f444e94726a5befca90e38aaf5?scale=6&overlay\nGET https://crafatar.euphoriadevelopment.uk/skins/069a79f444e94726a5befca90e38aaf5.png`}</code>
              </pre>
            </article>
            <article className="panel">
              <h2>Query Parameters</h2>
              <ul>
                <li>
                  <strong>size</strong>: avatar output pixels; default{" "}
                  <code>160</code>, range <code>1-512</code>
                </li>
                <li>
                  <strong>scale</strong>: render multiplier; default{" "}
                  <code>6</code>, range <code>1-10</code>
                </li>
                <li>
                  <strong>overlay</strong>: enables the second layer; presence
                  means <code>true</code>
                </li>
                <li>
                  <strong>helm</strong>: legacy alias for <code>overlay</code>
                </li>
                <li>
                  <strong>default</strong>: fallback image: <code>steve</code>,{" "}
                  <code>alex</code>, <code>mhf_steve</code>,{" "}
                  <code>mhf_alex</code>, UUID, or HTTP(S) URL up to{" "}
                  <code>2048</code> chars
                </li>
              </ul>
              <p>
                UUIDs may be dashed or non-dashed; usernames are always invalid.
              </p>
              <div className="callout">
                <p>
                  UUID or URL fallbacks return a <code>307</code> redirect.
                </p>
              </div>
            </article>
            <article className="panel">
              <h2>Response Behavior</h2>
              <ul>
                <li>
                  <strong>200</strong>: PNG returned.
                </li>
                <li>
                  <strong>304</strong>: ETag matched or a stale cached image was
                  reused.
                </li>
                <li>
                  <strong>307</strong>: redirect to <code>default</code>{" "}
                  fallback.
                </li>
                <li>
                  <strong>404</strong>: invalid subpath or no result without
                  fallback.
                </li>
                <li>
                  <strong>422</strong>: invalid UUID, size, scale, default, or
                  render type.
                </li>
                <li>
                  <strong>500/502</strong>: upstream or server issue without
                  usable fallback.
                </li>
              </ul>
              <p>
                Headers include <code>ETag</code>,{" "}
                <code>Cache-Control: max-age=3600</code>, <code>Warning</code>,{" "}
                <code>X-Storage-Type</code>, <code>X-Request-ID</code>,{" "}
                <code>Response-Time</code>, and{" "}
                <code>Access-Control-Allow-Origin: *</code>.
              </p>
            </article>
            <article className="panel">
              <h2>Integration Examples</h2>
              <h3>HTML image</h3>
              <pre>
                <code>{`<img src="https://crafatar.euphoriadevelopment.uk/avatars/069a79f444e94726a5befca90e38aaf5?size=96&overlay" alt="Minecraft avatar" />`}</code>
              </pre>
              <h3>JavaScript cache validation</h3>
              <pre>
                <code>{`const url = "https://crafatar.euphoriadevelopment.uk/skins/069a79f444e94726a5befca90e38aaf5";\nconst res = await fetch(url, { headers: { "If-None-Match": previousEtag } });\nif (res.status === 304) { /* Keep existing image */ } else if (res.ok) {\n  const nextEtag = res.headers.get("etag");\n  const blob = await res.blob();\n}`}</code>
              </pre>
              <h3>Fallback redirect</h3>
              <pre>
                <code>
                  https://crafatar.euphoriadevelopment.uk/capes/00000000000000000000000000000000?default=https%3A%2F%2Fcdn.example.com%2Fimg%2Fno-cape.png
                </code>
              </pre>
            </article>
            <article className="panel">
              <div className="doc-actions">
                <Link className="text-link" to="/docs/community/web-apps">
                  ← Web Apps
                </Link>
                <Link className="text-link" to="/docs/community/crafatar-setup">
                  Crafatar Setup →
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
