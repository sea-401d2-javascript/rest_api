'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.methods.hashPassword = function(password) {
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
