'use strict';
let authenticate = require('../lib/authenticate');
let Snack = require('../models/snack_module');

module.exports = (router) => {
  router.route('/snacks')
    .all(authenticate)
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

  router.route('/snacks/:id')
    .all(authenticate)
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
};
