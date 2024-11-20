require('dotenv').config();

const mongoose = require("mongoose");
const Task = require('../models/task.js');
const { sendReminderEmail } = require('../middleware/mailSender.js');
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB")
    setInterval(async () => {
      const tasks = await Task.find({});
      tasks.forEach(async (task) => {
        if (task.status !== 'done') {
          if (task.minutes > 0) {
            task.minutes -= 1; // Decrease minutes
          } else if (task.hours > 0 && task.minutes === 0) {
            task.hours -= 1; // Decrease hours only if minutes are 0
            task.minutes = 59; // Reset minutes to 59
          }

          // Save updated time in the database
          await task.save();

          // Check if timer has reached 0
          if (task.hours === 0 && task.minutes === 0 ) {
            await sendReminderEmail(task); // Send email

            // Reset timer to original reminder time
            task.hours = task.originalHours;
            task.minutes = task.originalMinutes;
            await task.save(); // Save reset time
          }
        }
      });
    }, 60000);
  })
  .catch((error) => console.log(error))