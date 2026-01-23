/**
 * Homepage
 * =========
 * The main landing page for the service.
 * Demonstrates GOV.UK Design System components and styling.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/govuk";

export const metadata: Metadata = {
  title: "Home",
  description: "GOV.UK Next.js Starter - A starter project for GDS compliant websites",
};

/**
 * Homepage component displaying welcome content and navigation.
 */
export default function HomePage() {
  return (
    <>
      {/* Page heading */}
      <h1 className="govuk-heading-xl">GOV.UK Next.js Starter</h1>

      <p className="govuk-body-l">
        A production-ready Next.js starter project for building GOV.UK Design
        System compliant government websites.
      </p>

      {/* Features section */}
      <h2 className="govuk-heading-l">Features</h2>

      <ul className="govuk-list govuk-list--bullet">
        <li>
          <strong>Next.js 16</strong> with App Router and TypeScript
        </li>
        <li>
          <strong>GOV.UK Frontend 5.14</strong> with automatic styling imports
        </li>
        <li>
          <strong>Prisma ORM</strong> with PostgreSQL for database operations
        </li>
        <li>
          <strong>Zod validation</strong> for type-safe form handling
        </li>
        <li>
          <strong>React components</strong> wrapping GDS patterns
        </li>
        <li>
          <strong>Accessible by default</strong> following WCAG 2.2 AA standards
        </li>
      </ul>

      {/* Start button */}
      <Link href="/example-form">
        <Button isStartButton>Try the example form</Button>
      </Link>

      {/* Guidance section */}
      <h2 className="govuk-heading-l govuk-!-margin-top-8">Getting started</h2>

      <p className="govuk-body">
        This starter project includes everything you need to build a
        GDS-compliant service:
      </p>

      <ol className="govuk-list govuk-list--number">
        <li>
          Clone the repository and install dependencies with{" "}
          <code className="govuk-!-font-weight-bold">npm install</code>
        </li>
        <li>
          Copy <code>.env.example</code> to <code>.env</code> and configure your
          database
        </li>
        <li>
          Run database migrations with{" "}
          <code className="govuk-!-font-weight-bold">npm run db:migrate</code>
        </li>
        <li>
          Start the development server with{" "}
          <code className="govuk-!-font-weight-bold">npm run dev</code>
        </li>
      </ol>

      {/* Documentation links */}
      <h2 className="govuk-heading-l">Useful links</h2>

      <ul className="govuk-list">
        <li>
          <a
            className="govuk-link"
            href="https://design-system.service.gov.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GOV.UK Design System
          </a>
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://frontend.design-system.service.gov.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GOV.UK Frontend documentation
          </a>
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js documentation
          </a>
        </li>
        <li>
          <a
            className="govuk-link"
            href="https://www.prisma.io/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prisma documentation
          </a>
        </li>
      </ul>

      {/* Inset text */}
      <div className="govuk-inset-text">
        This is a starter template. Replace this content with your service&apos;s
        actual content before going live.
      </div>
    </>
  );
}
