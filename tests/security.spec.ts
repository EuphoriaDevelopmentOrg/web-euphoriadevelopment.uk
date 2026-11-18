import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://api.euphoriadevelopment.uk/**", (route) =>
    route.fulfill({
      json: route.request().url().includes("/stats")
        ? { totalApiCalls: 0, totalInstalls: 0, blueprintExtensions: [] }
        : [],
    }),
  );
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({ status: 503, json: {} }),
  );
});

test("production headers prevent framing and third-party script loading", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["content-security-policy"]).not.toContain("'unsafe-eval'");
  expect(headers["content-security-policy"]).toContain(
    "https://static.cloudflareinsights.com",
  );
  expect(headers["content-security-policy"]).toContain(
    "https://cloudflareinsights.com",
  );
  expect(headers["strict-transport-security"]).toBe("max-age=31536000");
  expect(headers["x-powered-by"]).toBeUndefined();

  await page.goto("/");
  const blocked = await page.evaluate(
    () =>
      new Promise<string>((resolve) => {
        document.addEventListener(
          "securitypolicyviolation",
          (event) => resolve(event.blockedURI),
          { once: true },
        );
        const script = document.createElement("script");
        script.src = "https://untrusted.example.invalid/payload.js";
        document.head.appendChild(script);
      }),
  );
  expect(blocked).toBe("https://untrusted.example.invalid/payload.js");
});

test("malformed external data is bounded and rendered as text with safe links", async ({
  page,
}) => {
  const payload = '<img src=x onerror="window.apiPayloadExecuted=true">';
  await page.route("https://api.euphoriadevelopment.uk/stats/", (route) =>
    route.fulfill({
      json: {
        totalApiCalls: "Infinity",
        totalInstalls: -1,
        blueprintExtensions: [
          null,
          false,
          {
            name: payload,
            identifier: "example",
            type: "addon",
            platforms: {
              BLUEPRINT: { url: "javascript:alert(1)" },
              BUILTBYBIT: null,
              INVALID: { price: { toString: null } },
              SOURCEXCHANGE: {
                url: "https://www.sourcexchange.net.evil.invalid/listing",
              },
              GITHUB: { url: "https://user:password@github.com/example/repo" },
            },
            versions: {},
            stats: { panels: "Infinity" },
            banner: "data:text/html,<script>alert(1)</script>",
          },
        ],
      },
    }),
  );
  await page.route("https://api.euphoriadevelopment.uk/team", (route) =>
    route.fulfill({
      json: [
        null,
        false,
        {
          Name: "Example person",
          Role: {},
          Link: "javascript:alert(1)",
          Image: "http://example.com/insecure.png",
        },
      ],
    }),
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: payload, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Example person", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(
      'a[href^="javascript:"], a[href*="user:password@"], a[href*="evil.invalid"], img[src^="data:text/html"]',
    ),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () =>
        (window as Window & { apiPayloadExecuted?: boolean })
          .apiPayloadExecuted,
    ),
  ).toBeUndefined();
  await expect(page.locator("#statistics strong")).toHaveText([
    "7",
    "Unavailable",
    "Unavailable",
  ]);
});

test("repository pages reject object-valued metadata and retain canonical GitHub links", async ({
  page,
}) => {
  await page.route(
    "https://api.github.com/repos/EuphoriaTheme/Refresh-Theme",
    (route) =>
      route.fulfill({
        json: {
          name: {},
          description: {},
          language: { malicious: true },
          html_url: "javascript:alert(1)",
          stargazers_count: {},
          forks_count: -1,
          open_issues_count: "Infinity",
        },
      }),
  );
  await page.goto("/docs/community/refresh-theme");
  await expect(
    page.getByRole("heading", { name: "Refresh-Theme", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Repository", exact: true }),
  ).toHaveAttribute("href", "https://github.com/EuphoriaTheme/Refresh-Theme");
  await expect(
    page.getByText("Unavailable stars", { exact: true }),
  ).toBeVisible();
  await expect(page.locator('a[href^="javascript:"]')).toHaveCount(0);
});

test("oversized metadata fails safely and an explicit retry fetches fresh data", async ({
  page,
}) => {
  let oversized = true;
  let calls = 0;
  await page.route("https://api.euphoriadevelopment.uk/stats/", (route) => {
    calls++;
    return oversized
      ? route.fulfill({
          headers: {
            "content-type": "application/json",
            "content-length": "9000000",
          },
          body: "{}",
        })
      : route.fulfill({
          json: { totalApiCalls: 2, totalInstalls: 3, blueprintExtensions: [] },
        });
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Retry catalogue" }),
  ).toBeVisible();
  expect(calls).toBe(1);
  oversized = false;
  await page.getByRole("button", { name: "Retry catalogue" }).click();
  await expect(page.locator("#statistics strong")).toHaveText(["6", "2", "3"]);
  expect(calls).toBe(2);
});

test("public metadata is reused during navigation and font loading stays on-site", async ({
  page,
  isMobile,
}) => {
  let requests = 0;
  let externalFonts = 0;
  page.on("request", (request) => {
    if (request.url().startsWith("https://api.euphoriadevelopment.uk/"))
      requests++;
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) externalFonts++;
  });
  await page.goto("/");
  await expect(page.locator("#statistics strong")).toHaveText(["6", "0", "0"]);
  await page
    .locator(".hero-actions")
    .getByRole("link", { name: "Documentation", exact: true })
    .click();
  if (isMobile)
    await page.getByRole("button", { name: "Open Sidebar" }).click();
  await page.getByRole("link", { name: "Main Site", exact: true }).click();
  await expect(page.locator("#statistics strong")).toHaveText(["6", "0", "0"]);
  expect(requests).toBe(4);
  expect(externalFonts).toBe(0);
});

test("retry replaces a malformed successful response instead of reusing it", async ({
  page,
}) => {
  let valid = false;
  let calls = 0;
  await page.route("https://api.euphoriadevelopment.uk/stats/", (route) => {
    calls++;
    return route.fulfill({
      json: valid
        ? { totalApiCalls: 10, totalInstalls: 20, blueprintExtensions: [] }
        : { blueprintExtensions: {} },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Retry catalogue" }).waitFor();
  valid = true;
  await page.getByRole("button", { name: "Retry catalogue" }).click();
  await expect(page.locator("#statistics strong")).toHaveText([
    "6",
    "10",
    "20",
  ]);
  expect(calls).toBe(2);
});

test("the response size limit also applies without a content-length header", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = (input, options) =>
      String(input) === "https://api.euphoriadevelopment.uk/stats/"
        ? Promise.resolve(
            new Response(
              JSON.stringify({
                totalApiCalls: 1,
                totalInstalls: 1,
                blueprintExtensions: [],
                padding: "x".repeat(2 * 1024 * 1024),
              }),
              { headers: { "content-type": "application/json" } },
            ),
          )
        : originalFetch(input, options);
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Retry catalogue" }),
  ).toBeVisible();
  await expect(page.locator("#statistics strong")).toHaveText([
    "Unavailable",
    "Unavailable",
    "Unavailable",
  ]);
});
