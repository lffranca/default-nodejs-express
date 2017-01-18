/**LIBs */
var bcrypt = require('bcrypt');

/**MODELS */
var Model = require("../../../models");

/**SERVICES */

module.exports = {
    /**INDEX */
    /**get all */
    getAll: function(data) {
        return Model.then(function(models) {
            return models.user.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: models.permission,
                        attributes: [
                            'id',
                            'description'
                        ],
                        include: [
                            {
                                model: models.company,
                                where: {
                                    id: data.id
                                }
                            }
                        ]
                    }
                ]
            })
            .then(function(data) {
                if(data)
                    return Promise.resolve(data);
                else
                    return Promise.reject({
                        code: 400,
                        message: "Dados inválidos!"
                    });
            });
        });
    },
    /**CREATE */
    /**validation */
    validationCreate: function(data) {
        return new Promise((resolve, reject) => {
            if(data.firstName
                &&data.lastName
                &&data.email
                &&data.permissionId
            ) {
                resolve(data);
            } else {
                reject({
                    code: 400,
                    message: "Dados incompletos!"
                });
            }
        });
    },
    /**generate password */

    /**save */
    saveCreate: function(data) {
        var password = Math.random().toString(36).slice(-8);
        return Model.then(function(models) {
            return bcrypt.hash(password, 10)
            .then(function(hash) {
                return models.user.build({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hash,
                    passwordTemporary: password,
                    status: true,
                    permissionId: data.permissionId
                })
                .save();
            })
            .then(function(data) {
                return Promise.resolve(data);
            });
        });
    },
};