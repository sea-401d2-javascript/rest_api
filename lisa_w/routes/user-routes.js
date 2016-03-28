'use strict';

const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/User');
const dbErrorHandler = require(__dirname + '/../lib/db-error-handler');

var userRouter = module.exports = exports = express.Router();

userRouter.get('/currentuser', jsonParser, jwtAuth, (req, res)=>{
  User.findOne({_id: req.user._id}, (err, user)=>{
    if(err) dbErrorHandler(err, res);

    res.json({username: user.username});

  });
});
