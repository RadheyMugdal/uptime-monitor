import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 1,
  lazyConnect: true,
  retryStrategy: (times) => {
    if (times > 3) {
      console.warn("[Redis] Could not connect to Redis. Disabling retries to avoid log spam.");
      return null;
    }
    return Math.min(times * 100, 3000);
  },
});

connection.on("error", (err) => {
  if ((err as any).code === "ECONNREFUSED") {
    // Suppress ECONNREFUSED to avoid spam, as we have retryStrategy handling it
  } else {
    console.error("[Redis] Error:", err);
  }
});

export const monitorQueue = new Queue("monitor-checks", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 1,
  },
});
