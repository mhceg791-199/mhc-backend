import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.js";
import { NotFoundError, ValidationError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";






/**
 * PATCH /api/admin/users/:id/role
 */
export async function updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      throw new ValidationError("Role must be 'user' or 'admin'");
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) throw new NotFoundError("User");

    logger.info(`[Admin] User ${user.email} role updated to ${role}`);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/admin/users/:id/status
 * Enable or disable a user account
 */
export async function updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body;
    if (!["active", "suspended", "banned"].includes(status)) {
      throw new ValidationError("Status must be 'active', 'suspended', or 'banned'");
    }

    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!user) throw new NotFoundError("User");

    logger.info(`[Admin] User ${user.email} status updated to ${status}`);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}


