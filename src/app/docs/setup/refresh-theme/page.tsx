import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";

export const metadata: Metadata = getPageMetadata("/docs/setup/refresh-theme");

import Link from "next/link";

export default function Page() {
  return (
    <>
      <article className="panel">
        <h2>Refresh Workflow</h2>
        <ol>
          <li>Open Blueprint Extensions.</li>
          <li>
            Select <strong>Refresh Theme</strong>.
          </li>
          <li>Apply updated settings, such as primary color.</li>
          <li>Reload the panel and verify visual changes.</li>
        </ol>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-010.png"
            alt="Refresh theme page example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>If Changes Don&apos;t Show</h2>
        <ul>
          <li>Purge Cloudflare or edge cache.</li>
          <li>Clear browser cache and hard refresh.</li>
          <li>Wait for cache propagation if the CDN is still stale.</li>
        </ul>
        <div className="callout">
          <p>
            Most “theme not updating” reports are cache-related, not
            installation failures.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" href="/docs/setup/player-listing">
            ← Player Listing
          </Link>
          <Link className="text-link" href="/docs/setup/mc-logs">
            MC Logs →
          </Link>
        </div>
      </article>
    </>
  );
}
