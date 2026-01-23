/**
 * GDS Panel Component
 * ====================
 * React wrapper for the GOV.UK Design System panel.
 * Used for confirmation and success messages.
 *
 * @see https://design-system.service.gov.uk/components/panel/
 */

import React from "react";

export interface PanelProps {
  /** Panel title (large text) */
  title: string;
  /** Optional reference number or additional text */
  reference?: string;
  /** Additional content below the reference */
  children?: React.ReactNode;
}

/**
 * GDS-styled panel component for confirmation pages.
 *
 * @example
 * <Panel title="Application complete" reference="HDJ2123F">
 *   We have sent you a confirmation email.
 * </Panel>
 */
export function Panel({ title, reference, children }: PanelProps) {
  return (
    <div className="govuk-panel govuk-panel--confirmation">
      <h1 className="govuk-panel__title">{title}</h1>
      {reference && (
        <div className="govuk-panel__body">
          Your reference number
          <br />
          <strong>{reference}</strong>
        </div>
      )}
      {children && !reference && (
        <div className="govuk-panel__body">{children}</div>
      )}
    </div>
  );
}

export default Panel;
