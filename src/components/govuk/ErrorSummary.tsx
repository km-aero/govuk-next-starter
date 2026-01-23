/**
 * GDS Error Summary Component
 * ============================
 * React wrapper for the GOV.UK Design System error summary.
 *
 * @see https://design-system.service.gov.uk/components/error-summary/
 */

import React from "react";

export interface FormError {
  /** Field name/id to link to */
  field: string;
  /** Error message */
  message: string;
}

export interface ErrorSummaryProps {
  /** Title for the error summary */
  title?: string;
  /** Array of errors to display */
  errors: FormError[];
}

/**
 * GDS-styled error summary component.
 * Displays at the top of a form when there are validation errors.
 *
 * @example
 * <ErrorSummary
 *   errors={[
 *     { field: "email", message: "Enter your email address" },
 *     { field: "name", message: "Enter your full name" },
 *   ]}
 * />
 */
export function ErrorSummary({
  title = "There is a problem",
  errors,
}: ErrorSummaryProps) {
  // Don't render if there are no errors
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div
      className="govuk-error-summary"
      data-module="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}
    >
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        {title}
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {errors.map((error) => (
            <li key={error.field}>
              <a href={`#${error.field}`}>{error.message}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ErrorSummary;
