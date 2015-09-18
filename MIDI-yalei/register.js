/*
 * Register device with device IP and port on devce start up.
 * References: https://nodejs.org/api/http.html#http_http_request_options_callback
 */

var http = require('http');
var blink = require("./blink.js");
var tcpserver = require("./tcpserver.js");

var req;
var postData = '10.0.18.169:1234';	// make it dynamic??
var options = {
  hostname: '10.0.13.179',
  path: '/midi/register',
  port: '8080',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',   // must have
    'Content-Length': postData.length  // must have
  }
};

exports.registerDevice = function()
{
	req = http.request(options, function(res) {
  		console.log('STATUS: ' + res.statusCode);
  		console.log('HEADERS: ' + JSON.stringify(res.headers));
		
		if (res.statusCode == '200')
		{
			console.log('Register Success!');
			blink.blinkSuccess();
			tcpserver.startServer();
		}
		else
		{
			console.log('Register Failed!');
		}
		
  		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
  		res.on('end', function() {
			console.log('No more data in response.')
  		})
	});

	req.on('error', function(e) {
  		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(postData);
	
	req.end(); // Signify that client is done with the request
}