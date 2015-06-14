'use-strict';

var blanks = require('../mock-data/projects'),
		config = require('./config.json'),
		mongoose = require('mongoose'),
		db = mongoose.connection;


mongoose.connect(config.db.development);

db.once('open', function(callback) {
	mongoose.connection.db.collection('projects', function (e, collection) {
		blanks.forEach(function(blank) {
			collection.save(blank);
		});
	});
	callback();
});

