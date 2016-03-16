'use strict';
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var characters = require(__dirname + '/routes/characters.js');
var events = require(__dirname + '/routes/events.js');
var app = express();


let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

var db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting, error is', err);
});
db.once('open', () => {
  app.use(bodyParser.json());
  app.use('/characters', characters);
  app.use('/events', events);
  app.listen(3000, () => {
    console.log('server started on 3000');
  });
});
