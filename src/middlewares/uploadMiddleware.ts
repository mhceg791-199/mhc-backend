import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { nanoid } from "nanoid";
import { Request } from "express";

// Product image upload — stores in APP_NAME/product/<customId>/
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    req.body.customId = req.body.customId || nanoid(6);
    return {
      folder: `${process.env.APP_NAME || "auth-landing-page"}/product/${req.body.customId}`,
      format: "webp",
      flags: "lossy",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

// Category image upload — stores in APP_NAME/category/<customId>/
const categoryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    req.body.customId = req.body.customId || nanoid(6);
    return {
      folder: `${process.env.APP_NAME || "auth-landing-page"}/category/${req.body.customId}`,
      format: "webp",
      flags: "lossy",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

export const uploadProductImage = multer({
  storage: productStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadProductImages = multer({
  storage: productStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadCategoryImage = multer({
  storage: categoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
