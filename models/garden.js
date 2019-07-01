'use strict';
module.exports = (sequelize, DataTypes) => {
  const garden = sequelize.define('garden', {
    userId: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  garden.associate = function(models) {
    // associations can be defined here
  };
  return garden;
};