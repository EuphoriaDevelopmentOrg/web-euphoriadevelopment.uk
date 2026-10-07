import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";

export const metadata: Metadata = getPageMetadata("/docs/setup/translations");

import Link from "next/link";

export default function Page() {
  return (
    <>
      <article className="panel">
        <h2>Translation Setup</h2>
        <ol>
          <li>
            Open Blueprint Extensions and choose <strong>Translations</strong>.
          </li>
          <li>Select the default panel language.</li>
          <li>Enable the desired language set.</li>
        </ol>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-009.jpg"
            alt="Translations setup example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>Rollout Recommendation</h2>
        <p>
          Enable one locale at a time, verify major pages—login, dashboard, and
          server view—then continue the rollout.
        </p>
        <div className="mini-meta">
          <span>Stage by locale</span>
          <span>Validate critical pages first</span>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" href="/docs/setup/server-backgrounds">
            ← Server Backgrounds
          </Link>
          <Link className="text-link" href="/docs/setup/resource-alerts">
            Resource Alerts →
          </Link>
        </div>
      </article>
    </>
  );
}
