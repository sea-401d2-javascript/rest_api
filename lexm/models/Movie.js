module.exports = (mongoose, models) => {
  var movieSchema = new mongoose.Schema({
    name: String,
    release_date: Date
  });
  var Movie = mongoose.model('Movie', movieSchema);
  models.Movie = Movie;
}
