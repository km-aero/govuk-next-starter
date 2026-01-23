/**
 * GDS Text Input Component
 * =========================
 * React wrapper for the GOV.UK Design System text input.
 *
 * @see https://design-system.service.gov.uk/components/text-input/
 */

import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Unique identifier for the input */
  id: string;
  /** Input name attribute */
  name: string;
  /** Label text */
  label: string;
  /** Optional hint text displayed below the label */
  hint?: string;
  /** Error message to display */
  error?: string;
  /** Input width variant */
  width?: "full" | "three-quarters" | "two-thirds" | "one-half" | "one-third" | "one-quarter" | 2 | 3 | 4 | 5 | 10 | 20;
  /** Whether the label should be visually hidden */
  labelHidden?: boolean;
  /** Optional prefix (e.g., "£") */
  prefix?: string;
  /** Optional suffix (e.g., "kg") */
  suffix?: string;
}

/**
 * GDS-styled text input with label, hint, and error support.
 *
 * @example
 * <Input id="email" name="email" label="Email address" hint="We'll use this to contact you" />
 * <Input id="postcode" name="postcode" label="Postcode" width={10} />
 */
export function Input({
  id,
  name,
  label,
  hint,
  error,
  width,
  labelHidden = false,
  prefix,
  suffix,
  ...props
}: InputProps) {
  // Determine width class
  const getWidthClass = () => {
    if (!width) return "";
    if (typeof width === "number") return `govuk-input--width-${width}`;
    return `govuk-!-width-${width}`;
  };

  const inputClasses = [
    "govuk-input",
    error && "govuk-input--error",
    getWidthClass(),
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "govuk-label",
    labelHidden && "govuk-visually-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const hasWrapper = prefix || suffix;

  return (
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

      {hasWrapper ? (
        <div className="govuk-input__wrapper">
          {prefix && (
            <div className="govuk-input__prefix" aria-hidden="true">
              {prefix}
            </div>
          )}
          <input
            className={inputClasses}
            id={id}
            name={name}
            aria-describedby={[hint && `${id}-hint`, error && `${id}-error`]
              .filter(Boolean)
              .join(" ") || undefined}
            {...props}
          />
          {suffix && (
            <div className="govuk-input__suffix" aria-hidden="true">
              {suffix}
            </div>
          )}
        </div>
      ) : (
        <input
          className={inputClasses}
          id={id}
          name={name}
          aria-describedby={[hint && `${id}-hint`, error && `${id}-error`]
            .filter(Boolean)
            .join(" ") || undefined}
          {...props}
        />
      )}
    </div>
  );
}

export default Input;
