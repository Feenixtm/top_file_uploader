import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })

            if (!user) {
                done(null, false, { message: "Incorrect Username" });
            }

            const matched = bcrypt.compare(password, user.password);
            if (!matched) {
                done(null, false, { message: "Incorrect Password" });
            }

            return done(null, user);            
        } catch (error) {
            return done(error);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        done(null, user);
    } catch (error) {
        done(error);
    }
})