var mosca = require('mosca');
var settings = {
		port:1883
		}

var server = new mosca.Server(settings);

server.on('ready', function(){
console.log("El servidor MQTT Mosca esta funcionando correctamente...");
});
