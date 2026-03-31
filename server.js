import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import fileRoutes from "./src/routes/files.routes.js"
// import File from "./models/File.js"

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/files",fileRoutes);

app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})