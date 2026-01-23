/**
 * GDS Textarea Component
 * =======================
 * React wrapper for the GOV.UK Design System textarea.
 *
 * @see https://design-system.service.gov.uk/components/textarea/
 */

import React from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  /** Unique identifier for the textarea */
  id: string;
  /** Textarea name attribute */
  name: string;
  /** Label text */
  label: string;
  /** Optional hint text displayed below the label */
  hint?: string;
  /** Error message to display */
  error?: string;
  /** Number of rows for the textarea */
  rows?: number;
  /** Maximum character count (enables character count component) */
  maxLength?: number;
  /** Whether the label should be visually hidden */
  labelHidden?: boolean;
}

/**
 * GDS-styled textarea with label, hint, and error support.
 *
 * @example
 * <Textarea id="message" name="message" label="Message" hint="Enter your message" rows={5} />
 * <Textarea id="description" name="description" label="Description" maxLength={500} />
 */
export function Textarea({
  id,
  name,
  label,
  hint,
  error,
  rows = 5,
  maxLength,
  labelHidden = false,
  ...props
}: TextareaProps) {
  const textareaClasses = [
    "govuk-textarea",
    error && "govuk-textarea--error",
    maxLength && "govuk-js-character-count",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "govuk-label",
    labelHidden && "govuk-visually-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <div className={`govuk-form-group ${error ? "govuk-form-group--error" : ""}`}>
      <label className={labelClasses} htmlFor={id}>
        {label}
      </label>

      {hint && (
        <div id={`${id}-hint`} className="govuk-hint">
          {hint}
        </div>
      )}

      {error && (
        <p id={`${id}-error`} className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}

      <textarea
        className={textareaClasses}
        id={id}
        name={name}
        rows={rows}
        aria-describedby={[hint && `${id}-hint`, error && `${id}-error`, maxLength && `${id}-info`]
          .filter(Boolean)
          .join(" ") || undefined}
        {...props}
      />

      {maxLength && (
        <div
          id={`${id}-info`}
          className="govuk-hint govuk-character-count__message"
        >
          You can enter up to {maxLength} characters
        </div>
      )}
    </div>
  );

  // Wrap with character count div if maxLength is specified
  if (maxLength) {
    return (
      <div
        className="govuk-character-count"
        data-module="govuk-character-count"
        data-maxlength={maxLength}
      >
        {content}
      </div>
    );
  }

  return content;
}

export default Textarea;
