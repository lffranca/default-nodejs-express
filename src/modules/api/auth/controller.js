var service = require('./service');

module.exports = {
    /**LOGIN */
    login: function(req, res) {
        /**Realizando serviços */
        Promise.all([
            service.validationLogin(req.body),
            service.getAuth(req.body)
        ])
        /**Verificando password */
        .then(function(data) {
            return service.verifyPassword(req.body, data[1]);
        })
        /**Dados para token */
        .then(function(data) {
            return service.getFindId(data.id);
        })
        /**Gerando JWT */
        .then(function(data) {
            // console.log(data);
            return Promise.all([
                service.generateJWT(data),
                Promise.resolve(data)
            ])
        })
        /**Save token */
        .then(function(data) {
            // console.log(data);
            return service.saveToken(data[0], data[1].id);
        })
        .then(function(data) {
            return data.token
        })
        /**Retorno */
        .then(
            /**Success Response */
            function(data) {
                res.statusCode = 200;
                res.json({
                    data: data
                });
            },
            /**Error Response */
            function(error) {
                res.statusCode = error.code;
                res.json({
                    error: error.message
                });
            }
        )
        /**Retorno Error */
        .catch(function(error) {
            res.statusCode = 500;
            res.json({
                error: error.message
            });
        });
    },
    /**LOGOUT */
    logout: function(req, res) {
        /**Realizando serviços */
        Promise.all([
            service.validationToken(req.body),
            service.deleteToken(req.body),
        ])
        /**Filtrando */
        .then(function(data) {
            return "Logout efetuado com sucesso!";
        })
        /**Retorno */
        .then(
            /**Success Response */
            function(data) {
                res.statusCode = 200;
                res.json({
                    data: data
                });
            },
            /**Error Response */
            function(error) {
                res.statusCode = error.code;
                res.json({
                    error: error.message
                });
            }
        )
        /**Retorno Error */
        .catch(function(error) {
            res.statusCode = 500;
            res.json({
                error: error.message
            });
        });
    },
    /**VERIFY TOKEN */
    verify: function(req, res) {
        /**Realizando serviços */
        Promise.all([
            service.validationToken(req.body),
            service.verifyToken(req.body),
        ])
        /**Filtrando */
        .then(function(data) {
            return data[1].user;
        })
        /**Retorno */
        .then(
            /**Success Response */
            function(data) {
                res.statusCode = 200;
                res.json({
                    data: data
                });
            },
            /**Error Response */
            function(error) {
                res.statusCode = error.code;
                res.json({
                    error: error.message
                });
            }
        )
        /**Retorno Error */
        .catch(function(error) {
            res.statusCode = 500;
            res.json({
                error: error.message
            });
        });
    },
};