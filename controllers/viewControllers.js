import { prisma } from "../lib/prisma.js";

export const getViewIndex = async (req, res, next) => {
    try {
        const images = await prisma.file.findMany();
        // console.log(images);
        res.render("index", { images: images });
    } catch (error) {
        next(error);
    }
}