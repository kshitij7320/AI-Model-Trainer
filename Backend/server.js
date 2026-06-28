import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/database/db.js";
import {
  login,
  logout,
  me,
  register,
} from "./src/controllers/auth.controller.js";
import { requireAuth } from "./src/middlewares/auth.middleware.js";
import { buildTrainingPlan } from "./src/services/ai.service.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const origin = process.env.CORS_ORIGIN || "http://localhost:5173";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", logout);
app.get("/api/auth/me", requireAuth, me);

app.post("/api/ai/plan", requireAuth, async (req, res) => {
  try {
    const plan = await buildTrainingPlan({
      ...req.body,
      userName: req.user?.name,
    });

    return res.status(200).json({ plan });
  } catch (_error) {
    return res
      .status(500)
      .json({ message: "Could not generate training plan." });
  }
});

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
};

startServer();
