'use strict';
module.exports = (sequelize, DataTypes) => {
  const vegetable = sequelize.define('vegetable', {
    name: DataTypes.STRING
  }, {});
  vegetable.associate = function(models) {
    // associations can be defined here
    models.vegetable.belongsToMany(models.garden ,{through:'gardensVegetables'});
  };
  return vegetable;
};