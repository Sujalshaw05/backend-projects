const Task = require("../models/Task");

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      priority,
      dueDate,
    });
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = { userId: req.userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ count: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};