const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  description: { type: String, required: true, minlength: 20, maxlength: 1000 },
  date: {type: Date, required: true},
  image: {type: String, required: false },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  info: {type: String, required: true}
});

module.exports = mongoose.model('Ad', adSchema);