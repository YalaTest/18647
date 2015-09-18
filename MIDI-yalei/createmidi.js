var midi = require('midi-node');
var fs = require('fs');
var tcpclient = require("./tcpclient.js");

exports.createConnection = function()
{
	tcpclient.startTCP();
}
//var stream = fs.createWriteStream('test1.txt');
//var writer = new midi.Writer(stream);
//
////writer.startFile(0, 1, 128);
//writer.startTrack();	// just start with the track
//// Some hard coded notes here
//writer.noteOn(0, 0, 0x4c, 100); // Channel 0, middle C4, 100 velocity 
//writer.noteOff(0, 0, 0x3c, 100);
//writer.noteOn(0, 0, 0x3c, 100, function () {
//	stream.close();
//	console.log('finished writing');
//	fs.readFile('test1.txt', function (err, data) {
//		if (err) throw err;
//		console.log(data);
//		tcpclient.startTCP(data);
//	});
//});

//var input = fs.createReadStream('test1.txt');
//var stream1 = new midi.Stream(input);
//stream1.on('startTrack', function (track) {
//        // do something with the track 
//		console.log(track);
//});
//stream1.on('endTrack', function (track) {
//        // do something with the track 
//		console.log(track);
//});
//stream1.on('event', function (delta, message) {
//        console.log(message.getStatus()); // 0x80 
//        console.log(message.getCommand()); // "NOTE_OFF" 
//        message.getChannel(); // 0 
//        console.log(message.getData()); // [0x3c, 0x00] 
//		midimessage = message;
//	
//		tcpclient.startTCP(message);
//});