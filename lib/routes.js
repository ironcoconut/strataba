'use strict';

var interactor = require('./interactor');

module.exports = (function() {
	return [
		{
			method: 'GET',
			path: '/api/project/new-client',
			handler: function (request, reply) {
				interactor.newClient.handler().then(function(data) {
					reply(data);
				});
			}
		}
	];
})();
