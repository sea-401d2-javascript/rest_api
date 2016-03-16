// 'use strict';
// var mongoose = require('mongoose');
// var Event = require(__dirname + '/../models/events.js');
// var Character = require(__dirname + '/../models/characters.js');
// 
// var resourceMethods = module.exports = {};
// 
// resourceMethods.create = (collection, data) => {
//   var newObj = new collection(data);
//   newObj.save((err, newDBObj) => {
//     if(err){
//       console.log('Error creating ' + newDBObj.name + '. Error was ', err);
//     } else{
//       console.log(newDBObj.name + ' created.');
//     }
//   });
// };
// 
// resourceMethods.update = (collection, id, data) => {
//   (collection).findOneAndUpdate({_id: id}, data, {runValidators: true}, (err, document) => {
//     if(err){
//       console.log('Error updating ' + document.name + '. Error was', err);
//     } else{
//       console.log(document.name + 'updated.');
//     }
//   });
// };
// 
// resourceMethods.read = (collection, id) => {
//   return (collection).find({_id: id});  
// };
// 
// resourceMethods.delete = (collection, id) => {
//   (collection).remove({_id: id}, (err) => {
//     if(err){
//       console.log('Error removing entry: ', err);
//     }
//   });
// };
