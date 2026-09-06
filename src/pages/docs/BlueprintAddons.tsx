import { useEffect } from "react";
import { Link } from "react-router-dom";

export function BlueprintAddons() {
  useEffect(() => {
    document.body.classList.add("docs-page");
    return () => document.body.classList.remove("docs-page");
  }, []);

  return (
    <main className="docs-shell">
      <section className="docs-hero reveal">
        <p className="docs-eyebrow">Euphoria Development</p>
        <h1>Blueprint Addons</h1>
        <p>This documentation page will be migrated to React next.</p>
        <div className="docs-hero-actions">
          <Link className="docs-button" to="/docs">
            Back to Docs
          </Link>
          <Link className="docs-button ghost" to="/">
            Main Website
          </Link>
        </div>
      </section>
    </main>
  );
}
