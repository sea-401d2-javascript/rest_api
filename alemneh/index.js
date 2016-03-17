'use strict';
let express = require('express');
let mongoose = require('mongoose');
let app = express();
let bodyParser = require('body-parser');
let Idea = require('./models/Idea');
let ideaRouter = express.Router();
require('./routes/ideas-routes')(ideaRouter);
app.use(bodyParser.json());


app.use('/', ideaRouter);

mongoose.connect('mongodb://localhost:27017/ideas');





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



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
