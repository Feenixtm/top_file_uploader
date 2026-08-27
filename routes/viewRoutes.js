import express from "express";
import { prisma } from "../lib/prisma.js";

const viewRouter = express.Router();

viewRouter.get("/", async (req, res, next) => {
    try {
        const images = await prisma.file.findMany();
        // console.log(images);
        res.render("index", { images: images });
    } catch (error) {
        next(error);
    }
})

export default viewRouter;