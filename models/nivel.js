'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var NivelSchema = new Schema({

	nombre:         { type: String,  required: false },
	establecimiento:{ type: Schema.Types.ObjectId,ref:'Establecimiento',  required: false }

},{ collection: 'nivel'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Nivel', NivelSchema);