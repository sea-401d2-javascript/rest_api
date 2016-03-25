'use strict';

let express = require('express');
let User = require(__dirname + '/../models/user_model');
let auth = require(__dirname + '/../lib/auth.js');

let publicRouter = module.exports = exports = express.Router();

publicRouter.post('/signup', auth, function (req, res) {
  console.log('hit /signup POST route');
  var newUser = new User();
  newUser.name = req.body.name;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if (err) {
      console.log('error');
    }
    console.log('user saved');
    res.status(200).json({token: data.generateToken()});
  });
});
publicRouter.get('/login', auth, (req, res)=> {
  console.log('hit /login route');
  User.findOne({name: req.body.name}, (err, user) => {
    let valid = user.compareHash(req.body.password);
    if(!valid) {
      return res.json({status:'failure'});
    }
    var myToken = user.generateToken();
    res.json({token: myToken});
    console.log('token ' + myToken);
  });
});

publicRouter.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json({data: users});
  });
});
