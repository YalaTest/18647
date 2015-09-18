/*
 * Receive message from cloud.
 */
var net = require('net');
var midi = require('midi-node');
var buzzer = require("./buzzer.js");
var port = '1234';

exports.startServer = function() {
	var server = net.createServer(function(c) { //'connection' listener
		console.log('client connected');

	  	c.on('data', function(data) {
			console.log('Received from client:' + data);
	  	});

	  	c.on('end', function() {
			console.log('client disconnected');
	  	});

	  	var stream = new midi.Stream(c);
	  	stream.on('startTrack', function (track) {
			// do something with the track
		  	console.log("track started!!! " + track);
	  	});

	  	stream.on('event', function (delta, message) {
			var command = message.getCommand();
		  	var notehex = message.getData()[0];

			console.log('[received]: ' + message.getStatus()); // 0x80 
			console.log('[received]: ' + message.getCommand()); // "NOTE_OFF" 
			console.log('[received]: ' + message.getChannel()); // 0 
			console.log('[received]: ' + message.getData()); // [0x3c, 0x00] 

		  	if (command == 'NOTE_ON')
		  	{
			  	// converst notehex to note.index
			  	buzzer.play(notehex - 0x3C);
		  	}
		  	if (command == 'NOTE_OFF')
		  	{
				buzzer.stopPlay();
		  	}
			if (command == 'END_OF_TRACK')
		  	{

			}
		  	else
		  	{
			  	buzzer.stopPlay();
		  	}
	  	});
		stream.on('error', function (error) {
		  	console.log('[stream error]: ' + error.message);
	  	});
	});	// end createServer

		server.listen(port, function() {
			console.log('Server listening on: '+ port);	
		});
};