'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var EstablecimientoSchema = new Schema({

	nombre:    { type: String,  required: false },
	inicio:    { type: Date,  required: false }, 
	fin:       { type: Date,  required: false }, 
	contrato:  { type: String,  required: false },
	direccion: { type: String,  required: false },
	ciudad:    { type: String,  required: false },
	pais:      { type: String,  required: false },

},{ collection: 'establecimiento'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Establecimiento', EstablecimientoSchema);