'use strict';

var config = require('../config.json'),
		mongoose = require('mongoose'),
		assert = require('chai').assert,
		mockData = require('../mock/data'),
		gateway = require('../lib/gateway');

describe('Gateway', function() {
	before(function(done) {
		var clearCollection = function() {
					if(mongoose.connection.collections['blanks']) {
						mongoose.connection.collections['blanks'].drop(function() {
							return createCollection();
						});
					} else {
						return createCollection();
					}
				},
				createCollection = function() {
					mongoose.connection.collections['blanks'].insert(sampleBlanks, function () {
						return done();
					});
				};

		if(mongoose.connection.readyState === 0) {
			mongoose.connect(config.db.test, function(error) {
				if(error) {
					throw error;
				}
				return clearCollection();
			});
		} else {
			return clearCollection();
		}
	});

	after(function(done) {
		mongoose.disconnect();
		return done();
	});

	it('#save', function() {
		var newBlank = {
					query: 'What is your income?',
					slug: 'income',
					type: 'number'
				};
		return Blank.saveBlank(newBlank).then(function(data) {
			assert.strictEqual(data.query, newBlank.query, 'Saved blank does not match');
			assert.strictEqual(data.type, newBlank.type, 'Saved blank does not match');
			assert.strictEqual(data.slug, newBlank.slug, 'Saved blank does not match');
		}, function(error) {
			console.log('error', error);
			assert.notOk(error, 'There was an error');
		});
	});
	it('#find', function() {
		return Blank.find().then(function(data) {
			assert.isArray(data, 'data has wrong number of elements');
			assert.lengthOf(data, 6, 'data has wrong number of elements');
			data.forEach(function(item) {
				assert.property(item, 'query', 'Missing query');
				assert.property(item, 'type', 'Missing type');
				assert.property(item, 'slug', 'Missing slug');
			});
		}, function(error) {
			console.log('error', error);
			assert.notOk(error, 'There was an error');
		});
	});
	it('#findBySlug', function() {
		return Blank.findBySlug('last-name').then(function(data) {
			assert.strictEqual(data.slug, 'last-name', 'slugs do not match');
		}, function(error) {
			console.log('error', error);
			assert.notOk(error, 'There was an error');
		});
	});
	it('#findBySlugs', function() {
		var slugs = ['first-name', 'last-name', 'email'];
		return Blank.findBySlugs(slugs).then(function(data) {
			assert.strictEqual(data.length, slugs.length, 'wrong number of blanks');
			data.forEach(function(item) {
				assert.property(item, 'query', 'Missing query');
				assert.property(item, 'type', 'Missing type');
				assert.property(item, 'slug', 'Missing slug');
			});
		}, function(error) {
			console.log('error', error);
			assert.notOk(error, 'There was an error');
		});
	});
});
