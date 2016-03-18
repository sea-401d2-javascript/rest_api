module.exports = (mongoose, models) => {
  var directorSchema = new mongoose.Schema({
    name: String,
    date_of_birth: Date
  });
  var Director = mongoose.model('Director', directorSchema);
  models.Director = Director
}
