'use strict';
var express = require('express');
// var mongoose = require('mongoose');
var Character = require(__dirname + '/../models/characters-model.js');
// var resources = require(__dirname + '/../lib/resources.js');

var router = express.Router();

router.get('/', (request, response) => {
  console.log('GET request to /characters made');
  Character.find({}, (err, characters) => {
    if (err){
      // response.writeHead(404, {'Content-Type: application/json'});
      return response.end('404 Not found');
    } else {
      // response.writeHead(200, {'Content-Type: application/json'});
      return response.json(characters);
    }
  });
});

router.post('/', (request, response) => {
  console.log('post to /characters made');
  // console.log(request.body.name);
  // console.log(request.body.race);
  console.log('req body is', request.body);
  if(request.body.name && request.body.age){
    var newCharacter = new Character(request.body);
    newCharacter.save((err, newDBCharacter) => {
      console.log('saved');
      if(err){
        console.log('Error creating ' + newDBCharacter.name + '. Error was ', err);
      } else{
        console.log(newDBCharacter.name + ' created.');
        // response.writeHead(200, {'Content-Type application/json'});
        response.json(newDBCharacter);
        console.log('newDBCharacter character sent');
        console.dir(newDBCharacter);
      }
    });
  } else {
    // response.writeHead(400, {'Content-Type application/json'});
    response.end('400 bad request');
  }
});

router.get('/:id', (request, response) => {
  console.log('GET request to /characters/id made');
  Character.findOne({_id: request.params.id}, (err, character) => {
    if (err){
      console.log('Error finding requested character, error was ', err);
      response.statusCode = 400;
      response.end();
    } else {
      response.json(character);
    }
  });  
    
});

router.put('/:id', (request, response) => {
  console.log('PUT request to /characters/id made');
  Character.findOneAndUpdate({_id: request.params.id}, request.body, (err, DBChar) => {
    if(err){
      console.log('Error updating requested character, error was ', err);
      response.statusCode = 400;
      response.end();
    } else {
      console.log('Updated ' + DBChar.name);
      response.statusCode = 200;
      response.json(DBChar);
    }
  });
});

router.delete('/:id', (request, response) => {
  console.log('DELETE request to /characters/id made');
  Character.findOneAndRemove({_id: request.params.id}, (err, DBChar, result) => {
    if(err){
      console.log('Error deleting requested character, error was ', err);
      response.statusCode = 400;
      response.end();
    } else {
      console.log('Deleted ' + DBChar.name);
      response.statusCode = 200;
      response.end();
    }
  });
});

module.exports = router;
