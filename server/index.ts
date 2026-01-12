import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env file in development, use environment vars in production
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.development" });
}

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// In production, serve the React app
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../website/dist");
  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
