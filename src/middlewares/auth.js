var jwt = require('../services/JWTService');
var Model = require('../models');

var verifyHeaderAuthorization = function(data) {
    return new Promise((resolve, reject) => {
        if(data.authorization)
            resolve(data.authorization);
        else
            reject({
                code: 403,
                message: "Acesso proibido!"
            });
    });
};

var getTokenHeader = function(data) {
    return new Promise((resolve, reject) => {
        var resultSplit = data.split(" ");
        if(resultSplit.length >= 2)
            resolve(resultSplit[1]);
        else
            reject();
    });
};

var verifyTokenDB = function(data) {
    return Model.then(function(models) {
        return models.token.findOne({
            where: {
                token: data,
            },
            include: [{
                model: models.user,
                attributes: {
                    exclude: [
                        'password'
                    ]
                },
                where: {
                    status: true
                },
                include: [{
                    model: models.permission,
                    attributes: [
                        'id',
                        'description',
                    ],
                    include: [{
                        model: models.company,
                        attributes: [
                            'id',
                            'nomeFantasia',
                            'razaoSocial',
                        ],
                    }]
                }]
            }]
        });
    })
    .then(function(result) {
        return result.get({
            plain: true
        });
    })
    .then(function(result) {
        if(result)
            return result.user;
        else 
            return Promise.reject();
    });
};

// var verifyUserDB = function(data) {
//     return Model.then(function(models) {
//         return models.user.findOne({
//             attributes: {
//                 exclude: [
//                     'password'
//                 ]
//             },
//             where: {
//                 id: data.id,
//                 email: data.email
//             },
//             includes: [{
//                 model: models.permission,
//                 attributes: [
//                     'id',
//                     'description',
//                 ],
//                 includes: [{
//                     model: models.company,
//                     attributes: [
//                         'id',
//                         'nomeFantasia',
//                         'razaoSocial',
//                     ],
//                 }]
//             }]
//         });
//     }).then(function(result) {
//         if(result)
//             return result;
//         else 
//             reject();
//     });
// };

module.exports = (req, res, next) => {
    verifyHeaderAuthorization(req.headers)

    .then(getTokenHeader)
    .then(verifyTokenDB)
    // .then(jwt.verify)
    // .then(verifyUserDB)

    .then(function(data) {
        req.user = data;
        next();
    }, function(error) {
        console.log(JSON.stringify(error));
        res.statusCode = 403;
        res.json({
            error: "Acesso proibido!"
        });
    })
    .catch(function(error) {
        console.log(JSON.stringify(error));
        res.statusCode = 500;
        res.json({
            error: "Erro interno!"
        });
    });


    // if (req.headers.authorization) {
    //     var result = jwt.verify(req.headers.authorization.split(" ")[1]);
    //     if (result.error)
    //         res.json(result);
    //     else {
    //         if (!result.user)
    //             res.json({
    //                 error: 'Dados Inválidos!'
    //             });
    //         else {
    //             Model.verify([
    //                 result.user.id,
    //                 result.user.email
    //             ], (err, rows, fields) => {
    //                 if (err)
    //                     res.json({error:err});
    //                 if (rows.length > 0) {
    //                     req.user = rows[0];
    //                     setTimeout(()=>{
    //                         next();
    //                     }, 100);
    //                 } else
    //                     res.json({error:'Dados Inválido!'});
    //             });
    //         }
    //     }
    // } else {
    //     return res.json({
    //         error: 'Não Autorizado!'
    //     });
    // }
};