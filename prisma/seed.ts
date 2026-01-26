/**
 * Prisma Seed Script
 * ===================
 * Seeds the database with initial data for development and testing.
 *
 * Run with: npm run db:seed
 *
 * IMPORTANT: This script is for development/testing only and will DELETE
 * all existing data before seeding. It will not run in production.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// ─────────────────────────────────────────────────────────────────────────────
// Environment Validation
// ─────────────────────────────────────────────────────────────────────────────
// Validate required environment variables before attempting to connect.
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set!");
  console.error("   Please set it in your .env file.");
  process.exit(1);
}

// Create adapter and client for seeding
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ─────────────────────────────────────────────────────────────────────────
  // Production Safety Check
  // ─────────────────────────────────────────────────────────────────────────
  // Prevent accidental seeding in production, which would delete all data.
  if (process.env.NODE_ENV === "production") {
    console.error("❌ Seed script should not run in production!");
    console.error("   This script deletes existing data before seeding.");
    process.exit(1);
  }

  console.log("🌱 Seeding database...");

  // Clear existing data (for development only)
  await prisma.contactSubmission.deleteMany();
  await prisma.feedbackSubmission.deleteMany();

  // Create example contact submissions
  const contactSubmissions = await prisma.contactSubmission.createMany({
    data: [
      {
        fullName: "John Smith",
        email: "john.smith@example.gov.uk",
        subject: "general",
        message:
          "I would like to enquire about the service availability in my area.",
      },
      {
        fullName: "Jane Doe",
        email: "jane.doe@example.gov.uk",
        subject: "technical",
        message: "I need help with accessing my account.",
      },
      {
        fullName: "Admin User",
        email: "admin@example.org",
        subject: "feedback",
        message: "Great service, very easy to use!",
      },
    ],
  });

  console.log(`✅ Created ${contactSubmissions.count} contact submissions`);

  // Create example feedback submissions
  const feedbackSubmissions = await prisma.feedbackSubmission.createMany({
    data: [
      {
        satisfaction: "very-satisfied",
        improvements: "None needed, excellent service!",
        wouldRecommend: "yes",
        email: "happy.user@example.gov.uk",
      },
      {
        satisfaction: "satisfied",
        improvements: "Could be faster to load on mobile.",
        wouldRecommend: "yes",
      },
    ],
  });

  console.log(`✅ Created ${feedbackSubmissions.count} feedback submissions`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
