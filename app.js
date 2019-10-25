'use strict'

var express = require ('express');
var bodyParser = require ('body-parser');
var path = require('path');
var app = express();

// cargar rutas
var user_routes         = require('./routes/user');
var sendmail_routes     = require('./routes/sendmail');



// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}));
// create application/json parser
app.use(bodyParser.json());

// CORS configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*'); //permite el acceso a todos los dominios, a las apis
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use('/',express.static('client', { redirect: false }));
//app.use('/api', subsignal_routes);
app.use( '/api', user_routes         );
app.use( '/api', sendmail_routes     );


app.get('*', function(req,res,next){
	res.sendFile(path.resolve('./client/index.html'));
});

module.exports = app;