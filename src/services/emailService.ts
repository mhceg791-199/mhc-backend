import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export const sendApplicationEmail = async (
  name: string,
  email: string,
  position: string,
  resumeUrl: string
) => {
  await transporter.sendMail({
    from: ENV.EMAIL_USER,
    to: ENV.EMAIL_USER,
    subject: `New Job Application - ${position}`,
    html: `
      <h2>New Application Received</h2>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Position:</b> ${position}</p>

      <p><a href="${resumeUrl}">Download CV</a></p>
    `,
  });
};
