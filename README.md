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

3. Install the Queuebase CLI globally (if you haven't already):

   ```bash
   pnpm add -g queuebase
   ```

4. Start the Queuebase dev server:

   ```bash
   queuebase dev
   ```

5. In a separate terminal, start the Next.js app:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) and enqueue some jobs!

## Project Structure

```
src/
  server/queuebase.ts   # Job router and handler definitions
  lib/jobs.ts           # Type-safe job client
  app/
    api/queuebase/      # Queuebase webhook route handler
    page.tsx            # Demo UI for enqueueing jobs
```

## Learn More

- [Queuebase Documentation](https://docs.queuebase.com)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
