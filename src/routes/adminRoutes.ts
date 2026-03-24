import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import { updateUserRole, updateUserStatus } from "../controllers/adminController.js";


const router = Router();

// All admin routes require authentication + admin role
router.use(requireAuth, requireAdmin);

// Users / Customers
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/status", updateUserStatus);


export default router;
