"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("users", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        avatar: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        passwordTemporary: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsTo(models.permission)
                return Promise.resolve(User);
            }
        }
    });

    return User;
};
