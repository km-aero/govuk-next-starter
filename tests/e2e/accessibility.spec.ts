/**
 * Accessibility Tests
 * ====================
 * Automated accessibility tests using axe-core.
 * Tests pages against WCAG 2.2 AA standards.
 */

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("homepage should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("contact form page should not have accessibility issues", async ({
    page,
  }) => {
    await page.goto("/example-form");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("contact form with validation errors should maintain accessibility", async ({
    page,
  }) => {
    await page.goto("/example-form");

    // Submit empty form to trigger validation errors
    await page.click('button[type="submit"]');

    // Wait for error summary to appear
    await page.waitForSelector(".govuk-error-summary");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("form labels are properly associated with inputs", async ({ page }) => {
    await page.goto("/example-form");

    // Check each form field has an associated label
    const fullNameLabel = page.locator('label[for="fullName"]');
    await expect(fullNameLabel).toBeVisible();

    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();

    const subjectLabel = page.locator('label[for="subject"]');
    await expect(subjectLabel).toBeVisible();

    const messageLabel = page.locator('label[for="message"]');
    await expect(messageLabel).toBeVisible();
  });

  test("error messages are announced to screen readers", async ({ page }) => {
    await page.goto("/example-form");

    // Submit empty form
    await page.click('button[type="submit"]');

    // Error summary should have role="alert"
    const errorSummary = page.locator(".govuk-error-summary");
    await expect(errorSummary).toHaveAttribute("role", "alert");

    // Error messages should have hidden "Error:" prefix for screen readers
    const errorMessages = page.locator(".govuk-error-message");
    const count = await errorMessages.count();

    for (let i = 0; i < count; i++) {
      const hiddenText = errorMessages.nth(i).locator(".govuk-visually-hidden");
      await expect(hiddenText).toContainText("Error:");
    }
  });

  test("page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have exactly one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // H2s should come after h1
    const headings = page.locator("h1, h2, h3");
    const count = await headings.count();

    let previousLevel = 0;
    for (let i = 0; i < count; i++) {
      const tagName = await headings.nth(i).evaluate((el) => el.tagName);
      const currentLevel = parseInt(tagName.charAt(1));

      // Heading level should not skip (e.g., h1 -> h3)
      if (previousLevel > 0) {
        expect(currentLevel).toBeLessThanOrEqual(previousLevel + 1);
      }
      previousLevel = currentLevel;
    }
  });

  // Skip webkit as it handles keyboard focus differently
  test.skip(({ browserName }) => browserName === 'webkit', 'WebKit handles focus differently');
  test("focus is visible on interactive elements", async ({ page }) => {
    await page.goto("/example-form");

    // Tab to the first input
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // GOV.UK link
    await page.keyboard.press("Tab"); // Service name
    await page.keyboard.press("Tab"); // Back link
    await page.keyboard.press("Tab"); // Full name input

    // Check the focused element has visible focus styles
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Check it has the focus class or outline
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.boxShadow;
    });

    expect(outline).not.toBe("none");
  });

  test("skip link exists and is properly configured", async ({ page }) => {
    await page.goto("/");

    // Check skip link exists and points to main content
    const skipLink = page.locator(".govuk-skip-link");
    await expect(skipLink).toHaveAttribute("href", "#main-content");
    await expect(skipLink).toContainText("Skip to main content");

    // Check main content target exists
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeVisible();
  });
});
