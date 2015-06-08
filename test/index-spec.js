'use strict';

var config = require('../config.json'),
		apiUrl = config.apiUrl,
		assert = require('chai').assert,
		request = require('request');

describe('API', function() {
	it('/api/project/new-client', function(done) {
		request.get(apiUrl + 'api/project/new-client', function(error, response, body) {
			var expected = [
						{
							query: 'First Name',
							slug: 'first-name',
							type: 'text'
						},
						{
							query: 'Last Name',
							slug: 'last-name',
							type: 'text'
						},
						{
							query: 'Email',
							slug: 'email',
							type: 'email'
						},
						{
							query: 'Select the type of issue:',
							slug: 'issue-type',
							type: 'radio',
							options: ['Lawsuit', 'Contract', 'Divorce']
						},
						{
							query: 'Describe your issue',
							slug: 'issue-description',
							type: 'text'
						}
					];

			console.log('error', error);
			console.log('body', body);
			assert.notOk(error, 'Error exists');
			assert.deepEqual(response.statusCode, 200, 'Wrong status code');
			assert.deepEqual(body, expected, 'body did not match expected');
			done();
		});
	});
});
