/*
 * Grove buzzer. 
 * Reference: https://software.intel.com/en-us/iot/hardware/sensors/grove-buzzer
 */

var myBuzzer;
var upmBuzzer;
var chords = [];
var chordIndex = 0;

exports.Buzzer = function()
{
	upmBuzzer = require("jsupm_buzzer");
	notes = require("./notes.js");
	
	myBuzzer = new upmBuzzer.Buzzer(3);	// Initialize on GPIO 3
	chords = notes.getChords();
	console.log('[buzzer]: chords length' + chords.length);
}

// note is a number
exports.play = function(noteindex)
{
	console.log(myBuzzer.name());
	melody(noteindex);
}
exports.stopPlay = function()
{
	myBuzzer.stopSound();
}

function melody(noteindex)
{
	myBuzzer.setVolume(0.02);
	console.log( myBuzzer.playSound(1000000/chords[noteindex].frequency, 0));	// sound play indefinitely
//	myBuzzer.stopSound();
}

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});