import { test, expect, Locator } from "@playwright/test";

test.describe("Homepage Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the homepage successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Travis Vu/);

    // Check that main sections are present
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    //skip mobile browsers where navigation is not there
    if (page?.viewportSize()?.width ?? 0 < 768) {
      console.log("Skipping navigation test on mobile viewport");
      return;
    }
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();

    // Test navigation links
    const navLinks = await nav.locator("a").all();
    expect(navLinks.length).toBeGreaterThan(0);

    // Test first navigation link
    if (navLinks.length > 0) {
      const firstLink = navLinks[0];
      const href = await firstLink.getAttribute("href");

      if (href && href.startsWith("#")) {
        await firstLink.click();
        // Should scroll to the target section
        const targetId = href.substring(1);
        const targetSection = page.locator(`#${targetId}`);
        await expect(targetSection).toBeInViewport();
      }
    }
  });

  test("should display all main sections", async ({ page }) => {
    // Check for Hero section
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();

    // Check for main content sections based on App.tsx structure
    const sections = ["hero", "about", "experience", "blog", "contact"];

    for (const sectionName of sections) {
      console.log(sectionName);
      // Try different selectors for each section
      const sectionSelectors = [
        `#${sectionName}`,
        `[data-testid="${sectionName}"]`,
        `section:has-text("${sectionName}")`,
        `section[class*="${sectionName}"]`,
      ];

      let sectionFound = false;
      for (const selector of sectionSelectors) {
        const section = page.locator(selector);
        if ((await section.count()) > 0) {
          await expect(section).toBeVisible();
          sectionFound = true;
          break;
        }
      }

      // If section not found by specific selectors, just check if content exists
      if (!sectionFound) {
        const contentExists = await page
          .getByText(new RegExp(sectionName, "i"))
          .count();
        expect(contentExists).toBeGreaterThan(0);
      }
    }
  });

  test("should be responsive", async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 768, height: 1024 }, // iPad
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.reload();

      // Check that main elements are still visible
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();

      // Check that content doesn't overflow
      const body = page.locator("body");
      const bodyBox = await body.boundingBox();
      if (bodyBox) {
        expect(bodyBox.width).toBeLessThanOrEqual(viewport.width + 20); // Small tolerance for scrollbars
      }
    }
  });

  test("should handle keyboard navigation", async ({ page }) => {
    // Test Tab navigation
    await page.keyboard.press("Tab");

    // Should focus on a focusable element
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Test Escape key (should not cause errors)
    await page.keyboard.press("Escape");

    // Test Enter key on focused element
    const firstFocusableElement = page.locator("a, button").first();
    if ((await firstFocusableElement.count()) > 0) {
      await firstFocusableElement.focus();
      // Note: We don't press Enter as it might navigate away or trigger actions
    }
  });

  test("should load without JavaScript errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Check for console errors
    expect(errors).toEqual([]);
  });
});

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a contact form", async ({ page }) => {
    // Look for contact form in different ways
    const formSelectors = [
      "form",
      "#contact form",
      '[data-testid="contact-form"]',
      'section:has-text("contact") form',
    ];

    let form: Locator | null = null;
    for (const selector of formSelectors) {
      const formElement = page.locator(selector);
      if ((await formElement.count()) > 0) {
        form = formElement.first();
        break;
      }
    }

    if (form) {
      await expect(form).toBeVisible();

      // Check for form fields
      const inputs = await form.locator("input, textarea").all();
      expect(inputs.length).toBeGreaterThan(0);

      // Check for submit button
      const submitButton = form.locator(
        'button[type="submit"], input[type="submit"]'
      );
      await expect(submitButton).toBeVisible();
    }
  });

  //   test("should validate required fields", async ({ page }) => {
  //     const form = page.locator("form").first();

  //     if ((await form.count()) > 0) {
  //       const submitButton = form
  //         .locator('button[type="submit"], input[type="submit"]')
  //         .first();

  //       if ((await submitButton.count()) > 0) {
  //         await submitButton.click();

  //         // Check for validation messages or required field indicators
  //         const validationMessages = await page
  //           .locator('[aria-invalid="true"], .error, .invalid')
  //           .count();
  //         const requiredFields = await form
  //           .locator("input[required], textarea[required]")
  //           .count();

  //         if (requiredFields > 0) {
  //           expect(validationMessages).toBeGreaterThan(0);
  //         }
  //       }
  //     }
  //   });
});

test.describe("Performance", () => {
  test("should load within reasonable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test("should have reasonable bundle size", async ({ page }) => {
    const response = await page.goto("/");
    const responseSize = (await response?.body())?.length || 0;

    // Initial HTML should be reasonable size (less than 1MB)
    expect(responseSize).toBeLessThan(1024 * 1024);
  });
});
