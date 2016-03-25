'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: String,
  authentication: {
    email: String,
    password: String
  }
});

UserSchema.methods.hashPassword = function(password) {
  var hash
    = this.authentication.password
    = bcrypt.hashSync(password, 8);
  return hash;
}; 

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password,
      this.authentication.password);
};

UserSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id},
      process.env.SECRET || 'FUNNYSTUFF');
};

module.exports = mongoose.model('User', UserSchema);
