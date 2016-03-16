'use strict';
var mongoose = require('mongoose');
var Event = require(__dirname + '/../models/events.js');
var Character = require(__dirname + '/../models/characters.js');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

var resourceMethods = module.exports = {};
