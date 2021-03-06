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
					var mapped = data.map(function(item) {
						return item.toJSON();
					});
					return mapped;
				});
			},
			findBySlug: function (slug) {
				return Model.findOne({slug: slug}).then(function(data) {
					return data.toJSON();
				});
			},
			findBySlugs: function (slugs) {
				var promises = slugs.map(function(slug) {
					return Model.findOne({'slug': slug}).then(function(data) {
						if (data) {
							return data.toJSON();
						} else {
							return slug;
						}
					});
				});
				return Q.all(promises);
			},
			save: function(data) {
				return Model.create(data);
			},
			populate: function(project, cards) {
				var data = [];
				project.cards.forEach(function (item, index) {
					var card = _.find(cards,{slug: item});
					card.index = index;
					data.push(card);
				});
				project.cards = data;
				return Q(project);
			}
		};
	};
};
