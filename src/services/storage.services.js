import {v4 as uuid4} from "uuid"
import fs from "fs"
import path from "path"

export const saveFile = (file)=>{
    return{
        filename:file.filename,
        originalname:file.originalname,
        path:file.path,
        size:file.size,
        mimetype:file.mimetype,
        shareId:uuid4(),
        expiresAt:Date.now() + 60*1000
    }
}

export const getFilePath = (storedPath)=>{
    return path.resolve(storedPath);
}

export const deleteFile = (storedPath)=>{
    const filePath = path.resolve(storedPath);
    fs.unlinkSync(filePath);
}