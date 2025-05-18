import express from "express";
import { login, register, protectedRoute, logout } from "../controllers/AuthController.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/protected", requireAuth, protectedRoute);
authRouter.post("/logout",logout);
