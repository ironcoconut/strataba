'use strict';

var cards = require('../../cards/test/data-store.js'),
		blanks = require('../../blanks/test/data-store.js'),
		projects = require('../../projects/test/data-store.js');

module.exports = (function() {
	return {
		cards: cards,
		blanks: blanks,
		projects: projects
	};
}());
