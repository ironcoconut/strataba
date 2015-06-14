'use strict';

var Q = require('q'),
		Hapi = require('hapi'),
		server = new Hapi.Server(),
		mongoose = require('mongoose'),

		Strataba = function() {
			var	modelConstructor = require('./models/proto.js')(this),
					restConstructor = require('./rest-api.js')(this);

			if(!(this instanceof Strataba)) {
				return new Strataba();
			}

			this.constructors = { 
				model: modelConstructor,
				rest: restConstructor
			};

			return this;
		};	

Strataba.prototype = {
	server: server,
	db: mongoose,
};

module.exports = Strataba;
