'use strict';

module.exports = (ideaRouter, db) => {
  let Idea = db.Idea;

  ideaRouter.route('/ideas')
    .get((req, res) => {
      Idea.find({}, (err, idea) =>{
        Idea.findOne({sector: 'sports'})
        .populate('_owner')
        .exec((err, data) => {
          if(err) throw err;
          console.log('The owner is '+data._owner[0].name);
          res.send(data._owner[0].name+' is the owner of the idea '+idea[0].sector);
        });
        res.json({data: idea});
      });
    })
    .post((req, res) => {
      var newIdea = new Idea(req.body);
      newIdea.save((err, idea) => {
        res.json(idea);
      });
    });

  ideaRouter.route('/ideas/:id')
    .get((req, res) => {
      Idea.findById(req.params.id, (err, idea) =>{
        console.log();
        Idea.findOne({sector: idea.sector})
        .populate('_owner')
        .exec((err, data) => {
          if(err) throw err;
          console.log('The owner is '+data._owner[0].name);
          res.send(data._owner[0].name+' is the owner of the idea '+idea.sector);
        });
      });
    }).put((req, res) => {
      Idea.findByIdAndUpdate(req.params.id, req.body, (err, idea) =>{
        if(err) return res.send(err);
        res.json({msg: 'successfully updated!'});
      });
    }).delete((req, res) => {
      Idea.findById(req.params.id, (err, idea) =>{
        idea.remove((err, idea) => {
          res.json({msg: 'successfully deleted!'});
        });
      });
    });



};
