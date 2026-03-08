import { createHandler } from "@queuebase/nextjs";
import { jobRouter } from "@/server/queuebase";

const handler = createHandler(jobRouter);

export const POST = handler;
