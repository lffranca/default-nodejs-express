var app = require('express')();
// var authMiddleware = require('../middlewares/auth');
/**Headers**/
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','OPTIONS,HEAD,GET,POST,PUT,DELETE,JSON,JSONP');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
	next();
});
/**Middlewares */

/**********************API**********************/
/**AUTHENTICATION**/
// app.use('/auth', require('../modules/api/auth/route'));

/**USERS**/
// app.use('/users', authMiddleware, require('../modules/api/users/route'));

module.exports = app;