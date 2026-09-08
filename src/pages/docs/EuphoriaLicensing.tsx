import { Link } from "react-router-dom";
import { euphoriaLicensing } from "../../utils/web-apps";

export function EuphoriaLicensing() {
  return (
    <>
      <article className="panel">
        <h2>Overview</h2>
        <p>
          <strong>Euphoria Licensing</strong> is a proprietary self-hosted web
          application for license operations, product validation workflows, and
          admin management.
        </p>
        <div className="callout">
          <p>
            A valid commercial license is required to deploy this software.
            Redistribution, sublicensing, or source resale is not allowed.
          </p>
        </div>
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
          <Link className="text-link" to="/docs/general-guides/licensing">
            Licensing Guide
          </Link>
          <a
            className="text-link"
            href="https://discord.gg/Cus2zP4pPH"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support Discord
          </a>
        </div>
      </article>
      <article className="panel">
        <h2>Minimum Requirements</h2>
        <ul>
          <li>
            <strong>OS:</strong> Linux recommended; Windows Server/Desktop
            supported
          </li>
          <li>
            <strong>Runtime:</strong> Node.js <code>22.x</code> and pnpm{" "}
            <code>10.22.0</code>
          </li>
          <li>
            <strong>Database:</strong> PostgreSQL <code>14+</code>; 15, 16, or
            17 recommended
          </li>
          <li>
            <strong>Memory:</strong> 2 GB minimum, 4 GB recommended
          </li>
          <li>
            <strong>Production:</strong> reverse proxy and TLS for public
            deployment
          </li>
        </ul>
      </article>
      <article className="panel">
        <h2>Quick Install</h2>
        <p>For first boot on a production-like host:</p>
        <pre>
          <code>{`cp .env.example .env\npnpm install --frozen-lockfile\npnpm db:migrate\npnpm seed\npnpm build\npnpm start`}</code>
        </pre>
        <p>
          Open <code>http://SERVER_IP:3000</code> or your domain, then rotate
          seeded admin credentials immediately.
        </p>
      </article>
      <article className="panel">
        <h2>Required Environment Values</h2>
        <ul>
          <li>
            <code>APP_URL</code>: public HTTPS URL for auth callbacks and
            generated links
          </li>
          <li>
            <code>BETTER_AUTH_SECRET</code>: strong random auth secret
          </li>
          <li>
            <code>APP_GUARD_TOKEN</code>: distribution license guard token
          </li>
          <li>
            <code>POSTGRES_URL</code> or <code>POSTGRES_*</code>: database
            connection configuration
          </li>
          <li>
            <code>HOST</code>/<code>PORT</code>: runtime bind values, normally{" "}
            <code>0.0.0.0</code> and <code>3000</code>
          </li>
        </ul>
        <div className="callout">
          <p>
            Set <code>APP_DATA_ENCRYPTION_KEY</code>, configure{" "}
            <code>TRUST_REVERSE_PROXY=true</code>, and restrict{" "}
            <code>CORS_ORIGINS</code> to known origins.
          </p>
        </div>
      </article>
      <article className="panel">
        <h2>Production Flow</h2>
        <ol>
          <li>
            Provision PostgreSQL and create a dedicated database and user.
          </li>
          <li>
            Install dependencies and configure <code>.env</code>.
          </li>
          <li>
            Run <code>pnpm db:migrate</code>, or <code>pnpm db:push</code> for
            initial boot if required.
          </li>
          <li>
            Seed the initial admin with <code>pnpm seed</code> if needed.
          </li>
          <li>
            Build and run via <code>pnpm build</code> and{" "}
            <code>pnpm start</code>.
          </li>
          <li>Put the app behind Nginx or Caddy and enable HTTPS.</li>
        </ol>
        <p>
          Built runtime entrypoint: <code>.output/server/index.mjs</code>
        </p>
      </article>
      <article className="panel">
        <h2>Health Checks</h2>
        <p>After go-live, verify these endpoints:</p>
        <pre>
          <code>{`curl -fsS https://licensing.example.com/api/system/health\ncurl -fsS https://licensing.example.com/api/system/ready\ncurl -fsS https://licensing.example.com/openapi.json`}</code>
        </pre>
        <p>
          Smoke test admin login, product listing, license validation endpoint,
          and logs view.
        </p>
      </article>
      <article className="panel">
        <h2>Troubleshooting</h2>
        <ul>
          <li>
            <strong>
              <code>APP_GUARD_TOKEN is missing</code>:
            </strong>{" "}
            set it in <code>.env</code> and restart.
          </li>
          <li>
            <strong>Database connection failed:</strong> re-check{" "}
            <code>POSTGRES_URL</code>, <code>POSTGRES_*</code>, and firewall
            access.
          </li>
          <li>
            <strong>Build failures:</strong> confirm Node.js <code>22.x</code>{" "}
            and pnpm <code>10.22.0</code>, then reinstall dependencies.
          </li>
          <li>
            <strong>App unreachable:</strong> check process health and proxy
            target, normally <code>127.0.0.1:3000</code>.
          </li>
        </ul>
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
    </>
  );
}
