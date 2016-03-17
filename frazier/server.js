'use strict';
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var charactersRouter = require(__dirname + '/routes/characters.js');
var eventsRouter = require(__dirname + '/routes/events.js');
var app = express();


let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

var db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting, error is', err);
});
db.once('open', () => {
  app.use(bodyParser.json());
  app.use('/characters', charactersRouter);
  app.use('/events', eventsRouter);
  app.listen(3000, () => {
    console.log('server started on 3000');
  });
});
