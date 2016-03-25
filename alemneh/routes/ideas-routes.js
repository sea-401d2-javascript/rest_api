'use strict';
let jwtAuth = require('../lib/auth.js');

module.exports = (ideaRouter, db) => {
  let Idea = db.Idea;
  let Student = db.Student;

  ideaRouter.route('/:student/ideas')
    .get(jwtAuth, (req, res) => {
      Student.findOne({_id: req.params.student})
         .populate('ideas')
         .exec((err, student) => {
           if(err) throw err;
           res.send('Here is your list of ideas\n'+student.ideas);
         });
    })
    .post(jwtAuth, (req, res) => {
      Student.findById(req.params.student, (err, student) => {
        var newIdea = new Idea(req.body);
        newIdea._owner.push(student.name);
        student.ideas.push(newIdea._id);
        newIdea.save();
        student.save();
        res.json({
          success: true,
          data: newIdea
        });
      });
    });

  ideaRouter.route('/:student/ideas/:idea')
    .get(jwtAuth, (req, res) => {
      Idea.findById(req.params.idea, (err, idea) =>{
        if(err) throw err;
        res.json({
          success: true,
          data: idea
        });
      });
    }).put(jwtAuth, (req, res) => {
      Idea.findByIdAndUpdate(req.params.idea, req.body, (err, idea) =>{
        if(err) return res.send(err);
        res.json({msg: 'successfully updated!'});
      });
    }).delete(jwtAuth, (req, res) => {
      Idea.findById(req.params.idea, (err, idea) =>{
        idea.remove((err, idea) => {
          Student.findById(req.params.student, (err, student) => {
            student.ideas.pull(idea._id);
            student.save();
          })
          res.json({msg: 'successfully deleted!'});
        });
      });
    });



};
