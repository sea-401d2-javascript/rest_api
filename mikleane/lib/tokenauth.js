'use strict';

let User = require(__dirname + '/../models/user_model');
let jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET ||'change this');
  } catch(e) {
    return res.status(401).json({msg: 'authentication failure'});
  }
  User.findOne({_id: decoded.id}, (err, user) => {
    if(err) {
      console.log(err);
      return res.status(401).json({msg: 'authentication failure'});
    }

    if (!user) return res.status(401).json({msg: 'authentication failure'});

    req.user = user;
    next();
  });
};
