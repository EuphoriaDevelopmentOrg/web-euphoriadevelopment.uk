import { expect, test, type Page } from "@playwright/test";
import {
  docGroups,
  legalPages,
  pageTitle,
  siteOrigin,
  sitePages,
} from "../src/site-pages";

const catalogue = {
  totalApiCalls: 0,
  totalInstalls: 42,
  blueprintExtensions: [
    {
      id: "test-addon",
      name: "Example Addon",
      identifier: "example-addon",
      type: "addon",
      summary: "A test extension",
      platforms: {
        BLUEPRINT: {
          url: "https://blueprint.zip/browse/example-addon",
          price: 0,
        },
      },
    },
    {
      id: "test-theme",
      name: "Example Theme",
      identifier: "example-theme",
      type: "theme",
      summary: "A test theme",
      platforms: {},
    },
  ],
};

const team = [
  {
    Name: "Example Team Member",
    Image: "https://example.com/team-member.png",
    Link: "https://example.com/team-member",
    Role: "Developer",
  },
];

test.beforeEach(async ({ page }) => {
  // External services cannot make these tests flaky or require credentials.
  await page.route(/^https?:\/\//, async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1") return route.continue();
    if (url.hostname === "api.euphoriadevelopment.uk") {
      return route.fulfill({
        json: url.pathname.startsWith("/stats")
          ? catalogue
          : url.pathname === "/team"
            ? team
            : [],
      });
    }
    if (url.hostname === "api.github.com")
      return route.fulfill({ status: 503, json: { message: "Unavailable" } });
    return route.abort();
  });
});

async function expectNoOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
}

test("catalogue and demos appear before GitHub responds; counts use API data", async ({
  page,
}) => {
  let statsRequests = 0;
  let githubRequests = 0;
  let releaseGithub!: () => void;
  const githubGate = new Promise<void>((resolve) => {
    releaseGithub = resolve;
  });
  await page.route("https://api.github.com/**", async (route) => {
    githubRequests += 1;
    await githubGate;
    await route.fulfill({ status: 403, json: { message: "Rate limited" } });
  });
  page.on("request", (request) => {
    if (request.url().includes("/stats/")) statsRequests += 1;
  });
  try {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Example Addon", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Example Theme", exact: true }),
    ).toBeVisible();
    for (const [name, href] of [
      ["Euphoria Paste (Free)", "https://paste.euphoriadevelopment.uk/"],
      ["Euphoria Paste (Paid)", "https://paste-v2.euphoriadevelopment.uk/"],
      ["Euphoria Licensing", "https://l-demo.euphoriadevelopment.uk/"],
    ]) {
      const card = page
        .locator("#apps article")
        .filter({ has: page.getByRole("heading", { name, exact: true }) });
      await expect(
        card.getByRole("link", { name: "Live Demo" }),
      ).toHaveAttribute("href", href);
    }
    await expect(page.locator("#statistics strong")).toHaveText([
      "6",
      "0",
      "42",
    ]);
    expect(statsRequests).toBe(1);
    expect(githubRequests).toBeGreaterThan(0);
    const sections = await page
      .locator("main > section[id]")
      .evaluateAll((elements) => elements.map((element) => element.id));
    expect(sections.indexOf("products")).toBeLessThan(
      sections.indexOf("contributors"),
    );
    expect(sections.indexOf("apps")).toBeLessThan(sections.indexOf("team"));
    expect(sections.indexOf("team")).toBeLessThan(
      sections.indexOf("contributors"),
    );
    const teamCard = page.locator("#team").filter({
      has: page.getByRole("heading", {
        name: "Example Team Member",
        exact: true,
      }),
    });
    await expect(
      teamCard.getByText("Team Member", { exact: true }),
    ).toBeVisible();
    await expect(
      teamCard.getByText("Developer", { exact: true }),
    ).toBeVisible();
    await expect(
      teamCard.getByRole("link", { name: /Example Team Member/ }),
    ).toHaveAttribute("href", "https://example.com/team-member");
    await expectNoOverflow(page);
  } finally {
    releaseGithub();
  }
  await expect(
    page.getByRole("heading", { name: "Example Addon", exact: true }),
  ).toBeVisible();
});

test("API outage shows unavailable values and supports retry without hiding web apps", async ({
  page,
}) => {
  let fail = true;
  await page.route("https://api.euphoriadevelopment.uk/stats/", (route) =>
    fail
      ? route.fulfill({ status: 503, json: {} })
      : route.fulfill({ json: catalogue }),
  );
  await page.goto("/");
  await expect(page.locator("#statistics strong")).toHaveText([
    "Unavailable",
    "Unavailable",
    "Unavailable",
  ]);
  await expect(
    page.getByRole("heading", { name: "Euphoria Paste (Paid)", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("No Blueprint addons found yet.")).toHaveCount(0);
  fail = false;
  await page.getByRole("button", { name: "Retry catalogue" }).click();
  await expect(
    page.getByRole("heading", { name: "Example Addon", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#statistics strong")).toHaveText(["6", "0", "42"]);
});

test("missing and invalid statistics stay unknown while a valid empty catalogue is shown", async ({
  page,
}) => {
  await page.route("https://api.euphoriadevelopment.uk/stats/", (route) =>
    route.fulfill({
      json: {
        totalApiCalls: null,
        totalInstalls: -1,
        blueprintExtensions: [],
      },
    }),
  );
  await page.goto("/");
  await expect(page.locator("#statistics strong")).toHaveText([
    "4",
    "Unavailable",
    "Unavailable",
  ]);
  await expect(page.getByText("No Blueprint addons found yet.")).toBeVisible();
});

test("mobile menu opens and closes after choosing a section", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile navigation only");
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Web Apps" })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#apps$/);
});

test("shared docs navigation preserves theme and updates metadata without reloading", async ({
  page,
}) => {
  await page.goto("/docs");
  await page.evaluate(() => {
    document.documentElement.dataset.navigationTest = "preserved";
  });
  await page.getByRole("link", { name: "Start with Licensing" }).click();
  await expect(page).toHaveTitle("Licensing | Euphoria Development");
  await page
    .getByRole("navigation", { name: "Documentation sidebar" })
    .getByRole("link", { name: "Installation", exact: true })
    .click();
  await expect(page).toHaveTitle("Installation | Euphoria Development");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteOrigin}/docs/general-guides/installation`,
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-navigation-test",
    "preserved",
  );
  await expect(page.locator("body")).toHaveClass("docs-page");
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(
    page
      .getByRole("navigation", { name: "Documentation sidebar" })
      .getByRole("link", { name: "Installation", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .getByRole("navigation", { name: "Documentation footer" })
    .getByRole("link", { name: "Privacy Policy" })
    .click();
  await expect(page.locator("body")).toHaveClass("legal-page legal-privacy");
  for (const [name, theme] of [
    ["Refunds", "refund"],
    ["Terms", "terms"],
  ]) {
    await page
      .getByRole("navigation", { name: "Legal navigation" })
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page.locator("body")).toHaveClass(`legal-page legal-${theme}`);
    expect(
      await page
        .locator("body")
        .evaluate((body) => getComputedStyle(body).backgroundImage),
    ).toContain("gradient");
  }
  await page
    .getByRole("navigation", { name: "Legal navigation" })
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page.locator("body")).toHaveClass(
    "min-h-screen bg-neutral-950 text-neutral-100",
  );
  await expect(page).toHaveTitle(pageTitle(sitePages[0]));
});

for (const sitePage of sitePages.filter((page) => page.path !== "/")) {
  test(`direct route renders its content, theme, and metadata: ${sitePage.path}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(sitePage.path);
    await expect(page).toHaveTitle(pageTitle(sitePage));
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(
      page.locator("main article, main .policy-content").first(),
    ).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      sitePage.description,
    );
    expect(
      await page
        .locator("body")
        .evaluate((body) => getComputedStyle(body).backgroundImage),
    ).toContain("gradient");
    await expectNoOverflow(page);
    expect(errors).toEqual([]);
  });
}

test("production HTML and sitemap contain unique metadata for every public page before JavaScript", async ({
  request,
  browserName,
}) => {
  test.skip(browserName !== "chromium");
  const titles = new Set<string>();
  for (const sitePage of sitePages) {
    const response = await request.get(sitePage.path);
    expect(response.ok()).toBe(true);
    const html = await response.text();
    const escapedTitle = pageTitle(sitePage).replaceAll("&", "&amp;");
    expect(html).toContain(`<title>${escapedTitle}</title>`);
    expect(html).toContain(
      `rel="canonical" href="${siteOrigin}${sitePage.path}"`,
    );
    expect(html).toContain(
      `property="og:url" content="${siteOrigin}${sitePage.path}"`,
    );
    titles.add(escapedTitle);
  }
  expect(titles.size).toBe(sitePages.length);
  const response = await request.get("/sitemap.xml");
  const sitemap = await response.text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(sitePages.length);
  for (const sitePage of sitePages)
    expect(sitemap).toContain(`<loc>${siteOrigin}${sitePage.path}</loc>`);
  expect(sitemap).not.toMatch(/streamlink|eventer|endstone/i);
});

test("docs index links to every documentation page and all legal policies", async ({
  page,
}) => {
  await page.goto("/docs");
  for (const sitePage of docGroups.flatMap((group) => group.pages)) {
    await expect(
      page.locator(`#docs-content a[href="${sitePage.path}"]`),
    ).toHaveCount(1);
  }
  for (const sitePage of legalPages)
    await expect(page.locator(`footer a[href="${sitePage.path}"]`)).toHaveCount(
      1,
    );
});
