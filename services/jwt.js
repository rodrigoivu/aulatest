'use strict'

//var jwt = require ('jwt-simple');
var jwt = require ('jsonwebtoken');
//var moment = require('moment');
var secret = 'clave_secreta_iofish_cloud';
var expiracion = { expiresIn: 54000 }; //15 horas

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
		image: user.image,
		estado: user.estado,
		services:user.services
		//iat: moment().unix(),
		//exp: moment().add(30,'days').unix
	};

	//return jwt.encode(payload, secret);
	return jwt.sign(payload, secret, expiracion);
};