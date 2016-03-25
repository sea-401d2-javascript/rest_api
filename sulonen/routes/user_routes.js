'use strict';

let parser = require('body-parser');
let User = require('./../models/user_model');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/users')
    .get((req, res) => {
      User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.json({data: users});
      });
    })

    .post((req, res) => {
      var newUser = new User(req.body);
      var password = newUser.generateHash(newUser.password);
      newUser.password = password; 
      newUser.save((err, user) => {
        if (err) return res.send(err);
        res.json(user);
      });
    });

  router.route('/users/:user')
    .get((req, res) => {
      User.findById(req.params.user, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
      });
    })

    .put((req, res) => {
      User.findByIdAndUpdate(req.params.user, req.body, (err) => {
        if (err) return res.send(err);
        res.json({msg: 'success'});
      });
    })

    .delete((req, res) => {
      User.findById(req.params.user, (err, user) => {
        user.remove((err) => {
          if (err) return res.send(err);
          res.json({msg: 'User removed'});
        });
      });
    });
};
