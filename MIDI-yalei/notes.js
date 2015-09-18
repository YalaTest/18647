/*
 * Convert an degree (output from rotor) to a music note.
 */

// It's known that the max and min absolute degree of rotor is 300 and 0.
var CONST_DEGMAX = 300;
var CONST_DEGMIN = 0;
var CONST_SPACE　= 25;	// 300/12 = 25; 12 music notes
var chords = [];

/*
 * Learned from stacoverflow:
 * http://stackoverflow.com/questions/6454198/check-a-range-of-numbers-in-an-if-condition
 */
function between(num, low, high)
{
	// Define [low, high) as between
	return (num >= low) && (num < high);
}

exports.getChords = function()
{
	var C = {hex: 0x3C, frequency: 261.63};
	var CS = {hex: 0x3D, frequency: 277.18};
	var D = {hex: 0x3E, frequency: 293.66};
	var DS = {hex: 0x3F, frequency: 311.13};
	var E = {hex: 0x40, frequency: 329.63};
	var F = {hex: 0x41, frequency: 349.23};
	var FS = {hex: 0x42, frequency: 369.99};
	var G = {hex: 0x43, frequency: 392.00};
	var GS = {hex: 0x44, frequency: 415.30};
	var A = {hex: 0x45, frequency: 440.00};
	var AS = {hex: 0x46, frequency: 466.16};
	var B = {hex: 0x47, frequency: 493.88};
	var CH = {hex: 0x48, frequency: 550.25};	// High-C
	
	chords = [C, CS, D, DS, E, F, FS, G, GS, A, AS, B, CH];
	return chords;
}
exports.angletonote = function(angle)
{
	var note = 
		{name: '', index: 0};
	
	if (between(angle, CONST_DEGMIN, CONST_DEGMIN + CONST_SPACE))
	{note.name = 'C'; note.index = 0;}
	
	if (between(angle, CONST_DEGMIN + CONST_SPACE, CONST_DEGMIN + 2 * CONST_SPACE))
	{note.name = 'C#'; note.index = 1;}
	
	if (between(angle, CONST_DEGMIN + 2 * CONST_SPACE, CONST_DEGMIN + 3 * CONST_SPACE))
	{note.name = 'D'; note.index = 2;}
	
	if (between(angle, CONST_DEGMIN + 3 * CONST_SPACE, CONST_DEGMIN + 4 *  CONST_SPACE))
	{note.name = 'D#'; note.index = 3;}
	
	if (between(angle, CONST_DEGMIN + 4 * CONST_SPACE, CONST_DEGMIN + 5 * CONST_SPACE))
	{note.name = 'E'; note.index = 4;}
	
	if (between(angle, CONST_DEGMIN + 5 * CONST_SPACE, CONST_DEGMIN + 6 * CONST_SPACE))
	{note.name = 'F'; note.index = 5;}
	
	if (between(angle, CONST_DEGMIN + 6 * CONST_SPACE, CONST_DEGMIN + 7 * CONST_SPACE))
	{note.name = 'F#'; note.index = 6;}
	
	if (between(angle, CONST_DEGMIN + 7 * CONST_SPACE, CONST_DEGMIN + 8 * CONST_SPACE))
	{note.name = 'G'; note.index = 7;}
	
	if (between(angle, CONST_DEGMIN + 8 * CONST_SPACE, CONST_DEGMIN + 9 * CONST_SPACE))
	{note.name = 'G#'; note.index = 8;}
	
	if (between(angle, CONST_DEGMIN + 9 * CONST_SPACE, CONST_DEGMIN + 10 * CONST_SPACE))
	{note.name = 'A'; note.index = 9;}
	
	if (between(angle, CONST_DEGMIN + 10 * CONST_SPACE, CONST_DEGMIN + 11 * CONST_SPACE))
	{note.name = 'A#'; note.index = 10;}
	
	if (between(angle, CONST_DEGMIN + 11 * CONST_SPACE, CONST_DEGMIN + 12 * CONST_SPACE))
	{note.name = 'B'; note.index = 11;}
	
	if (angle == CONST_DEGMAX)
	{note.name = 'C-High'; note.index = 12;}
		
	return note;
}

