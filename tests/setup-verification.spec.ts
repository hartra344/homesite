import { test, expect } from '@playwright/test';

test.describe('Quick Setup Verification', () => {
  test('can connect to the development server', async ({ page }) => {
    // This test verifies that the basic setup is working
    await page.goto('/');
    
    // Should be able to load the page without errors
    await expect(page).toHaveTitle(/Travis/i);
    
    // Should have basic structure
    await expect(page.locator('body')).toBeVisible();
    
    console.log('✅ Playwright setup is working correctly!');
  });
  
  test('axe-core integration is working', async ({ page }) => {
    // Import axe-core to verify it's working
    const AxeBuilder = await import('@axe-core/playwright');
    
    await page.goto('/');
    
    // Run a basic accessibility scan
    const accessibilityScanResults = await new AxeBuilder.default({ page })
      .withTags(['wcag2a'])
      .analyze();
    
    // Should be able to run the scan without errors
    expect(accessibilityScanResults).toBeDefined();
    expect(accessibilityScanResults.violations).toBeDefined();
    
    console.log('✅ Axe-core accessibility testing is working correctly!');
    console.log(`Found ${accessibilityScanResults.violations.length} violations`);
  });
});
