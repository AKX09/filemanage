import express from "express";
import multer from "multer";
import File from "../../models/File.js";
import {saveFile, getFilePath, deleteFile} from "../services/storage.services.js";
import {redis} from "../config/redis.js"
import fs from "fs"


const router = express.Router();

const upload = multer({dest:"uploads/"});


router.post("/upload", upload.single("file"), async(req,res)=>{

    const newfile = saveFile(req.file);
    const file = await File.create(newfile);

    res.json({
        message:"File uploaded",
        link:`http://localhost:5000/files/${file.shareId}`,
    });
})


router.get("/:shareId",async(req,res)=>{
    const shareId = req.params.shareId;
    let file = await redis.get(`file:${shareId}`);

    if(!file){
        file = await File.findOne({shareId});

        if(!file){
            return res.json({message:"File not found"});
        }

        await redis.set(`file:${shareId}`,file,"EX",120);

    }
    if( file.expiresAt &&  new Date(file.expiresAt) < Date.now()){
        return res.status(403).json({message:"Link expired"});
    }


    if(!file.path || !fs.existsSync(file.path)){
        return res.status(403).json({message:"File not found"});
    }

    const filePath = getFilePath(file.path);

    res.setHeader("Content-type", file.mimetype);
    fs.createReadStream(filePath).pipe(res);
})

export default router;

//notes
//file.deleteOne(); only works if file is a mongoose document thats all
// if not then u need to use File.deleteOne({pass parameter})