import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import fs from "fs";
export const swaggerRouter = Router();

const swaggerDoc = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));

swaggerRouter.use("/", serve);

swaggerRouter.get("/", setup(swaggerDoc, { swaggerOptions: { docExpansion: "none" } }));
