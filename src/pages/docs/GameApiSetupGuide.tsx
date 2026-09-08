import { Link } from "react-router-dom";

export function GameApiSetupGuide() {
  return (
    <>
      <article className="panel">
        <h2>Install Flow</h2>
        <ol>
          <li>
            Download Game API from your Euphoria dashboard. A licensed resource
            is required.
          </li>
          <li>Upload it to the server or NodeJS container.</li>
          <li>Extract the package and wait for dependencies to install.</li>
        </ol>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-005.png"
            alt="Game API setup example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>Environment Variables</h2>
        <p>Required keys:</p>
        <p>
          <code>PORT=2000</code>
          <br />
          <code>PANEL_URL=https://panel.example.com</code>
        </p>
        <ul>
          <li>
            <strong>PORT</strong>: runtime or container listening port
          </li>
          <li>
            <strong>PANEL_URL</strong>: panel origin used for CORS
          </li>
        </ul>
      </article>
      <article className="panel">
        <h2>Proxy and TLS</h2>
        <p>
          Expose the API behind an NGINX reverse proxy and forward traffic to
          the local API process, for example <code>localhost:2000</code>.
        </p>
        <p>
          Forward standard headers and keep preflight OPTIONS handling enabled
          for browser calls.
        </p>
        <div className="callout">
          <p>
            If panel calls fail in the browser, check the CORS origin first,
            then proxy headers, then TLS certificate or domain mismatch.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link
            className="text-link"
            to="/docs/euphoria-theme/theme-customiser"
          >
            ← Theme Customiser
          </Link>
          <Link className="text-link" to="/docs/setup/player-listing">
            Player Listing →
          </Link>
        </div>
      </article>
    </>
  );
}
