'use strict';

var Strataba = require('./lib/strataba'),
		config = require('./config.json'),
		models = ['blank', 'project'],

		app = new Strataba();

app.db.connect(config.db.development)

models.forEach(function(model) {
	app.constructors.model({name: model});
});

app.server.connection({ 
	port: config.apiPort,
	host: config.apiHost,
	routes: {
		cors: {
			origin: [config.apiUrl]
		}
	}
});

console.log('models', app.models);

app.server.route([
	{
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			reply('make requests at /api');
		}
	},
	{
		method: 'GET',
		path: '/api/projects',
		handler: function (request, reply) {
			app.models.project.find().then(function(data) {
				reply(data);
			});
		}
	}
]);

app.server.start(function () {
  console.log('Server running at:', app.server.info.uri);
});
