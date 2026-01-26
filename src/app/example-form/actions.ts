"use server";

/**
 * Contact Form Server Actions
 * ============================
 * Server actions for handling contact form submissions.
 * Validates data with Zod and persists to PostgreSQL via Prisma.
 */

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";

/**
 * Form action result type.
 * Used to communicate success/failure back to the client.
 */
export interface FormActionResult {
  /** Whether the action was successful */
  success: boolean;
  /** Error messages keyed by field name */
  errors?: Record<string, string>;
  /** General error message (not field-specific) */
  message?: string;
  /** Reference number for successful submissions */
  reference?: string;
}

/**
 * Submits the contact form data.
 * Validates the data and saves it to the database.
 *
 * @param formData - FormData from the submitted form
 * @returns Result object indicating success or failure with errors
 */
export async function submitContactForm(
  formData: FormData,
): Promise<FormActionResult> {
  // ─────────────────────────────────────────────────────────────────────────
  // Step 1: Extract Form Data
  // ─────────────────────────────────────────────────────────────────────────
  // Pull values from the FormData object submitted by the browser.
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Step 2: Validation with Zod
  // ─────────────────────────────────────────────────────────────────────────
  // Validate the raw input against our schema. If validation fails,
  // return early with field-specific error messages for the form UI.
  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    // Convert Zod errors to a simple field -> message object
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    }
    return { success: false, errors };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Step 3: Database Persistence
  // ─────────────────────────────────────────────────────────────────────────
  // Save the validated form data to PostgreSQL via Prisma.
  // We store the reference separately to use after the try-catch block.
  const validData: ContactFormData = result.data;
  let submissionReference: string;

  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: validData.fullName,
        email: validData.email,
        subject: validData.subject,
        message: validData.message,
      },
    });
    submissionReference = submission.reference;
  } catch (error) {
    // Log the error for debugging (visible in server logs)
    console.error("Failed to save form submission:", error);
    return {
      success: false,
      message: "There was a problem submitting your form. Please try again.",
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Step 4: Redirect to Confirmation
  // ─────────────────────────────────────────────────────────────────────────
  // IMPORTANT: redirect() is called outside the try-catch block.
  // This is because Next.js redirect() throws a special NEXT_REDIRECT error
  // that must propagate up to the framework. Catching it would break the
  // redirect functionality and cause the form to hang.
  redirect(`/example-form/confirmation?ref=${submissionReference}`);
}
