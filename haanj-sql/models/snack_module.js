'use strict';
module.exports = function(sequelize, DataTypes) {
  var Snack = sequelize.define('Snack', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });
  return Snack;
};
