import express from "express";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const app = express();

app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        secret: "cats",
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined
            }
        )
    })
)

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("Server failed to start up:", error);
        return;
    }
    console.log("Listening to Port:", PORT);
})