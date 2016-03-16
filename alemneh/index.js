'use strict';
let express = require('express');
let mongoose = require('mongoose');
let app = express();
let bodyParser = require('body-parser');
let Idea = require('./models/Idea');

mongoose.connect('mongodb://localhost:27017/ideas');

app.use(bodyParser());

app.get('/ideas', (req, res) => {
  Idea.find({}, (err, idea) =>{
    res.json({data: idea});
  });
});

app.get('/ideas/:id', (req, res) => {
  Idea.findById(req.params.id, (err, idea) =>{
    res.json({data: idea});
  });
});

app.post('/ideas', (req, res) => {
  var newIdea = new Idea(req.body);
  newIdea.save((err, idea) => {
    res.json(idea);
  });
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
