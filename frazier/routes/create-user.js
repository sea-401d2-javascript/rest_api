'use strict';
let express = require('express');
let User = require(__dirname + '/../models/user.js');
let router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.password || !req.body.username){
    return res.status(400).json({success: false, message: 'invalid user'});
  }
  let newUser = new User({
    username: req.body.username, 
    password: req.body.password
  });
  newUser.save()
    .then((newDBUser) => {
      return res.status(200).json({success: true, message: 'new user created'});
    })
    .catch((err) => {
      return res.status(400).json({success: false, message: err});
    });
  
});



module.exports = router;
