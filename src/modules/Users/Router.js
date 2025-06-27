/**
 * Users Router Module
 * 
 * This module defines the routes for managing users in the application.
 * It uses Express Router to handle HTTP requests and maps them to the appropriate controller functions.
 * 
 * Routes:
 * - GET "/" - Fetch a list of all users. (Controller: index)
 * - GET "/profile" - Fetch the profile of the currently authenticated user. (Controller: profile)
 * - PATCH "/change-password" - Change the password of the currently authenticated user. (Controller: changePassword)
 * - GET "/:id" - Fetch details of a specific user by ID. (Controller: show)
 * - POST "/" - Create a new user. (Controller: store)
 * - PUT "/:id" - Update an existing user by ID. (Controller: update)
 * - DELETE "/:id" - Delete a user by ID. (Controller: destroy)
 * - PATCH "/:id/restore" - Restore a previously deleted user by ID. (Controller: restore)
 * 
 * @module UsersRouter
 * @requires express.Router
 * @requires ./Controller.js
 */
import { Router } from "express";
import { index, show, store, update, destroy, profile, restore, changePassword } from "./Controller.js";

export const usersRouter = Router();

usersRouter.get("/users/", index);
usersRouter.get("/users/profile", profile); 
usersRouter.patch("/users/change-password", changePassword); 
usersRouter.get("/users/:id", show);
usersRouter.post("/users/", store);
usersRouter.put("/users/:id?", update);
usersRouter.delete("/users/:id", destroy); 
usersRouter.patch("/users/:id/restore", restore);
