var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://192.168.0.2') //IP MAC
var client  = mqtt.connect('mqtt://174.138.35.45') //
var dataFinPregunta;

client.on('connect', function () {
	enviarFinPregunta();
 });

function enviarFinPregunta(){
	client.publish('aulatest/setBtnOff', dataFinPregunta);
}

function setTabletaBtnOff(ES,CU){ //ES: Establecimiento CU:Curso
	dataBTN = '{"ES":'+ES+',"CU":'+ CU +'}';
	client.publish('aulatest/setBtnOff', dataBTN);
}

function recibeOrden(socket){
	socket.on('finPregunta', (data) => {
	    dataFinPregunta=data;	
        enviarFinPregunta();
    });

}

module.exports = {
	recibeOrden,
	enviarFinPregunta
};