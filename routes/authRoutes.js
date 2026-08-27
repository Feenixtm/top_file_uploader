import express from "express";
import * as authController from "../controllers/authControllers.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/sign-up", authController.postSignUp);
authRouter.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
)
authRouter.get("/log-out", authController.getLogOut);

export default authRouter;