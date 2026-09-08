import { Link } from "react-router-dom";

export function LicensedResources() {
  return (
    <>
      <article className="panel">
        <h2>Licensed Products</h2>
        <p>
          These products require valid license activation before protected
          features become available.
        </p>
        <ul>
          <li>Euphoria Theme</li>
          <li>Euphoria Paste (Paid Version)</li>
          <li>
            <Link to="/docs/community/euphoria-licensing">
              Euphoria Licensing
            </Link>
          </li>
        </ul>
      </article>
      <article className="panel">
        <h2>What Happens Without Activation</h2>
        <p>
          If a key is missing or invalid, licensed modules may stay disabled and
          API requests to protected endpoints may fail.
        </p>
        <div className="callout">
          <p>
            Always complete licensing first before troubleshooting panel/API
            setup.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/general-guides/licensing">
            ← Licensing
          </Link>
          <Link className="text-link" to="/docs/general-guides/site-and-api">
            Site and API →
          </Link>
        </div>
      </article>
    </>
  );
}
