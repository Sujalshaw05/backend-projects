const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(express.json());

// ── Service URLs ──────────────────────────────────────────
const SERVICES = {
  users:     process.env.USER_SERVICE_URL,     // http://localhost:3001
  tasks:     process.env.TASK_SERVICE_URL,     // http://localhost:3002
  reminders: process.env.REMINDER_SERVICE_URL, // http://localhost:3003
};

// ── Logger ────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Generic proxy function ────────────────────────────────
const proxyRequest = (serviceUrl) => async (req, res) => {
  try {
    const url = `${serviceUrl}${req.originalUrl}`;
    console.log(`Forwarding to → ${url}`);

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      console.error("Gateway error:", err.message);
      res.status(502).json({ message: "Service unavailable", error: err.message });
    }
  }
};

// ── Proxy Routes ──────────────────────────────────────────
app.use("/api/users",     proxyRequest(SERVICES.users));
app.use("/api/tasks",     proxyRequest(SERVICES.tasks));
app.use("/api/reminders", proxyRequest(SERVICES.reminders));

// ── Health check ──────────────────────────────────────────
app.get("/health", (req, res) => res.json({ status: "API Gateway Running" }));

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(process.env.PORT, () =>
  console.log(`API Gateway running on port ${process.env.PORT}`)
);