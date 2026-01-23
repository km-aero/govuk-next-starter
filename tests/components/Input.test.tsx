/**
 * Input Component Tests
 * ======================
 * Tests for the GDS Input component.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/govuk";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input id="email" name="email" label="Email address" />);

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "email");
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "email");
  });

  it("renders with hint text", () => {
    render(
      <Input
        id="email"
        name="email"
        label="Email address"
        hint="We'll use this to contact you"
      />
    );

    expect(screen.getByText("We'll use this to contact you")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-describedby",
      "email-hint"
    );
  });

  it("renders with error message", () => {
    render(
      <Input
        id="email"
        name="email"
        label="Email address"
        error="Enter your email address"
      />
    );

    const errorMessage = screen.getByText("Enter your email address");
    expect(errorMessage).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("govuk-input--error");
    expect(input).toHaveAttribute("aria-describedby", "email-error");

    // Check the form group has error class
    expect(input.closest(".govuk-form-group")).toHaveClass(
      "govuk-form-group--error"
    );
  });

  it("renders with both hint and error", () => {
    render(
      <Input
        id="email"
        name="email"
        label="Email address"
        hint="We'll use this to contact you"
        error="Enter your email address"
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "email-hint email-error"
    );
  });

  it("applies width class for numeric widths", () => {
    render(<Input id="postcode" name="postcode" label="Postcode" width={10} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("govuk-input--width-10");
  });

  it("applies width class for named widths", () => {
    render(
      <Input id="name" name="name" label="Full name" width="two-thirds" />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("govuk-!-width-two-thirds");
  });

  it("can have visually hidden label", () => {
    render(
      <Input id="search" name="search" label="Search" labelHidden />
    );

    const label = screen.getByText("Search");
    expect(label).toHaveClass("govuk-visually-hidden");
  });

  it("renders with prefix", () => {
    render(
      <Input id="cost" name="cost" label="Cost" prefix="£" />
    );

    expect(screen.getByText("£")).toBeInTheDocument();
    expect(screen.getByText("£")).toHaveClass("govuk-input__prefix");
  });

  it("renders with suffix", () => {
    render(
      <Input id="weight" name="weight" label="Weight" suffix="kg" />
    );

    expect(screen.getByText("kg")).toBeInTheDocument();
    expect(screen.getByText("kg")).toHaveClass("govuk-input__suffix");
  });
});
