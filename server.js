'use strict';

var Strataba = require('./lib/strataba'),
		config = require('./config.json'),
		models = ['blank', 'project', 'party'],

		app = new Strataba();

app.db.connect(config.db.development);

app.server.connection({ 
	port: config.api.port,
	host: config.api.host,
	routes: {
		cors: {
			origin: [config.app.url]
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
