// templates/rootTemplate.js

export const rootTemplate = (siteName = "MHC", siteUrl = "https://mosaicholding.com") => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${siteName} - Backend API</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
          color: #e0e0e0;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .container {
          max-width: 820px;
          padding: 50px 20px;
        }
        h1 {
          font-size: 3.8rem;
          font-weight: 700;
          color: #C5A363;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }
        h2 {
          font-size: 1.9rem;
          font-weight: 300;
          color: #aaaaaa;
          margin-bottom: 40px;
        }
        p {
          font-size: 1.15rem;
          line-height: 1.85;
          color: #cccccc;
          max-width: 620px;
          margin: 0 auto 35px;
        }
        .status {
          display: inline-block;
          background: #22c55e;
          color: #000;
          padding: 10px 26px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 40px;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }
        .links a {
          color: #C5A363;
          text-decoration: none;
          margin: 0 18px;
          font-weight: 500;
          transition: all 0.3s;
        }
        .links a:hover {
          text-decoration: underline;
          color: #e8c46a;
        }
        footer {
          margin-top: 80px;
          font-size: 0.95rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${siteName}</h1>
        <h2>Backend API</h2>
        
        <div class="status">● API is Running Successfully</div>
        
        <p>
          Welcome to ${siteName} Backend.<br>
          We provide integrated architectural and engineering services with a focus on precision and practical implementation.
        </p>

        <div class="links">
          <a href="/api/docs" target="_blank">📚 API Documentation</a>
          <a href="/api/applications/apply" target="_blank">📄 Submit Application</a>
          <a href="${siteUrl}" target="_blank">🌐 Visit Website</a>
        </div>

        <footer>
          © ${new Date().getFullYear()} ${siteName} • All Rights Reserved<br>
          Backend Version 1.0.0
        </footer>
      </div>
    </body>
    </html>
  `;
};