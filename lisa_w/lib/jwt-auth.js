'use strict';

const User = require(__dirname + '/../models/User');
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../lib/config');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, config.secret);
  } catch(e) {
    // debugger;
    return res.status(401).json({msg: 'authing it out'});
  }
  User.findOne({_id: decoded._id}, (err, user)=>{
    if(err) {
      console.log(err);
      return res.status(401).json({msg: 'error authenticating'});
    }
    if(!user) return res.status(401).json({msg: 'user not found'});

    req.user = user;
    next();
  });
};
