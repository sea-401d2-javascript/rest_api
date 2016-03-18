// 'use strict';
// var Arcade = require('../models/arcades');
// var Game = require('../models/games');
// var bodyParser = require('body-parser');
//
// module.exports = function(router){
//   router.use(bodyParser.json());
//
//
//
//   router.route('/game-genres')
//     .get((req, res)=>{
//       var genreArray = [];
//       Game
//       Game.find({req.params.id})
//     })
//    .post((req, res)=>{
//      console.log('post was hit');
//      var newArcade = new Arcade(req.body);
//     //save arcade and check for errors
//      newArcade.save((err, arcade)=>{
//        if (err) res.send(err);
//        res.json(arcade);
//      });
//    })
//    .get((req, res) =>{
//      console.log('get was hit');
//      Arcade.find({},(err, arcades)=>{
//        if(err) res.send(err);
//        res.json(arcades);
//      });
//    });
//
//   router.route('/arcades/:id')
//    .get((req, res)=>{
//      console.log(('GET /arcade/:id was hit'));
//      Arcade.findById(req.params.id, (err, arcade)=>{
//        if (err) res.send(err);
//        res.json(arcade);
//      });
//    })
//    .put((req, res)=>{
//      console.log('PUT /arcade/:id was hit');
//      Arcade.findByIdAndUpdate(req.params.id, req.body,(err, arcade)=>{
//        if (err) res.send(err);
//        res.json(arcade);
//      });
//    })
//      .delete((req, res)=>{
//        console.log('deleted');
//        Arcade.remove({
//          id: req.params.id
//        },function(err, arcade) {
//          if(err) res.send(err);
//          res.json({
//            message: 'sucessfully deleted arcade: ' + arcade});
//        });
//      });
// };
