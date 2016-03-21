'use strict';
module.exports = (mongoose, db) => {
  var Schema = mongoose.Schema;
  let studentSchema = new mongoose.Schema({
    name: String,
    track: String,
    ideas: [{ type: Schema.Types.ObjectId, ref:'Story'}]
  });
  let Student = mongoose.model('Student', studentSchema);
  db.Student = Student;
};
