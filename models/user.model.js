const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  age: Number,
  occupation: String,
});

module.exports = mongoose.model("users", userSchema);
