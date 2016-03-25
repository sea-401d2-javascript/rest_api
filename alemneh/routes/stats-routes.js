'use strict';

module.exports = (statsRouter, db) => {
  let Idea = db.Idea;
  let Student = db.Student;

  statsRouter.route('/stats/ideas')
    .get((req, res) => {
      Idea.find({}, (err, idea) => {
        var totalIdeas = idea.length;
        var avrgTeamSize = idea.map((idea) => {
          return idea.teamSize;
        }).reduce((a,b) => {return (a + b);})/totalIdeas;
        res.send('Stats\nTotal Ideas: '+totalIdeas+'\nAvg Teamsize: '+
                  avrgTeamSize);
      });
    });

  statsRouter.route('/stats/students')
    .get((req, res) => {
      Student.find({}, (err, student) => {
        res.send('There are '+student.length+' student(s) in the database');
      });
    });
};
