import { Router } from "express";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";
import applictionsRoutes from "./applicationRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/appliactions", applictionsRoutes);

// Health check
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "Auth Landing Page API is running", timestamp: new Date().toISOString() });
});

export default router;
