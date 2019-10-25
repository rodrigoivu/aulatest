'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var AlumnoSchema = new Schema({

	nombre:      { type: String,  required: false },
	curso:       { type: String,  required: false }, 
	nivel:       { type: Schema.Types.ObjectId,ref:'Nivel',  required: false },
	rut:         { type: String,  required: false },
	nacimiento:  { type: Date,  required: false },
	diferencial: { type: Boolean,required: false },
	qr:          { type: String, unique: true, required: false }

},{ collection: 'alumno'});

AlumnoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Alumno', AlumnoSchema);