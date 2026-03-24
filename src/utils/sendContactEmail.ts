import { transporter } from "./mailer.js";
import { ENV } from "../config/env.js";
import { contactEmailTemplate } from "./contactTemplate.js";

export const sendContactEmail = async (
  name: string,
  email: string,
  message: string,
  site: { name: string; url: string }

) => {
  const html = contactEmailTemplate(name, email, message, site);

  await transporter.sendMail({
    from: `"${site.name}" <${ENV.EMAIL_USER}>`,
    to: ENV.EMAIL_RECEIVER,
    subject: `📩 New Contact Message from ${name}`,
    html,
  });
};
