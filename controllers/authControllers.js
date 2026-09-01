import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const postSignUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // See if a user with this username already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });

        if (existingUser) {
            console.log("Please sign up with a different username...");
            return;
        } else if (!existingUser) {
            const newUser = await prisma.user.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword
                }
            });

            console.log(newUser);

            await prisma.folder.create({
                data: {
                    name: "My Documents",
                    userId: newUser.id
                }
            });

            res.redirect("/");
        }

        

        
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