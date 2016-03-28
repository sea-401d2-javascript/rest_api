'use strict';

let express = require('express');
let router  = express.Router();
let User    = require(__dirname + '/../models/user.js');

router.post('/', (req, res) => {
  try {
    let authArray = req.get('Authorization').split(' ');
    authArray = new Buffer(authArray[1], 'base64').toString().split(':');
    let username = authArray[0];
    let password = authArray[1];
    console.log('username is ' + username);
    console.log('password is ' + password);
    
    if(!username || !password){
      console.log('thought username or password were falsy');
      return res.status(400).json({success: false, message: 'invalid credentials'});
    }
    
    User.findOne({username: username}).exec()
      .then((dbUser) => {
        console.log('dbUser is');
        console.log(dbUser);
        
        return new Promise((resolve, reject) => {
          if (dbUser.compareHashedPassword(password)){
            console.log('agreed that the passwords matched');
            resolve(dbUser);
          } else {
            console.log('could not find that user in db');
            reject(new Error('invalid credentials'));
          }
        });
      })
      .then((dbUser) => {
        console.log('Sending back authorization token');
        res.status(200).json({success: true, token: dbUser.generateToken()});
      })
      .catch((err) => {
        console.log('Error from catch for findOne and compareHashedPassword');
        res.status(400).json({success: false, message: err});
      });
    
  } catch (err) {
    console.log('Error from try catch block');
    return res.status(400).json({success: false, message: err});
  }
});


module.exports = router;
