// #modules/Products/Router.js
import { Router } from "express";
import { index, show, store, update, destroy } from "./Controller.js"; // Asegúrate de que los nombres de los controladores sean correctos

export const productsRouter = Router();

// Las rutas deben ser RELATIVAS al mountPath (que es "/products" en routeHelper.js)
productsRouter.get("/", index); // Esto manejará GET /api/v1/products
productsRouter.get("/:id", show); // Esto manejará GET /api/v1/products/:id
productsRouter.post("/", store); // Esto manejará POST /api/v1/products
productsRouter.put("/:id", update); // Esto manejará PUT /api/v1/products/:id
productsRouter.delete("/:id", destroy); // Esto manejará DELETE /api/v1/products/:id