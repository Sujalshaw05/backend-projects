const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.get("/health", (req, res) => res.json({ status: "Task Service Running" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to tasks_db");
    app.listen(process.env.PORT, () =>
      console.log(`Task Service running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));