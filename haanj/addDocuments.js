'use strict';
let DB_PORT = require('./.config').DB_PORT;
let mongoose = require('mongoose');
let Movie = require('./models/movie_module');
let Snack = require('./models/snack_module');
mongoose.connect(DB_PORT);

let globalNums = {
  counter: 0,
  total: 20
};

(() => {
  console.log('Adding documents to collections...');
  //--------- Populates mongo collections with test data ------- \\
  let populateTest = () => {
    let testSnack = new Snack({
      name: 'Nachos v' + Math.random(),
      ingredients: [
        {name: 'chips'},
        {name: 'cheese'}
      ],
      tags: [
        {keyword: 'tasty'},
        {keyword: 'cheesy'}
      ]
    });
    let testMovie = new Movie ({
      name: 'Nacho Libre v' + Math.random(),
      imbd: 9.8,
      actors: [
        {name: 'Antonio Banderas'},
        {name: 'Clint Eastwood'},
        {name: 'Jack Black'},
        {name: 'Jackie Chan'}
      ],
      tags: [
        {keyword: 'nacho'},
        {keyword: 'cheesy'}
      ]
    });
    testSnack.save(()=>{
      console.log('Snack added');
      testMovie.save(() => {
        console.log(globalNums.counter);
        console.log('Movie added');
        globalNums.counter += 1;
        if (globalNums.counter == globalNums.total) {
          console.log('Finished uploading');
          mongoose.connection.close();
        }
      });
    });
  };
  for (let i = 0; i < globalNums.total; i++) {
    populateTest();
  }

})();
//------------ END Collection population -------------- \\
