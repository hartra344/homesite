import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // Check for h1 element
    const h1 = await page.locator("h1").count();
    expect(h1).toBeGreaterThan(0);

    // Check heading hierarchy (no skipped levels)
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    const headingLevels: number[] = [];

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName.toLowerCase());
      const level = parseInt(tagName.replace("h", ""));
      headingLevels.push(level);
    }

    // Check that we don't skip heading levels
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test("should have proper alt text for images", async ({ page }) => {
    const images = await page.locator("img").all();

    for (const image of images) {
      const alt = await image.getAttribute("alt");
      const src = await image.getAttribute("src");

      // All images should have alt text (can be empty for decorative images)
      expect(alt).not.toBeNull();

      // If it's not a decorative image, alt should not be empty
      if (src && !src.includes("decoration") && !src.includes("background")) {
        expect(alt).not.toBe("");
      }
    }
  });

  test("should have proper form labels", async ({ page }) => {
    const inputs = await page.locator("input, textarea, select").all();

    for (const input of inputs) {
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      if (id) {
        // Check if there's a label with for attribute
        const label = await page.locator(`label[for="${id}"]`).count();
        const hasProperLabel = label > 0 || ariaLabel || ariaLabelledBy;
        expect(hasProperLabel).toBeTruthy();
      } else {
        // If no id, should have aria-label or aria-labelledby
        const hasAriaLabel = ariaLabel || ariaLabelledBy;
        expect(hasAriaLabel).toBeTruthy();
      }
    }
  });

  test("should have sufficient color contrast", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === "color-contrast"
    );

    expect(colorContrastViolations).toEqual([]);
  });

  test("should be keyboard navigable", async ({ page, browserName }) => {
    //skip website and mobile safari browsers
    test.skip(
      browserName === "webkit",
      "The APIs to run this test don't work in Safari"
    );
    // Get all focusable elements
    const focusableElements = await page
      .locator(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      .all();

    expect(focusableElements.length).toBeGreaterThan(0);

    // Test tab navigation
    await page.keyboard.press("Tab");

    for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
      const focusedElement = await page.locator(":focus").first();
      expect(await focusedElement.count()).toBe(1);
      await page.keyboard.press("Tab");
    }
  });

  test("should have proper ARIA landmarks", async ({ page }) => {
    // Check for main landmark
    const main = await page.locator('main, [role="main"]').count();
    expect(main).toBeGreaterThan(0);

    // Check for navigation landmark
    const nav = await page.locator('nav, [role="navigation"]').count();
    expect(nav).toBeGreaterThan(0);

    // Check for header/banner
    const header = await page.locator('header, [role="banner"]').count();
    expect(header).toBeGreaterThan(0);

    // Check for footer/contentinfo
    const footer = await page.locator('footer, [role="contentinfo"]').count();
    expect(footer).toBeGreaterThan(0);
  });

  test("should have skip links for keyboard users", async ({ page }) => {
    // Look for skip links (usually visually hidden but available to screen readers)
    const skipLinks = await page.locator('a[href*="#"], a[href^="#"]').all();

    // At least one skip link should exist
    expect(skipLinks.length).toBeGreaterThan(0);

    // Test skip link functionality
    if (skipLinks.length > 0) {
      const firstSkipLink = skipLinks[0];
      const href = await firstSkipLink.getAttribute("href");

      if (href && href.startsWith("#")) {
        const targetId = href.substring(1);
        const target = await page.locator(`#${targetId}`).count();
        expect(target).toBeGreaterThan(0);
      }
    }
  });

  test("should work with reduced motion preferences", async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    // Run accessibility scan with reduced motion
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should be responsive and accessible on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();

    // Run accessibility scan on mobile viewport
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check that touch targets are large enough (at least 44x44px)
    const buttons = await page
      .locator('button, a, input[type="button"], input[type="submit"]')
      .all();

    for (const button of buttons) {
      const box = await button.boundingBox();
      const text = await button.textContent();
      if (box && text !== "Skip to main content") {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe("Specific Component Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Header navigation should be accessible", async ({ page }) => {
    const nav = page.locator('nav, header nav, [role="navigation"]').first();

    // Check that navigation has proper ARIA labels
    const ariaLabel = await nav.getAttribute("aria-label");
    const ariaLabelledBy = await nav.getAttribute("aria-labelledby");

    expect(ariaLabel || ariaLabelledBy).toBeTruthy();

    // Check navigation buttons (we use buttons for internal navigation)
    const navButtons = await nav.locator("button").all();
    expect(navButtons.length).toBeGreaterThan(0);

    for (const button of navButtons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");

      // Buttons should have accessible text
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test("Contact form should be accessible", async ({ page }) => {
    // Navigate to contact section or form
    const contactSection = page
      .locator('#contact, [data-testid="contact"]')
      .first();

    if ((await contactSection.count()) > 0) {
      await contactSection.scrollIntoViewIfNeeded();

      // Run focused accessibility scan on contact form
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include("#contact")
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test("Hero section should be accessible", async ({ page }) => {
    const heroSection = page.locator("section").first();

    // Check for proper heading in hero
    const heroHeading = await heroSection.locator("h1, h2").count();
    expect(heroHeading).toBeGreaterThan(0);

    // Run accessibility scan on hero section
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("section")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
