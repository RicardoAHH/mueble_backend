import { Router } from "express";
import {login, register, logout } from "./Controller.js";

export const authRouter = Router();

authRouter.post("/auth/login", login); 
authRouter.post("/auth/register", register);
authRouter.get("/auth/logout", logout);

