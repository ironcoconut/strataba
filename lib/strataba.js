'use strict';

var Q = require('q'),
		Hapi = require('hapi'),
		server = new Hapi.Server(),
		mongoose = require('mongoose'),

		Strataba = function() {
			var	modelConstructor = require('./models/proto.js')(this);

			if(!(this instanceof Strataba)) {
				return new Strataba();
			}

			this.constructors = { 
				model: modelConstructor
			};

			return this;
		};	

Strataba.prototype = {
	server: server,
	db: mongoose,
};

module.exports = Strataba;
