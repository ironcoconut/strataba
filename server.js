'use strict';

var Hapi = require('hapi'),
		config = require('./config.json'),

		server = new Hapi.Server();

server.connection({ 
	port: config.apiPort,
	host: config.apiHost,
	routes: {
		cors: {
			origin: [config.apiUrl]
		}
	}
});

server.route(
	{
		method: 'GET',
		path: '/api/project/new-client',
		handler: function (request, reply) {
			reply('ok');
		}
	}
);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
