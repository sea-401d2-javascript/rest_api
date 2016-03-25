'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  group: String,
  password: {
    type: String,
    required: [true, 'Password required']
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 10);
}; 

UserSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id}, 'FUNNYSTUFF');
};

module.exports = mongoose.model('User', UserSchema);
