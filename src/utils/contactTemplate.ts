export const contactEmailTemplate = (
  name: string,
  email: string,
  message: string,
  site: { name: string; url: string },
) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message - Kaller Architecture</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
            background: #f8f9fa;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 650px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
            color: #C5A363;
            padding: 35px 40px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px;
            line-height: 1.8;
          }
          .info {
            background: #f8f9fa;
            padding: 18px 22px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 5px solid #C5A363;
          }
          .message-box {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #e0e0e0;
            font-size: 16px;
            color: #333;
            white-space: pre-wrap;
          }
          .footer {
            background: #1a1a1a;
            color: #aaaaaa;
            text-align: center;
            padding: 25px;
            font-size: 14px;
          }
          .footer a {
            color: #C5A363;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>${site.name}</h1>
            <p style="margin: 8px 0 0; opacity: 0.9;">New Contact Message</p>
          </div>

          <!-- Content -->
          <div class="content">
            <p>You have received a new message through ${site.name} website.</p>

            <div class="info">
              <strong>Name:</strong> ${name}<br>
              <strong>Email:</strong> ${email}
            </div>

            <p><strong>Message:</strong></p>
            <div class="message-box">
              ${message}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>© ${new Date().getFullYear()} ${site.name} • All Rights Reserved</p>
            <p>
              This email was sent automatically from the company website.<br>
              <a href=${site.url} target="_blank">Visit our website</a>
            </p>
          </div>
        </div>
      </body>
      </html>
  `;
};
