const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "User Service Running" }));

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to ${process.env.MONGO_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(`User Service running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));