'use strict';
var express = require('express');
// var mongoose = require('mongoose');
var Event = require(__dirname + '/../models/events-model.js');
// var resources = require(__dirname + '/../lib/resources.js');

var router = express.Router();

router.get('/', (request, response) => {
  console.log('GET request to /events made');
  Event.find({}, (err, events) => {
    if (err){
      // response.writeHead(404, {'Content-Type: application/json'});
      return response.status(404).end('404 Not found');
    } else {
      // response.writeHead(200, {'Content-Type: application/json'});
      return response.status(200).json(events);
    }
  });
});

router.post('/', (request, response) => {
  console.log('post to /events made');
  console.log('req body is', request.body);
  if(request.body.name && request.body.date){
    var newEvent = new Event(request.body);
    newEvent.save((err, newDBEvent) => {
      console.log('saved');
      if(err){
        console.log('Error creating ' + newDBEvent.name + '. Error was ', err);
        response.status(500).end('500 server error');
      } else{
        console.log(newDBEvent.name + ' saved.');
        response.status(200).json(newDBEvent);
      }
    });
  } else {
    response.status(400).end('400 bad request');
  }
});

router.get('/:id', (request, response) => {
  console.log('GET request to /events/:id made');
  Event.findOne({_id: request.params.id}, (err, thatEvent) => {
    if (err){
      console.log('Error finding requested event, error was ', err);
      response.status(400).end();
    } else {
      response.status(200).json(thatEvent);
    }
  });  
    
});

router.put('/:id', (request, response) => {
  console.log('PUT request to /event/:id made');
  Event.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (err, DBEvent) => {
    if(err){
      console.log('Error updating requested event, error was ', err);
      response.status(400).end();
    } else {
      console.log('Updated ' + DBEvent.name);
      response.status(200).json(DBEvent);
    }
  });
});

router.delete('/:id', (request, response) => {
  console.log('DELETE request to /event/:id made');
  Event.findOneAndRemove({_id: request.params.id}, (err, DBEvent, result) => {
    if(err){
      console.log('Error deleting requested event, error was ', err);
      response.status(400).end();
    } else {
      console.log('Deleted ' + DBEvent.name);
      response.status(200).end('Deleted ' + DBEvent.name);
    }
  });
});

module.exports = router;
