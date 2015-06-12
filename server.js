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
	},
	{ 
		method: 'GET',
		path: '/api/projects/{slug}',
		handler: function (request, reply) {
			var slug = encodeURIComponent(request.params.slug),
					project = '',
					Project = app.models.project,
					Blank = app.models.blank,
					Q = require('q');

			Project.find({'slug':slug}).then(function(data) {
				project = data[0];
				var blanks = project.cards.map(function(blank) {
					return Blank.find({'slug': blank});
				});
				return Q.all(blanks);
			}).then(function(data) {
				project.cards = data;
				reply(project);
			}).catch(function(error) {
				console.log('Error getting project %s: %s', slug, error);
				reply('Error');
			});
		}
	}
]);

app.server.start(function () {
  console.log('Server running at:', app.server.info.uri);
});
