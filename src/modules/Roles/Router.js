import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const rolesRouter = Router();

rolesRouter.get("/roles", index);
rolesRouter.get("/roles/:id", show);
rolesRouter.post("/roles", store);
rolesRouter.put("/roles/:id", update);
rolesRouter.delete("/roles/:id", destroy); 
