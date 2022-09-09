const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {},
  // phoneNumber: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);