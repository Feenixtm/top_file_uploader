import express from "express";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";

import apiRouter from "./routes/apiRoutes.js";
import viewRouter from "./routes/viewRoutes.js";

const app = express();

// Use EJS
const currentDirectory = import.meta.dirname;
app.set("views", path.join(currentDirectory, "views"));
app.set("view engine", "ejs");

// Use CSS
app.use(express.static(path.join((currentDirectory), "public")));

// Use Multer
app.use("/uploads", express.static("uploads"));

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

app.use("/", viewRouter);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("Server failed to start up:", error);
        return;
    }
    console.log("Listening to Port:", PORT);
})