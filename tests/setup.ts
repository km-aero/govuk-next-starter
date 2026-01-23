/**
 * Test Setup File
 * =================
 * Runs before each test file to configure the testing environment.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test to prevent memory leaks
afterEach(() => {
  cleanup();
});
