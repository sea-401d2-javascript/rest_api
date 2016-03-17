var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
  name: String,
  release_date: Date
});

module.exports = mongoose.model('Movie', movieSchema);
