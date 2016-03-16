const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  dept: {type: String, default: 'MATH'},
  number: Number,
  enrollment: Number,
  maxEnroll:Number
});

module.exports = mongoose.model('classes', classSchema);