import { Link } from "react-router-dom";
import { CrafatarMigrationNotice } from "../../components/CrafatarMigrationNotice";

export function CrafatarSetup() {
  return (
    <>
      <CrafatarMigrationNotice />
      <article className="panel">
        <h2>Legacy Deployment Options</h2>
        <p>
          These instructions cover self-hosted Crafatar using Docker, Docker
          Compose, Pterodactyl Panel, or Node.js with Redis.
        </p>
        <div className="callout">
          <p>
            For endpoint and parameter reference, use{" "}
            <Link to="/docs/community/crafatar-api">Crafatar API Docs</Link>.
          </p>
        </div>
      </article>
      <article className="panel">
        <h2>Docker Quick Start</h2>
        <p>Fast single-host deployment with a dedicated Redis container.</p>
        <pre>
          <code>{`docker network create crafatar\ndocker run --net crafatar -d --name redis redis:7-alpine\ndocker run --net crafatar \\\n  -v crafatar-images:/home/app/crafatar/images \\\n  -e CACHE_BACKEND=redis \\\n  -e REDIS_URL=redis://redis:6379 \\\n  -e BIND=0.0.0.0 \\\n  -e PORT=3000 \\\n  -e EXTERNAL_URL=https://crafatar.example.com \\\n  -p 3000:3000 \\\n  docker.io/repgraphics/crafatar:latest`}</code>
        </pre>
        <p>
          The service is available at <code>http://0.0.0.0:3000</code> behind
          your proxy or domain.
        </p>
      </article>
      <article className="panel">
        <h2>Docker Compose</h2>
        <p>
          Uses the legacy repository&apos;s <code>docker-compose.yml</code> with
          Redis health checks and persistent volumes.
        </p>
        <pre>
          <code>{`git clone https://github.com/EuphoriaTheme/crafatar.git\ncd crafatar\ncp .env.example .env\ndocker compose up -d\ndocker compose logs -f crafatar`}</code>
        </pre>
        <p>
          Windows PowerShell: <code>Copy-Item .env.example .env</code>, then{" "}
          <code>docker compose up -d</code>. The stack binds{" "}
          <code>3000:3000</code>, mounts <code>crafatar-images</code>, and
          stores Redis data in <code>redis-data</code>.
        </p>
      </article>
      <article className="panel">
        <h2>Pterodactyl Panel Installation</h2>
        <p>
          Use the{" "}
          <a
            href="https://github.com/EuphoriaTheme/crafatar/tree/master/pterodactyl%20egg"
            target="_blank"
            rel="noopener noreferrer"
          >
            official Crafatar egg
          </a>
          .
        </p>
        <ol>
          <li>
            Import <code>egg-crafatar.json</code> into a Pterodactyl nest.
          </li>
          <li>
            Create a server using{" "}
            <code>docker.io/repgraphics/crafatar:latest</code>.
          </li>
          <li>
            Set <code>BIND=0.0.0.0</code> and <code>EXTERNAL_URL</code> to your
            domain.
          </li>
          <li>
            Use <code>CACHE_BACKEND=redis</code> and{" "}
            <code>REDIS_URL=redis://host:6379</code>, or{" "}
            <code>CACHE_BACKEND=memory</code> without Redis.
          </li>
          <li>
            Start the server and confirm <code>Server running on http://</code>.
          </li>
        </ol>
        <pre>
          <code>{`CACHE_BACKEND=redis\nREDIS_URL=redis://redis.example.internal:6379\nBIND=0.0.0.0\nEXTERNAL_URL=https://crafatar.example.com\nSOURCE_REPO=EuphoriaTheme/crafatar\nSOURCE_REF=master`}</code>
        </pre>
      </article>
      <article className="panel">
        <h2>Manual Setup</h2>
        <ul>
          <li>Install Node.js 24 LTS.</li>
          <li>Install and run Redis.</li>
          <li>Clone the repository and install dependencies.</li>
        </ul>
        <pre>
          <code>{`git clone https://github.com/EuphoriaTheme/crafatar.git\ncd crafatar\nnpm install\ncp .env.example .env\nnpm start`}</code>
        </pre>
        <p>
          If <code>node-canvas</code> fails, install its documented system
          dependencies.
        </p>
      </article>
      <article className="panel">
        <h2>Required Configuration</h2>
        <ul>
          <li>
            <code>CACHE_BACKEND=redis</code>, <code>memory</code>, or{" "}
            <code>none</code>
          </li>
          <li>
            <code>REDIS_URL=redis://host:6379</code>, or <code>rediss://</code>{" "}
            for TLS
          </li>
          <li>
            <code>PORT=3000</code> and <code>BIND=0.0.0.0</code>
          </li>
          <li>
            <code>EXTERNAL_URL=https://crafatar.example.com</code>
          </li>
          <li>
            <code>CACHE_LOCAL=1200</code> and <code>CACHE_BROWSER=3600</code>
          </li>
          <li>
            <code>RETENTION_ENABLED=true</code>, <code>RETENTION_DAYS=30</code>,{" "}
            <code>RETENTION_INTERVAL_HOURS=24</code>
          </li>
        </ul>
        <div className="callout">
          <p>
            <code>REDIS_URL</code> must use <code>redis://</code> or{" "}
            <code>rediss://</code>; an invalid protocol disables Redis caching
            on startup.
          </p>
        </div>
      </article>
      <article className="panel">
        <h2>Reverse Proxy Example (NGINX)</h2>
        <pre>
          <code>{`server {\n  listen 443 ssl http2;\n  server_name crafatar.example.com;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Forwarded-Proto $scheme;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  }\n}`}</code>
        </pre>
        <p>
          Crafatar reads forwarded headers when <code>EXTERNAL_URL</code> is not
          set.
        </p>
      </article>
      <article className="panel">
        <h2>Validation and Troubleshooting</h2>
        <pre>
          <code>{`curl -I "http://127.0.0.1:3000/avatars/069a79f444e94726a5befca90e38aaf5?size=64"\ncurl -I "http://127.0.0.1:3000/renders/head/069a79f444e94726a5befca90e38aaf5?scale=4"`}</code>
        </pre>
        <ul>
          <li>
            Expect <code>200</code> and <code>image/png</code> for valid
            requests.
          </li>
          <li>
            Expect <code>422</code> for invalid UUID, size, scale, or default
            values.
          </li>
          <li>For slow responses, verify Redis and Mojang-service egress.</li>
          <li>
            For stale skins, lower <code>CACHE_LOCAL</code> or clear image
            cache/Redis keys.
          </li>
          <li>For full storage, tune retention and monitor inode usage.</li>
        </ul>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/community/crafatar-api">
            ← Crafatar API
          </Link>
          <Link className="text-link" to="/docs/community/blueprint-addons">
            Blueprint Addons →
          </Link>
        </div>
      </article>
    </>
  );
}
