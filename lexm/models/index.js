var mongoose = require('mongoose');

var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

// mongoose.connect(process.env.MONGO_URI);
var models = {};

require('./Director')(mongoose, models);
require('./Movie')(mongoose, models);

module.exports = models;
