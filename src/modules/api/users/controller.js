var service = require('./service');

module.exports = {
    index: function(req, res) {
        console.log(req.user.permission);
        /**Realizando serviços */
        Promise.all([
            service.getAll({
                id: req.user.permission.company.id
            })
        ])
        /**Filtrando resultados */
        .then(function(data) {
            return Promise.resolve(data[0]);
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
                    error:error.message
                });
            }
        )
        /**Retorno Error */
        .catch(function(error) {
            res.statusCode = 400;
            res.json(error.message);
        });
    },
    byId: function(req, res) {
        res.json({
            ok: "OK"
        });
    },
    create: function(req, res) {
        /**Realizando serviços */
        Promise.all([
            service.validationCreate(req.body),
            service.saveCreate(req.body)
        ])
        /**Filtrando resultados */
        .then(function(data) {
            // console.log(data);
            return Promise.resolve(data[1]);
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
            res.statusCode = 400;
            res.json({
                error: error.message
            });
        });
    },
    search: function(req, res) {
        res.json({
            ok: "OK"
        });
    },
    update: function(req, res) {
        res.json({
            ok: "OK"
        });
    },
    delete: function(req, res) {
        res.json({
            ok: "OK"
        });
    },
};