'use-strict';

var projects = require('../mock-data/projects'),
		blanks = require('../mock-data/blanks'),
		config = require('./config.json'),
		mongoose = require('mongoose'),
		connection = mongoose.connection;


mongoose.connect(config.db.development);

connection.once('open', function(callback) {
	var db = mongoose.connection.db;
	
	mongoose.connection.db.collection('blanks', function (e, collection) {
		collection.drop();
		blanks.forEach(function(blank) {
			console.log(blank);
			collection.save(blank);
		});
	});
	mongoose.connection.db.collection('projects', function (e, collection) {
		collection.drop();
		projects.forEach(function(project) {
			console.log(project);
			collection.save(project);
		});
	});
	mongoose.connection.close();
});

