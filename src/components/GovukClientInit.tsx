"use client";

/**
 * GOV.UK Frontend JavaScript Initialization
 * ==========================================
 * Client component that initializes GOV.UK Frontend JavaScript components.
 *
 * This component should be included in the root layout to ensure all
 * interactive GDS components (accordions, tabs, etc.) work correctly.
 */

import { useEffect } from "react";
import { logger } from "@/lib/logger";

/**
 * Initializes GOV.UK Frontend JavaScript on component mount.
 * Renders nothing visible - only handles JS initialization.
 */
export function GovukClientInit() {
  useEffect(() => {
    // Dynamically import and initialize GOV.UK Frontend
    const initGovuk = async () => {
      try {
        const { initAll } = await import("govuk-frontend");
        initAll();
      } catch (error) {
        logger.error({ err: error }, "Failed to initialize GOV.UK Frontend");
      }
    };

    initGovuk();
  }, []);

  return null;
}

export default GovukClientInit;
