// import helmet from "helmet";
// import cors from "cors";
// import { ENV } from "./env.js";
// import helmet from "helmet";

// export const helmetConfig = helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   contentSecurityPolicy: false,
// });
import helmetPkg from "helmet";
import cors from "cors";
import { ENV } from "./env.js";

const helmet = (helmetPkg as any).default || helmetPkg;

export const helmetConfig = helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
});

export const corsConfig = cors({
  origin: ENV.isProduction
    ? [ENV.clientUrl]
    : [
        ENV.clientUrl,
        "https://auth-client-three-umber.vercel.app/",
        "http://localhost:5173",
        "http://localhost:3000",
        "https://mosaic-eng.com",
        "https://mosaic-propmgmt.com",
        "https://www.mosaic-imports.com",
        "https://mosaicrestate.com",
        "https://indigenousmosaic.com",
        "https://www.dattatayefi.com",
        "https://mhc-eg.com",
        "https://www.wolsey.ca"
      ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
