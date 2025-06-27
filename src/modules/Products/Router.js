import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js";

export const productsRouter = Router();

productsRouter.get("/products", index);
productsRouter.get("/products/:id", show);
productsRouter.post("/products", store);
productsRouter.put("/products/:id", update);
productsRouter.delete("/products/:id", destroy); 
