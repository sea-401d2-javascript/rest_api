'use strict';
var mongoose          = require('mongoose');
var express           = require('express');
var bodyParser        = require('body-parser');
var createUserRouter  = require(__dirname + '/routes/create-user.js');
var loginRouter       = require(__dirname + '/routes/logins.js');
var authentication    = require(__dirname + '/lib/authenticate.js');
var charactersRouter  = require(__dirname + '/routes/characters.js');
var eventsRouter      = require(__dirname + '/routes/events.js');
var statsRouter       = require(__dirname + '/routes/stats.js');
var app               = express();


let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

var db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting, error is', err);
});
db.once('open', () => {
  app.use(bodyParser.json());
  app.use('/create-user', createUserRouter);
  app.use('/login', loginRouter);
  app.use(authentication);
  app.use('/stats', statsRouter);
  app.use('/characters', charactersRouter);
  app.use('/events', eventsRouter);
  app.listen(3000, () => {
    console.log('server started on 3000');
  });
});
