'use strict';
let authenticate = require('../lib/authenticate');
let User = require('../models/user_module');

module.exports = (router) => {
  router.route('/user')
    .post((req, res) => {
      console.log('account creation request received');
      console.log(req.body.userName);
      User.findOne({'userName': req.body.userName}, (err, user) => {
        if (user) {
          return res.json('Error: user already exists');
        }
        console.log('Creating new account');
        let newUser = new User(req.body);
        newUser.save((err, user) => {
          res.json(user);
        });
      });
    })
    .get(authenticate)
    .get((req, res) => {
      console.log('authenticated /user hit');
      res.json(req.user);
    });
};
