import { Router } from "express";
import { register, login, logout, getMe, updateProfile, changePassword } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const authRoutes = Router();

authRoutes.post("/register", authLimiter, register);
authRoutes.post("/login", authLimiter, login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", requireAuth, getMe);
authRoutes.put("/profile", requireAuth, updateProfile);
authRoutes.put("/password", requireAuth, changePassword);

export default authRoutes;
