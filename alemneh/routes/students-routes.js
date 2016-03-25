'use strict';
let jwtAuth = require('../lib/auth.js');

module.exports = (studentsRouter, db) => {
  let Student = db.Student;
  let Idea = db.Idea;

  studentsRouter.route('/signup')
    .post((req, res) => {
      console.log('HIT');
      Student.find({name: req.body.name}, (err, student) => {
        debugger;
        if(err) throw err;
        console.log('student: '+typeof student);
        if(Array.isArray(student)) {
          var newStudent = new Student(req.body);
          console.log(req.body);
          newStudent.save((err, student) => {
            res.json(student);
          });
          // return res.end();
        }else {
          // res.status(401).json({error: 'Username taken!'});
          // return res.end();
        }
      });

    });

  studentsRouter.route('/:student')
    .get(jwtAuth, (req, res) => {
      Student.findById(req.params.student, (err, student) =>{
        res.json({data: student});
      });
    }).put(jwtAuth, (req, res) => {
      Student.findByIdAndUpdate(req.params.student, req.body, (err, student) =>{
        if(err) return res.send(err);
        res.json(student);
      });
    }).delete(jwtAuth, (req, res) => {
      Student.findById(req.params.student, (err, student) =>{
        student.ideas.forEach((idea) => {
          Idea.findById(idea, (err, data) => {
            if(err) throw err;
            data.remove();
          });
        });
        student.remove((err, student) => {
          if(err) throw err;
          res.json({message: 'Student removed'});
        });
      });
    });

  studentsRouter.route('/:student/students')
    .get(jwtAuth, (req, res) => {
      Student.find({}, (err, student) =>{
        res.json({data: student});
      });
    })


};
