/**
 * Type-Safe Environment Variables
 * =================================
 * This module provides type-safe access to environment variables using
 * @t3-oss/env-nextjs with Zod validation. Environment variables are
 * validated at build time, ensuring early detection of configuration errors.
 *
 * Usage:
 *   import { env } from "@/env";
 *   const dbUrl = env.DATABASE_URL; // Typed as string, validated
 *
 * @see https://env.t3.gg/docs/nextjs
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Environment configuration with Zod validation.
 *
 * Server-side variables are only available on the server.
 * Client-side variables (NEXT_PUBLIC_*) are available in the browser.
 */
export const env = createEnv({
  // ─────────────────────────────────────────────────────────────────────────
  // Server-Side Environment Variables
  // ─────────────────────────────────────────────────────────────────────────
  // These are only available on the server and will throw an error if
  // accessed on the client.
  server: {
    /**
     * PostgreSQL database connection URL.
     * Format: postgresql://user:password@host:port/database
     */
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (url) => url.startsWith("postgresql://") || url.startsWith("postgres://"),
        { message: "DATABASE_URL must be a valid PostgreSQL connection string" }
      ),

    /**
     * Node environment.
     * Determines application behavior (logging, error handling, etc.)
     */
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Client-Side Environment Variables
  // ─────────────────────────────────────────────────────────────────────────
  // These must be prefixed with NEXT_PUBLIC_ and are available in the browser.
  // Add any client-side environment variables here.
  client: {
    // Example:
    // NEXT_PUBLIC_API_URL: z.string().url().optional(),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Runtime Environment Mapping
  // ─────────────────────────────────────────────────────────────────────────
  // Map environment variables to their runtime values.
  // This is required for the validation to work.
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Skip validation in certain environments.
   * Useful for Docker builds where env vars aren't available yet.
   * Set SKIP_ENV_VALIDATION=true to bypass validation.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Treat empty strings as undefined.
   * This makes `VARIABLE=""` behave like the variable wasn't set at all.
   */
  emptyStringAsUndefined: true,
});
