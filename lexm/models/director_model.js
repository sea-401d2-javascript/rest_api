var mongoose = require('mongoose');

var directorSchema = new mongoose.Schema({
  name: String,
  date_of_birth: Date
})

module.exports = mongoose.model('Director', directorSchema);
