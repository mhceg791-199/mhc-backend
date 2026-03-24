import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { AuthError, ForbiddenError } from "../utils/AppError.js";
import { User } from "../models/User.js";

export interface JwtPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: "user" | "admin";
      };
    }
  }
}

/**
 * Middleware: Require authentication. Extracts JWT from Authorization header or cookie.
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // Check cookie fallback
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new AuthError("Authentication required");
    }

    const decoded = jwt.verify(token, ENV.jwtSecret) as JwtPayload;
    const user = await User.findById(decoded.userId).select("email name role");

    if (!user) {
      throw new AuthError("User no longer exists");
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      next(error);
    } else {
      next(new AuthError("Invalid or expired token"));
    }
  }
}

/**
 * Middleware: Require admin role. Must be used after requireAuth.
 */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    next(new AuthError("Authentication required"));
    return;
  }
  if (req.user.role !== "admin") {
    next(new ForbiddenError("Admin access required"));
    return;
  }
  next();
}

/**
 * Middleware: Optional auth. Attaches user if token is present, but doesn't fail.
 */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, ENV.jwtSecret) as JwtPayload;
      const user = await User.findById(decoded.userId).select("email name role");
      if (user) {
        req.user = {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    }
  } catch {
    // Token invalid — continue without user
  }
  next();
}
