'use strict';

var _ = require('lodash');

module.exports = function(app) {

	app.routes = {};

	return function (options) {
		var name = options.name,
				model = app.models[name],
				baseUrl = '/api/' + name;

		app.server.route([
			{
				method: 'GET',
				path: baseUrl,
				handler: function (request, reply) {
					var options = encodeURIComponent(request.body);

					model.find(options).then(function(data) {
						reply(data);
					});
				}
			},
			{
				method: 'POST',
				path: baseUrl,
				handler: function (request, reply) {
					var newModel = encodeURIComponent(request.body);

					model.save(newModel).then(function(data) {
						reply(data);
					});
				}
			}
		]);
	};
};
