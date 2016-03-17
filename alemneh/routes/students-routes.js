'use strict';
let Student = require('../models/students');

module.exports = (studentsRouter) => {
  studentsRouter.route('/students')
    .get((req, res) => {
      Student.find({}, (err, student) =>{
        res.json({data: student});
      });
    })
    .post((req, res) => {
      var newStudent = new Student(req.body);
      newStudent.save((err, student) => {
        res.json(student);
      });
    });

  studentsRouter.route('/students/:id')
    .get((req, res) => {
      Student.findById(req.params.id, (err, student) =>{
        res.json({data: student});
      });
    }).put((req, res) => {
      Student.findByIdAndUpdate(req.params.id, req.body, (err, student) =>{
        if(err) return res.send(err);
        res.json(student);
      });
    }).delete((req, res) => {
      Student.findById(req.params.id, (err, student) =>{
        student.remove((err, student) => {
          res.json({message: 'Student removed'});
        });
      });
    });

  studentsRouter.route('/students/stats')
    .get((req, res) => {
      Student.find({}, (err, student) => {

      });

    });


};
