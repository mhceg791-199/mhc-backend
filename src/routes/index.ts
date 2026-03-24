import { Router } from "express";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";
import applictionsRoutes from "./applicationRoutes.js";
import contactRoutes from "./contactRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/appliactions", applictionsRoutes);
router.use("/contact", contactRoutes);

// Health check
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "MHCEG API is running", timestamp: new Date().toISOString() });
});

export default router;
