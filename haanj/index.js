'use strict';
let S_PORT = require('./.config').S_PORT;
let DB_PORT = require('./.config').DB_PORT;

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

let mongoose = require('mongoose');
let Movie = require('./models/movie_module');
let Snack = require('./models/snack_module');
mongoose.connect(DB_PORT);

// --------- Populates mongo collections with test data ------- \\
// (() => {
//   console.log('Adding documents to collections...');
//   let populateTest = (index, total) => {
//     let testSnack = new Snack({
//       name: 'Nachos v' + Math.random(),
//       ingredients: [
//         {name: 'chips'},
//         {name: 'cheese'}
//       ],
//       tags: [
//         {keyword: 'tasty'},
//         {keyword: 'cheesy'}
//       ]
//     });
//     let testMovie = new Movie ({
//       name: 'Nacho Libre v' + Math.random(),
//       imbd: 9.8,
//       actors: [
//         {name: 'Antonio Banderas'},
//         {name: 'Clint Eastwood'},
//         {name: 'Jack Black'},
//         {name: 'Jackie Chan'}
//       ],
//       tags: [
//         {keyword: 'nacho'},
//         {keyword: 'cheesy'}
//       ]
//     });
//     testSnack.save(()=>{
//       console.log('Snack added');
//       testMovie.save(() => {
//         console.log('Movie added');
//         if (index == total - 1) {
//           console.log('Finished uploading');
//         }
//       });
//     });
//   };
//
//   let total = 20;
//   for (let i = 0; i < total; i++) {
//     populateTest(i, total);
//   }
//
// })();
// ------------ END Collection population -------------- \\



app.use(bodyParser.json());

// /Movies routes
app.route('/movies')
  .get((req, res) => {
    console.log('GET request received for /movies');
    Movie.find({}, (err, movies) => {
      if (err) return res.send(err);
      res.json(movies);
    });
  })
  .post((req, res) => {
    console.log('POST request received for /movies');
    var newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      res.json(movie);
    });
  });

app.route('/movies/:id')
  .get((req, res) => {
    console.log('GET request received for /movies/' + req.params.id);
    Movie.findById(req.params.id, (err, movie) => {
      res.json(movie);
    });
  })
  .put((req, res) => {
    console.log('PUT request received for /movies/' + req.params.id);
    Movie.update({_id: req.params.id}, req.body, (err, movie) => {
      res.json(movie);
    });
  })
  .delete((req, res) => {
    console.log('DELETE request received for /movies/' + req.params.id);
    Movie.findById(req.params.id, (err, movie) => {
      movie.remove();
      res.json(movie);
    });
  });

// /Snacks routes
app.route('/snacks')
  .get((req, res) => {
    console.log('GET request received for /snacks');
    Snack.find({}, (err, snacks) => {
      if (err) return res.send(err);
      res.json(snacks);
    });
  })
  .post((req, res) => {
    console.log('POST request received for /snacks');
    var newSnack = new Snack(req.body);
    newSnack.save((err, snack) => {
      res.json(snack);
    });
  });

app.route('/snacks/:id')
  .get((req, res) => {
    console.log('GET request received for /snacks/' + req.params.id);
    Snack.findById(req.params.id, (err, snack) => {
      res.json(snack);
    });
  })
  .put((req, res) => {
    console.log('PUT request received for /snacks/' + req.params.id);
    Snack.update({_id: req.params.id}, req.body, (err, snack) => {
      res.json(snack);
    });
  })
  .delete((req, res) => {
    console.log('DELETE request received for /snacks/' + req.params.id);
    Snack.findById(req.params.id, (err, snack) => {
      snack.remove();
      res.json(snack);
    });
  });


app.listen(S_PORT, () => {
  console.log('Server started on port', S_PORT);
});
