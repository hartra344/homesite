const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check all interactive elements
  const buttons = await page.locator('button, a, input[type="button"], input[type="submit"]').all();
  
  console.log(`Found ${buttons.length} interactive elements`);
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const box = await button.boundingBox();
    const text = await button.textContent();
    const role = await button.getAttribute('role');
    const ariaLabel = await button.getAttribute('aria-label');
    
    if (box) {
      const identifier = text || ariaLabel || role || `button-${i}`;
      console.log(`${identifier}: ${box.width}x${box.height}px`);
      
      if (box.width < 44 || box.height < 44) {
        console.log(`❌ TOO SMALL: "${identifier}" - ${box.width}x${box.height}px`);
        
        // Get more details about this element
        const classList = await button.evaluate(el => Array.from(el.classList).join(' '));
        const tagName = await button.evaluate(el => el.tagName);
        console.log(`   Tag: ${tagName}, Classes: ${classList}`);
      } else {
        console.log(`✅ OK: "${identifier}" - ${box.width}x${box.height}px`);
      }
    } else {
      console.log(`No bounding box for button ${i}`);
    }
  }
  
  await browser.close();
})();
