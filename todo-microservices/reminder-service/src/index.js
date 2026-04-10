const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const reminderRoutes = require("./routes/reminderRoutes");
const startReminderJob = require("./jobs/reminderJob");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/reminders", reminderRoutes);
app.get("/health", (req, res) => res.json({ status: "Reminder Service Running" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to reminders_db");
    startReminderJob(); // start cron after DB is ready
    app.listen(process.env.PORT, () =>
      console.log(`Reminder Service running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));