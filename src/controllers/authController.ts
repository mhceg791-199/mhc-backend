import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ENV } from "../config/env.js";
import { AppError, AuthError, ConflictError, ValidationError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import type { JwtPayload } from "../middlewares/auth.js";

function generateToken(user: { _id: any; email: string; role: string }): string {
  return jwt.sign(
    { userId: user._id.toString(), email: user.email, role: user.role } as JwtPayload,
    ENV.jwtSecret,
    { expiresIn: ENV.jwtExpiresIn as any }
  );
}

function setTokenCookie(res: Response, token: string): void {
  res.cookie("token", token, {
    httpOnly: true,
    secure: ENV.isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

/**
 * POST /api/auth/register
 */
export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new ValidationError("All fields are required", {
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
        name: !name ? "Name is required" : "",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ConflictError("An account with this email already exists");
    }

    const user = await User.create({ email, password, name });
    const token = generateToken(user);
    setTokenCookie(res, token);

   

    logger.info(`[Auth] New user registered: ${user.email}`);

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      throw new AuthError("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AuthError("Invalid email or password");
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    logger.info(`[Auth] User logged in: ${user.email}`);

    res.json({
      success: true,
      data: {
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 */
export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
}

/**
 * GET /api/auth/me
 */
export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findById(req.user!.id);
    if (!user) {
      throw new AuthError("User not found");
    }
    res.json({
      success: true,
      data: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/auth/profile
 */
export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user!.id);
    if (!user) throw new AuthError("User not found");

    if (email && email !== user.email) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) throw new ConflictError("Email already in use");
      user.email = email;
    }
    if (name) user.name = name;

    await user.save();

    res.json({
      success: true,
      data: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/auth/password
 */
export async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new ValidationError("Both current and new password are required");
    }
    if (newPassword.length < 6) {
      throw new ValidationError("New password must be at least 6 characters");
    }

    const user = await User.findById(req.user!.id).select("+password");
    if (!user) throw new AuthError("User not found");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new AuthError("Current password is incorrect");

    user.password = newPassword;
    await user.save();

    // Issue new token
    const token = generateToken(user);
    setTokenCookie(res, token);

    res.json({ success: true, message: "Password changed successfully", token });
  } catch (error) {
    next(error);
  }
}
