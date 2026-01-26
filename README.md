# GOV.UK Next.js Starter

A production-ready Next.js + TypeScript starter project for building GOV.UK Design System compliant government websites with PostgreSQL database integration.

## Features

- ✅ **Next.js 16** with App Router and React 19
- ✅ **TypeScript 5.9** with strict mode enabled
- ✅ **GOV.UK Frontend 5.14** with automatic styling imports
- ✅ **Prisma 7.3** ORM with PostgreSQL support
- ✅ **Zod 4** for type-safe form validation
- ✅ **React component wrappers** for common GDS patterns
- ✅ **Accessible by default** following WCAG 2.2 AA standards
- ✅ **Server Actions** for secure form handling

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) v20.0.0 or later
- [PostgreSQL](https://www.postgresql.org/) v14 or later
- npm or yarn package manager

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd govuk-next-starter
```

### 2. Install dependencies

```bash
npm install
```

This will:

- Install all Node.js dependencies
- Generate the Prisma client
- Copy GOV.UK Frontend assets to the public directory

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and set your database connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/govuk_starter"
```

### 4. Set up the database

Create the database and run migrations:

```bash
# Create database tables
npm run db:push

# (Optional) Seed with example data
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
govuk-next-starter/
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
├── prisma.config.ts          # Prisma 7 configuration
├── public/
│   └── assets/               # GDS fonts, images (copied on install)
│       ├── fonts/
│       ├── images/
│       └── manifest.json
├── scripts/
│   └── copy-govuk-assets.js  # Asset copy script
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with GDS template
│   │   ├── page.tsx          # Homepage
│   │   └── example-form/
│   │       ├── page.tsx      # Contact form page
│   │       ├── ContactForm.tsx
│   │       ├── actions.ts    # Server actions
│   │       └── confirmation/
│   │           └── page.tsx  # Success page
│   ├── components/
│   │   ├── govuk/            # GDS component wrappers
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Radios.tsx
│   │   │   ├── ErrorSummary.tsx
│   │   │   ├── Panel.tsx
│   │   │   └── index.ts
│   │   └── GovukClientInit.tsx
│   ├── env.ts                # Type-safe environment variables
│   ├── lib/
│   │   ├── prisma.ts         # Database client
│   │   └── validation.ts     # Zod schemas
│   └── styles/
│       └── globals.scss      # GDS imports
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with example data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run copy-assets` | Copy GDS assets to public directory |
| `npm run test` | Run component tests (Vitest) |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
| `npm run test:a11y` | Run accessibility tests |

## Testing

The project includes a comprehensive testing setup:

### Component Tests (Vitest + Testing Library)

```bash
# Run tests
npm run test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

Tests are located in `tests/` directory:

- `tests/components/` - GDS component tests
- `tests/lib/` - Utility and validation tests

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run with headed browsers
npm run test:e2e:headed

# Run with Playwright UI
npm run test:e2e:ui
```

Tests are located in `tests/e2e/` directory:

- `tests/e2e/homepage.spec.ts` - Homepage tests
- `tests/e2e/contact-form.spec.ts` - Form submission flow (runs serially to avoid database contention)
- `tests/e2e/accessibility.spec.ts` - Accessibility tests using axe-core

### Accessibility Tests

Accessibility tests use axe-core to check for WCAG 2.2 AA compliance:

```bash
npm run test:a11y
```

## Using GDS Components

The project includes React wrappers for common GOV.UK Design System components:

```tsx
import { Button, Input, Textarea, Select, ErrorSummary, Panel } from "@/components/govuk";

// Button examples
<Button>Continue</Button>
<Button variant="secondary">Cancel</Button>
<Button isStartButton>Start now</Button>

// Input with validation
<Input
  id="email"
  name="email"
  label="Email address"
  hint="We'll use this to contact you"
  error={errors?.email}
/>

// Error summary for forms
<ErrorSummary
  errors={[
    { field: "email", message: "Enter your email address" },
    { field: "name", message: "Enter your full name" },
  ]}
/>
```

## Form Handling with Server Actions

The project uses Next.js Server Actions for secure form handling:

```tsx
// src/app/my-form/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { myFormSchema } from "@/lib/validation";

export async function submitForm(formData: FormData) {
  // Validate with Zod
  const result = myFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  // Save to database
  await prisma.formSubmission.create({
    data: {
      formType: "my-form",
      data: result.data,
    },
  });

  return { success: true };
}
```

## Database Schema

The project includes dedicated models for contact and feedback submissions:

```prisma
// Stores contact form submissions
model ContactSubmission {
  id        String   @id @default(uuid())
  fullName  String
  email     String
  subject   String
  message   String
  reference String   @unique @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([subject])
  @@index([createdAt])
}

// Stores feedback submissions
model FeedbackSubmission {
  id              String   @id @default(uuid())
  satisfaction    String
  improvements    String?
  wouldRecommend  String
  email           String?
  reference       String   @unique @default(uuid())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([satisfaction])
  @@index([createdAt])
}
```

This ensures type safety and optimized database queries for specific form types.

## Styling

GOV.UK Frontend styles are imported automatically in `src/styles/globals.scss`:

```scss
$govuk-global-styles: true;
$govuk-new-typography-scale: true;
$govuk-assets-path: "/assets/";

@import "govuk-frontend/dist/govuk/all";
```

To add custom styles, add them after the import in `globals.scss`.

## Environment Variables

Environment variables are validated at build time using `@t3-oss/env-nextjs` with Zod. Invalid or missing required variables will cause a build error.

| Variable | Description | Required |
| -------- | ----------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/test/production) | No (defaults to development) |
| `SKIP_ENV_VALIDATION` | Set to "true" to skip validation (for Docker builds) | No |

### Type-Safe Access

```typescript
import { env } from "@/env";

// Typed and validated at build time
const dbUrl = env.DATABASE_URL;  // string
const nodeEnv = env.NODE_ENV;    // "development" | "test" | "production"
```

## Deployment

### Building for Production

```bash
npm run build
npm run start
```

### Docker (Optional)

A PostgreSQL database can be run locally using Docker:

```bash
docker run --name govuk-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=govuk_starter \
  -p 5432:5432 \
  -d postgres:16
```

## Accessibility

This starter follows GDS accessibility guidelines:

- Semantic HTML structure
- Skip links for keyboard navigation
- ARIA labels where appropriate
- Error messages linked to form fields
- Focus management for dynamic content
- WCAG 2.2 AA compliant colour contrast

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Resources

- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [GOV.UK Frontend Documentation](https://frontend.design-system.service.gov.uk/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)
