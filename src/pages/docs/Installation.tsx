import { Link } from "react-router-dom";

export function Installation() {
  return (
    <>
      <article className="panel">
        <h2>Requirements</h2>
        <ul>
          <li>Working Pterodactyl installation</li>
          <li>Blueprint Framework installed</li>
          <li>Purchased Euphoria resource file</li>
        </ul>
      </article>
      <article className="panel">
        <h2>Install Commands</h2>
        <ol>
          <li>
            Move the resource file to the panel root:{" "}
            <code>/var/www/pterodactyl</code>
          </li>
          <li>
            Run <code>cd /var/www/pterodactyl</code>
          </li>
          <li>
            Run <code>blueprint -i Extension.blueprint</code>
          </li>
          <li>Wait for installation to finish.</li>
        </ol>
        <p>
          Example:{" "}
          <code>
            mv /home/username/Extension.blueprint /var/www/pterodactyl
          </code>
        </p>
      </article>
      <article className="panel">
        <div className="callout">
          <p>
            Keep a backup or snapshot before installing on a production panel so
            you can roll back quickly.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/general-guides/site-and-api">
            ← Site and API
          </Link>
          <Link className="text-link" to="/docs/general-guides/uninstalling">
            Uninstalling →
          </Link>
        </div>
      </article>
    </>
  );
}
