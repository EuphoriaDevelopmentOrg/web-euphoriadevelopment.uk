import { Link } from "react-router-dom";

export function PlayerListing() {
  return (
    <>
      <article className="panel">
        <h2>Before You Start</h2>
        <ul>
          <li>Use the hosted Game API, or self-host your own API.</li>
          <li>Confirm the API endpoint is reachable from the panel.</li>
          <li>Open a game server and navigate to its Players section.</li>
        </ul>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-011.png"
            alt="Player listing page example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>Page Controls</h2>
        <ul>
          <li>
            <strong>Refresh</strong>: run a new API query
          </li>
          <li>
            <strong>Select Game</strong>: pick a game profile
          </li>
          <li>
            <strong>Custom Query Port</strong>: override the server query port
          </li>
          <li>
            <strong>Save Port</strong>: persist a custom port
          </li>
          <li>
            <strong>Reset to Default</strong>: clear the override
          </li>
        </ul>
      </article>
      <article className="panel">
        <div className="callout">
          <p>
            If no players are shown, verify the query port and check firewall
            rules for game-server query traffic.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/game-api/setup-guide">
            ← Setup Guide
          </Link>
          <Link className="text-link" to="/docs/setup/refresh-theme">
            Refresh Theme →
          </Link>
        </div>
      </article>
    </>
  );
}
