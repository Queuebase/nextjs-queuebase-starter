"use server";

import { jobClient } from "@/lib/jobs";

export async function enqueueSendEmail(formData: FormData) {
  const { jobId } = await jobClient.sendEmail.enqueue({
    to: formData.get("to") as string,
    subject: formData.get("subject") as string,
    body: formData.get("body") as string,
  });

  return { jobName: "sendEmail", jobId };
}

export async function enqueueProcessData(formData: FormData) {
  const { jobId } = await jobClient.processData.enqueue({
    userId: formData.get("userId") as string,
    action: formData.get("action") as "sync" | "export" | "cleanup",
  });

  return { jobName: "processData", jobId };
}
