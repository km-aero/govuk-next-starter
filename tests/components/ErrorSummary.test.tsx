/**
 * ErrorSummary Component Tests
 * =============================
 * Tests for the GDS ErrorSummary component.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorSummary } from "@/components/govuk";

describe("ErrorSummary", () => {
  it("renders nothing when errors array is empty", () => {
    const { container } = render(<ErrorSummary errors={[]} />);

    expect(container.querySelector(".govuk-error-summary")).not.toBeInTheDocument();
  });

  it("renders with default title", () => {
    render(
      <ErrorSummary
        errors={[{ field: "email", message: "Enter your email address" }]}
      />
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(
      <ErrorSummary
        title="Please fix the following errors"
        errors={[{ field: "email", message: "Enter your email address" }]}
      />
    );

    expect(screen.getByText("Please fix the following errors")).toBeInTheDocument();
  });

  it("renders all error messages as links", () => {
    render(
      <ErrorSummary
        errors={[
          { field: "email", message: "Enter your email address" },
          { field: "name", message: "Enter your full name" },
        ]}
      />
    );

    const emailLink = screen.getByRole("link", { name: "Enter your email address" });
    const nameLink = screen.getByRole("link", { name: "Enter your full name" });

    expect(emailLink).toHaveAttribute("href", "#email");
    expect(nameLink).toHaveAttribute("href", "#name");
  });

  it("has correct ARIA attributes for accessibility", () => {
    render(
      <ErrorSummary
        errors={[{ field: "email", message: "Enter your email address" }]}
      />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("aria-labelledby", "error-summary-title");
    expect(alert).toHaveAttribute("tabindex", "-1");
  });

  it("has govuk-error-summary data-module attribute", () => {
    render(
      <ErrorSummary
        errors={[{ field: "email", message: "Enter your email address" }]}
      />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-module", "govuk-error-summary");
  });
});
