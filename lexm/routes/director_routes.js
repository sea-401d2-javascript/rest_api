module.exports = (router, models) => {
  let Director = models.Director;

  router.route('/directors')
  .get((req, res) => {
    Director.find({}, (err, directors) => {
      res.json({data: directors});
    });
  })
  .post((req, res) => {
    var newDirector = new (Director(req.body;
      newDirector.save((err, director) => {
        res.json(director);
      });
    ));
  });
  router.route('directors/:id')
  .get((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      res.json(director);
    });
  })
  .put((req, res) => {
    Director.findByIdAndUpdate(req.params.id, req.body, (err, director) => {
      if (err) return res.send(err);
      res.json(director);
    });
  })
  .delete((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      director.remove((err, director) => {
        res.json({message: 'director removed'});
      });
    });
  });

}
