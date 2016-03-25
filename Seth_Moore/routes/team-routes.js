'use strict';

let authenticate = require(`${__dirname}/../lib/authenticate`);

module.exports = function(router, models) {
  let Player = models.Player;
  let Team = models.Team;

  router.route('/teams')
  .get((req, res) => {
    Team.find({}, (err, teams) => {
      res.json({
        status: true,
        data: teams
      });
      res.end();
    });
  })
  .post(authenticate, (req, res) => {
    let userStatus = req.decodedToken;

    Team.findOne({name: req.body.name})
    .then(team => {
      if (team) {
        res.json({
          status: 'failure',
          msg: 'team already exists'
        });
        return res.end();
      }

      if (userStatus.admin) {
        var newTeam = new Team(req.body);
        newTeam.save((err, team) => {
          if (err) return console.log(err);
          res.json({
            status: true,
            data: team,
            message: `${req.body.name} added.`
          });
          res.end();
        });

      } else {

        res.json({
          status: 'failure',
          message: 'You do not have the authorization to perform this action.'
        });
        res.end();
      }
    })
    .catch(err => res.send(err));
  });

  router.route('/teams/:team')
  .get((req, res) => {
    Team.findOne({team: req.params.team})
    .populate('current_members')
    .exec()
    .then(team => {
      res.json({
        status: true,
        data: team
      });
      res.end();
    })
    .catch(err => res.send(err));
  })
  .put(authenticate, (req, res) => {
    let userStatus = req.decodedToken;
    if (userStatus.admin || userStatus.manager && userStatus.team === req.params.team) {
      Team.update({team: req.params.team}, {$set: req.body}, (err, team) => {
        if (err) return res.send(err);
        res.json({data: team});
        res.end();
      });

    } else {

      res.json({
        status: 'failure',
        msg: 'You do not have the authorization to perform this action.'
      });
      res.end();
    }
  })
  .delete(authenticate, (req, res) => {
    let userStatus = req.decodedToken;
    if (userStatus.admin) {
      Team.findOne({team: req.params.team}, (err, team) => {
        team.remove((err, team) => {
          res.json({message: `${team.name} removed`});
          res.end();
        });
      });

    } else {

      res.json({
        status: 'failure',
        message: 'You do not have the authorization to perform this action.'
      });
      res.end();
    }
  });
}
