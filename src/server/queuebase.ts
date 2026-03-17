import { job, createJobRouter } from "@queuebase/nextjs";
import { z } from "zod";

const jobRouter = createJobRouter({
  sendEmail: job({
    input: z.object({
      to: z.string().email(),
      subject: z.string(),
      body: z.string(),
    }),
    handler: async ({ input }) => {
      // Replace with your email sending logic
      console.info(`Sending email to ${input.to}: ${input.subject}`);
      return { sent: true };
    },
  }),
  processData: job({
    input: z.object({
      userId: z.string(),
      action: z.enum(["sync", "export", "cleanup"]),
    }),
    handler: async ({ input }) => {
      // Replace with your data processing logic
      console.info(`Processing ${input.action} for user ${input.userId}`);
      return { processed: true };
    },
  }),
  heartbeat: job({
    input: z.object({}),
    schedule: "every 1 minute",
    handler: async () => {
      console.info(`Heartbeat at ${new Date().toISOString()}`);
      return { alive: true };
    },
  }),
});

export default jobRouter;
export type AppJobRouter = typeof jobRouter;
