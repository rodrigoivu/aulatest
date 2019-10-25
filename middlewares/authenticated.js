'use strict'

 var jwt = require ('jsonwebtoken');
 var moment = require('moment');
 var secret = 'clave_secreta_iofish_cloud';

//================================================
// Verificar token
//================================================

 exports.ensureAuth = function(req, res, next){
 	var token = req.query.token;  //viene del query ?token= en la url
 	jwt.verify( token, secret, (err, decoded) => {
		if(err){
			return res.status(401).send({message:'Token no válido'});
		}
		if(decoded.exp <= moment().unix()){
			return res.status(401).send({message:'El token ha expirado'});
    }
    req.user = decoded; //se envía como parámetro a la función del controller que lo llama, token decodificado
    next();
 	});
 }

//================================================
// Verificar ADMIN
//================================================

 exports.ensureAdmin = function(req, res, next){
 	var usuario = req.user;
 	if ( usuario.role === 'ADMIN_ROLE' ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({message:'Token no válido - No es administrador'});
 	}
 }

//================================================
// Verificar ADMIN o MSIMO USUARIO
//================================================

 exports.ensureAdminIgualUsuario = function(req, res, next){//Administrador modifica todos los usuarios. El mismo usuario logeado modifica solo sus datos

 	var usuario = req.user; // viene del decode del token
 	var id = req.params.id; // viene del parametro :id, que se pone en la url.

 	if ( usuario.role === 'ADMIN_ROLE' || req.user.sub === id ){  // el sub se crea en el token
 		next();
 		return;
 	} else {
  		return res.status(404).send({message:'Token no válido - No es administrador - No es el mismo usuario' });
 	}
 }

//================================================
// Verificar ADMIN o USUARIO USER
//================================================

 exports.ensureAdminUser = function(req, res, next){

 	var usuario = req.user; // viene del decode del token
 	
 	if ( usuario.role === 'ADMIN_ROLE' || usuario.role === 'USER_ROLE'  ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({message:'Token no válido - No está autorizado' });
 	}
 }

