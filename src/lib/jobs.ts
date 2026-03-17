import { createClient } from "@queuebase/nextjs";
import jobRouter, { type AppJobRouter } from "@/server/queuebase";

const apiUrl =
  process.env.NEXT_PUBLIC_QUEUEBASE_URL ?? "http://localhost:3847";
const callbackUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const jobClient = createClient<AppJobRouter>(jobRouter, {
  apiUrl,
  callbackUrl: `${callbackUrl}/api/queuebase`,
});
