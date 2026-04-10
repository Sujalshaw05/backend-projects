const Reminder = require("../models/Reminder");

// POST /api/reminders
exports.createReminder = async (req, res) => {
  try {
    const { taskId, taskTitle, remindAt } = req.body;
    if (!taskId || !taskTitle || !remindAt)
      return res.status(400).json({ message: "taskId, taskTitle and remindAt are required" });

    const reminder = await Reminder.create({
      userId: req.userId,
      taskId,
      taskTitle,
      remindAt: new Date(remindAt),
    });
    res.status(201).json({ message: "Reminder created", reminder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId }).sort({ remindAt: 1 });
    res.json({ count: reminders.length, reminders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/reminders/:id
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};