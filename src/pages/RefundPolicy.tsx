import { LegalPolicyPage } from "../components/LegalPolicyPage";

export function RefundPolicy() {
  return (
    <LegalPolicyPage
      policy={{
        theme: "refund",
        kicker: "Legal + Billing",
        title: "Refund Policy",
        summary:
          "These terms explain when refunds may be approved for digital products and subscription services, including chargeback handling and platform-specific payment rules.",
        meta: "Digital products + recurring services",
        sections: [
          {
            id: "scope",
            title: "1. Scope",
            content: (
              <p>
                This policy applies to digital products and subscription
                services sold by Euphoria Development through our site and
                approved third-party storefronts.
              </p>
            ),
          },
          {
            id: "digital-sales",
            title: "2. Digital Product Sales",
            content: (
              <p>
                Because digital items are delivered instantly and cannot be
                returned, all sales are generally final. A refund may be
                approved if the product is materially defective, cannot be
                delivered, or cannot function as described and we cannot provide
                a reasonable fix.
              </p>
            ),
          },
          {
            id: "subscriptions",
            title: "3. Subscription Services",
            content: [
              "Subscriptions renew automatically unless canceled before the next billing cycle.",
              "You may cancel anytime to stop future renewals.",
              "Unless required by law or platform rules, partial and prorated refunds are not provided for unused time in an active billing period.",
            ],
          },
          {
            id: "window",
            title: "4. Refund Request Window",
            content: (
              <p>
                Requests should be submitted within 14 days of the original
                purchase or renewal date. Requests outside this period may be
                denied unless required by law.
              </p>
            ),
          },
          {
            id: "non-refundable",
            title: "5. Non-Refundable Cases",
            content: [
              "Change of mind after successful digital delivery.",
              "Compatibility issues not stated in product requirements.",
              "Failure to cancel a recurring subscription before renewal.",
              "Violations of our Terms and Conditions, abuse, or fraudulent behavior.",
            ],
          },
          {
            id: "third-party",
            title: "6. Third-Party Storefront Rules",
            content: (
              <p>
                Purchases made via third-party platforms may also be subject to
                that platform&apos;s dispute and refund process. If a platform
                has mandatory consumer protections, those rules take priority
                where applicable.
              </p>
            ),
          },
          {
            id: "chargebacks",
            title: "7. Chargebacks",
            content: (
              <p>
                If you issue a payment chargeback without first contacting us
                for support, we may suspend or terminate associated licenses,
                subscriptions, and account access while the dispute is being
                investigated.
              </p>
            ),
          },
          {
            id: "request",
            title: "8. How to Request a Refund",
            content: (
              <p>
                Contact us with your order reference, purchase date, and a clear
                description of the issue through our{" "}
                <a
                  href="https://discord.euphoriadevelopment.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord community
                </a>{" "}
                or{" "}
                <a
                  href="https://github.com/EuphoriaDevelopmentOrg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub organization
                </a>
                . We review requests case-by-case in line with this policy and
                applicable law.
              </p>
            ),
          },
        ],
        supportTitle: "Before opening a refund request",
        supportText:
          "Include platform name, transaction ID, purchase date, and the exact product or subscription so we can verify your request quickly.",
      }}
    />
  );
}
