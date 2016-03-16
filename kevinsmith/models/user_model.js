const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  class: {type: String, default: 'MATH101'},
  sid: Number
});

module.exports = mongoose.model('users', userSchema);