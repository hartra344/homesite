import { test } from "@playwright/test";

test("Debug touch targets", async ({ page }) => {
  await page.goto("/");

  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();

  // Wait for page to load
  await page.waitForLoadState("networkidle");

  // Check all interactive elements
  const buttons = await page
    .locator('button, a, input[type="button"], input[type="submit"]')
    .all();

  console.log(`Found ${buttons.length} interactive elements`);

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const box = await button.boundingBox();
    const text = await button.textContent();
    const ariaLabel = await button.getAttribute("aria-label");

    if (box) {
      const identifier = text?.trim() || ariaLabel || `button-${i}`;
      console.log(`"${identifier}": ${box.width}x${box.height}px`);

      if (box.width < 44 || box.height < 44) {
        console.log(
          `❌ TOO SMALL: "${identifier}" - ${box.width}x${box.height}px`
        );

        // Get more details about this element
        const classList = await button.evaluate((el) =>
          Array.from(el.classList).join(" ")
        );
        const tagName = await button.evaluate((el) => el.tagName);
        const isVisible = await button.isVisible();
        console.log(
          `   Tag: ${tagName}, Classes: ${classList}, Visible: ${isVisible}`
        );
      }
    }
  }
});
