"use strict";

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define("tokens_users", {
    token: DataTypes.STRING(2000)
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.user);
        return Promise.resolve(Token);
      }
    }
  });

  return Token;
};