import { Router } from "express";
import { authenticatedRoute, isAuthenticated, login, register } from "../controllers/AuthenticationController.js";


export const authRouter = Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/authenticatedEndpoint",isAuthenticated,authenticatedRoute);