'use strict';

const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  Player = require('./model/players_model'),
  Team = require('./model/teams_model'),
  app = express();

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

function testFn(req, res, next) {
  console.log(req.params);
  next();
}

app.use(testFn, bodyParser.json());

app.route('/players')
  .get((req, res) => {
    Player.find({}, (err, players) => {
      res.json({
        status: true,
        data: players
      });
      res.end();
    });
  })
  .post((req, res) => {
    var newPlayer = new Player(req.body);
    newPlayer.save((err, player) => {
      if (err) return console.log(err);
      Team.findByIdAndUpdate(player.current_team[0], {$push: {current_members: player._id}}, (err, data) => {
        if (err) return console.log(err);
        res.json({
          status: true,
          data: player,
          message: `${player.alias} posted to players`
        });
        res.end();
      });
    });
  });

app.route('/players/:id')
  .get((req, res) => {
    Player.findOne({_id: req.params.id})
    .populate('current_team')
    .exec()
    .then(player => {
      res.json({
        status: true,
        data: player
      });
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
  })
  .put((req, res) => {
    Player.update({_id: req.params.id}, req.body, (err, player) => {
      if (err) return res.send(err);
      res.json({data: player});
      res.end();
    });
  })
  .delete((req, res) => {
    Player.findOne({_id: req.params.id}, (err, player) => {
      player.remove((err, player) => {
        res.json({message: `${player.name} removed`});
        res.end();
      });
    });
  });

app.route('/teams')
  .get((req, res) => {
    Team.find({}, (err, teams) => {
      res.json({
        status: true,
        data: teams
      });
      res.end();
    });
  })
  .post((req, res) => {
    var newTeam = new Team(req.body);
    newTeam.save((err, team) => {
      if (err) return console.log(err);
      res.json({
        status: true,
        data: team,
        message: `${req.body.name} posted to `
      });
    });
  });

app.route('/teams/:id')
  .get((req, res) => {
    Team.findOne({_id: req.params.id})
    .populate('current_members')
    .exec()
    .then(team => {
      res.json({
        status: true,
        data: team
      });
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
  })
  .put((req, res) => {
    Team.update({_id: req.params.id}, req.body, (err, team) => {
      if (err) return res.send(err);
      res.json({data: team});
      res.end();
    });
  })
  .delete((req, res) => {
    Team.findOne({_id: req.params.id}, (err, team) => {
      team.remove((err, team) => {
        res.json({message: `${team.name} removed`});
        res.end();
      });
    });
  });

app.route('/change-teams')
  .get((req, res) => {
    Team.find({}, (err, teams) => {
      var randomTeamJoin, randomTeamLeave;
      while (randomTeamJoin == randomTeamLeave) {
        randomTeamJoin = teams[Math.floor(Math.random()*teams.length)];
        randomTeamLeave = teams[Math.floor(Math.random()*teams.length)];
      }
      var randomMember = randomTeamLeave.current_members[Math.floor(Math.random()*randomTeamLeave.current_members.length)];
      Team.findByIdAndUpdate(randomTeamLeave._id,
        {current_members: randomTeamLeave.current_members.filter((player) => {return (player !== randomMember)})},
        (err, data) => {
          if (err) return console.log(err);
          return data;
        }
      );
      Team.findByIdAndUpdate(randomTeamJoin._id,
        {$push: {current_members: randomMember}},
        (err, data) => {
          if (err) return console.log(err);
        }
      );
      Player.findByIdAndUpdate(randomMember, {current_team: randomTeamJoin._id}, (err, data) => {if (err) console.log(err);});
      res.json({
        status:true,
        message: `${randomMember} left ${randomTeamLeave.name} and joined ${randomTeamJoin.name}`
      });
      res.end();
    });
  });

app.listen(3000, () => {
  console.log('server started');
});
