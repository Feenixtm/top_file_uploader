import { prisma } from "../lib/prisma.js";

export const getIndex = async (req, res, next) => {
    try {
        const files = await prisma.file.findMany();
        console.log(files);
        res.render("index", { user: req.user, files: files });
    } catch (error) {
        next(error);
    }
}

export const getLogin = (req, res) => {
    res.render("login");
}

export const getSignUp = (req, res) => {
    res.render("sign-up");
}

export const getFile = async (req, res, next) => {
    try {
        const cuid = req.params.cuid;
        const file = await prisma.file.findUnique({
            where: {
                id: cuid
            }
        })

        res.render("file", { file: file });
    } catch (error) {
        next(error);
    }   
}