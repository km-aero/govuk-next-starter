import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vitest Configuration
 * =====================
 * Configuration for component and unit tests using Vitest.
 *
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom for DOM testing
    environment: "jsdom",

    // Setup files to run before each test
    setupFiles: ["./tests/setup.ts"],

    // Include patterns for test files
    include: ["tests/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],

    // Exclude patterns
    exclude: ["node_modules", "e2e/**/*"],

    // Enable globals like describe, it, expect
    globals: true,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/app/**/layout.tsx"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
