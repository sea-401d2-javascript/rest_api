'use strict';
var express = require('express');
// var mongoose = require('mongoose');
var Character = require(__dirname + '/../models/characters.js');
// var resources = require(__dirname + '/../lib/resources.js');

var router = express.Router();

router.get('/', (request, response) => {
  Character.find({}, (err, characters) => {
    if (err){
      response.writeHead(404, {'Content-Type': 'application/json'});
      response.end('404 Not found');
    } else {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.json(characters);
    }
  });
});

router.post('/', (request, response) => {
  console.log('post to /characters made');
  if(request.body.name && request.body.race){
    var newCharacter = new Character(request.body);
    newCharacter.save((err, newDBCharacter) => {
      if(err){
        console.log('Error creating ' + newDBCharacter.name + '. Error was ', err);
      } else{
        console.log(newDBCharacter.name + ' created.');
        response.writeHead(200, {'Content-Type': 'application/json'});
        return response.end();
      }
    });
  }
  response.writeHead(400, {'Content-Type': 'application/json'});
  response.end('400 bad request');
});

// router.get('/:id', (request, response) => {
//     
// });

// router.put('/:id', (request, response) => {
//     
// });
// 
// router.delete('/:id', (request, response) => {
//     
// });

module.exports = router;
