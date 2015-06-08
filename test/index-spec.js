'use strict';

var config = require('../config.json'),
		apiUrl = config.apiUrl,
		assert = require('chai').assert,
		request = require('request');

describe('API', function() {
	it('/api/project/new-client', function(done) {
		request.get(apiUrl + 'api/project/new-client', function(error, response, body) {
			console.log('error', error);
			console.log('body', body);
			assert.notOk(error, 'Error exists');
			assert.deepEqual(response.statusCode, 200, 'Wrong status code');
			assert.ok(body, 'no request body');
			done();
		});
	});
});
