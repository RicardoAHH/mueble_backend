import { Router } from "express";
import { useRoute } from "#utils/helpers/routeHelper.js";
import { routes } from "./routes.js";
import { swaggerRouter } from "./swagger.js";
const appRouter = Router();

export default (app) => {

  app.use("/api/v1/docs", swaggerRouter);

  app.use("/api/v1", appRouter);

  useRoute(routes, appRouter);


  app.use((req, res, next) => {

    res.status(404).json({ message: "Route not found" });
  });

};
