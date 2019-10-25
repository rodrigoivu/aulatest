var mqtt = require('mqtt')
//var Jaula = require('../models/jaula');
//var Linea = require('../models/linea');
var PublisherController  = require('./publisher');
//var Controllerbateriaharnero = require('../controllers/bateriaharnero');

var socketLocal; // se rescata del index.js
var ioLocal; // se rescata del index.js
//var client  = mqtt.connect('mqtt://192.168.0.18') // IP MAC
var client  = mqtt.connect('mqtt://174.138.35.45') //

var ventanaAudio= false;
client.on('connect', () => {
	client.subscribe('aulatest/res');
	client.subscribe('aulatest/audio');

})
client.on('message', (topic, message) => {

    var items;
   	items = JSON.parse(message);

   	if(topic == 'aulatest/res'){
   		//console.log(items);
   		mensajeRespuesta(items);
	}

	if(topic == 'aulatest/audio'){

		if (ventanaAudio == false){
			ventanaAudio = true;
			mensajeAudio(items);
		}
		setTimeout(ventana,200);
	}
	
	
})
/*función que sólo hace un alert*/
function ventana(){
 ventanaAudio= false;
}
/*se la llama a los 10 segundos*/

//================================================
// SAVE JAULA DATA
//================================================

// function saveJaulaData(item){
	
// 	if(item.BD == 1){
// 		//console.log('Guardo: '+item.JA);
// 		var jauladata = new Jaula;
// 		var jaulaSel;
// 		Linea.find({}) 
// 		   .exec(
// 		   		(err, itemsFound) => {
// 		   			if (err){
// 		   				console.log(err);
// 		   			}else{
// 		   				var lineaSel=itemsFound[item.LI-1];
// 		   				//console.log(lineaSel._id);
// 		   				Jaula.find({'linea': lineaSel._id})
// 		   					.exec(
// 						   		(err1, itemsFound1) => {
// 						   			if (err1){
// 						   				console.log(err1);
// 						   			}else{
// 						   				jaulaSel = itemsFound1[item.JA-1];

// 						   				Jaula.findByIdAndUpdate(jaulaSel._id, {'dado':item.DA}, { new: true }, (err2, itemUpdated) => { 
// 											if(err2){
// 												console.log(err2);
// 											}else{
// 												if(!itemUpdated){
// 													console.log('Imposible actualizar item');
													
// 												}else{
// 													//console.log(itemUpdated);
// 													PublisherController.setJaulaBD(item.LI,item.JA);

// 												}
// 											}
// 										});
// 						   			}
// 						   		}
// 						   	);
		   				
// 		   			}
// 		   		}
// 		   	);
// 	}
	
// 	mensajeCiclo(item)
// }

//================================================
// SAVE ESFUERZO CHANCADOR
//================================================

// function saveChancadordata(item){
//     var chancadordata = new Chancadordata(item);
// 	Idchancador.findOne({}) 
// 	   .exec(
// 	   		(err, itemsFound) => {
// 	   			if (err){
// 	   				console.log(err);
// 	   			}else{
// 	   				let itemIdh = itemsFound;
// 	   				let sensores = [ parseInt(itemIdh.sensor_1),parseInt(itemIdh.sensor_2),
// 	   								 parseInt(itemIdh.sensor_3),parseInt(itemIdh.sensor_4),
// 	   								 parseInt(itemIdh.sensor_5),parseInt(itemIdh.sensor_6)];
// 			 		var idx = sensores.indexOf(item.idn);  
// 			 		if(idx > -1){
// 			 			chancadordata.idn=idx
// 			 			chancadordata.save((err, itemStored) => {
// 							if(err){
// 								return console.error(err);
// 							}else{
// 								if(!itemStored){
// 									//console.log('Imposible registrar item');
// 								}else{
// 									mensajeEsfuerzoChancadordata(chancadordata);
// 								}
// 							}
// 						});
// 			 		}
// 	   			}
// 	   	});
// }


//================================================
// SAVE BATERIA CHANCADOR
//================================================

// function saveBateriaChancador(item){
// 	Controllerbateriachancador.actualizaItem(item);
// }



function asignarSocket(socket,io){
    socketLocal=socket;
    ioLocal=io;
}


function mensajeRespuesta(data){
	if(socketLocal){
		ioLocal.emit('respuesta',{data: data});
	}
}

function mensajeAudio(data){
	//console.log("audio");
	if(socketLocal){
		ioLocal.emit('audio',{data: data});
		
	}
}

module.exports = {
	asignarSocket
};
