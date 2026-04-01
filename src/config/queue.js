import {Queue} from "bullmq";
import {redis} from "./redis.js"
import dotenv from "dotenv";
dotenv.config();

export const cleanupQueue = new Queue("cleanup-queue", {
  connection:redis
});