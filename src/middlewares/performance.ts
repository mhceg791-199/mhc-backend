import { Request, Response, NextFunction } from "express";

/**
 * Set cache-control headers for static assets and API responses.
 */
export function cacheControl(maxAge: number = 0) {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (maxAge > 0) {
      res.set("Cache-Control", `public, max-age=${maxAge}, s-maxage=${maxAge}`);
    } else {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    }
    next();
  };
}

/**
 * Add security headers to all responses.
 */
export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "DENY");
  res.set("X-XSS-Protection", "1; mode=block");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
}

/**
 * Request timing middleware — adds X-Response-Time header.
 */
export function responseTime(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const ms = Number(end - start) / 1e6;
    res.set("X-Response-Time", `${ms.toFixed(2)}ms`);
  });
  next();
}
