/**
 * Prisma Seed Script
 * ===================
 * Seeds the database with initial data for development and testing.
 *
 * Run with: npm run db:seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (for development only)
  await prisma.formSubmission.deleteMany();

  // Create example form submissions
  const submissions = await Promise.all([
    prisma.formSubmission.create({
      data: {
        formType: "contact",
        email: "john.smith@example.gov.uk",
        data: {
          fullName: "John Smith",
          email: "john.smith@example.gov.uk",
          subject: "General enquiry",
          message:
            "I would like to enquire about the service availability in my area.",
        },
      },
    }),
    prisma.formSubmission.create({
      data: {
        formType: "feedback",
        email: "jane.doe@example.gov.uk",
        data: {
          fullName: "Jane Doe",
          email: "jane.doe@example.gov.uk",
          satisfaction: "satisfied",
          improvements: "The service was easy to use. No improvements needed.",
          wouldRecommend: true,
        },
      },
    }),
    prisma.formSubmission.create({
      data: {
        formType: "contact",
        email: "admin@example.org",
        data: {
          fullName: "Admin User",
          email: "admin@example.org",
          subject: "Technical support",
          message: "I need help with accessing my account.",
        },
      },
    }),
  ]);

  console.log(`✅ Created ${submissions.length} form submissions`);
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
