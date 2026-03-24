import { Request, Response } from "express";
import { ENV } from "../config/env.js";
import application from "../models/application.js";
import { transporter } from "../utils/mailer.js";
import { buildDownloadUrl, uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, position, experience, portfolio, coverLetter } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // console.log("📤 Uploading to Cloudinary...");

    const uploadResult: any = await uploadToCloudinary(req.file);

    // console.log("✅ Uploaded successfully!");
    // console.log("Public ID:", uploadResult.public_id);
    // console.log("Secure URL:", uploadResult.secure_url);

    // ✅ SOLUTION: Build URL without version
    const resumeUrl = buildDownloadUrl(uploadResult, ENV.CLOUDINARY_CLOUD_NAME);

    console.log("📄 Final Resume URL:", resumeUrl);

    // 💾 Save to DB
    const newApplication = await application.create({
      name,
      email,
      phone,
      position,
      experience,
      portfolio,
      coverLetter,
      resumeUrl,
    });

    // 📧 Send Email
    await transporter.sendMail({
      from: ENV.EMAIL_USER,
      to: ENV.EMAIL_RECEIVER,
      subject: `New Job Application - ${position}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              background: #000; 
              color: white; 
              padding: 20px; 
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content { 
              padding: 30px; 
              background: #f9f9f9; 
              border-radius: 0 0 8px 8px;
            }
            .info-row { 
              margin: 15px 0; 
              padding: 10px;
              background: white;
              border-radius: 4px;
            }
            .label { 
              font-weight: bold; 
              color: #000;
              display: inline-block;
              min-width: 120px;
            }
            .cover-letter {
              background: white;
              padding: 20px;
              border-left: 4px solid #000;
              margin: 20px 0;
              border-radius: 4px;
            }
            .button { 
              display: inline-block; 
              padding: 15px 30px; 
              background-color: #000; 
              color: white !important; 
              text-decoration: none; 
              border-radius: 8px;
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover {
              background-color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🎯 New Job Application</h2>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">👤 Name:</span> ${name}
              </div>
              <div class="info-row">
                <span class="label">📧 Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="info-row">
                <span class="label">📱 Phone:</span> ${phone}
              </div>
              <div class="info-row">
                <span class="label">💼 Position:</span> ${position}
              </div>
              <div class="info-row">
                <span class="label">⏱️ Experience:</span> ${experience}
              </div>
              ${portfolio ? `
              <div class="info-row">
                <span class="label">🌐 Portfolio:</span> <a href="${portfolio}" target="_blank">${portfolio}</a>
              </div>
              ` : ''}
              
              <div class="cover-letter">
                <strong>📝 Cover Letter:</strong>
                <p style="margin-top: 10px; white-space: pre-wrap;">${coverLetter}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="${resumeUrl}" class="button" target="_blank">
                  📄 Download Resume
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <p style="font-size: 12px; color: #666;">
                  Direct link: <a href="${resumeUrl}" target="_blank" style="color: #000;">${resumeUrl}</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("✅ Email sent successfully!");

    res.status(201).json({
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error: any) {
    console.error("❌ ERROR:", error);

    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};