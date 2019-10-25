'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var CategoriaSchema = new Schema({

	asignatura:   { type: String,  required: false },
	nivel:        { type: Schema.Types.ObjectId,ref:'Nivel',  required: false }

},{ collection: 'categoria'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Categoria', CategoriaSchema);