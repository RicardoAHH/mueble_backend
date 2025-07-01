import { Router } from "express";
import { login, register, logout } from "./Controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", logout);

