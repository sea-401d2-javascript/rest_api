'use strict';

const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  emailAddress: String
});

module.exports = mongoose.model('Customer', customerSchema);