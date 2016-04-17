const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Bucket: String,
  Key: {type: String}
});

module.exports = mongoose.model('users', userSchema);