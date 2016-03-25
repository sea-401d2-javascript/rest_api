'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// userSchema.pre('save', function(next) {
//   this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
//   next();
// });
userSchema.methods.hashPassword = function(password){
  var hash = this.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id},'change this');
};

module.exports = exports = mongoose.model('User', userSchema);
