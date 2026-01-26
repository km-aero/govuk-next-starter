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
  // Extract form data
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Validate with Zod
  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    // Convert Zod errors to field-keyed object
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    }
    return { success: false, errors };
  }

  // Data is valid, save to database with explicit columns
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
    console.error("Failed to save form submission:", error);
    return {
      success: false,
      message: "There was a problem submitting your form. Please try again.",
    };
  }

  // Redirect outside try-catch to avoid catching Next.js redirect errors
  redirect(`/example-form/confirmation?ref=${submissionReference}`);
}
