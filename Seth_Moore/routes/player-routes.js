'use strict';

let authenticate = require(`${__dirname}/../lib/authenticate`);

module.exports = function(router, models) {
  let Player = models.Player;
  let Team = models.Team;

  router.route('/players')
  .get((req, res) => {
    Player.find({}, (err, players) => {
      res.json({
        status: true,
        data: players
      });
      res.end();
    });
  })
  .post(authenticate, (req, res) => {
    let userStatus = req.decodedToken;

    if (userStatus.admin || userStatus.manager && userStatus.team === req.body.current_team) {
      Player.findOne({alias: req.body.alias})
      .then(player => {
        if (player) {
          res.json({
            status: 'failure',
            message: 'player already exists'
          });
          return res.end();
        }

        var newPlayer = new Player(req.body);
        newPlayer.save((err, player) => {
          if (err) return console.log(err);
          Team.update({name: player.current_team}, {$push: {current_members: player._id}}, (err, data) => {
            if (err) return console.log(err);
            res.json({
              status: true,
              data: player,
              message: `${player.alias} posted to players`
            });
            res.end();
          });
        });
      })
      .catch(err => res.send(err));

    } else {

      res.json({
        status: 'failure',
        msg: 'You do not have the authorization to perform this action.'
      });
      res.end();
    }
  });

  router.route('/players/:player')
  .get((req, res) => {
    Player.findOne({alias: req.params.player}, (err, player) => {
      if (err) return res.send(err);
      res.json({
        status: true,
        data: player
      });
      res.end();
    });
  })
  .put(authenticate, (req, res) => {
    let userStatus = req.decodedToken;

    Player.findOne({alias: req.params.player})
    .then(player => {
      if (userStatus.admin || userStatus.manager && userStatus.team === player.current_team) {
        // check to see if the request is to change teams
        if (req.body.current_team && req.body.current_team !== player.current_team) {
          var teamLeave;
          // get the player's current team and the team they're switching to
          Team.findOne({name: player.current_team})
          .then(team => {
            teamLeave = team;
            return Team.findOne({name: req.body.current_team});
          })
          .then(teamJoin => {
            // update the team the player is leaving, by removing them from the current members array
            Team.findByIdAndUpdate({_id: teamLeave._id},
              {$set: {
                current_members: teamLeave.current_members.filter(member => (member.toString() !== player._id.toString()))}},
              (err, data) => {
                if (err) return console.log(err);
                console.log(data);
              }
            );
            // add player to their new team
            Team.findByIdAndUpdate(teamJoin._id,
              {$push: {current_members: player._id}},
              (err, data) => {
                if (err) return console.log(err);
                console.log(data);
              }
            );
          })
          .catch(err => console.log(err));
        }

        Player.update({alias: req.params.player}, {$set: req.body}, (err, player) => {
          if (err) return res.send(err);
          res.json({data: player});
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
    .catch(err => res.send(err));
  })
  .delete(authenticate, (req, res) => {
    let userStatus = req.decodedToken;
    if (userStatus.admin) {
      Player.findOne({alias: req.params.player}, (err, player) => {
        player.remove((err, player) => {
          res.json({message: `${player.name} removed`});
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
