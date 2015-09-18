/*
 * Grove button. 
 * Reference: https://software.intel.com/en-us/iot/hardware/sensors/grove-button
 */

var groveDisplay;
var fs = require('fs');
var midi = require('midi-node');
var buzzer = require("./buzzer.js");
var rotor = require("./rotor.js");
var tcpclient = require("./tcpclient.js");
var notes = require("./notes.js");

var first_pressed = false;	// is it the first time button being pressed?
var connected = false; // if connection established?
var prev_pressed = false;


exports.Button = function(display)
{
	// Load Grove module
	var upm_grove = require('jsupm_grove');
	// Create the button object using GPIO pin D2
	var button = new upm_grove.GroveButton(2);
	groveDisplay = display;

	console.log("Button created!");
	setInterval(function() {readButtonValue(button)}, 200);
}

// Read the input and print, waiting one second between readings
function readButtonValue(button) {
//    console.log(button.name() + " value is " + button.value());
	var noteswitch = 0;	//boolean, NOTE_ON = 1/NOTE_OFF= 0
	
	// Modify LCD backlight color accordingly
	if (button.value())
	{
		var note = rotor.getCurrentNote();
		var notehex = notes.getChords()[note.index].hex;	// get the hex value of selected note
		console.log('[button]: current note index ' + note.name + ' notehex: '+ notehex);
		colorDisplay();
		if (note)
		{
			// Using buzzer to play sound
			buzzer.play(note.index);
			noteswitch = 1;
			prev_pressed = true;
			
			if (!connected)
			{
				console.log('[button]: ***start TCP connection');
				tcpclient.startTCPclient(noteswitch, notehex, function() {
					console.log('[button]: started TCP');
					connected = true;
				});
			}
			else
			{
				tcpclient.sendTCPclient(noteswitch, notehex);
			}

		}
		else
		{
			console.log('[buzzer]: No valid note selected.');
		}
	} // end if button pressed
	// if button's not pressed
	else
	{
		resetDisplay();
		buzzer.stopPlay();
		noteswitch = 0;
		// if button was pressed, sent NOTE_OFF message
		if (prev_pressed)
		{
			prev_pressed = false;
			tcpclient.sendTCPclient(noteswitch, notehex);
		}
	}
}

function colorDisplay()
{
	groveDisplay.setColor(255, 60, 255);
}

function resetDisplay()
{
	// basically turn off the backlight
	groveDisplay.setColor(0,0,0);
}
