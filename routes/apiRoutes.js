import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/"});
import { prisma } from "../lib/prisma.js";
import * as apiController from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.post("/upload", upload.single("avatar"), async (req, res, next) => {
    try {
        const file = req.file;
        const folderId = req.body.cuid;

        console.log("folderId:", + folderId);
        
        if (file) {
            console.log(file);

            const newFile = await prisma.file.create({
                data: {
                    filename: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    folderId: folderId
                }
            });

            console.log(newFile);
            
            const currentPath = req.body.currentPath;
            
            res.redirect(currentPath);
        } else {
            console.log("Nothing was uploaded to the database...");
            return;
        }
    } catch (error) {
        next(error);
    }
})

apiRouter.post("/delete/:cuid", apiController.deleteFile);

apiRouter.post("/create-folder", apiController.createFolder);

export default apiRouter;

