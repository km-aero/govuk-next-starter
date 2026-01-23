/**
 * Button Component Tests
 * =======================
 * Tests for the GDS Button component.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/govuk";

describe("Button", () => {
  it("renders with default primary styling", () => {
    render(<Button>Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("govuk-button");
    expect(button).not.toHaveClass("govuk-button--secondary");
    expect(button).not.toHaveClass("govuk-button--warning");
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Cancel</Button>);

    const button = screen.getByRole("button", { name: "Cancel" });

    expect(button).toHaveClass("govuk-button");
    expect(button).toHaveClass("govuk-button--secondary");
  });

  it("renders with warning variant", () => {
    render(<Button variant="warning">Delete</Button>);

    const button = screen.getByRole("button", { name: "Delete" });

    expect(button).toHaveClass("govuk-button");
    expect(button).toHaveClass("govuk-button--warning");
  });

  it("renders as start button with arrow icon", () => {
    render(<Button isStartButton>Start now</Button>);

    const button = screen.getByRole("button", { name: "Start now" });

    expect(button).toHaveClass("govuk-button--start");
    // Check for the SVG arrow icon
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Button disabled>Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeDisabled();
    expect(button).toHaveClass("govuk-button--disabled");
  });

  it("has govuk-button data-module attribute", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toHaveAttribute("data-module", "govuk-button");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("govuk-button");
  });
});
