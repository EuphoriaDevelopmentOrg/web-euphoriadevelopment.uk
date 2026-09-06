import { LegalPolicyPage } from "../components/LegalPolicyPage";
import { Link } from "react-router-dom";

export function TermsAndConditions() {
  return (
    <LegalPolicyPage
      policy={{
        kicker: "Legal + Licensing",
        title: "Terms and Conditions",
        summary:
          "These terms govern access to our website, digital products, subscriptions, and open project contributions, including the restriction on redistribution for profit unless explicitly permitted.",
        meta: "Commercial redistribution controls included",
        sections: [
          {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: (
              <p>
                By accessing this website, purchasing digital products,
                subscribing to services, or using materials provided by Euphoria
                Development, you agree to these Terms and Conditions.
              </p>
            ),
          },
          {
            id: "licenses",
            title: "2. Digital Licenses",
            content: (
              <p>
                Unless explicitly stated otherwise, your purchase grants a
                non-exclusive, non-transferable, revocable license to use the
                product for your own projects or servers. Ownership and
                intellectual property rights remain with Euphoria Development
                and its licensors.
              </p>
            ),
          },
          {
            id: "contributions",
            title: "3. Open Repository and Contribution Rules",
            content: [
              "Some projects are publicly accessible for community review and contribution.",
              "You may contribute fixes, suggestions, and pull requests in line with each repository&apos;s contribution workflow.",
              "Unless a repository license explicitly permits it in writing, redistribution, resale, relicensing, or repackaging for profit is prohibited.",
              "You may not remove attribution, copyright notices, or license notices from distributed source files.",
            ],
          },
          {
            id: "subscriptions",
            title: "4. Subscription Terms",
            content: [
              "Subscription access is billed on a recurring cycle through the selected payment platform.",
              "You are responsible for keeping payment details current and canceling before renewal if you do not want continued billing.",
              "Failure of a payment may suspend associated subscription benefits until payment is resolved.",
            ],
          },
          {
            id: "refunds",
            title: "5. Refunds",
            content: (
              <p>
                Refund eligibility is governed by our{" "}
                <Link to="/legal/refund-policy">Refund Policy</Link> and any
                non-waivable rights under applicable law.
              </p>
            ),
          },
          {
            id: "conduct",
            title: "6. Prohibited Conduct",
            content: [
              "Unauthorized copying, account sharing, key sharing, scraping, or resale of paid materials.",
              "Circumventing licensing checks, access restrictions, or technical protection measures.",
              "Using our services to distribute malware, abuse infrastructure, or violate laws.",
            ],
          },
          {
            id: "submissions",
            title: "7. User Submissions",
            content: (
              <p>
                By submitting issues, comments, patches, or pull requests, you
                confirm you have the right to submit that material and grant
                Euphoria Development a perpetual, worldwide license to use,
                modify, and distribute the contribution as part of our projects.
              </p>
            ),
          },
          {
            id: "liability",
            title: "8. Disclaimer and Liability",
            content: (
              <p>
                Products and services are provided as is without warranties of
                uninterrupted or error-free operation. To the maximum extent
                allowed by law, Euphoria Development will not be liable for
                indirect, incidental, special, consequential, or punitive
                damages.
              </p>
            ),
          },
          {
            id: "termination",
            title: "9. Suspension and Termination",
            content: (
              <p>
                We may suspend or terminate access to products, subscriptions,
                or community services if these terms are violated or if abuse,
                fraud, or security risks are detected.
              </p>
            ),
          },
          {
            id: "changes",
            title: "10. Changes to Terms",
            content: (
              <p>
                We may update these terms at any time. Updated terms become
                effective when published on this page with a revised Last
                updated date.
              </p>
            ),
          },
          {
            id: "contact",
            title: "11. Contact",
            content: (
              <p>
                For legal or policy questions, contact us through our{" "}
                <a
                  href="https://discord.euphoriadevelopment.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord community
                </a>{" "}
                or our{" "}
                <a
                  href="https://github.com/EuphoriaDevelopmentOrg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub organization
                </a>
                .
              </p>
            ),
          },
        ],
        supportTitle: "Important license reminder",
        supportText:
          "Public source availability does not grant permission to redistribute for commercial profit unless a project license clearly allows it.",
      }}
    />
  );
}
