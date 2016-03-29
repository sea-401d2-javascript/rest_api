'use strict';
module.exports = (loginRouter, db) => {
  let Student = db.Student;

  loginRouter.route('/login')
    .post((req, res) => {
      let authorizationArray = req.headers.authorization.split(' ');
      let method = authorizationArray[0];
      let base64ed = authorizationArray[1];
      let authArray = new Buffer(base64ed, 'base64').toString().split(':');
      let name = authArray[0];
      let password = authArray[1];
      Student.findOne({name:name}, (err, student) => {
        if(err) throw err;
        if(!student) {
          return res.json({status: 'failure', message: 'Invalid user!'});
        }
        let valid = student.compareHash(password);
        if(!valid) {
          res.json({status: 'failure', message: 'Wrong password!'});
        } else {
          res.json({
            id: student,
            token: student.generateToken()
          });
        }


      });
    });
}
