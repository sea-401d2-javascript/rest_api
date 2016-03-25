'use strict';

let parser = require('body-parser');
let Bar = require('./../models/bar_model');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/bars')
    .get((req, res) => {
      Bar.find({}, (err, bars) => {
        if (err) return res.json(err);
        res.json({data: bars});
      });
    })

    .post((req, res) => {
      var newBar = new Bar(req.body);
      newBar.save((err, bar) => {
        if (err) return res.json(err);
        res.json(bar);
      });
    });

  router.route('/bars/:id')
    .get((req, res) => {
      Bar.findById(req.params.id, (err, bar) => {
        if (err) return res.json(err);
        res.json(bar);
      });
    })

    .put((req, res) => {
      Bar.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) return res.json(err);
        res.json({msg: 'success'});
      });
    })

    .delete((req, res) => {
      Bar.findById(req.params.id, (err, bar) => {
        bar.remove((err) => {
          if (err) return res.json(err);
          res.json({msg: 'bar removed'});
        });
      });
    });
};
