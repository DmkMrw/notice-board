const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {},
  phoneNumber: { type: Number, required: true }
});

module.export = mongoose.model('User', usersSchema);