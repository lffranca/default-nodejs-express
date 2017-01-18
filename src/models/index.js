// var Promise   = require("bluebird");
var fs        = require("fs");
var Sequelize = require("sequelize");
var sequelize = require('../settings/database');

// console.log(fs.readdirSync(__dirname).filter(function(file) {
//     return (file.indexOf(".") !== 0) && (file !== "index.js");
// }).map(function(item) {
//     return item.split(".")[0];
// }));

var result = null;

module.exports = Promise.resolve(fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).map(function(item) {
    return item.split(".")[0];
}))
.then(function(data) {
    return Promise.all([
        Promise.resolve(data),
        Promise.resolve(data.map((item) => {
            return sequelize.import(__dirname+ '/' + item);
        }))
    ]);
})
// .then(function(data) {
//     return Promise.all([
//         Promise.resolve(data[0]),
//         Promise.all(data[1].map(function(item) {
//             return item.associate(data[1]);
//         })),
//     ]);
// })
.then(function(data) {
    return Promise.all([
        Promise.resolve(data[0]),
        Promise.all(data[1].map(function(item) {
            return item.sync();
        })),
    ]);
})
.then(function(data) {
    var obj = {};
    data[0].map(function(item, index) {
        obj[item] = data[1][index];
    });
    return Promise.all([
        data[0],
        obj
    ]);
})
.then(function(data) {
    return Promise.all([
        data[0],
        Promise.all(Object.keys(data[1]).map(function(item, index) {
            return data[1][item].associate(data[1]);
        }))
    ]);
})
.then(function(data) {
    var obj = {};
    data[0].map(function(item, index) {
        obj[item] = data[1][index];
    });
    return Promise.resolve(obj);
})
.then(function(data) {
    return data;
});