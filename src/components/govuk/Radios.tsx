/**
 * GDS Radios Component
 * =====================
 * React wrapper for the GOV.UK Design System radios.
 *
 * @see https://design-system.service.gov.uk/components/radios/
 */

import React from "react";

export interface RadioOption {
  /** Radio value */
  value: string;
  /** Radio label text */
  label: string;
  /** Optional hint text for this option */
  hint?: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface RadiosProps {
  /** Unique identifier for the radio group */
  id: string;
  /** Radio group name */
  name: string;
  /** Fieldset legend (main question) */
  legend: string;
  /** Whether the legend should be styled as a page heading */
  legendIsHeading?: boolean;
  /** Radio options */
  options: RadioOption[];
  /** Optional hint text for the whole group */
  hint?: string;
  /** Error message */
  error?: string;
  /** Currently selected value */
  value?: string;
  /** Whether to display radios inline */
  inline?: boolean;
  /** Whether to use smaller radios */
  small?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * GDS-styled radio button group.
 *
 * @example
 * <Radios
 *   id="contact-preference"
 *   name="contact"
 *   legend="How would you like to be contacted?"
 *   options={[
 *     { value: "email", label: "Email" },
 *     { value: "phone", label: "Phone" },
 *   ]}
 * />
 */
export function Radios({
  id,
  name,
  legend,
  legendIsHeading = false,
  options,
  hint,
  error,
  value,
  inline = false,
  small = false,
  onChange,
}: RadiosProps) {
  const radiosClasses = [
    "govuk-radios",
    inline && "govuk-radios--inline",
    small && "govuk-radios--small",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`govuk-form-group ${error ? "govuk-form-group--error" : ""}`}>
      <fieldset
        className="govuk-fieldset"
        aria-describedby={[hint && `${id}-hint`, error && `${id}-error`]
          .filter(Boolean)
          .join(" ") || undefined}
      >
        <legend
          className={`govuk-fieldset__legend ${
            legendIsHeading ? "govuk-fieldset__legend--l" : ""
          }`}
        >
          {legendIsHeading ? (
            <h1 className="govuk-fieldset__heading">{legend}</h1>
          ) : (
            legend
          )}
        </legend>

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

        <div className={radiosClasses} data-module="govuk-radios">
          {options.map((option, index) => (
            <div className="govuk-radios__item" key={option.value}>
              <input
                className="govuk-radios__input"
                id={index === 0 ? id : `${id}-${index}`}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                disabled={option.disabled}
                onChange={onChange}
                aria-describedby={option.hint ? `${id}-${index}-hint` : undefined}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={index === 0 ? id : `${id}-${index}`}
              >
                {option.label}
              </label>
              {option.hint && (
                <div
                  id={`${id}-${index}-hint`}
                  className="govuk-hint govuk-radios__hint"
                >
                  {option.hint}
                </div>
              )}
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Radios;
