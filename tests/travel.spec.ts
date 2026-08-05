import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Travel page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/travel");
  });

  test("renders the route chart with waypoints and stats", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Travel" })).toBeVisible();

    // Flight-data stats strip
    for (const label of ["COUNTRIES", "CONTINENTS"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }

    // Chart plots home base and a far-flung waypoint
    const chart = page.getByRole("img", { name: /world chart/i });
    await expect(chart).toBeVisible();
    await expect(chart.getByText("RSW", { exact: true })).toBeVisible();
    await expect(chart.getByText("DXB", { exact: true })).toBeVisible();
  });

  test("lists every visited country as a card", async ({ page }) => {
    const visited = page.getByRole("region", { name: "Where I've been" });
    await expect(visited).toBeVisible();
    expect(await visited.locator("article").count()).toBe(16);
    await expect(visited).toContainText("HOME BASE");
    await expect(visited).toContainText("United Arab Emirates");
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    const scan = await new AxeBuilder({ page }).analyze();
    expect(scan.violations).toEqual([]);
  });

  test("is reachable from the header nav", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Toggle mobile menu" });
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: /travel/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/travel$/);
    await expect(page.getByRole("heading", { level: 1, name: "Travel" })).toBeVisible();
  });
});
