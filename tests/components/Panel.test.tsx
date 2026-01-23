/**
 * Panel Component Tests
 * ======================
 * Tests for the GDS Panel component.
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Panel } from "@/components/govuk";

describe("Panel", () => {
  it("renders with title", () => {
    render(<Panel title="Application complete" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Application complete"
    );
  });

  it("renders with reference number", () => {
    render(<Panel title="Application complete" reference="HDJ2123F" />);

    expect(screen.getByText("HDJ2123F")).toBeInTheDocument();
    expect(screen.getByText("Your reference number")).toBeInTheDocument();
  });

  it("renders with children when no reference", () => {
    render(
      <Panel title="Application complete">
        We have sent you a confirmation email.
      </Panel>
    );

    expect(
      screen.getByText("We have sent you a confirmation email.")
    ).toBeInTheDocument();
  });

  it("has confirmation panel class", () => {
    const { container } = render(<Panel title="Application complete" />);

    expect(container.querySelector(".govuk-panel")).toHaveClass(
      "govuk-panel--confirmation"
    );
  });
});
