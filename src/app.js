import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import appConfig from "#config/index.js";
import routes from "#routes/index.js";
import { ErrorHandler, LogError } from "#middlewares/errorMiddleware.js";


const app = express();

// Application middlewares
app.use(cors(appConfig.corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
routes(app);

// Error handling middlewares
app.use(LogError);
app.use(ErrorHandler);

// Server
app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});
