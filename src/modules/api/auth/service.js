/**LIBs */
var bcrypt = require('bcrypt');

/**SERVICES */
var jwt = require("../../../services/JWTService");

/**MODELS */
var Model = require("../../../models");

module.exports = {
    /**LOGIN */
    /**validação */
    validationLogin: function(data) {
        return new Promise((resolve, reject) => {
            if(data.email&&data.password) {
                resolve(data);
            } else {
                reject({
                    code: 400,
                    message: "Dados incompletos!"
                });
            }
        });
    },
    /**GET AUTH */
    getAuth: function(data) {
        return Model.then(function(models) {
            return models.user.findOne({
                attributes: [
                    'id',
                    'password'
                ],
                where: {
                    email: data.email,
                    status: true,
                },
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
    /**GET FIND ID */
    getFindId: function(id) {
        return Model.then(function(models) {
            return models.user.findOne({
                attributes: {
                    exclude: [
                        'password'
                    ]
                },
                where: {
                    id: id
                },
            });
        }).then(function(result) {
            if(result)
                return result.get({
                    plain: true
                });
            else
                return Promise.reject({
                    code: 400,
                    message: "Dados inválidos!"
                });
        });
    },
    /*VERIFY PASSWORD*/
    verifyPassword: function(data, resultDB) {
        return bcrypt.compare(data.password, resultDB.password)
        .then(function(result) {
            if(result)
                return Promise.resolve(resultDB);
            else 
                return Promise.reject({
                    code: 400,
                    message: "Dados inválidos!"
                });
        });
    },
    /**GENERATE JWT */
    generateJWT: function(data) {
        return jwt.create(data);
    },
    /**SAVE TOKEN DB */
    saveToken: function(token, id) {
        return Model.then(function(models) {
            return models.token.build({
                token: token,
                userId: id
            })
            .save();
        })
    },
    /**LOGOUT */
    /**validação */
    validationToken: function(data) {
        return new Promise((resolve, reject) => {
            if(data.token) {
                resolve(data);
            } else {
                reject({
                    code: 400,
                    message: "Dados inválidos!"
                });
            }
        });
    },
    /**delete token */
    deleteToken: function(data) {
        return Model.then(function(models) {
            return models.token.findOne({
                where: {
                    token: data.token
                },
            });
        }).then(function(result) {
            if(result)
                return result.destroy();
            else
                return Promise.reject({
                    code: 400,
                    message: "Token inexistente!"
                });
        });
    },
    /**VERIFICANDO TOKEN */
    /**verificando token */
    verifyToken: function(data) {
        return Model.then(function(models) {
            return models.token.findOne({
                where: {
                    token: data.token
                },
                include: [
                    {
                        model: models.user,
                        attributes: {
                            exclude: [
                                'password'
                            ]
                        },
                        where: {
                            status: true
                        },
                        include: [
                            {
                                model: models.permission,
                                include: [
                                    {
                                        model: models.company
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        }).then(function(result) {
            if(result)
                return result.get({
                    plain: true
                });
            else
                return Promise.reject({
                    code: 400,
                    message: "Token inexistente!"
                });
        });
    },
};