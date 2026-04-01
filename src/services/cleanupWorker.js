import {Worker} from "bullmq"
import File from "../../models/File.js"
import {saveFile, getFilePath, deleteFile} from "../services/storage.services.js";
import IORedis from "ioredis";
import {redis } from "../config/redis.js";

export const worker = new Worker('cleanup-queue', async()=>{
    
    const now = new Date();
    const expiredFiles = await File.find({expiresAt:{$lt:now}});


    for (const file of expiredFiles){
        if(file?.path){
          deleteFile(file.path);
        }
        else{
          console.warn("Missing path for file", file._id);
        }
        await File.deleteOne({shareId:file.shareId});
        await redis.del(`file:${file.shareId}`);
    }
    console.log(`Cleaned ${expiredFiles.length} files`);

},{connection:redis});

worker.on("failed", (job, err) => {
  console.error("Job failed:", err);
});

//$lt is filtering directly in db