import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    filename:{type:String},
    originalname:{type:String},
    path:{type:String},
    size:{type:Number},
    mimetype:{type:String},
    shareId:{type:String},
    expiresAt:{type:Date}

},{timestamps:true});

export default mongoose.model("File",FileSchema);
