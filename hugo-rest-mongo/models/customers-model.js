'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let customerSchema = new mongoose.Schema({ //changed from const
  // name: {type: String, unique: true},
  name: String,
  age: Number,
  email: String,
  password: String,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  updated: {type: Date, default: Date.now}
});

customerSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

customerSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

customerSchema.methods.generateToken = function () {
  return jwt.sign({id: this._id, email: this.email}, 'CHANGE ME TO SOMETHING');
};

module.exports = mongoose.model('Customer', customerSchema);
