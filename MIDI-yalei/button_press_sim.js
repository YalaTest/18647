var createmidi = require('./createmidi');
var connected = false; // if connection established?
var tcp = require('./tcpclient.js');

function press()
{
	if (!connected)
	{
		console.log('***start TCP connection');
		tcp.startTCP('','');
		connected = true;
	}
	else
	{
		console.log('***already connected, just send');
		tcp.sendTCP('','');
	}
}

setInterval(press, 2000);