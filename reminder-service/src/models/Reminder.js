const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    taskId: { type: String, required: true },
    taskTitle: { type: String, required: true },
    remindAt: { type: Date, required: true },
    sent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);