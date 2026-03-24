import { Request, Response } from "express";
import ContactMessage from "../models/contactMessage.js";
import { sendContactEmail } from "../utils/sendContactEmail.js";

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message, site } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // default site لو مش موجود
    const siteData = {
      name: site?.name || "Unknown Website",
      url: site?.url || "",
    };

    const newMessage = await ContactMessage.create({
      name,
      email,
      message,
      site: siteData, 
    });

    await sendContactEmail(name, email, message, siteData);

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};