import type { NextConfig } from "next";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Runtime Environment Validation
// ─────────────────────────────────────────────────────────────────────────────
// Import env to validate environment variables at runtime when Next.js starts.
// Invalid or missing required variables will cause an immediate error.
import "./src/env";

/**
 * Next.js configuration for GOV.UK Design System integration.
 *
 * Key configurations:
 * - SASS options with govuk-frontend include paths
 * - Silences deprecation warnings from govuk-frontend dependencies
 */
const nextConfig: NextConfig = {
  // Enable SASS support with govuk-frontend include paths
  sassOptions: {
    includePaths: [path.join(process.cwd(), "node_modules")],
    // Silence deprecation warnings from govuk-frontend
    silenceDeprecations: ["legacy-js-api", "import"],
    quietDeps: true,
  },
};

export default nextConfig;
