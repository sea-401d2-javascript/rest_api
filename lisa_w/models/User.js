'use strict';
let bcrypt = require('bcrypt');
// let config = require('../lib/config');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
// let Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
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
