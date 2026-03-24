import express from "express";
// import { submitApplication } from "@/controllers/applicationController.js";
// import { upload } from "../middlewares/multer.js";
import { submitApplication } from "../controllers/applicationController.js";
import { upload } from "../middlewares/multer.js";
// import { upload } from "@/middlewares/multer.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), submitApplication);

export default router;