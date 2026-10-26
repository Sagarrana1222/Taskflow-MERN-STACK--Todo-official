
const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/authMiddleware");

// POST: Add a task for the logged-in user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      dueDate: dueDate || null,
      user: req.userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET: Fetch only the logged-in user's tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE: Delete only the user's own task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// PATCH: Update only the user's own task
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const updates = {};

    // Only allow these fields to be updated
    if (typeof req.body.title === "string") {
      if (!req.body.title.trim()) {
        return res.status(400).json({
          message: "Task title cannot be empty",
        });
      }

      updates.title = req.body.title.trim();
    }

    if (typeof req.body.completed === "boolean") {
      updates.completed = req.body.completed;
      updates.completedAt = req.body.completed
        ? new Date()
        : null;
    }

    if (req.body.dueDate !== undefined) {
      updates.dueDate = req.body.dueDate || null;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields to update",
      });
    }

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
