'use strict';
let User    = require(__dirname + '/../models/user.js');
let jwt     = require('jsonwebtoken');


module.exports = function(req, res, next){
  let token = req.get('Authorization').split(' ')[1];
  if(!token){
    return res.status(400).json({success: false, message: 'invalid credentials'});
  }
  
  try {
    token = jwt.verify(token, process.env.SECRET_TOKEN_SIGN_KEY || 'Change me');
    User.findById(token._id).exec()
      .then((dbUser) => {
        req.decodedToken = token;
        req.user = dbUser;
        next();
      })
      .catch((err) => {
        res.status(400).json({success: false, message: err});
      });
    
  } catch (err) {
    return res.status(400).json({success: false, message: err});
  }
  
};
