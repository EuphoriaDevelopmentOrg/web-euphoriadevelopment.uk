import "../../public/css/docs.css";

const categories = [
  [
    "General Guides",
    [
      ["Licensing", "/docs/general-guides/licensing.html"],
      ["Licensed Resources", "/docs/general-guides/licensed-resources.html"],
      ["Site and API", "/docs/general-guides/site-and-api.html"],
      ["Installation", "/docs/general-guides/installation.html"],
      ["Uninstalling", "/docs/general-guides/uninstalling.html"],
    ],
  ],
  [
    "Theme & API",
    [
      ["Theme Customiser", "/docs/euphoria-theme/theme-customiser.html"],
      ["Game API Setup Guide", "/docs/game-api/setup-guide.html"],
    ],
  ],
  [
    "Setup",
    [
      ["Player Listing", "/docs/setup/player-listing.html"],
      ["Refresh Theme", "/docs/setup/refresh-theme.html"],
      ["MC Logs", "/docs/setup/mc-logs.html"],
      ["Server Backgrounds", "/docs/setup/server-backgrounds.html"],
      ["Translations", "/docs/setup/translations.html"],
      ["Resource Alerts", "/docs/setup/resource-alerts.html"],
    ],
  ],
  [
    "Community",
    [
      ["Web Apps", "/docs/community/web-apps.html"],
      ["StreamLink", "/docs/community/streamlink.html"],
      ["Euphoria Licensing", "/docs/community/euphoria-licensing.html"],
      ["Crafatar API", "/docs/community/crafatar-api.html"],
      ["NitroCraft Setup", "/docs/community/nitrocraft-setup.html"],
    ],
  ],
] as const;

export function DocsHome() {
  return (
    <div className="docs-page">
      <header className="docs-topbar">
        <div className="docs-topbar-inner">
          <a className="docs-brand" href="/docs">
            <img src="/images/euphoria.png" alt="Euphoria Development" />
            <span>Euphoria Development Docs</span>
          </a>
          <nav className="docs-nav" aria-label="Documentation top navigation">
            <a className="active" href="/docs">
              Home
            </a>
            <a href="/">Main Site</a>
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
            <a
              className="docs-button"
              href="/docs/general-guides/licensing.html"
            >
              Start with Licensing
            </a>
            <a className="docs-button ghost" href="/">
              Back to Main Website
            </a>
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
                      {links.map(([label, href]) => (
                        <a key={href} className="text-link" href={href}>
                          {label}
                        </a>
                      ))}
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
