/*
 * Grove rotary angle. 
 * Reference: https://software.intel.com/en-us/iot/hardware/sensors/grove-rotary-angle-sensor
 */

var groveRotary;
var groveDisplay;
var Notes = require("./notes.js");
var currentNote = 
		{name: '', index: 0};

exports.Rotor = function(display)
{
	//setup/Initialization
	var upm_grove = require('jsupm_grove');
	//setup access analog input Analog pin #0 (A0)
	groveRotary = new upm_grove.GroveRotary(0);
	groveDisplay = display;
	
	console.log("Rotor created!");
	
	loop();
}

// Get the current selected note
exports.getCurrentNote = function()
{
	console.log("[getCurrentNote]: " + currentNote.name);
	return currentNote;
}

function loop()
{
    var absdeg = groveRotary.abs_deg();

	currentNote = Notes.angletonote(absdeg);
	console.log("note_msg is " + currentNote.name);
	groveDisplay.clear();
	displayrotary(currentNote.name);
	
    //wait 2s and call function again
    setTimeout(loop, 2000);
}

function displayrotary(msg)
{
	groveDisplay.setCursor(0,0);
	groveDisplay.write(msg);
}