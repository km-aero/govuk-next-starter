import type { NextConfig } from "next";
import path from "path";

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
