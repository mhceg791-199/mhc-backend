import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dupfqq5l1",
  api_key: process.env.CLOUDINARY_API_KEY || "584518844543649",
  api_secret: process.env.CLOUDINARY_API_SECRET || "D2iYVZlfNO0opq1HbCDqT0vjPHs",
  secure: true,
});

export default cloudinary;
