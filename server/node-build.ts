import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/src/App"; // Your main React component
import { createServer } from "./index"; // Your API routes if any

const app = express();

// Mount API routes from createServer()
const apiApp = createServer();
app.use("/api", apiApp);

// Serve static assets (built client JS/CSS)
const __dirname = path.resolve(); // Node ESM doesn't have __dirname
const assetsPath = path.join(__dirname, "client/src"); // or "dist/client" if you prebuild
app.use(express.static(assetsPath));

// SSR handler for all non-API routes
app.get("*", (req, res) => {
  try {
    const appHtml = renderToString(<App />);
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fusion Starter SSR</title>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>
    `;
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Fusion Starter SSR running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down");
  process.exit(0);
});
