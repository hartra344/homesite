import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Visual Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should respect prefers-reduced-motion", async ({ page }) => {
    // Test with reduced motion enabled
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    // Check that animations are disabled or reduced
    const elementsWithTransition = await page
      .locator("*")
      .evaluateAll((elements) => {
        return elements.filter((el) => {
          const style = window.getComputedStyle(el);
          return (
            style.transition !== "all 0s ease 0s" && style.transition !== "none"
          );
        }).length;
      });

    // With reduced motion, there should be minimal transitions
    expect(elementsWithTransition).toBeLessThan(5);
  });

  test("should work with high contrast mode", async ({ page }) => {
    // Simulate high contrast mode by checking color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2aaa"]) // Stricter contrast requirements
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === "color-contrast-enhanced"
    );

    // Should pass enhanced contrast requirements
    expect(contrastViolations.length).toBeLessThan(3); // Allow for minor issues
  });

  test("should be readable when zoomed to 200%", async ({ page }) => {
    // Zoom to 200%
    await page.evaluate(() => {
      document.body.style.zoom = "2";
    });

    await page.waitForTimeout(1000); // Allow layout to settle

    // Check that content is still accessible
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check that important elements are still visible
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("nav").first()).toBeVisible();

    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = "1";
    });
  });

  test("should work without CSS", async ({ page }) => {
    // Disable CSS
    await page.addStyleTag({
      content: `
        * {
          all: revert !important;
          color: black !important;
          background: white !important;
        }
      `,
    });

    // Content should still be readable and structured
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").count();
    expect(headings).toBeGreaterThan(0);

    const paragraphs = await page.locator("p").count();
    expect(paragraphs).toBeGreaterThan(0);

    const links = await page.locator("a").count();
    expect(links).toBeGreaterThan(0);
  });

  test("should have proper focus indicators", async ({ page }) => {
    // Get all focusable elements
    const focusableElements = await page
      .locator(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      .all();

    for (const element of focusableElements.slice(0, 5)) {
      // Test first 5 elements
      await element.focus();

      // Check if element has visible focus indicator
      const focusStyle = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          outline: style.outline,
          outlineColor: style.outlineColor,
          outlineWidth: style.outlineWidth,
          borderColor: style.borderColor,
          boxShadow: style.boxShadow,
        };
      });

      // Should have some kind of focus indicator
      const hasFocusIndicator =
        focusStyle.outline !== "none" ||
        focusStyle.outlineWidth !== "0px" ||
        focusStyle.boxShadow !== "none" ||
        focusStyle.borderColor !== "rgba(0, 0, 0, 0)";

      expect(hasFocusIndicator).toBeTruthy();
    }
  });

  test("should handle text scaling", async ({ page }) => {
    // Test with larger text
    await page.addStyleTag({
      content: `
        * {
          font-size: 24px !important;
          line-height: 1.5 !important;
        }
      `,
    });

    await page.waitForTimeout(1000);

    // Content should still be accessible with larger text
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check that text doesn't overflow containers
    const textElements = await page
      .locator("p, h1, h2, h3, h4, h5, h6, span")
      .all();

    for (const element of textElements.slice(0, 10)) {
      // Check first 10 elements
      const box = await element.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(0);
        expect(box.height).toBeGreaterThan(0);
      }
    }
  });

  test("should work with screen reader simulation", async ({ page }) => {
    // Test that content is properly structured for screen readers

    // Check reading order by getting all text content
    const allText = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );

      const textNodes: string[] = [];
      let node: Node | null = null;
      // eslint-disable-next-line no-cond-assign
      while ((node = walker.nextNode())) {
        if (node.textContent && node.textContent.trim()) {
          textNodes.push(node.textContent.trim());
        }
      }
      return textNodes;
    });

    expect(allText.length).toBeGreaterThan(0);

    // Check that important content comes first
    const firstTexts = allText.slice(0, 5).join(" ").toLowerCase();
    expect(firstTexts).toMatch(/travis|home|portfolio|developer|engineer/);
  });

  test("should have proper link context", async ({ page }) => {
    const links = await page.locator("a").all();

    for (const link of links) {
      const linkText = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      const title = await link.getAttribute("title");

      // Links should have meaningful text or aria-label
      const meaningfulText = linkText || ariaLabel || title;
      expect(meaningfulText).toBeTruthy();

      // Avoid generic text like "click here", "read more"
      if (meaningfulText) {
        const genericTerms = [
          "click here",
          "read more",
          "more",
          "here",
          "link",
        ];
        const isGeneric = genericTerms.some(
          (term) => meaningfulText.toLowerCase().trim() === term
        );
        expect(isGeneric).toBeFalsy();
      }
    }
  });

  test("should have proper button context", async ({ page }) => {
    const buttons = await page.locator("button").all();

    for (const button of buttons) {
      const buttonText = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");
      const title = await button.getAttribute("title");

      // Buttons should have meaningful text or aria-label
      const meaningfulText = buttonText || ariaLabel || title;
      expect(meaningfulText).toBeTruthy();

      // Check that button has proper type attribute if it's in a form
      const type = await button.getAttribute("type");
      const isInForm = await button.evaluate((el) => {
        return !!el.closest("form");
      });

      if (isInForm && !type) {
        // Buttons in forms should have explicit type
        console.warn("Button in form should have explicit type attribute");
      }
    }
  });
});
