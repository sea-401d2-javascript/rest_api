'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var port = process.env.PORT || 3000;
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);
let router = express.Router();
// require('./routes/arcade-router')(router, models);
//resources
let Arcade = require('./models/arcades');
let Game = require('./models/games');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router
app.use('/api', router);
app.use((req, res, next)=>{
  // console.log('middleware on');
  next();
});

 //arcade routes
router.route('/arcades')
  .post((req, res)=>{
    console.log('post was hit');
    var newArcade = new Arcade(req.body);
   //save arcade and check for errors
    newArcade.save((err, arcade)=>{
      if (err) res.send(err);
      res.json(arcade);
    });
  })
  .get((req, res) =>{
    console.log('get was hit');
    Arcade.find({},(err, arcades)=>{
      if(err) res.send(err);
      res.json({data: arcades});
    });
  });
  //arcade id
router.route('/arcades/:id')
  .get((req, res)=>{
    console.log(('GET /arcade/:id was hit'));
    Arcade.findById(req.params.id, (err, arcade)=>{
      if (err) res.send(err);
      res.json(arcade);
    });
  })
  .put((req, res)=>{
    console.log('PUT /arcade/:id was hit');
    Arcade.findByIdAndUpdate(req.params.id, req.body,(err, arcade)=>{
      if (err) res.send(err);
      res.json(arcade);
    });
  })
    .delete((req, res)=>{
      console.log('deleted');
      Arcade.remove({
        id: req.params.id
      },function(err, arcade) {
        if(err) res.send(err);
        res.json({
          message: 'sucessfully deleted arcade: ' + arcade});
      });
    });

    //game routes
router.route('/games')
     .post((req, res)=>{
       console.log('post /games was hit');
       var newGame = new Game(req.body);
       newGame.save((err, game)=>{
         if (err) res.send(err);
         res.json(game);
       });
     })
     .get((req, res) =>{
       console.log('get was hit');
       Game.find({},(err, games)=>{
         if(err) res.send(err);
         res.json({data: games});
       });
     });
     //games id
router.route('/games/:id')
     .get((req, res)=>{
       console.log(('GET /games/:id was hit'));
       Game.findById(req.params.id, (err, game)=>{
         if (err) res.send(err);
         res.json(game);
       });
     })
     .put((req, res)=>{
       console.log('PUT /game/:id was hit');
       Game.findByIdAndUpdate(req.params.id, req.body,(err, game)=>{
         if (err) res.send(err);
         res.json(game);
       });
     })
       .delete((req, res)=>{
         console.log('deleted');
         Game.remove({
           id: req.params.id
         },function(err, game) {
           if(err) res.send(err);
           res.json({
             message: 'sucessfully deleted game: ' + game});
         });
       });


app.listen(port);
console.log('Magic is happening on port ' + port);
