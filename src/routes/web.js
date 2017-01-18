const app = require('express')();
/**********************WEB**********************/
/**HOME**/
app.use('/',require('../modules/web/home/route'));

module.exports = app;