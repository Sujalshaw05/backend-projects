const cron = require("node-cron");
const axios = require("axios");
const Reminder = require("../models/Reminder");

const startReminderJob = () => {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Find all unsent reminders whose time has passed
      const dueReminders = await Reminder.find({
        sent: false,
        remindAt: { $lte: now },
      });

      for (const reminder of dueReminders) {
        // Send to notification-service
        await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/api/notifications/send`, {
          userId: reminder.userId,
          taskId: reminder.taskId,
          taskTitle: reminder.taskTitle,
          remindAt: reminder.remindAt,
        });

        // Mark as sent
        reminder.sent = true;
        await reminder.save();

        console.log(`Reminder sent for task: ${reminder.taskTitle}`);
      }
    } catch (err) {
      console.error("Reminder job error:", err.message);
    }
  });

  console.log("Reminder cron job started");
};

module.exports = startReminderJob;