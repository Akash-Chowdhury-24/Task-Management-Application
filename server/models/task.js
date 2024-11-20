const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title : String,
  description : String,
  status : String,
  userId : String,
  priority : String,
  hours: Number,
  minutes : Number,
  originalHours: Number,
  originalMinutes : Number,
});

const Task = mongoose.models.Task || mongoose.model('Task',taskSchema);

module.exports = Task;