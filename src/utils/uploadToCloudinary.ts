// import cloudinary from "../config/cloudinary.js";

// export const uploadToCloudinary = async (file: Express.Multer.File) => {
//   const base64 = file.buffer.toString("base64");

//   const fileName = file.originalname
//     .replace(/\.[^/.]+$/, "") // remove extension
//     .replace(/\s+/g, "_"); // remove spaces

//   const timestamp = Date.now();

//   const result = await cloudinary.uploader.upload(
//     `data:application/pdf;base64,${base64}`,
//     {
//       folder: "applications/resumes",
//       resource_type: "raw",
//       public_id: `${fileName}_${timestamp}`,
//       format: "pdf",
//       type: "upload",
//       access_mode: "public",
//     },
//   );

//   return result;
// };

// /**
//  * ✅ Generate download URL without version
//  */
// export const generateDownloadUrl = (uploadResult: any) => {
//   // Use cloudinary.url() to generate proper URL without version
//   const url = cloudinary.url(uploadResult.public_id, {
//     resource_type: "raw",
//     type: "upload",
//     secure: true,
//     // Don't include version or fl_attachment here
//   });

//   return url;
// };

// /**
//  * ✅ Alternative: Build URL manually without version
//  */
// export const buildDownloadUrl = (uploadResult: any, cloudName: string) => {
//   // Format: https://res.cloudinary.com/{cloud}/raw/upload/{public_id}
//   return `https://res.cloudinary.com/${cloudName}/raw/upload/${uploadResult.public_id}`;
// };


import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  const base64 = file.buffer.toString("base64");

  const fileName = file.originalname
    .replace(/\.[^/.]+$/, "")
    .replace(/\s+/g, "_");

  const timestamp = Date.now();

  const result = await cloudinary.uploader.upload(
    `data:application/pdf;base64,${base64}`,
    {
      folder: "applications/resumes",
      resource_type: "raw",
      public_id: `${fileName}_${timestamp}`,
      format: "pdf",
    }
  );

  return result;
};

export const buildDownloadUrl = (uploadResult: any, cloudName: string) => {
  return `https://res.cloudinary.com/${cloudName}/raw/upload/${uploadResult.public_id}`;
};