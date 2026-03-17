# Queuebase Next.js Starter

A minimal [Next.js](https://nextjs.org) starter template for [Queuebase](https://queuebase.com) background job processing.

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io)

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Queuebase/queuebase-nextjs-starter.git
   cd queuebase-nextjs-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Generate the job manifest:

   ```bash
   pnpm queuebase:generate
   ```

4. Start the Queuebase dev server:

   ```bash
   pnpm queuebase:dev
   ```

5. In a separate terminal, start the Next.js app:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) and enqueue some jobs!

## Project Structure

```
queuebase.config.ts       # Points CLI to the job router
src/
  server/queuebase.ts     # Job router and handler definitions
  lib/jobs.ts             # Type-safe job client
  app/
    actions.ts            # Server actions for enqueueing jobs
    api/queuebase/        # Queuebase webhook route handler
    page.tsx              # Demo UI for enqueueing jobs
```

## Included Jobs

- **sendEmail** — accepts `to`, `subject`, and `body`; placeholder for email sending logic
- **processData** — accepts `userId` and `action`; placeholder for data processing logic
- **heartbeat** — a scheduled cron job that runs every minute to verify cron functionality

## Learn More

- [Queuebase Documentation](https://docs.queuebase.com)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
