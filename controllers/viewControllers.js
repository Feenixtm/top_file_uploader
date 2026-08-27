import { prisma } from "../lib/prisma.js";

export const getIndex = async (req, res, next) => {
    try {
        const images = await prisma.file.findMany();
        // console.log(images);
        res.render("index", { user: req.user, images: images });
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