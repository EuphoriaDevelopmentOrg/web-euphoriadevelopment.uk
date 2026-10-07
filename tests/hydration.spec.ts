import { test, expect } from "@playwright/test";

test("check console for hydration errors across routes", async ({ page }) => {
  const consoleMessages: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  for (const path of [
    "/",
    "/docs",
    "/docs/general-guides/installation",
    "/legal/privacy-policy",
    "/legal/refund-policy",
    "/legal/terms-and-conditions",
  ]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }

  console.log("ALL CONSOLE MESSAGES:", consoleMessages);
  expect(
    consoleMessages.filter((msg) => msg.toLowerCase().includes("hydration")),
  ).toEqual([]);
});
