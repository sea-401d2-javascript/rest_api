'use strict';
var mongoose = require('mongoose');
// var resources = require(__dirname + '/lib/resources.js');
var express = require('express');
var app = express();

// app.route('/chars').get((request, response) => {
//   
// }).post((request, response) => {
//   
// });
// 
// app.route('/chars/:id').get((request, response) => {
//   
// }).put((request, response) => {
//   
// }).delete((request, response) => {
//   
// });
// 
// app.route('/chars').get((request, response) => {
//   
// }).post((request, response) => {
//   
// });
// 
// app.route('/chars/:id').get((request, response) => {
//   
// }).put((request, response) => {
//   
// }).delete((request, response) => {
//   
// });


app.listen(3000, () => {
  console.log('server started on 3000');
});
