import { LegalPolicyPage } from "../components/LegalPolicyPage";

export function PrivacyPolicy() {
  return (
    <LegalPolicyPage
      policy={{
        kicker: "Legal + Privacy",
        title: "Privacy Policy",
        summary:
          "This page explains how we collect, use, and protect information when you use our website, buy digital products, subscribe to services, or participate in our open project community.",
        meta: "Applies to products + subscriptions",
        sections: [
          {
            id: "scope",
            title: "1. Scope",
            content: (
              <p>
                This Privacy Policy explains how Euphoria Development collects,
                uses, and protects information when you use our website, buy
                digital products, subscribe to paid services, or interact with
                our open community projects.
              </p>
            ),
          },
          {
            id: "info-we-collect",
            title: "2. Information We Collect",
            content: [
              "Basic account and contact details you provide through storefronts, subscription platforms, GitHub, and Discord.",
              "Transaction details for purchases and subscriptions (for example product name, amount, and date).",
              "Technical and usage data such as browser type, device information, and interaction data needed to keep services running.",
              "Support and community information you submit in tickets, messages, issues, and pull requests.",
            ],
          },
          {
            id: "how-we-use",
            title: "3. How We Use Information",
            content: [
              "To deliver digital products, updates, and subscription benefits.",
              "To provide support, maintain service quality, and resolve technical issues.",
              "To improve our products, content, and documentation.",
              "To prevent abuse, fraud, chargeback misuse, and unauthorized access.",
              "To meet legal, accounting, and compliance obligations.",
            ],
          },
          {
            id: "payments",
            title: "4. Payments and Third Parties",
            content: (
              <p>
                Purchases and subscriptions may be processed through third-party
                providers (for example Blueprint, BuiltByBit, SourceXchange,
                Patreon, GitHub Sponsors, or PayPal). We do not store full
                payment card data on this site. Your payment data is handled
                under the privacy terms of the payment provider you use.
              </p>
            ),
          },
          {
            id: "sharing",
            title: "5. Sharing of Data",
            content: (
              <p>
                We do not sell personal data. We only share data with service
                providers and platforms needed to operate our website, process
                payments, provide subscriptions, host code repositories, run
                support channels, and comply with legal obligations.
              </p>
            ),
          },
          {
            id: "retention",
            title: "6. Data Retention and Security",
            content: (
              <p>
                We keep data only as long as needed for service delivery,
                records, support history, legal obligations, or dispute
                handling. We use reasonable administrative and technical
                safeguards, but no online system can be guaranteed to be fully
                secure.
              </p>
            ),
          },
          {
            id: "rights",
            title: "7. Your Choices and Rights",
            content: (
              <p>
                You can request access, correction, or deletion of personal data
                we control, subject to legal exceptions. You can also close
                accounts on third-party platforms directly through those
                platforms. We may ask you to verify identity before handling
                data requests.
              </p>
            ),
          },
          {
            id: "community",
            title: "8. Community Repositories and Contributions",
            content: (
              <p>
                If you participate in public repositories (issues, pull
                requests, comments, commits), that information can be publicly
                visible by design. Please do not submit sensitive personal
                information in public contribution channels.
              </p>
            ),
          },
          {
            id: "updates",
            title: "9. Policy Updates",
            content: (
              <p>
                We may update this policy from time to time. Material updates
                will be posted on this page with a revised Last updated date.
              </p>
            ),
          },
          {
            id: "contact",
            title: "10. Contact",
            content: (
              <p>
                For privacy questions, contact us through our{" "}
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
        supportTitle: "Need support with a privacy request?",
        supportText:
          "Include your order reference, account details, and a clear request so we can process it faster.",
      }}
    />
  );
}
