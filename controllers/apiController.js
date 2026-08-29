import { prisma } from "../lib/prisma.js";

export const deleteFile = async (req, res, next) => {
    try {
        const cuid = req.params.cuid;

        await prisma.file.delete({
            where: {
                id: cuid
            }
        });

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

export const createFolder = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}