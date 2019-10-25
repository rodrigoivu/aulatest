'use strict'
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PreguntasSchema = new Schema({

	test:         { type: Schema.Types.ObjectId,ref:'Test',  required: false }, 
	grupo:        { type: String,  required: false },
	pregunta:     { type: String,  required: false },
	alternativa1: { type: String,  required: false },
	alternativa2: { type: String,  required: false },
	alternativa3: { type: String,  required: false },
	alternativa4: { type: String,  required: false },
	alternativa5: { type: String,  required: false },
	alternativa6: { type: String,  required: false },
	respuesta:    { type: Number,  required: false },
	diferencial:  { type: Boolean,  required: false }

},{ collection: 'preguntas'});

//EventoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Preguntas', PreguntasSchema);