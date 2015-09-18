/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

// Set up components
var groveButton = require("./button.js");
var groveRotor = require("./rotor.js");
var groveBuzzer = require("./buzzer.js");
var register = require("./register.js");

var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);

var midi = require('midi-node');

// Greeting screen for 3s
display.setCursor(0, 0);
display.write('hi there');
setTimeout(start, 3000);

function start() 
{
	display.setColor(0,0,0);
	
	// Both roter and button make changes to display
	register.registerDevice();
	groveRotor.Rotor(display);
	groveButton.Button(display);
	groveBuzzer.Buzzer();
}




