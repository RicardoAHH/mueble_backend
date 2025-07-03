import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const quotesRouter = Router();

quotesRouter.get("/", index);
quotesRouter.get("/:id", show);
quotesRouter.post("/", store);
quotesRouter.put("/:id", update);
quotesRouter.delete("/:id", destroy);
