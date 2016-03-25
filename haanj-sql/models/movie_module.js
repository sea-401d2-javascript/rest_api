'use strict';
module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('Movie', {
    name: DataTypes.STRING,
    imdb: DataTypes.FLOAT
  });
  return Movie;
};
