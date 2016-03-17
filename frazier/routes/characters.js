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
      return response.status(404).end('404 Not found');
    } else {
      // response.writeHead(200, {'Content-Type: application/json'});
      return response.status(200).json(characters);
    }
  });
});

router.post('/', (request, response) => {
  console.log('post to /characters made');
  console.log('req body is', request.body);
  if(request.body.name && request.body.age){
    var newCharacter = new Character(request.body);
    newCharacter.save((err, newDBCharacter) => {
      if(err){
        console.log('Error creating ' + newDBCharacter.name + '. Error was ', err);
        response.status(500).end('500 server error');
      } else{
        console.log(newDBCharacter.name + ' saved.');
        response.status(200).json(newDBCharacter);
      }
    });
  } else {
    response.status(400).end('400 bad request');
  }
});

router.get('/:id', (request, response) => {
  console.log('GET request to /characters/:id made');
  Character.findOne({_id: request.params.id}, (err, character) => {
    if (err){
      console.log('Error finding requested character, error was ', err);
      response.status(400).end();
    } else {
      response.status(200).json(character);
    }
  });  
    
});

router.put('/:id', (request, response) => {
  console.log('PUT request to /characters/:id made');
  Character.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (err, DBChar) => {
    if(err){
      console.log('Error updating requested character, error was ', err);
      response.status(400).end();
    } else {
      console.log('Updated ' + DBChar.name);
      response.status(200).json(DBChar);
    }
  });
});

router.delete('/:id', (request, response) => {
  console.log('DELETE request to /characters/:id made');
  Character.findOneAndRemove({_id: request.params.id}, (err, DBChar, result) => {
    if(err){
      console.log('Error deleting requested character, error was ', err);
      response.status(400).end();
    } else {
      console.log('Deleted ' + DBChar.name);
      response.status(200).end('Deleted ' + DBChar.name);
    }
  });
});

module.exports = router;
