import mongoose from "mongoose";
import { ENV } from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(ENV.mongodbUri);
    logger.info(`[MongoDB] Connected to ${ENV.isDevelopment ? "production" : "development"} database`);
  } catch (error) {
    logger.error("[MongoDB] Connection failed:", error);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    logger.error("[MongoDB] Connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("[MongoDB] Disconnected from database");
  });
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info("[MongoDB] Disconnected");
}
