import type { Metadata } from "next";
import { getPageMetadata } from "@/utils/metadata";

export const metadata: Metadata = getPageMetadata(
  "/docs/setup/server-backgrounds",
);

import Link from "next/link";

export default function Page() {
  return (
    <>
      <article className="panel">
        <h2>Setup Steps</h2>
        <ol>
          <li>Open Blueprint Extensions.</li>
          <li>
            Select <strong>Server Backgrounds</strong>.
          </li>
          <li>Assign images by server egg or server UUID.</li>
          <li>Adjust opacity for text readability.</li>
        </ol>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-004.png"
            alt="Server backgrounds setup example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>Image Sources</h2>
        <p>
          Use your own hosted assets or default packs from Euphoria resource
          pages.
        </p>
        <div className="callout">
          <p>
            Prefer compressed web images to reduce panel load time and visual
            jank on slower connections.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" href="/docs/setup/mc-logs">
            ← MC Logs
          </Link>
          <Link className="text-link" href="/docs/setup/translations">
            Translations →
          </Link>
        </div>
      </article>
    </>
  );
}
