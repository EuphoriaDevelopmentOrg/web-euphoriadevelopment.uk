import { Link } from "react-router-dom";

export function ServerBackgrounds() {
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
          <Link className="text-link" to="/docs/setup/mc-logs">
            ← MC Logs
          </Link>
          <Link className="text-link" to="/docs/setup/translations">
            Translations →
          </Link>
        </div>
      </article>
    </>
  );
}
