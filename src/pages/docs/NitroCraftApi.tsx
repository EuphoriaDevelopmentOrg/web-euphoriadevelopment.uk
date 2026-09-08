import { Link } from "react-router-dom";

export function NitroCraftApi() {
  return (
    <>
      <article className="panel">
        <h2>API Overview</h2>
        <p>
          <strong>NitroCraft</strong> is a full from-scratch remake built on
          Nitro and <code>minecraft-toolkit</code>, focused on performance and
          reliability.
        </p>
        <p>
          Hosted base URL: <code>https://nitrocraft.uk</code>
        </p>
        <div className="callout">
          <p>
            Interactive OpenAPI docs are at <code>/docs</code>; metrics are at{" "}
            <code>/metrics</code>.
          </p>
        </div>
        <div className="doc-actions">
          <a
            className="text-link"
            href="https://nitrocraft.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open NitroCraft
          </a>
          <a
            className="text-link"
            href="https://github.com/EuphoriaDevelopmentOrg/NitroCraft"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Repository
          </a>
        </div>
      </article>
      <article className="panel">
        <h2>Avatar, Skin, and Renders</h2>
        <ul>
          <li>
            <code>GET /avatars/{"{uuid}"}?size=160&amp;overlay</code>
          </li>
          <li>
            <code>GET /skins/{"{uuid}"}</code>
          </li>
          <li>
            <code>GET /capes/{"{uuid}"}</code>
          </li>
          <li>
            <code>GET /renders/head/{"{uuid}"}?scale=6&amp;overlay</code>
          </li>
          <li>
            <code>GET /renders/body/{"{uuid}"}?scale=6&amp;overlay</code>
          </li>
        </ul>
        <pre>
          <code>{`GET https://nitrocraft.uk/avatars/d634462bd663401d9788a8596307bc4d?size=100&overlay\nGET https://nitrocraft.uk/renders/head/d634462bd663401d9788a8596307bc4d?scale=6&overlay\nGET https://nitrocraft.uk/renders/body/d634462bd663401d9788a8596307bc4d?scale=6&overlay`}</code>
        </pre>
      </article>
      <article className="panel">
        <h2>Player Lookup</h2>
        <p>
          Player routes accept a UUID or username and return profile-related
          data.
        </p>
        <ul>
          <li>
            <code>GET /players/{"{uuid-or-username}"}</code>
          </li>
          <li>
            <code>GET /players/{"{uuid-or-username}"}/profile</code>
          </li>
          <li>
            <code>GET /players/{"{uuid-or-username}"}/history</code>
          </li>
          <li>
            <code>GET /players/{"{uuid-or-username}"}/skin-metadata</code>
          </li>
        </ul>
      </article>
      <article className="panel">
        <h2>Server Status Endpoints</h2>
        <ul>
          <li>
            <code>GET /status/mc</code>
          </li>
          <li>
            <code>GET /status/java?address=host</code>
          </li>
          <li>
            <code>GET /status/bedrock?address=host</code>
          </li>
          <li>
            <code>GET /status/server?address=host&amp;edition=auto</code>
          </li>
          <li>
            <code>GET /status/browser?address=hostA&amp;address=hostB</code>
          </li>
          <li>
            <code>
              GET
              /status/browser?source=my-directory&amp;source=another-directory
            </code>
          </li>
          <li>
            <code>GET /status/icon?address=host</code>
          </li>
        </ul>
        <div className="callout">
          <p>
            <code>/status/browser</code> supports multi-target checks with
            concurrency limits and optional source-feed ingestion.
          </p>
        </div>
      </article>
      <article className="panel">
        <h2>Text and Tooling</h2>
        <h3>Formatting</h3>
        <ul>
          <li>
            <code>GET /format/html?text=...</code>
          </li>
          <li>
            <code>GET /format/strip?text=...</code>
          </li>
          <li>
            <code>GET /format/css</code>
          </li>
        </ul>
        <h3>Tools and Meta</h3>
        <ul>
          <li>
            <code>GET /tools/server-list</code>
          </li>
          <li>
            <code>GET /tools/server-browser</code>
          </li>
          <li>
            <code>GET /docs</code>
          </li>
          <li>
            <code>GET /metrics</code>
          </li>
        </ul>
      </article>
      <article className="panel">
        <h2>Common Configuration Impacting API</h2>
        <ul>
          <li>
            <code>SESSIONS_RATE_LIMIT</code> controls outbound Mojang session
            request rate.
          </li>
          <li>
            <code>REQUESTS_RATE_LIMIT</code> and related settings control
            inbound per-IP limiting.
          </li>
          <li>
            <code>STATUS_ALLOW_PRIVATE_TARGETS</code> controls private or local
            target probing.
          </li>
          <li>
            <code>DEFAULT_REDIRECT_ALLOWLIST</code> controls hosts allowed by{" "}
            <code>default=</code> redirects.
          </li>
          <li>
            <code>CORS_ORIGIN</code> controls allowed browser origins.
          </li>
        </ul>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/community/web-apps">
            ← Web Apps
          </Link>
          <Link className="text-link" to="/docs/community/nitrocraft-setup">
            NitroCraft Setup →
          </Link>
        </div>
      </article>
    </>
  );
}
