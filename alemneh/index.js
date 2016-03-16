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
    console.log(idea[0]);
    res.json({data: idea});
  });
});

app.get('/ideas/:id', (req, res) => {
  Idea.findById(req.params.id, (err, idea) =>{
    res.json({data: idea});
  });
});

app.get('/stats', (req, res) => {
  Idea.find({}, (err, idea) => {
    var totalIdeas = idea.length;
    var avrgTeamSize = idea.map((idea) => {
      return idea.teamSize;
    }).reduce((a,b) => {return (a + b);})/totalIdeas;
    res.send('Stats\nTotal Ideas: '+totalIdeas+'\nAvg Teamsize: '+
              avrgTeamSize);
  });

});

app.post('/ideas', (req, res) => {
  var newIdea = new Idea(req.body);
  newIdea.save((err, idea) => {
    res.json(idea);
  });
});

app.put('/ideas/:id', (req, res) => {
  Idea.findByIdAndUpdate(req.params.id, req.body, (err, idea) =>{
    if(err) return res.send(err);
    res.json(idea);
  });
});

app.delete('/ideas/:id', (req, res) => {
  Idea.findById(req.params.id, (err, idea) =>{
    idea.remove((err, idea) => {
      res.json({message: 'idea removed'});
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
