import { Link } from "react-router-dom";

export function CrafatarMigrationNotice() {
  return (
    <article className="panel">
      <h2>Crafatar has moved to NitroCraft</h2>
      <div className="callout">
        <p>
          Use NitroCraft for current API access and new deployments. The
          Crafatar documentation below is kept as a legacy reference for
          existing installations.
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
        <Link className="text-link" to="/docs/community/nitrocraft-api">
          NitroCraft API Docs
        </Link>
        <Link className="text-link" to="/docs/community/nitrocraft-setup">
          NitroCraft Setup Guide
        </Link>
      </div>
    </article>
  );
}
