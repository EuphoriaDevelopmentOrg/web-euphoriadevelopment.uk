import { Link } from "react-router-dom";

export function ThemeCustomiser() {
  return (
    <>
      <article className="panel">
        <h2>Core Theme Settings</h2>
        <p>
          Configure primary color, logo URL, favicon URL, footer text (HTML
          supported), panel background, cookie banner, and navigation
          visibility.
        </p>
        <figure className="doc-image">
          <img
            src="/images/docs/gitbook-002.jpg"
            alt="Theme customiser example"
          />
        </figure>
      </article>
      <article className="panel">
        <h2>Visual Modules</h2>
        <ul>
          <li>Login background and logo visibility</li>
          <li>Loading screen background and logo</li>
          <li>Seasonal effects: Christmas, Easter, and Halloween</li>
          <li>Announcements: type, icon, and text</li>
          <li>Server card backgrounds, glow, and status accents</li>
        </ul>
      </article>
      <article className="panel">
        <h2>External Links and API URL</h2>
        <p>
          Button links can point to Discord, Store, and Status pages. API URL
          can be changed to your own Game API endpoint.
        </p>
        <div className="callout">
          <p>
            After changing visual or API settings, use Refresh Theme and clear
            edge cache if changes do not appear.
          </p>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/general-guides/uninstalling">
            ← Uninstalling
          </Link>
          <Link className="text-link" to="/docs/game-api/setup-guide">
            Setup Guide →
          </Link>
        </div>
      </article>
    </>
  );
}
