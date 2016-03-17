'use strict';
// module.exports = (mongoose, models) => {
//   let arcadeSchema = mongoose.Schema({
//     name: String,
//     games:[{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
//   });
//
// }
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArcadeSchema = new Schema({
  name: String,
  games :[
    {
      type: Schema.Types.ObjectId,
      ref: 'Games'
    }
  ]

});


var Arcades = mongoose.model('Arcades', ArcadeSchema);
module.exports = Arcades;
