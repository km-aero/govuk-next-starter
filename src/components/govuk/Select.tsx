/**
 * GDS Select Component
 * =====================
 * React wrapper for the GOV.UK Design System select (dropdown).
 *
 * @see https://design-system.service.gov.uk/components/select/
 */

import React from "react";

export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display text */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  /** Unique identifier for the select */
  id: string;
  /** Select name attribute */
  name: string;
  /** Label text */
  label: string;
  /** Options to display */
  options: SelectOption[];
  /** Optional hint text displayed below the label */
  hint?: string;
  /** Error message to display */
  error?: string;
  /** Placeholder option text */
  placeholder?: string;
  /** Whether the label should be visually hidden */
  labelHidden?: boolean;
}

/**
 * GDS-styled select (dropdown) with label, hint, and error support.
 *
 * @example
 * <Select
 *   id="sort"
 *   name="sort"
 *   label="Sort by"
 *   options={[
 *     { value: "newest", label: "Newest first" },
 *     { value: "oldest", label: "Oldest first" },
 *   ]}
 * />
 */
export function Select({
  id,
  name,
  label,
  options,
  hint,
  error,
  placeholder,
  labelHidden = false,
  ...props
}: SelectProps) {
  const selectClasses = [
    "govuk-select",
    error && "govuk-select--error",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "govuk-label",
    labelHidden && "govuk-visually-hidden",
  ]
    .filter(Boolean)
    .join(" ");

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

      <select
        className={selectClasses}
        id={id}
        name={name}
        aria-describedby={[hint && `${id}-hint`, error && `${id}-error`]
          .filter(Boolean)
          .join(" ") || undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
