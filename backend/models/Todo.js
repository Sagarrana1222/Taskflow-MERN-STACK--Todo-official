
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  completedAt: {
    type: Date,
    default: null,
  },

  dueDate: {
    type: Date,
    default: null,
  },

  // Task kis user ka hai
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
