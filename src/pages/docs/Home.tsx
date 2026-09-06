import { useEffect } from "react";
import { Link } from "react-router-dom";

const categories = [
  [
    "General Guides",
    [
      ["Licensing", "/docs/general-guides/licensing"],
      ["Licensed Resources", "/docs/general-guides/licensed-resources"],
      ["Site and API", "/docs/general-guides/site-and-api"],
      ["Installation", "/docs/general-guides/installation"],
      ["Uninstalling", "/docs/general-guides/uninstalling"],
    ],
  ],
  [
    "Theme & API",
    [
      ["Theme Customiser", "/docs/euphoria-theme/theme-customiser"],
      ["Game API Setup Guide", "/docs/game-api/setup-guide"],
    ],
  ],
  [
    "Setup",
    [
      ["Player Listing", "/docs/setup/player-listing"],
      ["Refresh Theme", "/docs/setup/refresh-theme"],
      ["MC Logs", "/docs/setup/mc-logs"],
      ["Server Backgrounds", "/docs/setup/server-backgrounds"],
      ["Translations", "/docs/setup/translations"],
      ["Resource Alerts", "/docs/setup/resource-alerts"],
    ],
  ],
  [
    "Community",
    [
      ["Web Apps", "/docs/community/web-apps"],
      ["StreamLink", "/docs/community/streamlink"],
      ["Euphoria Licensing", "/docs/community/euphoria-licensing"],
      ["Crafatar API", "/docs/community/crafatar-api"],
      ["NitroCraft Setup", "/docs/community/nitrocraft-setup"],
    ],
  ],
] as const;

export function Home() {
  useEffect(() => {
    document.body.classList.add("docs-page");
    return () => document.body.classList.remove("docs-page");
  }, []);

  return (
    <div>
      <header className="docs-topbar">
        <div className="docs-topbar-inner">
          <Link className="docs-brand" to="/docs">
            <img src="/images/euphoria.png" alt="Euphoria Development" />
            <span>Euphoria Development Docs</span>
          </Link>
          <nav className="docs-nav" aria-label="Documentation top navigation">
            <Link className="active" to="/docs">
              Home
            </Link>
            <Link to="/">Main Site</Link>
            <a
              href="https://euphoria-development.gitbook.io/euphoria-development"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original GitBook
            </a>
            <a
              href="https://discord.gg/Cus2zP4pPH"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support Discord
            </a>
          </nav>
        </div>
      </header>
      <main className="docs-shell">
        <section className="docs-hero reveal">
          <p className="docs-eyebrow">Euphoria Development</p>
          <h1>Documentation</h1>
          <p>
            Documentation for our themes, addons, setup options, and legal
            terms.
          </p>
          <div className="docs-hero-actions">
            <Link className="docs-button" to="/docs/general-guides/licensing">
              Start with Licensing
            </Link>
            <Link className="docs-button ghost" to="/">
              Back to Main Website
            </Link>
          </div>
        </section>
        <section className="docs-layout">
          <aside className="docs-sidebar reveal">
            <h2>Browse docs</h2>
            <p>Jump directly to a category.</p>
            <nav>
              {categories.map(([title]) => (
                <a
                  key={title}
                  href={`#${title.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="docs-content">
            <article className="panel reveal">
              <h2>Direct Page Access</h2>
              <p>Open any documentation page in one click.</p>
              <div className="quick-link-groups">
                {categories.map(([title, links]) => (
                  <section
                    key={title}
                    id={title.toLowerCase().replaceAll(" ", "-")}
                  >
                    <h3>{title}</h3>
                    <div className="quick-link-list">
                      {links.map(([label, href]) =>
                        href === "/docs/general-guides/licensing" ||
                        href === "/docs/general-guides/licensed-resources" ||
                        href === "/docs/general-guides/site-and-api" ? (
                          <Link key={href} className="text-link" to={href}>
                            {label}
                          </Link>
                        ) : (
                          <a key={href} className="text-link" href={href}>
                            {label}
                          </a>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
