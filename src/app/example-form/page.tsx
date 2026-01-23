/**
 * Example Form Page
 * ==================
 * Demonstrates a GDS-compliant contact form with validation.
 * Shows proper form patterns, error handling, and accessibility.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with our team",
};

/**
 * Example form page component.
 * Displays a contact form with GDS styling and patterns.
 */
export default function ExampleFormPage() {
  return (
    <>
      {/* Back link */}
      <Link href="/" className="govuk-back-link">
        Back
      </Link>

      {/* Page heading */}
      <h1 className="govuk-heading-xl">Contact us</h1>

      <p className="govuk-body">
        Use this form to send us a message. We&apos;ll respond within 5 working
        days.
      </p>

      {/* Two-thirds width column for the form */}
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
