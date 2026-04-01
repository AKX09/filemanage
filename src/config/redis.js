import IOredis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new IOredis(process.env.REDIS_URL,{
    maxRetriesPerRequest:null,
});
