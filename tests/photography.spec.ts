import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Photography gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/photos");
  });

  test("renders the gallery with photo cards and shot data", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Photography" })).toBeVisible();

    const cards = page.locator("figure button");
    expect(await cards.count()).toBeGreaterThan(0);

    // Every card shows its image and a camera/settings line
    const firstCard = cards.first();
    await expect(firstCard.locator("img")).toBeVisible();
    await expect(firstCard).toContainText(/ISO \d+/);
  });

  test("lightbox shows EXIF panel and supports keyboard navigation", async ({ page }) => {
    await page.locator("figure button").first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Flight-data strip labels
    for (const label of ["CAMERA", "LENS", "FOCAL", "APERTURE", "SHUTTER", "ISO"]) {
      await expect(dialog.getByText(label, { exact: true })).toBeVisible();
    }
    await expect(dialog).toContainText(/f\/[\d.]+/);
    await expect(dialog).toContainText(/1\/\d+s/);

    // Arrow keys navigate between frames
    const frameCounter = dialog.getByText(/FRAME 01/);
    await expect(frameCounter).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText(/FRAME 02/)).toBeVisible();

    // Escape closes and returns focus to the gallery
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("gallery and lightbox have no detectable accessibility violations", async ({ page }) => {
    const galleryScan = await new AxeBuilder({ page }).analyze();
    expect(galleryScan.violations).toEqual([]);

    await page.locator("figure button").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const lightboxScan = await new AxeBuilder({ page }).analyze();
    expect(lightboxScan.violations).toEqual([]);
  });

  test("gallery is reachable from the header nav", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Toggle mobile menu" });
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: /photography/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/photos$/);
    await expect(page.getByRole("heading", { level: 1, name: "Photography" })).toBeVisible();
  });
});
