'use-strict';

var config = require('./config.json'),
		mongoose = require('mongoose'),
		connection = mongoose.connection,
		_ = require('lodash'),
		collections = {
			projects: require('./mock-data/projects'),
			blanks: require('./mock-data/blanks')
		};

mongoose.connect(config.db.development);

connection.once('open', function(callback) {
	var db = mongoose.connection.db;

	_.forOwn(collections, function(value, key) {
		console.log('>', key);
		mongoose.connection.db.collection(key, function (e, collection) {
			collection.drop();
			value.forEach(function(data) {
				console.log(data);
				collection.save(data);
			});
		});
	});
	mongoose.connection.close();
});

