import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { ENV } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { helmetConfig, corsConfig } from "./config/security.js";
import { swaggerSpec } from "./config/swagger.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";
import { logger } from "./utils/logger.js";
import { rootTemplate } from "./utils/rootTemplate.js";

const app = express();

/* ─── Middlewares ─── */
app.use(helmetConfig);
app.use(corsConfig);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(generalLimiter);


// // ====================== ROOT ROUTE - HTML Response ======================
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(rootTemplate(
    "MHC",                   
    "https://mosaicholding.com"
  ));
});

/* ─── Swagger ─── */
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Auth Landing Page API Docs",
  })
);

app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

/* ─── Routes ─── */
app.use("/api", routes);

/* ─── Errors ─── */
app.use("/api/*", notFoundHandler);
app.use(errorHandler);

/* ───────────────────────────────────────────── */
/* 🔴 IMPORTANT PART */
/* ───────────────────────────────────────────── */

/**
 * Local development only
 * Vercel will NOT run this
 */
if (process.env.VERCEL !== "1") {
  (async () => {
    try {
      await connectDatabase();
      app.listen(ENV.port, () => {
        logger.info(`🚀 API running on http://localhost:${ENV.port}`);
      });
    } catch (err) {
      logger.error("Failed to start server", err);
      process.exit(1);
    }
  })();
}

/**
 * Vercel entry point
 */
export default async function handler(req: any, res: any) {
  await connectDatabase();
  return app(req, res);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////// vercel
/////////////////////////////////////////////////////////////////////////////

// import express from "express";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";

// import { connectDatabase } from "./config/database.js";
// import { helmetConfig, corsConfig } from "./config/security.js";
// import { swaggerSpec } from "./config/swagger.js";
// import { requestLogger } from "./middlewares/requestLogger.js";
// import { generalLimiter } from "./middlewares/rateLimiter.js";
// import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
// import routes from "./routes/index.js";
// import { rootTemplate } from "./utils/rootTemplate.js";

// const app = express();

// // Middlewares
// app.use(helmetConfig);
// app.use(corsConfig);
// app.use(compression());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(requestLogger);
// app.use(generalLimiter);

// // Swagger
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

// // ROOT ROUTE
// app.get("/", (req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   res.status(200).send(rootTemplate(
//     "MHC",
//     "https://mosaicholding.com"
//   ));
// });

// // Routes
// app.use("/api", routes);

// // Errors
// app.use("/api/*", notFoundHandler);
// app.use(errorHandler);

// // ❗ مهم جدا: ده بديل app.listen
// export default async function handler(req: any, res: any) {
//   await connectDatabase();
//   return app(req, res);
// }
