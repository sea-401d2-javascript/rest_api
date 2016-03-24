'use strict';
const bcrypt = require('bcrypt');
// let config = require('../lib/config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// let Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  authentication: {
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    }
  }
});

userSchema.methods.hashPassword = function(password){
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.authentication.password);
};
userSchema.methods.generateToken = function(){
  return jwt.sign({id: this.id}, process.env.APP_SECRET || 'catlady');
};

module.exports = exports = mongoose.model('User', userSchema);
