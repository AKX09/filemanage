import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import fileRoutes from "./src/routes/files.routes.js"
// import File from "./models/File.js"
import {cleanupQueue} from "./src/config/queue.js"
import rateLimit from "express-rate-limit";

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/files",fileRoutes);

app.use("/files/upload",rateLimit({
  windowMs:5*60*1000,
  max:2000
}));

await cleanupQueue.add(
  "cleanup-job",
  {},
  {
    repeat: { every: 5 * 60 * 1000 },
    removeOnComplete: true,
  }
);


app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})