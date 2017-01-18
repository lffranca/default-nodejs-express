"use strict";

module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("companies", {
    nomeFantasia: DataTypes.STRING,
    razaoSocial: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    tel: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        return Promise.resolve(Company);
      }
    }
  });

  return Company;
};
