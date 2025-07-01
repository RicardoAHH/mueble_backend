import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const rolesRouter = Router();

rolesRouter.get("/", index);
rolesRouter.get("/:id", show);
rolesRouter.post("/", store);
rolesRouter.put("/:id", update);
rolesRouter.delete("/:id", destroy);
