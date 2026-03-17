"use client";

import { useState } from "react";
import { enqueueSendEmail, enqueueProcessData } from "./actions";

type JobResult = {
  jobName: string;
  jobId: string;
};

export default function Home() {
  const [results, setResults] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSendEmail(formData: FormData) {
    setLoading("sendEmail");
    try {
      const result = await enqueueSendEmail(formData);
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.info("Failed to enqueue job:", error);
      setResults((prev) => [
        { jobName: "sendEmail", jobId: "error — is queuebase dev running?" },
        ...prev,
      ]);
    } finally {
      setLoading(null);
    }
  }

  async function handleProcessData(formData: FormData) {
    setLoading("processData");
    try {
      const result = await enqueueProcessData(formData);
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.info("Failed to enqueue job:", error);
      setResults((prev) => [
        { jobName: "processData", jobId: "error — is queuebase dev running?" },
        ...prev,
      ]);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Queuebase Starter
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Enqueue background jobs and watch them run. Make sure{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              queuebase dev
            </code>{" "}
            is running in a separate terminal.
          </p>
        </div>

        <div className="space-y-6">
          {/* Send Email Job */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Send Email
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendEmail(new FormData(e.currentTarget));
              }}
              className="space-y-3"
            >
              <input
                name="to"
                type="email"
                defaultValue="user@example.com"
                placeholder="Recipient email"
                required
                className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
              />
              <input
                name="subject"
                type="text"
                defaultValue="Welcome to Queuebase"
                placeholder="Subject"
                required
                className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
              />
              <textarea
                name="body"
                defaultValue="Thanks for trying out Queuebase! Background jobs are now easy."
                placeholder="Email body"
                rows={3}
                required
                className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={loading === "sendEmail"}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading === "sendEmail" ? "Enqueueing..." : "Enqueue Email Job"}
              </button>
            </form>
          </section>

          {/* Process Data Job */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Process Data
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProcessData(new FormData(e.currentTarget));
              }}
              className="space-y-3"
            >
              <input
                name="userId"
                type="text"
                defaultValue="user_123"
                placeholder="User ID"
                required
                className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
              />
              <select
                name="action"
                defaultValue="sync"
                className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="sync">Sync</option>
                <option value="export">Export</option>
                <option value="cleanup">Cleanup</option>
              </select>
              <button
                type="submit"
                disabled={loading === "processData"}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading === "processData"
                  ? "Enqueueing..."
                  : "Enqueue Data Job"}
              </button>
            </form>
          </section>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Enqueued Jobs
            </h2>
            <ul className="space-y-2">
              {results.map((result, i) => (
                <li
                  key={`${result.jobId}-${i}`}
                  className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 text-sm dark:bg-zinc-800"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {result.jobName}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {result.jobId}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
