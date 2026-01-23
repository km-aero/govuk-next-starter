"use client";

/**
 * Contact Form Component
 * =======================
 * Client component for the contact form with validation.
 * Uses React hooks to manage form state and server action submission.
 */

import { useActionState } from "react";
import { Button, Input, Textarea, Select, ErrorSummary } from "@/components/govuk";
import { submitContactForm, type FormActionResult } from "./actions";

/**
 * Subject options for the contact form.
 */
const subjectOptions = [
  { value: "general", label: "General enquiry" },
  { value: "technical", label: "Technical support" },
  { value: "feedback", label: "Feedback" },
  { value: "complaint", label: "Complaint" },
  { value: "other", label: "Other" },
];

/**
 * Initial form state.
 */
const initialState: FormActionResult = {
  success: false,
};

/**
 * Contact form component with server action integration.
 */
export function ContactForm() {
  // Use the server action with React's useActionState
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormActionResult, formData: FormData) => {
      return await submitContactForm(formData);
    },
    initialState
  );

  // Convert errors to array format for ErrorSummary
  const errorList = state.errors
    ? Object.entries(state.errors).map(([field, message]) => ({
        field,
        message: message as string,
      }))
    : [];

  return (
    <form action={formAction} noValidate>
      {/* Error summary - displayed at top of form when there are errors */}
      <ErrorSummary errors={errorList} />

      {/* General error message */}
      {state.message && (
        <div className="govuk-error-summary" role="alert">
          <h2 className="govuk-error-summary__title">There is a problem</h2>
          <div className="govuk-error-summary__body">
            <p>{state.message}</p>
          </div>
        </div>
      )}

      {/* Full name input */}
      <Input
        id="fullName"
        name="fullName"
        label="Full name"
        autoComplete="name"
        error={state.errors?.fullName}
      />

      {/* Email input */}
      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        hint="We'll use this to reply to your enquiry"
        autoComplete="email"
        error={state.errors?.email}
      />

      {/* Subject select */}
      <Select
        id="subject"
        name="subject"
        label="Subject"
        options={subjectOptions}
        placeholder="Select a subject"
        error={state.errors?.subject}
      />

      {/* Message textarea */}
      <Textarea
        id="message"
        name="message"
        label="Message"
        hint="Please provide as much detail as possible"
        rows={8}
        maxLength={2000}
        error={state.errors?.message}
      />

      {/* Submit button */}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default ContactForm;
