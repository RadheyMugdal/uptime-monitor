import { Worker } from "bullmq";
import axios from "axios";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { monitor, checkResult } from "@/server/db/schema";
import { connection } from "@/lib/queue"; // shared Redis connection

const worker = new Worker(
  "monitor-checks",
  async (job) => {
    const { monitorId } = job.data;

    const [existingMonitor] = await db
      .select()
      .from(monitor)
      .where(eq(monitor.id, monitorId));

    if (!existingMonitor) return;

    let responseMs = 0;
    let isUp = false;

    try {
      const start = Date.now();
      const res = await axios.request({
        url: existingMonitor.url,
        method: existingMonitor.method,
        headers: existingMonitor.headers as any,
        timeout: 8000,
      });
      responseMs = Date.now() - start;
      isUp = res.status === existingMonitor.expectedStatus;
    } catch {
      responseMs = 0;
      isUp = false;
    }

    await db.update(monitor)
      .set({ status: isUp ? "up" : "down" })
      .where(eq(monitor.id, monitorId));

    await db.insert(checkResult).values({
      monitorId,
      status: isUp ? "up" : "down",
      responseMs,
    });
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job?.id} failed with error ${err}`);
});
