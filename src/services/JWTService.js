var jwt = require('jsonwebtoken');

module.exports = {
    secret: "123456",
    create: function(data) {
        return new Promise((resolve, reject) => {
            if(data)
                resolve(jwt.sign({ 
                    data: data 
                }, this.secret));
            else
                reject({
                    code: 400,
                    message: "Dados inválidos!"
                });
        });
    },
    verify: function(data) {
        return new Promise((resolve, reject) => {
            jwt.verify(data, this.secret, function(err, decoded) {
                console.log('ERROR!');
                console.log(err);
                if(err) 
                    reject();
                else
                    resolve(decoded.data);
            });
        })
    }
}