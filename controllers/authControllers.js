import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const postSignUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword
            }
        });

        res.redirect("/");
    } catch (error) {
        return next(error);
    }
}

export const getLogOut = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        res.redirect("/");
    })
}