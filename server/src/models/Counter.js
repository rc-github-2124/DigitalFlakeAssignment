const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 100 },  // Start from 100
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;