"use strict";

module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define("permissions", {
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Permission.belongsTo(models.company)
        return Promise.resolve(Permission);
      }
    }
  });

  return Permission;
};
