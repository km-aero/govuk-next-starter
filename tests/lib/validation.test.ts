/**
 * Validation Schema Tests
 * ========================
 * Tests for the Zod validation schemas.
 */

import { describe, it, expect } from "vitest";
import { contactFormSchema, feedbackFormSchema, validateFormData } from "@/lib/validation";

describe("contactFormSchema", () => {
  it("validates correct data", () => {
    const validData = {
      fullName: "John Smith",
      email: "john@example.gov.uk",
      subject: "general",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects empty full name", () => {
    const invalidData = {
      fullName: "",
      email: "john@example.gov.uk",
      subject: "general",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("fullName");
    }
  });

  it("rejects invalid email", () => {
    const invalidData = {
      fullName: "John Smith",
      email: "not-an-email",
      subject: "general",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("rejects message that is too short", () => {
    const invalidData = {
      fullName: "John Smith",
      email: "john@example.gov.uk",
      subject: "general",
      message: "Short",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("message");
    }
  });

  it("rejects empty subject", () => {
    const invalidData = {
      fullName: "John Smith",
      email: "john@example.gov.uk",
      subject: "",
      message: "This is a test message with enough characters.",
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("subject");
    }
  });
});

describe("feedbackFormSchema", () => {
  it("validates correct data", () => {
    const validData = {
      satisfaction: "satisfied",
      wouldRecommend: "yes",
    };

    const result = feedbackFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("accepts optional improvements field", () => {
    const validData = {
      satisfaction: "very-satisfied",
      improvements: "Make it faster",
      wouldRecommend: "yes",
    };

    const result = feedbackFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid satisfaction value", () => {
    const invalidData = {
      satisfaction: "invalid-value",
      wouldRecommend: "yes",
    };

    const result = feedbackFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("validateFormData", () => {
  it("returns success with valid data", () => {
    const validData = {
      fullName: "John Smith",
      email: "john@example.gov.uk",
      subject: "general",
      message: "This is a test message with enough characters.",
    };

    const result = validateFormData(contactFormSchema, validData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
    expect(result.errors).toBeUndefined();
  });

  it("returns errors with invalid data", () => {
    const invalidData = {
      fullName: "",
      email: "not-an-email",
      subject: "",
      message: "Short",
    };

    const result = validateFormData(contactFormSchema, invalidData);
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it("formats errors as field/message pairs", () => {
    const invalidData = {
      fullName: "",
      email: "john@example.gov.uk",
      subject: "general",
      message: "This is a test message with enough characters.",
    };

    const result = validateFormData(contactFormSchema, invalidData);
    expect(result.success).toBe(false);
    expect(result.errors![0]).toHaveProperty("field");
    expect(result.errors![0]).toHaveProperty("message");
  });
});
