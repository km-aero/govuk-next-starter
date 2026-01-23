/**
 * GDS Button Component
 * =====================
 * React wrapper for the GOV.UK Design System button.
 *
 * @see https://design-system.service.gov.uk/components/button/
 */

import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "primary" | "secondary" | "warning";
  /** Whether the button should appear as a start button */
  isStartButton?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

/**
 * GDS-styled button component.
 *
 * @example
 * <Button>Continue</Button>
 * <Button variant="secondary">Cancel</Button>
 * <Button variant="warning">Delete</Button>
 * <Button isStartButton>Start now</Button>
 */
export function Button({
  variant = "primary",
  isStartButton = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  // Build class list based on variant
  const classes = [
    "govuk-button",
    variant === "secondary" && "govuk-button--secondary",
    variant === "warning" && "govuk-button--warning",
    isStartButton && "govuk-button--start",
    disabled && "govuk-button--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      data-module="govuk-button"
      {...props}
    >
      {children}
      {isStartButton && (
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      )}
    </button>
  );
}

export default Button;
