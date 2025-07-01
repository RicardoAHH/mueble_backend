import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", index);
categoriesRouter.get("/:id", show);
categoriesRouter.post("/", store);
categoriesRouter.put("/:id", update);
categoriesRouter.delete("/:id", destroy);
