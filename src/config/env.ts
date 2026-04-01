import { config } from "dotenv";
config({ path: "../config/.env" });

// export const ENV = {
//   port: parseInt(process.env.PORT || "5000", 10),
//   nodeEnv: process.env.NODE_ENV || "development",
//   mongodbUri:
//     process.env.MONGODB_URI,
//   jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
//   jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   clientUrl:
//     process.env.CLIENT_URL || "https://auth-client-three-umber.vercel.app/",
//   frontendUrl:
//     process.env.FRONTEND_URL ||
//     process.env.CLIENT_URL ||
//     "https://auth-client-three-umber.vercel.app/",
//   appName: process.env.APP_NAME || "mhc",
//   logLevel: process.env.LOG_LEVEL || "debug",
//   isProduction: process.env.NODE_ENV === "production",
//   isDevelopment: process.env.NODE_ENV !== "development",
// };
export const ENV = {
  port: parseInt(process.env.PORT || "5000", 10),
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/application",

  EMAIL_USER: process.env.EMAIL_USER || "mhceg791@gmail.com",
  EMAIL_PASS: process.env.EMAIL_PASS || "hxfozdddpfxaiobb",
  EMAIL_RECEIVER: process.env.EMAIL_RECEIVER || "mhceg791@gmail.com",

  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  isProduction: process.env.NODE_ENV === "production",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  CLOUDINARY_CLOUD_NAME: "dupfqq5l1",
  isDevelopment: "production"
};