import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Section = { id: string; title: string; content: ReactNode | string[] };
type Policy = {
  theme: "privacy" | "refund" | "terms";
  kicker: string;
  title: string;
  summary: string;
  meta: string;
  sections: Section[];
  supportTitle: string;
  supportText: string;
};

const delay = (value: string): CSSProperties & { "--delay": string } => ({
  "--delay": value,
});
const legalLinks = [
  ["/legal/privacy-policy", "Privacy"],
  ["/legal/refund-policy", "Refunds"],
  ["/legal/terms-and-conditions", "Terms"],
] as const;

export function LegalPolicyPage({ policy }: { policy: Policy }) {
  useEffect(() => {
    const themeClass = `legal-${policy.theme}`;
    document.body.classList.add("legal-page", themeClass);
    return () => document.body.classList.remove("legal-page", themeClass);
  }, [policy.theme]);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand">
            <img src="/images/euphoria.png" alt="Euphoria Development logo" />
            <span>Euphoria Development</span>
          </Link>
          <nav className="quick-links" aria-label="Legal navigation">
            <Link to="/">Home</Link>
            {legalLinks.map(([href, label]) => (
              <Link
                key={href}
                to={href}
                className={
                  policy.title.startsWith(label.slice(0, -1)) ||
                  policy.title.startsWith(label)
                    ? "active"
                    : undefined
                }
                aria-current={
                  policy.title.startsWith(label.slice(0, -1)) ||
                  policy.title.startsWith(label)
                    ? "page"
                    : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="page-shell">
        <section className="hero-card reveal">
          <p className="hero-kicker">{policy.kicker}</p>
          <h1 className="hero-title">{policy.title}</h1>
          <p className="hero-summary">{policy.summary}</p>
          <div className="hero-meta">
            <span className="meta-pill">Last updated: February 23, 2026</span>
            <span className="meta-pill">{policy.meta}</span>
          </div>
        </section>
        <div className="content-layout">
          <aside
            className="toc-panel reveal"
            style={delay("0.08s")}
            aria-label="On this page"
          >
            <h2>On this page</h2>
            <p>Jump to any section.</p>
            <nav>
              {policy.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>
          <article className="policy-content">
            {policy.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="section-card reveal"
                style={delay(`${0.02 + index * 0.02}s`)}
              >
                <h2>{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul>
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  section.content
                )}
              </section>
            ))}
            <section
              className="support-card reveal"
              style={delay(`${0.02 + policy.sections.length * 0.02}s`)}
            >
              <h2>{policy.supportTitle}</h2>
              <p>{policy.supportText}</p>
            </section>
          </article>
        </div>
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>© 2026 Euphoria Development</span>
          <nav aria-label="Legal">
            {legalLinks.map(([href, label]) => (
              <Link key={href} to={href}>
                {label} Policy
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
