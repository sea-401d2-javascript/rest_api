'use strict';
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
module.exports = (mongoose, db) => {
  var Schema = mongoose.Schema;
  let studentSchema = new mongoose.Schema({
    name: String,
    password: String,
    track: String,
    ideas: [{ type: Schema.Types.ObjectId, ref:'Idea'}]
  });

  studentSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
  });

  //userSchema.methods.hashPassword
  studentSchema.methods.compareHash = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  studentSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id}, 'CHANGE ME');
  }

  let Student = mongoose.model('Student', studentSchema);
  db.Student = Student;
};
