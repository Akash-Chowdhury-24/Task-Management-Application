const nodemailer = require("nodemailer");
const User = require("../models/user");
require('dotenv').config();
async function sendReminderEmail(task) {
  // GET the user 
  const user = await User.findById(task.userId);
  // Set up the transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });
  
  // Configure the email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: `Reminder: ${task.title}`,
    text: `
      Hi there,
      
      This is a reminder for your task:
      
      Title: ${task.title}
      Description: ${task.description}
      Priority: ${task.priority}
      Status: ${task.status}
      
      Please make sure to complete this task soon.
      
      Best,
      Task Management System
    `
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Reminder email sent:", info.response);
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
}

module.exports = { sendReminderEmail };