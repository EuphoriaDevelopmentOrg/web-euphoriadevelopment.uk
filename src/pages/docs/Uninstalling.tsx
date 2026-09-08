import { Link } from "react-router-dom";

export function Uninstalling() {
  return (
    <>
      <article className="panel">
        <h2>Uninstall Steps</h2>
        <ol>
          <li>
            Run <code>cd /var/www/pterodactyl</code>
          </li>
          <li>
            Run <code>blueprint -r Extension.blueprint</code>
          </li>
          <li>Wait until removal is complete.</li>
        </ol>
      </article>
      <article className="panel">
        <h2>Recovery Command</h2>
        <p>
          If panel state becomes inconsistent, run{" "}
          <code>blueprint -upgrade</code> and reinstall required addons after
          maintenance.
        </p>
        <div className="callout">
          <p>
            Schedule uninstall or upgrade work during low-traffic windows and
            notify staff before changing the panel.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/general-guides/installation">
            ← Installation
          </Link>
          <Link
            className="text-link"
            to="/docs/euphoria-theme/theme-customiser"
          >
            Theme Customiser →
          </Link>
        </div>
      </article>
    </>
  );
}
