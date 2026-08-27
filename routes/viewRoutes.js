import express from "express";

import * as viewController from "../controllers/viewControllers.js";

const viewRouter = express.Router();

viewRouter.get("/", viewController.getViewIndex);

export default viewRouter;