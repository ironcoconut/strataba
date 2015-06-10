'use strict';

var Q = require('q'),
		_ = require('lodash'),
		mongoose = require('mongoose');

module.exports = function(app) {

	app.models = {};
	
	return function(options) {
		var Schema = mongoose.Schema,
				blankModel = new Schema({}, {strict:false}),
				name = options.name,
				Model = mongoose.model(name, blankModel);

		app.models[name] = {
			find: function(filter) {
				return Model.find(filter).then(function(data) {
					return data;
				});
			},
			populate: function(project, cards) {
				var data = [];
				project.cards.forEach(function (item, index) {
					var card = _.find(cards,{slug: item});
					card.index = index;
					data.push(card);
				});
				project.cards = data;
				return project;
			}
		};
	};
};
