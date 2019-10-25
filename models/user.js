'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidos = {
	//values: ['ADMIN_APLIK','ADMIN_ROLE','USER_AVANZADO','USER_HUMEDAD','USER_ESFUERZO', 'INITIAL_ROLE'],
	values: ['ADMIN_ROLE','USER_ROLE', 'INITIAL_ROLE'],
	message: '{VALUE} no es un rol permitido'
};

var UserSchema = new Schema({

	name:            { type: String, required: [true,'El nombre es necesario'] },
	email:           { type: String, unique: true, required: [true,'El correo es necesario'] },
	password:        { type: String, required: [true,'La contraseña es necesaria'] },
	role:            { type: String, required: true, default: 'INITIAL_ROLE', enum: rolesValidos },
	image:           { type: String, required: false, default: '' },
	estado:          { type: Number, required: false, default: 1  },
	services:        { type: String, required: false, default: '0'},
	establecimiento: { type: String, required: false, default: '0'} // 

});

UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('User', UserSchema);