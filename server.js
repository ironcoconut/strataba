'use strict';

var Strataba = require('./lib/strataba'),
		config = require('./config.json'),
		models = ['blank', 'project'],

		app = new Strataba();

app.db.connect(config.db.development);

app.server.connection({ 
	port: config.apiPort,
	host: config.apiHost,
	routes: {
		cors: {
			origin: [config.appUrl]
		}
	}
});

models.forEach(function(model) {
	app.constructors.model({name: model});
	app.constructors.rest({name: model});
});

app.server.start(function () {
  console.log('Server running at:', app.server.info.uri);
});
