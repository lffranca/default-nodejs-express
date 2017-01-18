const app = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
/**SET PORT**/
app.set('port', (process.env.PORT || 3000));
/**HELMET**/
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/*****************************TEMPLATE*********************************/
app.engine('html', require('ejs').renderFile);
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
/********************************ROUTES********************************/
/**WEB */
app.use('/',require('./src/routes/web'));
/**API */
app.use('/api',require('./src/routes/api'));
/**INIT SERVER**/
app.listen(app.get('port'),function(){
	console.log('Servidor Rodando! Porta: ' + app.get('port'));
});