'use strict';
module.exports = (sequelize, DataTypes) => {
  const gardensVegetables = sequelize.define('gardensVegetables', {
    gardenId: DataTypes.INTEGER,
    vegetableId: DataTypes.INTEGER
  }, {});
  gardensVegetables.associate = function(models) {
    // associations can be defined here
  };
  return gardensVegetables;
};