# Test Suite

This project includes comprehensive Playwright tests with a focus on accessibility (a11y) testing.

## Test Structure

- **`accessibility.spec.ts`** - Core accessibility tests using axe-core
- **`visual-accessibility.spec.ts`** - Visual and interaction accessibility tests
- **`theme-accessibility.spec.ts`** - Theme and color scheme accessibility tests
- **`homepage.spec.ts`** - General functionality and user flow tests

## Running Tests

### All Tests
```bash
npm test
```

### Accessibility Tests Only
```bash
npm run test:accessibility
```

### Interactive UI Mode
```bash
npm run test:ui
```

### Debug Mode
```bash
npm run test:debug
```

### Headed Mode (visible browser)
```bash
npm run test:headed
```

## Accessibility Features Tested

### Core Accessibility
- ✅ Automated accessibility violations (axe-core)
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Form labels and associations
- ✅ Color contrast ratios
- ✅ Keyboard navigation
- ✅ ARIA landmarks and roles
- ✅ Skip links

### Visual Accessibility
- ✅ Reduced motion preferences
- ✅ High contrast mode support
- ✅ 200% zoom compatibility
- ✅ Text scaling
- ✅ Focus indicators
- ✅ Screen reader compatibility

### Theme Accessibility
- ✅ Dark mode support
- ✅ Light mode support
- ✅ System preference detection
- ✅ Forced colors mode (high contrast)
- ✅ Print styles
- ✅ Interactive state accessibility

### Cross-Browser Testing
Tests run across multiple browsers and devices:
- Chrome Desktop
- Firefox Desktop
- Safari Desktop
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Accessibility Standards

Tests are designed to meet or exceed:
- **WCAG 2.1 Level AA** compliance
- **Section 508** requirements
- **EN 301 549** standards

## Test Configuration

Tests are configured to:
- Run against local development server
- Include comprehensive browser coverage
- Generate HTML reports
- Support CI/CD environments
- Provide detailed failure information

## Continuous Integration

Tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install

- name: Run accessibility tests
  run: npm run test:accessibility
```

## Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run tests (server will start automatically):
   ```bash
   npm test
   ```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Writing New Tests

When adding new features, ensure they include accessibility tests:

1. Add component-specific accessibility tests
2. Test keyboard navigation
3. Verify ARIA attributes
4. Check color contrast
5. Test with screen readers (manual)

## Tools Used

- **Playwright** - End-to-end testing framework
- **@axe-core/playwright** - Automated accessibility testing
- **WCAG Guidelines** - Accessibility standard compliance
- **Multiple Browsers** - Cross-browser compatibility testing
