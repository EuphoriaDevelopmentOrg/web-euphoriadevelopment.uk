import { Link } from "react-router-dom";

export function LegalAndTerms() {
  return (
    <>
      <article className="panel">
        <h2>Usage Limits</h2>
        <ul>
          <li>
            Licenses are generally bound to one server or panel instance per
            purchase.
          </li>
          <li>Modifications are allowed for your deployment.</li>
          <li>Redistribution, resale, and giveaways are prohibited.</li>
        </ul>
      </article>
      <article className="panel">
        <h2>Validation and Data Used for Licensing</h2>
        <p>
          License checks can involve domain request origin, generated machine
          fingerprint (HWID), license key, and server IP for installation
          validation.
        </p>
        <div className="mini-meta">
          <span>License enforcement</span>
          <span>Abuse prevention</span>
        </div>
      </article>
      <article className="panel">
        <h2>Service Notes</h2>
        <p>
          Self-hosted API is supported with more limited assistance. OAuth,
          cookies, and JWT may be used for site identity flows. Platform misuse
          can lead to bans.
        </p>
        <div className="callout">
          <p>
            Read the full legal pages for enforceable wording and the latest
            revisions before commercial deployment.
          </p>
        </div>
        <div className="doc-actions">
          <Link className="text-link" to="/legal/terms-and-conditions">
            Open full Terms
          </Link>
          <Link className="text-link" to="/legal/privacy-policy">
            Open Privacy Policy
          </Link>
        </div>
      </article>
      <article className="panel">
        <div className="doc-actions">
          <Link className="text-link" to="/docs/setup/resource-alerts">
            ← Resource Alerts
          </Link>
          <Link className="text-link" to="/docs">
            Back to Docs Home →
          </Link>
        </div>
      </article>
    </>
  );
}
