/**
 * Prisma Configuration for Prisma 7
 * ===================================
 * This file configures Prisma's connection to the database.
 * In Prisma 7, the database URL is configured here instead of in schema.prisma.
 *
 * @see https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma configuration using defineConfig helper.
 */
export default defineConfig({
  // Path to the Prisma schema file
  schema: "prisma/schema.prisma",

  // Database connection configuration
  datasource: {
    url: env("DATABASE_URL"),
  },

  // Migrations configuration
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
});
