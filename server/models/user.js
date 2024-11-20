const mongoose = require('mongoose');


// creating the structure of the model 
const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  password : String,
});

// if the model is already there in the DB then get it else create the model in the DB 
const User = mongoose.models.User || mongoose.model('User', userSchema);

// export for future use 
module.exports = User;