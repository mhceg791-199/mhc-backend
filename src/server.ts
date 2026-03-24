// import express from "express";
// import compression from "compression";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";

// import { ENV } from "./config/env.js";
// import { connectDatabase } from "./config/database.js";
// import { helmetConfig, corsConfig } from "./config/security.js";
// import { swaggerSpec } from "./config/swagger.js";
// import { requestLogger } from "./middlewares/requestLogger.js";
// import { generalLimiter } from "./middlewares/rateLimiter.js";
// import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
// import routes from "./routes/index.js";
// import { logger } from "./utils/logger.js";

// const app = express();

// /* ─── Middlewares ─── */
// app.use(helmetConfig);
// app.use(corsConfig);
// app.use(compression());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(requestLogger);
// app.use(generalLimiter);


// // // ====================== ROOT ROUTE - HTML Response ======================
// app.get("/", (req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   res.status(200).send(`
//     <!DOCTYPE html>
//     <html lang="en" dir="ltr">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Kaller Architecture - Backend API</title>
//       <style>
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
//           color: #e0e0e0;
//           margin: 0;
//           padding: 0;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//         }
//         .container {
//           max-width: 800px;
//           padding: 40px 20px;
//         }
//         h1 {
//           font-size: 3.5rem;
//           font-weight: 700;
//           color: #C5A363;
//           margin-bottom: 10px;
//         }
//         h2 {
//           font-size: 1.8rem;
//           font-weight: 300;
//           color: #aaaaaa;
//           margin-bottom: 30px;
//         }
//         p {
//           font-size: 1.1rem;
//           line-height: 1.8;
//           color: #cccccc;
//           max-width: 600px;
//           margin: 0 auto 30px;
//         }
//         .status {
//           display: inline-block;
//           background: #22c55e;
//           color: #000;
//           padding: 8px 20px;
//           border-radius: 50px;
//           font-weight: 600;
//           font-size: 0.95rem;
//           margin-bottom: 30px;
//         }
//         .links a {
//           color: #C5A363;
//           text-decoration: none;
//           margin: 0 15px;
//           font-weight: 500;
//         }
//         .links a:hover {
//           text-decoration: underline;
//         }
//         footer {
//           margin-top: 60px;
//           font-size: 0.9rem;
//           color: #666;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>MHC</h1>
//         <h2>Backend API</h2>
        
//         <div class="status">● API is Running Successfully</div>
        
//         <p>
//          Welcome to MHC's Backend.<br>
//           We offer integrated architectural services with a focus on accurate design and practical implementation.</p>

//         <footer>
//           © 2026 MHC • All Rights Reserved<br>
//           Backend Version 1.0.0
//         </footer>
//       </div>
//     </body>
//     </html>
//   `);
// });

// /* ─── Swagger ─── */
// app.use(
//   "/api/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     customCss: ".swagger-ui .topbar { display: none }",
//     customSiteTitle: "Auth Landing Page API Docs",
//   })
// );

// app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

// /* ─── Routes ─── */
// app.use("/api", routes);

// /* ─── Errors ─── */
// app.use("/api/*", notFoundHandler);
// app.use(errorHandler);

// /* ───────────────────────────────────────────── */
// /* 🔴 IMPORTANT PART */
// /* ───────────────────────────────────────────── */

// /**
//  * Local development only
//  * Vercel will NOT run this
//  */
// if (process.env.VERCEL !== "1") {
//   (async () => {
//     try {
//       await connectDatabase();
//       app.listen(ENV.port, () => {
//         logger.info(`🚀 API running on http://localhost:${ENV.port}`);
//       });
//     } catch (err) {
//       logger.error("Failed to start server", err);
//       process.exit(1);
//     }
//   })();
// }

// /**
//  * Vercel entry point
//  */
// export default async function handler(req: any, res: any) {
//   await connectDatabase();
//   return app(req, res);
// }

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////// vercel
/////////////////////////////////////////////////////////////////////////////
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { connectDatabase } from "./config/database.js";
import { helmetConfig, corsConfig } from "./config/security.js";
import { swaggerSpec } from "./config/swagger.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

// Middlewares
app.use(helmetConfig);
app.use(corsConfig);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(generalLimiter);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));

// ROOT ROUTE
app.get("/", (req, res) => {
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kaller Architecture - Backend API</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
          color: #e0e0e0;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .container {
          max-width: 800px;
          padding: 40px 20px;
        }
        h1 {
          font-size: 3.5rem;
          font-weight: 700;
          color: #C5A363;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 1.8rem;
          font-weight: 300;
          color: #aaaaaa;
          margin-bottom: 30px;
        }
        p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #cccccc;
          max-width: 600px;
          margin: 0 auto 30px;
        }
        .status {
          display: inline-block;
          background: #22c55e;
          color: #000;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 30px;
        }
        .links a {
          color: #C5A363;
          text-decoration: none;
          margin: 0 15px;
          font-weight: 500;
        }
        .links a:hover {
          text-decoration: underline;
        }
        footer {
          margin-top: 60px;
          font-size: 0.9rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>MHC</h1>
        <h2>Backend API</h2>
        
        <div class="status">● API is Running Successfully</div>
        
        <p>
         Welcome to MHC's Backend.<br>
          We offer integrated architectural services with a focus on accurate design and practical implementation.</p>

        <footer>
          © 2026 MHC • All Rights Reserved<br>
          Backend Version 1.0.0
        </footer>
      </div>
    </body>
    </html>
  `);
});

// Routes
app.use("/api", routes);

// Errors
app.use("/api/*", notFoundHandler);
app.use(errorHandler);

// ❗ مهم جدا: ده بديل app.listen
export default async function handler(req: any, res: any) {
  await connectDatabase();
  return app(req, res);
}
