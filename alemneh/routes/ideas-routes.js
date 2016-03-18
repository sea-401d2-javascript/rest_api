'use strict';

module.exports = (ideaRouter, db) => {
  let Idea = db.Idea;

  ideaRouter.route('/ideas')
    .get((req, res) => {
      Idea.find({}, (err, idea) =>{
        console.log(idea[0]);
        res.json({data: idea});
      });
    })
    .post((req, res) => {
      var newIdea = new Idea(req.body);
      newIdea.save((err, idea) => {
        console.log(idea);
        res.json(idea);
      });
    });

  ideaRouter.route('/ideas/:id')
    .get((req, res) => {
      Idea.findById(req.params.id, (err, idea) =>{
        res.json({data: idea});
      });
    }).put((req, res) => {
      Idea.findByIdAndUpdate(req.params.id, req.body, (err, idea) =>{
        if(err) return res.send(err);
        res.json(idea);
        console.log(idea);
      });
    }).delete((req, res) => {
      Idea.findById(req.params.id, (err, idea) =>{
        idea.remove((err, idea) => {
          res.json({message: 'idea removed'});
        });
      });
    });



};
