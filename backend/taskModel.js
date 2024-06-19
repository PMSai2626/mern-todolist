
// backend/src/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  completed: Boolean
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
