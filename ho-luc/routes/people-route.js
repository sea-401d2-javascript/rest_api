'use strict'
let People = require(__dirname + '/../models/people_model');

module.exports = (apiRouter) => {
  apiRouter.route('/people')
    .get((req, res) => {
      People.find({}, (err, people) => {
        res.json({
          status: 200,
          data: people
        })
        res.end();
      })
    })
    .post((req, res) => {
      req.on('data', (data) => {
        req.body = JSON.parse(data);
        var newPerson = new People(req.body);
        newPerson.save((err, person) => {
          res.json({
            status: 200,
            data: person
          })
          res.end();
        })
      })
    })

  apiRouter.route('/people/:id')
    .get((req, res) => {
      People.findById(req.params.id, (err, person) => {
        res.json({
          status: 200,
          data: person
        })
        res.end();
      })
    })
    .put((req, res) => {
      req.on('data', (data) => {
        req.body = JSON.parse(data);
        People.update({_id: req.params.id}, req.body, (err, person) => {
          console.log(req.body);
          console.log('person updated');
          res.json({
            status: 200,
            data: req.body
          })
          res.end();
        })
      })
    })
    .delete((req, res) => {
      People.findById(req.params.id, (err, person) => {
        person.remove((err, person) => {
          res.json({
            status: 200,
            message: 'person removed'
          })
          res.end();
        })
      })
    })

    apiRouter.route('/mostPopularPeopleFood')
    .get((req, res) => {
      var foodArray = [];
      People.find({}, (err, person) => {
        person.forEach((person) => {
          foodArray.push(person.favoriteFood);
        })
        //gets the most popular food with the count
        var count = {};
        var mostFood;
        for(var i = 0; i < foodArray.length; i++) {
          count[foodArray[i]] = count[foodArray[i]] + 1 || 1;
          if(count[foodArray[i]] > (count[mostFood] || 0)) {
            mostFood = foodArray[i];
          }
        }
        res.json({message: 'The most popular food for people is, \'' + mostFood + '\' with ' + count[mostFood] + ' tallies'});
        return res.end();
      })
    })
}
