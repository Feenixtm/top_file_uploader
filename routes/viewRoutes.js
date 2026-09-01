import express from "express";

import * as viewController from "../controllers/viewControllers.js";

const viewRouter = express.Router();

viewRouter.get("/", viewController.getIndex);

viewRouter.get("/login", viewController.getLogin);
viewRouter.get("/sign-up", viewController.getSignUp);
viewRouter.get("/:folderName/:fileId", viewController.getFile);

viewRouter.get("/:rootFolderCUID/:subFolderCUID", viewController.getSubFolder);

export default viewRouter;