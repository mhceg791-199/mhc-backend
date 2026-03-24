import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import mongoose from "mongoose";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  // Log the error
  if (err instanceof AppError && err.isOperational) {
    logger.warn(`[${req.method}] ${req.path} — ${err.statusCode}: ${err.message}`);
  } else {
    logger.error(`[${req.method}] ${req.path} — Unhandled error:`, err);
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {};
    for (const [field, error] of Object.entries(err.errors)) {
      errors[field] = error.message;
    }
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
    return;
  }

  // Mongoose duplicate key error
  if (err.name === "MongoServerError" && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0] || "field";
    res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}`,
    });
    return;
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
    return;
  }

  // Custom AppError
  if (err instanceof AppError) {
    const response: any = {
      success: false,
      message: err.message,
    };
    if (err instanceof ValidationError && Object.keys(err.errors).length > 0) {
      response.errors = err.errors;
    }
    res.status(err.statusCode).json(response);
    return;
  }

  // Unknown error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error",
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
}
