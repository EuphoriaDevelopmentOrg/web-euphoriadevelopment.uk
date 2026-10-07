import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";

export const metadata: Metadata = getPageMetadata(
  "/docs/setup/resource-alerts",
);

import Link from "next/link";

export default function Page() {
  return (
    <>
      <article className="panel">
        <h2>Alert Configuration</h2>
        <ol>
          <li>
            Open Blueprint Extensions and select{" "}
            <strong>Resource Alerts</strong>.
          </li>
          <li>Set CPU, memory, and disk alert thresholds.</li>
          <li>Configure an action-button URL for incident response.</li>
        </ol>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-008.png"
            alt="Resource alerts setup example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>Tuning Strategy</h2>
        <p>
          Start with broader thresholds to prevent noisy alerts, then tighten
          them as real load patterns become clear.
        </p>
        <div className="callout">
          <p>
            Too-aggressive limits can create alert fatigue and reduce response
            quality during real incidents.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" href="/docs/setup/translations">
            ← Translations
          </Link>
          <Link
            className="text-link"
            href="/docs/legal-and-terms/terms-and-conditions"
          >
            Terms &amp; Conditions →
          </Link>
        </div>
      </article>
    </>
  );
}
