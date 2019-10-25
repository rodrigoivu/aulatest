'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var TestSchema = new Schema({

	nombre:      { type: String,  required: false },
	user:        { type: Schema.Types.ObjectId,ref:'User',  required: false }, 
	categoria:   { type: Schema.Types.ObjectId,ref:'Categoria',  required: false }
	
},{ collection: 'test'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Test', TestSchema);