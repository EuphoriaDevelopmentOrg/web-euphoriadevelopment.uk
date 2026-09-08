import { Link } from "react-router-dom";

export function McLogs() {
  return (
    <>
      <article className="panel">
        <h2>MC Logs Flow</h2>
        <ol>
          <li>Open a Minecraft server in the panel.</li>
          <li>
            Open the server sub-navigation and select <strong>MC Logs</strong>.
          </li>
          <li>Review, upload, or share logs for diagnostics.</li>
        </ol>
        <figure className="doc-image">
          <img src="/images/docs/gitbook-006.jpg" alt="MC Logs page example" />
        </figure>
      </article>
      <article className="panel">
        <h2>Best Use Cases</h2>
        <ul>
          <li>Startup crash investigation</li>
          <li>Plugin exception triage</li>
          <li>Runtime error history for support tickets</li>
        </ul>
        <div className="mini-meta">
          <span>Faster support triage</span>
          <span>Shareable diagnostics</span>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/setup/refresh-theme">
            ← Refresh Theme
          </Link>
          <Link className="text-link" to="/docs/setup/server-backgrounds">
            Server Backgrounds →
          </Link>
        </div>
      </article>
    </>
  );
}
