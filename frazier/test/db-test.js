'use strict';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
