import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/"});
import { prisma } from "../lib/prisma.js";

const apiRouter = express.Router();

// GET

// POST

apiRouter.post("/upload", upload.single("avatar"), async (req, res, next) => {
    try {
        const file = req.file;
        console.log(file);

        const newFile = await prisma.file.create({
            data: {
                filename: file.originalname,
                path: file.path,
                mimetype: file.mimetype,
                size: file.size,
            }
        })

        console.log(newFile);

        res.redirect('/');
    } catch (error) {
        next(error);
    }
})

export default apiRouter;