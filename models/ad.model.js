const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String, required: true, minlength: 1, maxlength: 1000 },
  date: {type: String, required: true},
  image: {type: String, required: false },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  user: { type: String, required: true },
  phone: { type: String, required: true },
});
adSchema.index({ '$**': 'text' });


module.exports = mongoose.model('Ad', adSchema);