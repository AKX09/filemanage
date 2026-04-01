import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);
console.log("Worker MongoDB connected");

import {worker} from "./src/services/cleanupWorker.js"
