'use strict';

let jwt = require('jsonwebtoken');
const express = require('express');
let User = require(__dirname + '/../models/user_model');

var publicRouter = module.exports = exports = express.Router();

// module.exports = function(publicRouter) {
  publicRouter.post('/login', function (req, res) {
    console.log('hit /login POST route');
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(method);
    console.log(name);
    console.log(password);

    var newUser = new User({name:name, password:password});
    newUser.save((err, user) => {
      if (err) {
        console.log('error');
      }
      console.log('user saved');
      return(user);
    });

    User.findOne({name:name}, (err, user) => {
      let valid = user.compareHash(password);
      if(!valid) {
        return res.json({status:'failure'});
      }
      var myToken = user.generateToken();
      res.json({token: myToken});
      console.log('token' + myToken);
    });
  });
// };
publicRouter.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json({data: users});
  });
});
