'use strict';
module.exports = (mongoose, db) => {
  let studentSchema = new mongoose.Schema({
    name: String,
    track: String
  });
  let Student = mongoose.model('Student', studentSchema);
  db.Student = Student;
};
