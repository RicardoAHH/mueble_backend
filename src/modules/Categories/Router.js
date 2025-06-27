import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/categories", index);
categoriesRouter.get("/categories/:id", show);
categoriesRouter.post("/categories", store);
categoriesRouter.put("/categories/:id", update);
categoriesRouter.delete("/categories/:id", destroy); 
