var midi = require('midi-node');
var net = require('net');
var client = new net.Socket();

var host = '10.0.13.179';
var port = 1337;

// Start a TCP connection (one time operation)
exports.startTCPclient = function(noteswitch, notehex, callback) {	
	client.connect(port, host, function() {
		// console.log("connecting on " + port);
		console.log('[TCP]: first time connect');
		var writer = new midi.Writer(client);
		
		writer.startTrack();
		writer.noteOn(0, 0, notehex, 120);
		console.log("wrote msg");
		callback();
	});
}

// Send a TCP message (when button's pressed)
exports.sendTCPclient = function(noteswitch, notehex) {
	if (client)
	{
		var writer = new midi.Writer(client);
		
		console.log('[TCP]: reconnect');
		if (noteswitch)
		{
			writer.noteOn(0, 0, notehex, 120);
			console.log('[TCP]: send noteOn event');
		}
		else
		{
			writer.noteOff(0, 0, notehex, 120);
			console.log('[TCP]: send noteOff event');
		}
	}
	else
	{
		console.log('[TCP]: no TCP Connection');
	}
}

client.on('data', function(data)
{
	console.log('Received from server:' + data);
});
client.on('error', function(error)
{
	console.log('Error:' + error.message);
});
client.on('close', function() {
	console.log('Connection closed');
});