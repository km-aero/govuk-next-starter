/**
 * Form Submission Confirmation Page
 * ===================================
 * Displayed after successful form submission.
 * Shows confirmation panel with reference number.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Panel } from "@/components/govuk";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Form submitted",
  description: "Your form has been submitted successfully",
};

interface ConfirmationPageProps {
  searchParams: Promise<{ ref?: string }>;
}

/**
 * Confirmation page showing successful submission.
 */
export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = await searchParams;
  const reference = params.ref;

  // If no reference provided, show not found
  if (!reference) {
    notFound();
  }

  // Verify the submission exists
  const submission = await prisma.contactSubmission.findUnique({
    where: { reference },
  });

  if (!submission) {
    notFound();
  }

  return (
    <>
      {/* Success panel */}
      <Panel title="Form submitted" reference={reference} />

      {/* What happens next */}
      <h2 className="govuk-heading-m">What happens next</h2>

      <p className="govuk-body">
        We&apos;ve sent a confirmation email to{" "}
        <strong>{submission.email}</strong>.
      </p>

      <p className="govuk-body">
        We&apos;ll review your submission and respond within 5 working days.
      </p>

      {/* Reference reminder */}
      <div className="govuk-inset-text">
        Keep a note of your reference number: <strong>{reference}</strong>
      </div>

      {/* Actions */}
      <p className="govuk-body">
        <Link href="/" className="govuk-link">
          Return to homepage
        </Link>
      </p>

      <p className="govuk-body">
        <Link href="/example-form" className="govuk-link">
          Submit another form
        </Link>
      </p>
    </>
  );
}
