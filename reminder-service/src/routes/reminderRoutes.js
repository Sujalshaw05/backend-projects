const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createReminder,
  getReminders,
  deleteReminder,
} = require("../controllers/reminderController");

router.use(auth);

router.post("/", createReminder);
router.get("/", getReminders);
router.delete("/:id", deleteReminder);

module.exports = router;