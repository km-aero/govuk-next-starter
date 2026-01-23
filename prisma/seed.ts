/**
 * Prisma Seed Script
 * ===================
 * Seeds the database with initial data for development and testing.
 *
 * Run with: npm run db:seed
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Create adapter and client for seeding
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (for development only)
  await prisma.contactSubmission.deleteMany();
  await prisma.feedbackSubmission.deleteMany();

  // Create example contact submissions
  const contactSubmissions = await Promise.all([
    prisma.contactSubmission.create({
      data: {
        fullName: "John Smith",
        email: "john.smith@example.gov.uk",
        subject: "general",
        message:
          "I would like to enquire about the service availability in my area.",
      },
    }),
    prisma.contactSubmission.create({
      data: {
        fullName: "Jane Doe",
        email: "jane.doe@example.gov.uk",
        subject: "technical",
        message: "I need help with accessing my account.",
      },
    }),
    prisma.contactSubmission.create({
      data: {
        fullName: "Admin User",
        email: "admin@example.org",
        subject: "feedback",
        message: "Great service, very easy to use!",
      },
    }),
  ]);

  console.log(`✅ Created ${contactSubmissions.length} contact submissions`);

  // Create example feedback submissions
  const feedbackSubmissions = await Promise.all([
    prisma.feedbackSubmission.create({
      data: {
        satisfaction: "very-satisfied",
        improvements: "None needed, excellent service!",
        wouldRecommend: "yes",
        email: "happy.user@example.gov.uk",
      },
    }),
    prisma.feedbackSubmission.create({
      data: {
        satisfaction: "satisfied",
        improvements: "Could be faster to load on mobile.",
        wouldRecommend: "yes",
      },
    }),
  ]);

  console.log(`✅ Created ${feedbackSubmissions.length} feedback submissions`);
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
