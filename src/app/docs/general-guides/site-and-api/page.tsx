import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";

export const metadata: Metadata = getPageMetadata(
  "/docs/general-guides/site-and-api",
);

import Link from "next/link";

export default function Page() {
  return (
    <>
      <article className="panel">
        <h2>How the API Is Used</h2>
        <p>
          Euphoria API powers panel/theme integrations such as player listing,
          game data lookups, and protected resource workflows.
        </p>
        <p>
          Some protected requests include your license key as authorization
          context.
        </p>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-007.png"
            alt="Site and API configuration example"
          />
          <figcaption>
            Example API configuration view from the original docs.
          </figcaption>
        </figure>
      </article>
      <article className="panel">
        <h2>Troubleshooting Order</h2>
        <ol>
          <li>Confirm license activation is valid.</li>
          <li>Check API URL and panel origin/domain.</li>
          <li>Verify proxy + CORS configuration.</li>
          <li>Retest from browser and server logs.</li>
        </ol>
        <div className="mini-meta">
          <span>Auth issues</span>
          <span>CORS issues</span>
          <span>Proxy issues</span>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link
            className="text-link"
            href="/docs/general-guides/licensed-resources"
          >
            ← Licensed Resources
          </Link>
          <Link className="text-link" href="/docs/general-guides/installation">
            Installation →
          </Link>
        </div>
      </article>
    </>
  );
}
