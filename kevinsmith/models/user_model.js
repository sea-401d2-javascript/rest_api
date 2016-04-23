'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
    type: String,
    required: true,
    unique: true
  },
  password: {type: String /*, minlength: [8, 'Passwords must be at least 8 characters.']*/}
});

userSchema.pre('save', function(next) {
	console.log('here!');
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  console.log(this.password);
  next();
});

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id}, 'CHANGE ME') ;
};

let User = mongoose.model('User', userSchema);
module.exports = User;