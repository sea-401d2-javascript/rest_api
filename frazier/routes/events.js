'use strict';
var express = require('express');
// var mongoose = require('mongoose');
var Event = require(__dirname + '/../models/events-model.js');
// var resources = require(__dirname + '/../lib/resources.js');

var router = express.Router();

router.get('/', (request, response) => {
  console.log('GET request to /events made');
  Event.find({}, (err, event) => {
    if (err){
      // response.writeHead(404, {'Content-Type: application/json'});
      return response.end('404 Not found');
    } else {
      // response.writeHead(200, {'Content-Type: application/json'});
      return response.json(event);
    }
  });
});

router.post('/', (request, response) => {
  console.log('post to /events made');
  console.log('req body is', request.body);
  if(request.body.name && request.body.age){
    var newEvent = new Event(request.body);
    newEvent.save((err, newDBEvent) => {
      console.log('saved');
      if(err){
        console.log('Error creating ' + newDBEvent.name + '. Error was ', err);
      } else{
        console.log(newDBEvent.name + ' created.');
        response.json(newDBEvent);
      }
    });
  } else {
    response.statusCode = 400;
    response.end('400 bad request');
  }
});

router.get('/:id', (request, response) => {
  console.log('GET request to /events/id made');
  Event.findOne({_id: request.params.id}, (err, event) => {
    if (err){
      console.log('Error finding requested event, error was ', err);
      response.statusCode = 400;
      response.end();
    } else {
      response.json(event);
    }
  });  
    
});

router.put('/:id', (request, response) => {
  console.log('PUT request to /event/id made');
  Event.findOneAndUpdate({_id: request.params.id}, request.body, (err, DBEvent) => {
    if(err){
      console.log('Error updating requested event, error was ', err);
      response.statusCode = 400;
      response.end();
    } else {
      console.log('Updated ' + DBEvent.name);
      response.statusCode = 200;
      response.json(DBEvent);
    }
  });
});

router.delete('/:id', (request, response) => {
  console.log('DELETE request to /event/id made');
  Event.findOneAndRemove({_id: request.params.id}, (err, DBEvent, result) => {
    if(err){
      console.log('Error deleting requested event, error was ', err);
      response.statusCode = 400;
      response.end();
    } else {
      console.log('Deleted ' + DBEvent.name);
      response.statusCode = 200;
      response.end();
    }
  });
});

module.exports = router;
