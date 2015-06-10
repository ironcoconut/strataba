'use strict';

var Q = require('q'),
		_ = require('lodash');

module.exports = function(app) {
	var Schema = app.mongoose.Schema,
			blankProject = new Schema({}, {strict:false}),
			Projects = mongoose.model('Project', blankProject);

	App.models.Projects = {
		find: function(filter) {
			return Project.find(filter).then(function(data) {
				var mapped = data.map(function(item) {
					return item.toJSON();
				});
				return mapped;
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
