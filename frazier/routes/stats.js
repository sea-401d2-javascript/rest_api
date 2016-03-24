'use strict';
var express = require('express');
var Event = require(__dirname + '/../models/events-model.js');
var Character = require(__dirname + '/../models/characters-model.js');

var router = express.Router();




router.get('/', (request,response) => {
  Event.find({}, (eventErr, events) => {
    Character.find({}, (charErr, characters) => {
      if (eventErr || charErr) {
        response.status(500).end();
      }
      response.status(200).json({
        totalCharacters: characters.length,
        totalEvents: events.length
      });
    });
  });
});

module.exports = router;
