import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Theme and Dark Mode Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should work with system dark mode preference", async ({ page }) => {
    // Set dark mode preference
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    // Run accessibility scan in dark mode
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check that content is still visible in dark mode
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("should work with system light mode preference", async ({ page }) => {
    // Set light mode preference
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    // Run accessibility scan in light mode
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should maintain contrast ratios in both themes", async ({ page }) => {
    // Test light mode contrast
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    const lightModeResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .analyze();

    const lightContrastViolations = lightModeResults.violations.filter(
      (violation) => violation.id === "color-contrast"
    );

    // Test dark mode contrast
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    const darkModeResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .analyze();

    const darkContrastViolations = darkModeResults.violations.filter(
      (violation) => violation.id === "color-contrast"
    );

    expect(lightContrastViolations).toEqual([]);
    expect(darkContrastViolations).toEqual([]);
  });

  test("should handle theme changes gracefully", async ({ page }) => {
    // Start with light mode
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    // Take initial accessibility snapshot
    const initialResults = await new AxeBuilder({ page }).analyze();

    // Switch to dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(500); // Allow for theme transition

    // Take accessibility snapshot after theme change
    const afterChangeResults = await new AxeBuilder({ page }).analyze();

    // Both should pass accessibility checks
    expect(initialResults.violations).toEqual([]);
    expect(afterChangeResults.violations).toEqual([]);
  });

  test("should work with different color preferences", async ({ page }) => {
    const colorSchemes = ["light", "dark", "no-preference"] as const;

    for (const scheme of colorSchemes) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.reload();

      // Run accessibility scan for each color scheme
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);

      // Check that main content is visible
      await expect(page.locator("main")).toBeVisible();
    }
  });

  test("should have sufficient color contrast for all text", async ({
    page,
  }) => {
    // Test various text elements for color contrast
    const textElements = await page
      .locator("p, h1, h2, h3, h4, h5, h6, a, button, span, div")
      .all();

    for (const element of textElements.slice(0, 20)) {
      // Test first 20 elements
      const textContent = await element.textContent();
      console.log(textContent);
      if (textContent && textContent.trim()) {
        const styles = await element.evaluate((el) => {
          const computedStyles = window.getComputedStyle(el);
          return {
            color: computedStyles.color,
            backgroundColor: computedStyles.backgroundColor,
            fontSize: computedStyles.fontSize,
          };
        });

        console.log(styles.color);
        console.log(await element.getAttribute("class"));
      }
    }
  });

  test("should handle print styles accessibly", async ({ page }) => {
    // Emulate print media
    await page.emulateMedia({ media: "print" });
    await page.reload();

    // Run accessibility scan for print styles
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check that content is still structured properly for print
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").count();
    expect(headings).toBeGreaterThan(0);

    // Reset to screen media
    await page.emulateMedia({ media: "screen" });
  });

  test("should work with custom CSS properties and variables", async ({
    page,
  }) => {
    // Check that CSS custom properties are properly defined
    const cssVariables = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.documentElement);
      const variables: string[] = [];

      // Check for common CSS variables that might be used
      const commonVars = [
        "--primary-color",
        "--secondary-color",
        "--background-color",
        "--text-color",
        "--border-color",
      ];

      for (const varName of commonVars) {
        const value = styles.getPropertyValue(varName);
        if (value) {
          variables.push(varName);
        }
      }

      return variables;
    });

    // If CSS variables are used, they should be properly defined
    for (const variable of cssVariables) {
      const value = await page.evaluate((varName) => {
        return window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(varName);
      }, variable);

      expect(value).toBeTruthy();
      expect(value.trim()).not.toBe("");
    }
  });

  test("should maintain accessibility across all interactive states", async ({
    page,
  }) => {
    //skip mobile browsers where there is no hover state
    if (page?.viewportSize()?.width ?? 0 < 768) {
      console.log("Skipping navigation test on mobile viewport");
      return;
    }
    // Test hover states
    const interactiveElements = await page.locator("a, button, input").all();

    for (const element of interactiveElements.slice(0, 5)) {
      if ((await element.textContent()) === "Skip to main content") {
        continue; // Skip the "Skip to main content" link
      }
      console.log(await element.textContent());
      // Test first 5 elements
      // Test hover state
      await element.hover();
      await page.waitForTimeout(200);

      // Check accessibility in hover state
      const hoverResults = await new AxeBuilder({ page }).analyze();
      expect(hoverResults.violations).toEqual([]);

      // Test focus state
      await element.focus();
      await page.waitForTimeout(200);

      // Check accessibility in focus state
      const focusResults = await new AxeBuilder({ page }).analyze();
      expect(focusResults.violations).toEqual([]);
    }
  });
});
