/**
 * Homepage E2E Tests
 * ===================
 * End-to-end tests for the homepage.
 */

import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");

    // Title should be "Home" (from metadata)
    await expect(page).toHaveTitle("Home");
  });

  test("displays GOV.UK header with crown logo", async ({ page }) => {
    await page.goto("/");

    // Check header is present
    const header = page.locator(".govuk-header");
    await expect(header).toBeVisible();

    // Check GOV.UK text is present
    await expect(page.locator(".govuk-header__logotype-text")).toContainText(
      "GOV.UK"
    );

    // Check service name is present
    await expect(page.locator(".govuk-header__service-name")).toContainText(
      "Service name"
    );
  });

  test("displays phase banner", async ({ page }) => {
    await page.goto("/");

    const phaseBanner = page.locator(".govuk-phase-banner");
    await expect(phaseBanner).toBeVisible();
    await expect(phaseBanner.locator(".govuk-tag")).toContainText("Beta");
  });

  test("displays main heading", async ({ page }) => {
    await page.goto("/");

    const heading = page.locator("h1");
    await expect(heading).toContainText("GOV.UK Next.js Starter");
  });

  test("has skip link for accessibility", async ({ page }) => {
    await page.goto("/");

    const skipLink = page.locator(".govuk-skip-link");
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("has working navigation to example form", async ({ page }) => {
    await page.goto("/");

    // Click the start button
    await page.click(".govuk-button--start");

    // Should navigate to example form
    await expect(page).toHaveURL("/example-form");
    await expect(page.locator("h1")).toContainText("Contact us");
  });

  test("displays footer with crown copyright", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator(".govuk-footer");
    await expect(footer).toBeVisible();
    await expect(footer.locator(".govuk-footer__copyright-logo")).toContainText(
      "Crown copyright"
    );
  });
});
