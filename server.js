'use strict';

var Hapi = require('hapi'),
		config = require('./config.json'),
		routes = require('./lib/routes'),

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

server.route(routes);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
